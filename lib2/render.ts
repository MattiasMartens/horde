import { parse } from "./parse";
import { Flowpoint, identify, imply } from "../imply";

export function render(template: string | NodeListOf<ChildNode> | Flowpoint<NodeListOf<ChildNode>> | Flowpoint<string>) {
  if (typeof template === "string") {
    return identify(parse(template))
  } else if ("_kind" in template) {
    if (typeof template.i === "string") {
      return imply(
        [template],
        str => parse(str)
      )
    } else {
      return template as Flowpoint<NodeListOf<ChildNode>>
    }
  } else {
    return identify(template)
  }
}

