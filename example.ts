import {Component, makeRenderer, rancor, r, c, identity} from "./component";

const testData = {
  name: "Mattias Martens",
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

type TestData = typeof testData;

const testComponent: Component<TestData> = ({name}: TestData) => r`<p>My name is ${name}</p><ul>${c({
  refiner: ({ideas}: TestData) => ({ideas}),
  transformer: identity,
  component: ({ideas}) => ideas.map(
    ({name}) => r`<li>${name}</li>`
  )
})}</ul>`;

console.log(makeRenderer(testComponent, testData)());