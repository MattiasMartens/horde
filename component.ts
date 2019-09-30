import {
  v4
} from "uuid";

import {
  parse,
  HTMLElement,
  Node,
  TextNode
} from "node-html-parser";

export type RancorTemplate = {
  rawFragments: RawHtml[],
  liveFragments: any[],
  _tag: "rancor"
}

export function rancor(strings: TemplateStringsArray, ...values: any[]): RancorTemplate {
  return {
    rawFragments: Array.from(strings),
    liveFragments: values,
    _tag: "rancor"
  }
}

export const r = rancor;

export type RawHtml = string;

export type Component<W> = (w: W) => HTMLElement | RancorTemplate;

export type ChildFragment<T, V = T, W = V> = {
  refiner?: (t: T) => V,
  transformer?: (v: V) => W,
  component: Component<W>,
  _tag: "child"
}

export function ChildFragment<T, V = T, W = V>(
  {
    refiner,
    transformer,
    component
  }: {
    refiner?: (t: T) => V,
    transformer?: (v: V) => W,
    component: Component<W>
  }): ChildFragment<T, V, W> {
    const val = {
      refiner,
      transformer,
      component,
      _tag: "child"
    };

    return val as typeof val extends ChildFragment<T, infer V, infer W> ? ChildFragment<T, V, W> : never;
}

export type ListenerFragment = {
  element: RancorTemplate | RawHtml,
  listeners: {
    [event: string]: (e: Event) => void // TODO instead emit a traceable mutation event?
  }
}

export function identity<T>(t: T) {
  return t;
}

export const c = ChildFragment;

function getChildIfChild(val: any): undefined | ChildFragment<any, any, any> {
  if (val === null || val === undefined) {
    return undefined;
  } else if (val["_tag"] === "child") {
    return val as ChildFragment<any, any, any>;
  } else {
    return undefined;
  }
}

function getRancorIfRancor(val: any): undefined | RancorTemplate {
  if (val === null || val === undefined) {
    return undefined;
  } else if (val["_tag"] === "rancor") {
    return val as RancorTemplate;
  } else {
    return undefined;
  }
}

function renderChildFragment({
  component,
  refiner,
  transformer
}: ChildFragment<any, any, any>, data: any, patch: (subTree: HTMLElement, insertionPoint: Node) => void) {
  /**
   * TODO the "refiner" function was to be used for dependency injection but may no longer be necessary
   */
  const refined = refiner ? refiner(data) : data;

  const transformed = transformer ? transformer(refined) : data;
  return render({
    component,
    data: transformed,
    patch
  });
}

/**
 * 
 * Render a piece of a Rancor template, which may itself be a reactive child component.
 */
function renderFragment(fragment: any | ChildFragment<any, any, any>, data: any, output: (subTree: HTMLElement, insertionPoint: Node) => void) {
  const asChild = getChildIfChild(fragment);
  if (!!asChild) {
    return renderChildFragment(asChild, data, output);
  } else {
    return String(fragment);
  }
}

function asSkeletonDom({liveFragments, rawFragments}: RancorTemplate) {
  const uuids = liveFragments.map(() => v4());

  const skeletonString = rawFragments.map((str, i) => str + ((i in liveFragments) ? `<rib id="${uuids[i]}" />` : "")).join("");
  const fragment = parse(skeletonString) as any as HTMLElement;
  return {
    fragment,
    uuids
  };
}

function insertLiveFragment(documentFragment: HTMLElement, uuid: UUID, toInsert: Node) {
  const insertionPoint = documentFragment.querySelector("#" + uuid);
  const parent = insertionPoint.parentNode;

  const index = parent.childNodes.findIndex(n => (n as HTMLElement).id === uuid);

  parent.childNodes[index] = toInsert;
}

/**
 * Render a component and track its place in the tree and its dependencies.
 */
function render<T>({component, data, patch}: RenderContext<T>): {
  output: HTMLElement,
  graph?: ComponentGraph<T>
} {
  const renderedTemplate = component(data);

  if (renderedTemplate instanceof HTMLElement) {
    return {
      output: renderedTemplate
    }
  } else {
    const rancor = renderedTemplate;
    const {liveFragments} = rancor;

    /**
     * TODO can we cache this so it is not executed on subsequent runs?
     */
    const {fragment, uuids} = asSkeletonDom(rancor);

    liveFragments.forEach(
      (liveFragment, i) => {
        const uuid = uuids[i];
        const childFragment = getChildIfChild(liveFragment);

        if (!!childFragment) {
          const {
            graph,
            output
          } = renderChildFragment(liveFragment, data, patch);

          insertLiveFragment(fragment, uuid, output);
        } else {
          const node = new TextNode(String(liveFragment));
          insertLiveFragment(fragment, uuid, node);
        }
      }
    );

    return {
      output: fragment
    }
  }
}

export type Mutators<W> = {
  [key: string]: (w: W, i?: any) => W
};

type ValueMapped<T extends {[key: string]: V}, V, U> = {
  [P in keyof T]: U
};

function mapValues<T, V>(
  object: { [key: string]: T },
  fn: (value: T, key: string) => V
): { [key: string]: V } {
  const ret: { [key: string]: V } = {};

  Object.keys(object).forEach(key => (ret[key] = fn(object[key], key)));
  return ret;
}

type UUID = string;

const globalMutationSubscribers = new WeakMap<any, Map<UUID[], ((a: any) => void)>>();

export function Mutator<W>(w: W, mutators: Mutators<W>) {
  const wrapped = mapValues(
    mutators,
    mutator => {
      return (i: any) => {
        const oldValue = w;
        const newValue = mutator(w, i);
        const subscribers = globalMutationSubscribers.get(oldValue) || new Map();
        subscribers.forEach(fn => fn(newValue));

        if (newValue !== oldValue) {
          globalMutationSubscribers.delete(oldValue);
          globalMutationSubscribers.set(newValue, subscribers);
        }
      }
    }
  )

  return wrapped as {
    [P in keyof typeof mutators]: typeof mutators[P] extends (w: W, i: infer I) => W ? (i: I) => void : () => void
  }
}

type ComponentGraph<W> = {
  dependencies: any[],
  _uuid: UUID,
  children: ComponentGraph<any>[],
  rerender: (newData: W) => void
}


type RenderContext<W> = {
  component: Component<W>,
  data: W,
  patch: (subTree: HTMLElement, insertionPoint: Node | undefined) => void
}

/**
 * Given a root component and its data object, return a complete DOM tree.
 * Then, each time a mutation requires a re-render of some subset of that tree, call the provided function with a DOM sub-tree and insertion point.
 */
export function makeRenderer<W>(rootComponent: Component<W>, data: W, patch: (subTree: HTMLElement, insertionPoint: Node) => void) {
  const rootComponentUuid = v4();

  const componentGraph = {
    dependencies: [data],
    _uuid: rootComponentUuid,
    children: []
  };

  const renderFn = () => render({
    component: rootComponent,
    data,
    patch
  });

  const domTree: HTMLElement = renderFn().output;

  return {
    domTree,
    /** TODO function that cleans up and destroys this tree */
    cleanup: () => {}
  }
}
