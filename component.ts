import {Swarm} from "./tag";

export type Component<T> = {
  root: ReturnType<Swarm<T>>,
  renderers?: {
    [P in keyof T]?: (v: T[P]) => string | Component<T[P]> | (T[P] extends (infer Q)[] ? (string | Component<Q>)[] : never)
  }
}

type StringOnlyRecord<V> = { [key: string]: V };

type Renderable<T extends StringOnlyRecord<any>, P extends keyof T, Q extends string, Z extends keyof T, W extends Z[]> = {
  _tag: "unaryRender",
  value: P
} | {
  _tag: "directRender",
  value: P,
  renderer: (v: T[P]) => string
} | {
  _tag: "multipleRender",
  value: Q,
  dependencies: W,
  renderer: (v: { [P in (W extends (infer Z2)[] ? Z2 : never)]: T[P] }) => string
}

export function unaryRender<T extends StringOnlyRecord<any>, P extends keyof T>(key: P): Renderable<T, keyof T, any, any, any> {
  return {
    _tag: "unaryRender",
    value: key
  }
}

export function directRender<T extends StringOnlyRecord<any>, P extends keyof T>(key: P, renderer: (v: T[P]) => string) {
  return {
    _tag: "directRender",
    value: key,
    renderer
  }
}

export function r<T extends StringOnlyRecord<any>, P extends keyof T>(key: P, renderer?: (v: T[P]) => string) {
  return renderer ? directRender(key, renderer) : unaryRender(key);
}

export function multipleRender<T extends StringOnlyRecord<any>, P extends keyof T, >(key: P, renderer: (v: T[P]) => string) {
  return {
    _tag: "directRender",
    value: key,
    renderer
  }
}

export function render<T>(
  component: Component<T>,
  data: T
  ) {
  const {
    root,
    renderers
  } = component;

  const renderedArray: string[] = [];
  const {components, strings} = root;

  strings.forEach((str, index) => {
    renderedArray.push(str);
    if (index < components.length) {
      const componentName = components[index];
      const renderResult = renderers[componentName](data[componentName]);
      if (Array.isArray(renderResult)) {
        for (let index in renderResult) {
          const result = renderResult[index];
          renderedArray.push(
            typeof result === "string" ? result : render(
              result,
              data[componentName][index]
            )
          );
        }
      } else {
        renderedArray.push(
          typeof renderResult === "string" ? renderResult : render(
            renderResult,
            data[componentName]
          )
        );
      }
    }
  })

  return renderedArray.join("");
}