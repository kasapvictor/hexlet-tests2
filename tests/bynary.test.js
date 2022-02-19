const length = 128;
const sortedNumbers = Array.from({ length }, (_, i) => i + 1);

const binarySearch = (target, numbers = []) => {
  let min = 0;
  let max = numbers.length - 1;

  while (min < max) {
    const middle = Math.floor((max + min) / 2);
    const guess = numbers[middle];

    if (guess === target) {
      return middle;
    }

    if (guess < target) {
      min = middle + 1;
    } else {
      max = middle - 1;
    }
  }

  return -1;
};

// TEST
test("Binary Search", () => {
  const actual1 = binarySearch(50, sortedNumbers);
  expect(actual1).toBe(49);
});
