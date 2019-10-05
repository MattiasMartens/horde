import { RancorTemplate, ParsedRancorTemplate, rancor } from "./tag";
import { Component } from "./component";

export function boot<T>(
  rootDataObject: T,
  template: RancorTemplate
): {
  rootElements: NodeListOf<Node>,
  shutdown: () => void,
  renderContext: {
    parseCache: Map<TemplateStringsArray, ParsedRancorTemplate>,
    componentToNodes: Map<Component<any>, NodeListOf<Node>>,
    componentToDependencies: Map<Component<any>, {
      object: Object,
      key: string
    }[]>,
    dependencyToComponents: Map<Object, Map<string, Component<any>[]>>
  }
} {
  return {
    rootElements: document.createElement("div").childNodes,
    shutdown: () => {},
    renderContext: {
      parseCache: new Map(),
      componentToNodes: new Map(),
      componentToDependencies: new Map(),
      dependencyToComponents: new Map()
    }
  }
}
