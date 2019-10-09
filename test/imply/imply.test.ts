import {
  identify,
  imply,
  plucked
} from "../../imply";
import { assert, assertEqual } from "../../types/utils";

test("Identify should create a wrapper for some data", () => {
  const numberF = identify(2);
  assert(numberF.i === 2); 
});

test("Imply should compute a value using some flowpoints", () => {
  const numberF = identify(2);
  const otherNumberF = identify(1);
  const sumF = imply(
    [
      numberF,
      otherNumberF
    ],
    (number1, number2) => number1 + number2
  )

  assertEqual(sumF.i, 3);
})

test("Imply should dynamically update a value when its dependent flowpoints change", () => {
  const numberF = identify(2);
  const otherNumberF = identify(1);
  const sumF = imply(
    [
      numberF,
      otherNumberF
    ],
    (number1, number2) => number1 + number2
  )

  numberF.i = 6;

  assertEqual(sumF.i, 7);
})

test("Flowpoints should compose", () => {
  const numberAF = identify(2);
  const numberBF = identify(7);
  const productF = imply([numberAF, numberBF], (a, b) => a * b);
  const sumF = imply([numberAF, numberBF], (a, b) => a + b);
  const compositeF = imply([productF, sumF], (a, b) => a - b);

  assertEqual(compositeF.i, 5);
  assertEqual(productF.i, 14);
  assertEqual(sumF.i, 9);
  numberBF.i = 3;
  assertEqual(compositeF.i, 1);
  assertEqual(productF.i, 6);
  assertEqual(sumF.i, 5);
});

test("Mutating flowpoint with m() should trigger recomputation", () => {
  const arrayF = identify([1,2,3]);
  const sumF = imply(arrayF, arr => arr.reduce((acc, next) => acc + next, 0));

  assertEqual(sumF.i, 6);
  arrayF.m(arr => arr[0] = 0);
  assertEqual(sumF.i, 5);
});

test("Plucked value should be recomputed when target object is mutated at that key", () => {
  const objF = identify({ a: 12 });
  const pluckedF = plucked(objF, "a");
  assertEqual(pluckedF.i, 12);
  objF.m(obj => obj.a = 9);
  assertEqual(pluckedF.i, 9);
});
