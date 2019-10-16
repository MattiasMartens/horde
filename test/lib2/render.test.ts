import { render } from "../../lib2/render"
import { assertEqual } from "../../types/utils";
import { identify, imply } from "../../imply";

test("Should be able to render simple, static HTML", () => {
  const {
    i: htmlElements
  } = render(`<p>I am a test paragraph</p>`)

  assertEqual((htmlElements[0] as HTMLElement).textContent, "I am a test paragraph")
});

test("Should be able to render HTML with dynamic content based on flowpoints", done => {
  const mutableNumber = identify(2)

  const flowpoint = render(
    imply(
      mutableNumber,
      n => `<p>I am the number ${n}</p>`
    )
  )

  const { i: htmlElements } = flowpoint

  assertEqual((htmlElements[0] as HTMLElement).textContent, "I am the number 2")

  flowpoint.subscribable.subscribe(htmlElements2 => {
    assertEqual((htmlElements2[0] as HTMLElement).textContent, "I am the number 3")
    done()
  })

  mutableNumber.i = 3
})

test("Should be able to render embedded templates", done => {
  const mutableNumber = identify(2)

  const flowpoint = render(
    imply(
      mutableNumber,
      n => `<p>I am the number ${n}</p>`
    )
  )

  const { i: htmlElements } = flowpoint

  assertEqual((htmlElements[0] as HTMLElement).textContent, "I am the number 2")

  flowpoint.subscribable.subscribe(htmlElements2 => {
    assertEqual((htmlElements2[0] as HTMLElement).textContent, "I am the number 3")
    done()
  })

  mutableNumber.i = 3
})


