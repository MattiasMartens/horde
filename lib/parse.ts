type RawHtml = string;

export function parse(rawHtml: RawHtml) {
  const parseNode = document.createElement("fragment");
  parseNode.innerHTML = rawHtml;
  return parseNode;
}
