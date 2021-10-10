const fs = require("fs-extra");
const dircompare = require("dir-compare");
const path = require("path");
const prettier = require("prettier");
const utils = require("jest-matcher-utils");

const EXPECTED_LABEL = "Expected";
const RECEIVED_LABEL = "Received";

const loadFormattedContent = (filePath) => {
  return prettier.format(fs.readFileSync(filePath, "utf-8"), {
    filepath: filePath,
  });
};

const compareFiles = (diff) => {
  const content1 = loadFormattedContent(path.resolve(diff.path1, diff.name1));
  const content2 = loadFormattedContent(path.resolve(diff.path2, diff.name2));

  if (Object.is(content1, content2)) {
    return {
      message: () => "",
      pass: true,
    };
  }

  const stringDiff = utils.printDiffOrStringify(
    content2,
    content1,
    EXPECTED_LABEL,
    RECEIVED_LABEL,
    true
  );

  return {
    message: () => `Different Content: ${path.join(
      diff.relativePath,
      diff.name1
    )}\n\n${stringDiff}
    `,
    pass: true,
  };
};

const dirCompareOptions = {
  compareSize: false,
  compareContent: true,
  compareFileAsync:
    dircompare.fileCompareHandlers.lineBasedFileCompare.compareAsync,
  ignoreLineEnding: true, // Ignore crlf/lf line ending differences
  ignoreWhiteSpaces: true, // Ignore white spaces at the beginning and ending of a line (similar to 'diff -b')
  ignoreAllWhiteSpaces: true, // Ignore all white space differences (similar to 'diff -w')
  ignoreEmptyLines: true, // Ignores differences caused by empty lines (similar to 'diff -B')
  excludeFilter: ".git,node_modules,.scafflater,scafflater.jsonc", //  exclude git and node modules directories
};

/**
 * Matcher to compare file and folder contents
 *
 * @param {string} received Path of the directory to compare
 * @param {string} expected Path of the directory with the expected content
 * @returns {object} Jest Matcher object
 */
const toBeEqualDir = (received, expected) => {
  // Synchronous
  const res = dircompare.compareSync(received, expected, dirCompareOptions);
  const diff = res.diffSet?.find((d) => d.state !== "equal");

  if (!diff) {
    return {
      message: () => "",
      pass: true,
    };
  }

  let message = JSON.stringify(diff, null, 2);
  if (diff.type1 === "directory" && diff.type2 === "missing") {
    message = `Directory '${diff.name1}' not expected to be in result`;
  }
  if (diff.type1 === "missing" && diff.type2 === "directory") {
    message = `Directory '${diff.name2}' expected but not present in result`;
  }
  if (diff.type1 === "file" && diff.type2 === "missing") {
    message = `File '${diff.name1}' not expected to be in result`;
  }
  if (diff.type1 === "missing" && diff.type2 === "file") {
    message = `File '${diff.name2}' expected but not present in result`;
  }
  if (
    diff.type1 === "file" &&
    diff.type2 === "file" &&
    diff.reason === "different-content"
  ) {
    return compareFiles(diff);
  }

  return {
    message: () => message,
    pass: false,
  };
};

module.exports = toBeEqualDir;
