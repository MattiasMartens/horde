
type RancorTemplate = {
  rawFragments: RawHtml[],
  liveFragments: any[],
  _tag: "horde"
}

function rancor(strings: TemplateStringsArray, ...values: any[]): RancorTemplate {
  return {
    rawFragments: Array.from(strings),
    liveFragments: values,
    _tag: "horde"
  }
}

type RawHtml = string;

type Component<W> = (w: W) => RawHtml | RancorTemplate | (RawHtml | RancorTemplate)[];

type ArgChildFragment<T, V, W> = {
  refiner: (t: T) => V,
  transformer: (v: V) => W,
  component: Component<W>
}

type ChildFragment<T, V, W> = {
  refiner: (t: T) => V,
  transformer: (v: V) => W,
  component: Component<W>,
  _tag: "child"
}

function ChildFragment<T, V, W>(
  _data: T,
  {
    refiner,
    transformer,
    component
  }: ArgChildFragment<T, V, W>): ChildFragment<T, V, W> {
    return {
      refiner,
      transformer,
      component,
      _tag: "child"
    }
}

const c = ChildFragment;

const myComponent: Component<{a: number, b: string, c: Date}> = function myComponent(data) {
  return rancor`<p>${c(data, {
    refiner: ({a, b}) => ({a, b}),
    transformer: ({a, b}) => ({d: a * 2, b}),
    component: myComponent2
  })}</p>` 
}

function myComponent2({d, b}: {d: number, b: string}) {
  return `<span>${b}:</span>${d}`
}

function getChildIfChild(val: any): undefined | ChildFragment<any, any, any> {
  if (val === null || val === undefined) {
    return undefined;
  } else if (val["_tag"] === "child") {
    return val as ChildFragment<any, any, any>;
  } else {
    return undefined;
  }
}

function getHordeIfHorde(val: any): undefined | RancorTemplate {
  if (val === null || val === undefined) {
    return undefined;
  } else if (val["_tag"] === "child") {
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
    const refined = refiner(data);
    const transformed = transformer(refined);
    return render(component, transformed);
  } else {
    return fragment;
  }
}

function renderTemplate(template: RawHtml | RancorTemplate, data: any): string {
  const asHorde = getHordeIfHorde(template);
  if (!!asHorde) {
    const {
      liveFragments,
      rawFragments
    } = asHorde;

    return rawFragments.map((val, i) => val + (i in liveFragments
      ? renderFragment(liveFragments[i], data)
      : ""
    )).join("")
  } else {
    return template as string;
  }
}

function render<T>(component: Component<T>, data: T): RawHtml {
  const renderedTemplate = component(data);

  if (Array.isArray(renderedTemplate)) {
    return renderedTemplate.map(
      template => renderTemplate(
        template,
        data
      )
    ).join("")
  }

  return Array.isArray(renderedTemplate)
    ? renderedTemplate.map(
      template => renderTemplate(
        template,
        data
      )
    ).join("")
    : renderTemplate(renderedTemplate, data);
}

function makeRenderer<W>(rootComponent: Component<W>, data: W): () => RawHtml {
  /** TODO This is where we hook dependencies for change tracking, such that subsequent executions of the returned function try to re-render only what has changed */
  return () => {
    return render(
      rootComponent,
      data
    );
  }
}

console.log(makeRenderer(myComponent, {
  a: 7,
  b: "!",
  c: new Date(10000000)
})())