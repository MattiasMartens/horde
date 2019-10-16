import {
  Flowpoint
} from "../imply";
import { RancorTemplate } from "./tag";

export type RawHtml = string;

export type Component<W> = (w: Flowpoint<W>) => HTMLElement | RancorTemplate;
