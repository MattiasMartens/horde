import {Component, makeRenderer, c, Mutator, i, r } from "./lib";
import { mount } from "./lib/mount";


const testData = {
  name: "Mattias Martens",
  ticker: 0,
  ideas: [
    {
      name: "A bowling ball that shoots lasers",
      conceiveDate: new Date(new Date().valueOf() - 1000 * 1000 * 1000),
      isLikeable: false,
      doYouLikeMyIdea: null
    },
    {
      name: "A remake of Much Ado About Nothing where Benedick dies",
      conceiveDate: new Date(new Date().valueOf() - 8000 * 1000 * 1000),
      isLikeable: true,
      doYouLikeMyIdea: null
    }
  ]
}

const mutator = Mutator(testData, {
  tick: testData => {
    testData.ticker++;
    return testData;
  }
})

setInterval(mutator.tick, 4000);

type TestData = typeof testData;

const testComponent: Component<TestData> = ({name, ticker}: TestData) => r`<p>My name is ${name} #${ticker}</p><ul>${i({
  refiner: ({ideas}: TestData) => ({ideas}),
  iterable: ({ideas}) => ideas,
  transformer: ({iterated}) => iterated.current,
  component: ({name}) => r`<li>${name}</li>`
})}</ul>`;

const {
  domTree,
  cleanup
} = makeRenderer(testComponent, testData, console.log);

mount(domTree, "#app")