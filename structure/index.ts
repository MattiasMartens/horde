export function flatMap<T, V>(
  arr: T[],
  fn: (value: T, index: number) => V | V[]
): V[] {
  const out: V[] = [];

  let index = 0;
  for (let val of arr) {
    const value = fn(val, index);

    if (Array.isArray(value)) {
      value.forEach(v => out.push(v));
    } else {
      out.push(value);
    }

    index++;
  }

  return out;
}
