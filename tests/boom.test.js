const functionWithoutException = (num) => {
  throw new Error("errorr");
};

test("boom1", () => {
  expect(() => {
    functionWithoutException(0);
  }).toThrow("errorr");
});

test("boom1", () => {
  expect(() => {
    functionWithoutException(0);
  }).toThrow("divide by zero");
});
