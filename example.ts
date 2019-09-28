import {swarm} from "./tag";
import {Component, render} from "./component";

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

const testComponent: Component<TestData> = ({
  root: swarm<TestData>`<p>My name is ${"name"} and my ideas are these:</p><ul>${"ideas"}</ul>`,
  renderers: {
    name: (name: string) => `<strong>${name}</strong>`,
    ideas: (arr) => arr.map(() => ideaComponent)
  }
});

const ideaComponent: Component<TestData["ideas"][0]> = {
  root: swarm<TestData["ideas"][0]>`<li>${"name"}<br />${"doYouLikeMyIdea"}</li>`,
  renderers: {
    name: (name) => name,
    doYouLikeMyIdea: (doYouLikeMyIdea)
  }
}

console.log(render(testComponent, testData));