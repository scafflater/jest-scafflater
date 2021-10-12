const toBeEqualDir = require("../toBeEqualDir");
const path = require("path");

describe("toBeEqualDir Tests", () => {
  test("Folder with same structure and file contents, should pass", () => {
    // ARRANGE
    const path1 = path.resolve(__dirname, "test-resources/folder-1");
    const path2 = path.resolve(__dirname, "test-resources/folder-1-copy");

    // ACT
    const result = toBeEqualDir(path1, path2);

    // ASSERT
    expect(result.pass).toBe(true);
  });

  // test("Folder with same structure but with files with different content, should not pass", () => {
  //   // ARRANGE
  //   const path1 = path.resolve(__dirname, "test-resources/folder-1");
  //   const path2 = path.resolve(__dirname, "test-resources/folder-2");

  //   // ACT
  //   const result = toBeEqualDir(path1, path2);

  //   // ASSERT
  //   expect(result.pass).toBe(true);
  // });
});
