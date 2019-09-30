
export type RancorTemplate = {
  rawFragments: RawHtml[],
  liveFragments: any[],
  _tag: "rancor"
}

export function rancor(strings: TemplateStringsArray, ...values: any[]): RancorTemplate {
  return {
    rawFragments: Array.from(strings),
    liveFragments: values,
    _tag: "rancor"
  }
}

export const r = rancor;

export type RawHtml = string;

export type Component<W> = (w: W) => RawHtml | RancorTemplate | (RawHtml | RancorTemplate)[];

export type ChildFragment<T, V = T, W = V> = {
  refiner?: (t: T) => V,
  transformer?: (v: V) => W,
  component: Component<W>,
  _tag: "child"
}

export function ChildFragment<T, V = T, W = V>(
  {
    refiner,
    transformer,
    component
  }: {
    refiner?: (t: T) => V,
    transformer?: (v: V) => W,
    component: Component<W>
  }): ChildFragment<T, V, W> {
    const val = {
      refiner,
      transformer,
      component,
      _tag: "child"
    };

    return val as typeof val extends ChildFragment<T, infer V, infer W> ? ChildFragment<T, V, W> : never;
}

export type ListenerFragment = {
  element: RancorTemplate | RawHtml,
  listeners: {
    [event: string]: (e: Event) => void // TODO instead emit a traceable mutation event?
  }
}

export function identity<T>(t: T) {
  return t;
}

export const c = ChildFragment;

function getChildIfChild(val: any): undefined | ChildFragment<any, any, any> {
  if (val === null || val === undefined) {
    return undefined;
  } else if (val["_tag"] === "child") {
    return val as ChildFragment<any, any, any>;
  } else {
    return undefined;
  }
}

function getRancorIfRancor(val: any): undefined | RancorTemplate {
  if (val === null || val === undefined) {
    return undefined;
  } else if (val["_tag"] === "rancor") {
    return val as RancorTemplate;
  } else {
    return undefined;
  }
}

function renderFragment(fragment: any | ChildFragment<any, any, any>, data: any) {
  const asChild = getChildIfChild(fragment);
  if (!!asChild) {
    const {
      component,
      refiner,
      transformer
    } = asChild;

    /**
     * TODO this step is used for dependency detection so this function needs a hook to register the dependency
     */
    const refined = refiner ? refiner(data) : data;
    const transformed = transformer ? transformer(refined) : data;
    return render(component, transformed);
  } else {
    return String(fragment);
  }
}

function renderTemplate(template: RawHtml | RancorTemplate | ChildFragment<any>, data: any): string {
  const asRancor = getRancorIfRancor(template);
  if (!!asRancor) {
    const {
      liveFragments,
      rawFragments
    } = asRancor;

    return rawFragments.map((val, i) => val + (i in liveFragments
      ? renderFragment(liveFragments[i], data)
      : ""
    )).join("")
  }

  return renderFragment(template, data);
}

function render<T>(component: Component<T>, data: T): RawHtml {
  const renderedTemplate = component(data);

  return Array.isArray(renderedTemplate)
    ? renderedTemplate.map(
      template => renderTemplate(
        template,
        data
      )
    ).join("")
    : renderTemplate(renderedTemplate, data);
}

type Mutators<W> = {
  [key: string]: (w: W) => W
};

function Mutators<W>(mutators: {
  [key: string]: (w: W) => W
}) {
  return mutators;
}

export function makeRenderer<W>(rootComponent: Component<W>, data: W, mutators: Mutators<W>): () => RawHtml {
  /** TODO This is where we hook dependencies for change tracking, such that subsequent executions of the returned function try to re-render only what has changed */
  return () => {
    return render(
      rootComponent,
      data
    );
  }
}
