const toBeEqualDir = require("../toBeEqualDir");
const path = require("path");

describe("toBeEqualDir Tests", () => {
  test("Folder with same structure and file contents, should pass", () => {
    // ARRANGE
    const path1 = path.resolve(__dirname, "test-resources/base-folder");
    const path2 = path.resolve(__dirname, "test-resources/equals");

    // ACT
    const result = toBeEqualDir(path1, path2);

    // ASSERT
    expect(result.pass).toBe(true);
  });

  test("Different txt content, should not pass", () => {
    // ARRANGE
    const path1 = path.resolve(__dirname, "test-resources/base-folder");
    const path2 = path.resolve(__dirname, "test-resources/different-text-file");

    // ACT
    const result = toBeEqualDir(path1, path2);

    // ASSERT
    expect(result.pass).toBe(false);
    expect(result.message()).toMatch(/Different Content: \/file.txt/);
  });

  test("Different yaml content, should not pass", () => {
    // ARRANGE
    const path1 = path.resolve(__dirname, "test-resources/base-folder");
    const path2 = path.resolve(__dirname, "test-resources/different-yaml");

    // ACT
    const result = toBeEqualDir(path1, path2);

    // ASSERT
    expect(result.pass).toBe(false);
    expect(result.message()).toMatch(
      /Different Content: \/subfolder\/test.yml/
    );
  });

  test("Folder Missing, should not pass", () => {
    // ARRANGE
    const path1 = path.resolve(__dirname, "test-resources/base-folder");
    const path2 = path.resolve(__dirname, "test-resources/missing-folder");

    // ACT
    const result = toBeEqualDir(path1, path2);

    // ASSERT
    expect(result.pass).toBe(false);
    expect(result.message()).toMatch(
      /Folder '\/subfolder' expected but not present in result/
    );
  });

  test("Folder not expected in result, should not pass", () => {
    // ARRANGE
    const path1 = path.resolve(__dirname, "test-resources/base-folder");
    const path2 = path.resolve(__dirname, "test-resources/no-expected-folder");

    // ACT
    const result = toBeEqualDir(path1, path2);

    // ASSERT
    expect(result.pass).toBe(false);
    expect(result.message()).toMatch(
      /Folder '\/extra-folder' not expected to be in result/
    );
  });

  test("Missing file, should not pass", () => {
    // ARRANGE
    const path1 = path.resolve(__dirname, "test-resources/base-folder");
    const path2 = path.resolve(__dirname, "test-resources/missing-file");

    // ACT
    const result = toBeEqualDir(path1, path2);

    // ASSERT
    expect(result.pass).toBe(false);
    expect(result.message()).toMatch(
      /File '\/file.txt' expected but not present in result/
    );
  });

  test("Not expected file, should not pass", () => {
    // ARRANGE
    const path1 = path.resolve(__dirname, "test-resources/base-folder");
    const path2 = path.resolve(__dirname, "test-resources/extra-file");

    // ACT
    const result = toBeEqualDir(path1, path2);

    // ASSERT
    expect(result.pass).toBe(false);
    expect(result.message()).toMatch(
      /File '\/file2.txt' not expected to be in result/
    );
  });
});
