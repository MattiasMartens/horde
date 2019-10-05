import { ParsedRancorTemplate, RancorTemplate } from "./tag";
import { v4 } from "uuid";
import { mapCollect } from "big-m";
import { parse } from "./parse";
import { rancorTag } from "./provide";

function asSkeletonDom({liveFragments, rawFragments}: RancorTemplate) {
  const uuids = liveFragments.map(() => v4());

  const skeletonString = rawFragments.map((str, i) => str + ((i in liveFragments) ? `<rib id="${uuids[i]}" />` : "")).join("");
  const fragment = parse(skeletonString);
  return {
    fragment,
    uuids
  };
}

function* zip<T1, T2>(arr1: Iterable<T1>, arr2: Iterable<T2>) {
  const i2 = arr2[Symbol.iterator]();
  for (let el1 of arr1) {
    const {value} = i2.next();

    yield [el1, value] as [T1, T2];
  }
}

export function parseRancorTemplate(rancorTemplate: RancorTemplate): ParsedRancorTemplate {
  const {liveFragments} = rancorTemplate;

  /**
    * TODO can we cache this so it is not executed on subsequent runs?
    */
  const {fragment, uuids} = asSkeletonDom(rancorTemplate);

  const ribs = mapCollect(
    zip(uuids, liveFragments)
  )

  return {
    nodes: fragment,
    ribs,
    [rancorTag]: "parsedRancor"
  }
}
