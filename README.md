Jest Matchers to test generated templates.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
  - [Usage](#usage)
    - [With TypeScript](#with-typescript)
  - [Custom matchers](#custom-matchers)
    - [`toBeEqualDir`](#tobeequaldir)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

This module is distributed via npm which is bundled with node and should be installed as one of your project's devDependencies:

```
npm install --save-dev @scafflater/jest-scafflater
```

or, for installation with yarn package manager.

```
yarn add --dev @scafflater/jest-scafflater
```

## Usage

Import `@scafflater/jest-scafflater` once (for instance in your [tests setup
file][]) and you're good to go:

[tests setup file]: https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array

```javascript
// In your own jest-setup.js (or any other name)
import "@scafflater/jest-scafflater";

// In jest.config.js add (if you haven't already)
setupFilesAfterEnv: ["<rootDir>/jest-setup.js"];
```

### With TypeScript

If you're using TypeScript, make sure your setup file is a `.ts` and not a `.js`
to include the necessary types.

You will also need to include your setup file in your `tsconfig.json` if you
haven't already:

```json
  // In tsconfig.json
  "include": [
    ...
    "./jest-setup.ts"
  ],
```

## Custom matchers

### `toBeEqualDir`

```javascript
toBeEqualDir();
```

Compare two directory structures, including file contents.
