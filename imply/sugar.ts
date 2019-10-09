import { Flowpoint, imply } from "./core";

export function plucked<K extends keyof T, T>(flowpoint: Flowpoint<T>, key: K) {
  return imply(
    [
      flowpoint
    ],
    i => i[key] as T[K]
  )
}
