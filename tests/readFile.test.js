const read = (path) => {
  throw new Error("ENOENT: no such file or directory, open '/undefined'");
};

test("read1", () => {
  expect(() => {
    read("/etc");
  }).toThrow();
});

test("read2", () => {
  expect(() => {
    read("/undefined");
  }).toThrow("ENOENT: no such file or directory, open '/undefined'");
});

test("read3", () => {
  expect(() => {
    read("/etc");
  }).toThrow("EISDIR: illegal operation on a directory, read");
});
