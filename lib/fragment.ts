import { Component, RawHtml } from "./component";
import { rancorTag } from "./provide";
import { RancorTemplate } from "./tag";

export type ChildFragment<T, V = T, W = V> = {
  refiner?: (t: T) => V,
  transformer?: (v: V) => W,
  component: Component<W>,
  [rancorTag]: "child"
}

export type IterableFragment<T, X, W, V = T> = {
  refiner?: (t: T) => V,
  iterable: (v: V) => Iterable<X>,
  transformer: ( arg: {iterated: { current: X, index: number }, data: V} ) => W,
  component: Component<X>
}

export function IterableFragment<T, X, W, V = T>(
  {
    refiner,
    transformer,
    component,
    iterable
  }: {
    refiner?: (t: T) => V,
    iterable: (v: V) => Iterable<X>,
    transformer: ( arg: {iterated: { current: X, index: number }, data: V} ) => W,
    component: Component<X>
  }): IterableFragment<T, X, W, V> {
    const val = {
      refiner,
      transformer,
      component,
      iterable,
      [rancorTag]: "iterable"
    };

    return val as IterableFragment<T, X, W, V>;
}

export const i = IterableFragment;

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
      [rancorTag]: "child"
    };

    return val as typeof val extends ChildFragment<T, infer V, infer W> ? ChildFragment<T, V, W> : never;
}

export type ListenerFragment = {
  element: RancorTemplate | RawHtml,
  listeners: {
    [event: string]: (e: Event) => void // TODO instead emit a traceable mutation event?
  }
}

export const c = ChildFragment;


export function getChildIfChild(val: any): undefined | ChildFragment<any> {
  if (val === null || val === undefined) {
    return undefined;
  } else if (val[rancorTag] === "child") {
    return val as ChildFragment<any, any, any>;
  } else {
    return undefined;
  }
}

export function getIterableIfIterable(val: any): undefined | IterableFragment<any, any, any> {
  if (val === null || val === undefined) {
    return undefined;
  } else if (val[rancorTag] === "iterable") {
    return val as IterableFragment<any, any, any>;
  } else {
    return undefined;
  }
}
