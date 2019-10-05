import { flatMap } from "../structure";

function removeAllChildren(domTree: Element) {
  let firstChild: ChildNode | null;
  while (firstChild = domTree.firstChild) {
    domTree.removeChild(firstChild);
  }
}

export function mount(domTree: HTMLElement, selector: string) {
  const mountPoint = document.querySelector(selector);
  if (mountPoint) {
    removeAllChildren(mountPoint);
    mountPoint.appendChild(domTree);
  } else {
    throw new Error(`Element not found with selector ${selector}`);
  }
}

