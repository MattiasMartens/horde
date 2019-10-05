import { boot } from "../lib/boot";
import { rancor } from "../lib/tag";

import * as jsdom from "jsdom";
// @ts-ignore
global.window = new jsdom.JSDOM().window;
// @ts-ignore
global.document = window.document;
// @ts-ignore
global.HTMLElement = window.HTMLElement;

test("boot() should return an HTML element", () => {
  const {
    rootElements
  } = boot({}, rancor``);

  console.log(rootElements);
});