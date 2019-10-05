type RawHtml = string;

export function parse(rawHtml: RawHtml) {
  const parseNode = window.document.createElement("fragment");
  parseNode.innerHTML = rawHtml;
  return parseNode.childNodes;
}
