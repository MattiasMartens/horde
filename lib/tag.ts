import {
  RawHtml
} from "./component";
import {
  rancorTag
} from "./provide";

export type RancorTemplate = {
  rawFragments: RawHtml[],
  liveFragments: any[],
  [rancorTag]: "rancor"
}

type UUID = string;

export type ParsedRancorTemplate = {
  nodes: NodeListOf<Node>,
  ribs: Map<UUID, any>,
  attributes: Map<UUID, {
    name: string,
    value: string
  }[]>,
  [rancorTag]: "parsedRancor"
}

export function rancor(strings: TemplateStringsArray, ...values: any[]): RancorTemplate {
  return {
    rawFragments: Array.from(strings),
    liveFragments: values,
    [rancorTag]: "rancor"
  }
}

function getRancorIfRancor(val: any): undefined | RancorTemplate {
  if (val === null || val === undefined) {
    return undefined;
  } else if (val[rancorTag] === "rancor") {
    return val as RancorTemplate;
  } else {
    return undefined;
  }
}

export const r = rancor;