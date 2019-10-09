export type Implied<V> = {
  _i: V,
  i: V,
  _kind: "imply",
  recalculate: () => V,
  l: ((newValue: V) => void)[]
}

export type Identified<V> = {
  i: V,
  _kind: "identify",
  _i: V,
  l: ((newValue: V) => void)[],
  m: (fn: (oldValue: V) => void) => void,
}

export type Flowpoint<V> = Implied<V> | Identified<V>;


export function imply<V>(
  dependencies: Flowpoint<any>[],
  transformer: (...arg: any) => V
 ): Implied<V> {
  const flowpoint = {
    l: []
  } as any as Implied<V>;

  const recalculate = () => {
    flowpoint.i = transformer(...dependencies.map(({i}) => i));

    flowpoint.l.forEach(fn => fn(flowpoint.i));
    return flowpoint.i;
  }
  dependencies.forEach(dependency => dependency.l.push(recalculate))

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
      this.l.forEach(fn => fn(val));
    },
    get i() {
      return this._i;
    },
    l: [],
    m(fn) {
      fn(this.i);
      this.i = this.i;
    }
  }
}
