function getTag<T, V>(fn: (v: T, i: number, vs: T[]) => V) {
  return function(strings: TemplateStringsArray, ...values: T[]) {
    const components = [];
    strings.forEach((str, i) => {
      components.push(str);
      if (i in values) {
        components.push(fn(values[i], i, values));
      }
    });
    return components.join("");
  };
}


export function swarm<T>(strings: TemplateStringsArray, ...components: (keyof T)[]) {
  return {
    strings: Array.from(strings),
    components
  };
}

export type Swarm<T> = (strings: TemplateStringsArray, ...values: (keyof T)[]) => {
  strings: string[],
  components: (keyof T)[]
};