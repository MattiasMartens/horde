import { RancorTemplate, ParsedRancorTemplate } from "./tag";
import { Component } from "./component";

export function boot<T>(
  rootDataObject: T,
  template: RancorTemplate
): {
  rootElement: HTMLElement,
  shutdown: () => void,
  renderContext: {
    parseCache: Map<TemplateStringsArray, ParsedRancorTemplate>,
    componentToNodes: Map<Component<any>, NodeListOf<Node>>,
    componentToDependencies: Map<Component<any>, {
      object: Object,
      key: string
    }[]>
  }
} {
  

  return {
    rootElement: new HTMLElement(),
    shutdown: () => {},
    renderContext: {
      parseCache: new Map(),
      componentToNodes: new Map(),
      componentToDependencies: new Map()
    }
  }
}