import {
  subscribable, Subscribable
} from "./subscribe"

export type Implied<V> = {
  _i: V,
  i: V,
  _kind: "imply",
  subscribable: Subscribable<V>
  recalculate: () => V
}

export type Identified<V> = {
  i: V,
  _kind: "identify",
  _i: V,
  subscribable: Subscribable<V>,
  mutate: (fn: (oldValue: V) => void) => void,
}

export type Flowpoint<V> = Implied<V> | Identified<V>;


export function imply<V, T>(
  dependencies: Flowpoint<any>[] | Flowpoint<T>,
  transformer: (...arg: any) => V
 ): Implied<V> {
  const dependenciesAsArr = "_kind" in dependencies ? [dependencies] : dependencies;

  const flowpoint = {
    subscribable: subscribable(),
  } as any as Implied<V>;

  const recalculate = () => {
    flowpoint.i = transformer(...dependenciesAsArr.map(({i}) => i))

    flowpoint.subscribable.emit(flowpoint.i)
    return flowpoint.i;
  }
  dependenciesAsArr.forEach(dependency => dependency.subscribable.subscribe(recalculate))

  return Object.assign(flowpoint, {
    _i: recalculate(),
    get i() {
      return this._i
    },
    set i(val: any) {
      throw new Error("Cannot assign a value to an implied flowpoint");
    },
    _kind: "imply" as "imply",
    recalculate
  });
}

export function identify<V>(value: V): Identified<V> {
  return {
    _kind: "identify",
    _i: value,
    set i(this: Identified<V>, val: V) {
      this._i = val;
      this.subscribable.emit(val)
    },
    get i() {
      return this._i;
    },
    subscribable: subscribable<V>(),
    mutate(fn) {
      fn(this.i);
      this.i = this.i;
    }
  }
}
