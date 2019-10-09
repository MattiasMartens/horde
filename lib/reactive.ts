import {
  reconcileFirst,
  reconcileEntryInto,
  reconcileAppend
} from "big-m";

// reactiveValue: dependencies --> result of calculation
// fragment: reactiveValue --> DOM information (elements or attributes)
// mutator: update value, trigger recalculations of dependencies, trigger re-evaluation of fragments
// NOTE: when a fragment re-evaluates, it might produce different sub-fragments with new dependencies; therefore re-evaluation must also be able to update reactive dependency registrations

type ReactiveValue<T extends object, V> = (t: T) => V;

type Key = string;
type DependencyRegistry = WeakMap<object, Map<Key, ReactiveValue<object, any>[]>>;

export function reactive<T extends object, V, R>(dependencyRegistry: DependencyRegistry, t: T, refiner: (t: T) => R, transformer: (r: R) => V): V {
  const refined = refiner(t);
  const keyMap = reconcileEntryInto(
    dependencyRegistry as Map<object, Map<Key, ReactiveValue<object, any>[]>>,
    t,
    new Map<Key, ReactiveValue<object, any>[]>(),
    reconcileFirst()
  )

  const computer = () => transformer(refiner(t));

  for (let key in refined) {
    reconcileEntryInto(
      keyMap,
      key,
      computer,
      reconcileAppend()
    )
  }

  return computer();
}

export function mutate<T, K, V>() {

}
