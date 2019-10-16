import {
  JSDOM
} from "jsdom"

type RawHtml = string;

let isNodeEnvironment = !!global

export function parse(rawHtml: RawHtml) {
  if (isNodeEnvironment) {
    return JSDOM.fragment(rawHtml).childNodes
  } else {
    const parseNode = window.document.createElement("fragment");
    parseNode.innerHTML = rawHtml;
    return parseNode.childNodes;
  }
}
