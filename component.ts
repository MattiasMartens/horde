import {
  v4
} from "uuid";

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

export type Component<W> = (w: W) => RawHtml | RancorTemplate | (RawHtml | RancorTemplate)[];

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

function renderFragment(fragment: any | ChildFragment<any, any, any>, data: any, output: (rawHtml: RawHtml) => void, path: UUID[]) {
  const asChild = getChildIfChild(fragment);
  if (!!asChild) {
    const {
      component,
      refiner,
      transformer
    } = asChild;

    /**
     * TODO the "refiner" function was to be used for dependency injection but may no longer be necessary
     */
    const refined = refiner ? refiner(data) : data;

    const transformed = transformer ? transformer(refined) : data;
    return render(component, transformed, output, path);
  } else {
    return String(fragment);
  }
}

function renderTemplate(template: RawHtml | RancorTemplate | ChildFragment<any>, data: any, output: (rawHtml: RawHtml) => void, path: UUID[]): string {
  const asRancor = getRancorIfRancor(template);
  if (!!asRancor) {
    const {
      liveFragments,
      rawFragments
    } = asRancor;

    return rawFragments.map((val, i) => val + (i in liveFragments
      ? renderFragment(liveFragments[i], data, output, path)
      : ""
    )).join("")
  } else {
    return renderFragment(template, data, output, path);
  }
}

const paths = new WeakMap<UUID[], UUID[]>();

function registerPath(pathSoFar: UUID[]) {
  const extendedPath = [...pathSoFar, v4()];
  paths.set(pathSoFar, extendedPath);
  return extendedPath;
}

function render<T>(component: Component<T>, data: T, output: (rawHtml: RawHtml) => void, path: UUID[]): RawHtml {
  const rememberedPath = paths.get(path);

  const myPath = rememberedPath || registerPath(path);

  const renderedTemplate = component(data);

  const subscribers = globalMutationSubscribers.get(data) || new Map();
  if (!subscribers.has(myPath)) {
    subscribers.set(myPath, () => output(render(component, data, output, path)));
  }
  globalMutationSubscribers.set(data, subscribers);

  return Array.isArray(renderedTemplate)
  ? renderedTemplate.map(
    template => renderTemplate(
      template,
      data,
      output,
      myPath
    )
  ).join("")
  : renderTemplate(renderedTemplate, data, output, myPath);
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

export function makeRenderer<W>(rootComponent: Component<W>, data: W, output: (rawHtml: RawHtml) => void): () => void {
  const rootComponentUuid = v4();

  const renderFn = () => render(
    rootComponent,
    data,
    output,
    [rootComponentUuid]
  );

  output(renderFn());

  /** TODO function that cleans up and destroys this tree */
  return () => {};
}
