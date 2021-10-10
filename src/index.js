const matchers = require("./matchers");

expect.extend({
  toBeEqualDir(received, expected) {
    return matchers.toBeEqualDir(received, expected);
  },
});
