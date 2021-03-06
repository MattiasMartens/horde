
import {
  Component, RawHtml
} from "./component";
import { v4 } from "uuid";
import { IterableFragment, ChildFragment, getIterableIfIterable, getChildIfChild, ListenerFragment } from "./fragment";

import {
  parse
} from "../lib2/parse";

import { RancorTemplate } from "./tag";
import { notNullOrUndefined } from "../types/utils";

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

function findIndex<T extends Node>(nl: NodeListOf<T>, pred: (t: T) => boolean) {
  for (let i = 0; i < nl.length; i++) {
    const el = nl[i];
    if (pred(el)) {
      return i;
    }
  }

  return -1;
}

function splice<T extends Node>(nl: NodeListOf<T>, index: number, toDelete: number, toInsert: T[]) {
  const toReinsert: T[] = [];

  let currentNode: T | undefined;
  let deleteCursor = index + toDelete - 1;
  while (!!(currentNode = nl[deleteCursor++])) {
    toReinsert.push(currentNode);
  }

  let cursor = index;
  for (let insertee of toInsert) {
    nl[cursor++] = insertee;
  }

  for (let insertee of toReinsert) {
    nl[cursor++] = insertee;
  }

  nl.length = cursor;
}

function insertLiveHtmlFragment(documentFragment: HTMLElement, uuid: UUID, toInsert: ChildNode) {
  const insertionPoint = notNullOrUndefined(
    documentFragment.querySelector("#" + uuid),
    `Element not found with ID ${uuid}`
  );

  const parent = notNullOrUndefined(
    insertionPoint.parentNode
  );

  const index = findIndex(parent.childNodes, n => (n as HTMLElement).id === uuid);

  parent.replaceChild(toInsert, parent.childNodes[index]);
}

function insertLiveHtmlFragments(documentFragment: HTMLElement, uuid: UUID, toInsert: ChildNode[]) {
  const insertionPoint = notNullOrUndefined(
    documentFragment.querySelector("#" + uuid),
    `Element not found with ID ${uuid}`
  );
  const parent = notNullOrUndefined(
    insertionPoint.parentNode
  );
  const index = findIndex(parent.childNodes, n => (n as HTMLElement).id === uuid);

  splice(
    parent.childNodes,
    index,
    1,
    toInsert
  );
}

function renderRancorTemplate<W>(rancorTemplate: RancorTemplate, data: W, patch: (subTree: HTMLElement, insertionPoint: Node) => void) {
  const {liveFragments} = rancorTemplate;

  /**
    * TODO can we cache this so it is not executed on subsequent runs?
    */
  const {fragment, uuids} = asSkeletonDom(rancorTemplate);

  liveFragments.forEach(
    (liveFragment, i) => {
      const uuid = uuids[i];
      const childFragment = getChildIfChild(liveFragment);

      if (!!childFragment) {
        const {
          graph,
          output
        } = renderChildFragment(liveFragment, data, patch);

        return void insertLiveHtmlFragment(fragment, uuid, output);
      }
      
      const iterableFragment = getIterableIfIterable(liveFragment);

      if (!!iterableFragment) {
        const items = renderIterableFragment(liveFragment, data, patch);

        return void insertLiveHtmlFragments(fragment, uuid, items.map(({output}) => output))
      }


      const node = document.createTextNode(String(liveFragment));
      insertLiveHtmlFragment(fragment, uuid, node);
    }
  );

  return fragment;
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
    const fragment = renderRancorTemplate(renderedTemplate, data, patch);

    return {
      output: fragment
    }
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

function renderIterableFragment({
  component,
  refiner,
  transformer,
  iterable
}: IterableFragment<any, any, any>, data: any, patch: (subTree: HTMLElement, insertionPoint: Node) => void) {
  /**
   * TODO the "refiner" function was to be used for dependency injection but may no longer be necessary
   */
  const refined = refiner ? refiner(data) : data;

  const list = iterable(refined);

  let index = 0;
  const iterator = list[Symbol.iterator]();
  const renderedComponents: {
    output: HTMLElement;
    graph?: ComponentGraph<any>;
}[] = [];
  let iterated: IteratorResult<any>;

  while (iterated = iterator.next()) {    
    const {
      value,
      done
    } = iterated;

    if (done) {
      break;
    }

    renderedComponents.push(
      render({
        component,
        data: transformer({iterated: { current: value, index }, data}),
        patch
      })
    )

    index++;
  }

  return renderedComponents;
}

const listenerMap = new Map<UUID, ListenerFragment["listeners"]>();

function renderListenerFragment(
  {
    element,
    listeners
  }: ListenerFragment,
  data: any,
  patch: (subTree: HTMLElement, insertionPoint: Node) => void
) {
  const htmlElement = typeof element === "string"
    ? parse(element) as any as HTMLElement
    : renderRancorTemplate(
      element,
      data,
      patch
    );
  
  for (let [event, listener] of Object.entries(listeners)) {
    htmlElement.id = v4();

    // TODO Realize this map on the real DOM in an update step
    listenerMap.set(htmlElement.id, listeners);
  }
}
