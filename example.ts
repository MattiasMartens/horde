import {Component, makeRenderer, rancor, r, c, identity} from "./component";

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
  ],
  inc: () => testData.ticker++
}

testData.inc();

type TestData = typeof testData;

const testComponent: Component<TestData> = ({name, ticker}: TestData) => r`<p>My name is ${name} #${ticker}</p><ul>${c({
  refiner: ({ideas}: TestData) => ({ideas}),
  component: ({ideas}) => ideas.map(
    ({name}) => r`<li>${name}</li>`
  )
})}</ul>`;

makeRenderer(testComponent, testData, console.log);