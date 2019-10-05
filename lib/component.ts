import { RancorTemplate } from "./tag";

export type RawHtml = string;

export type Component<W> = (w: W) => HTMLElement | RancorTemplate;

export function identity<T>(t: T) {
  return t;
}
