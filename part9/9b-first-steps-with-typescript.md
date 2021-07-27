# Part 9 - (b) First steps with TypeScript

## Setting things up

TypeScript needs to first be compiled into executable JavaScript code, which means in most production environments there needs to be a "build" step. We can use the npm package **ts-node** to compile and execute TypeScript without a seperate compilation step.

**Installation**
```
// Global installation
npm install -g ts-node typescript

// Local installation
npm install --save-dev ts-node typescript
```

**package.json**
```javascript
{
  // ..
  "scripts": {
    "ts-node": "ts-node"
  },
  // ..
}
```

**Executing**
```
npm run ts-node -- file.ts
```

The coding style for TypeScript differs from the rest of the course by using semicolons, to conform to the coding style adapted by those contributing to the existing codebase.

## Creating own types

We can create a function that takes two numbers and an operation, either `multiply`, `add` or `divide`:

 - The `type` keyword is used to define a new type alias called `Operation` which takes one of three possible values.
 - The `|` operator specifies that the function can return a value of either `number` (if `a` and `b` are valid and `b` is not equal to 0) or `string` (if `b === 0`)

```javascript
type Operation = 'multiply' | 'add' | 'divide';

const calculator = (a: number, b: number, op : Operation): number | string => {
  if (op === 'multiply') {
    return a * b;
  } else if (op === 'add') {
    return a + b;
  } else if (op === 'divide') {
    if (b === 0) return 'can\'t divide by 0!';
    return a / b;
  }
}
```

However this is a bad example of function design. The function should not be allowed to return a `string` at all. If the user attempts to divide by 0, an error should be thrown and handled where the function was called.

A better version of the code uses the `switch` statement in place of the `if-else` statements and handles errors appropriately without requiring a return type of `string`.

```javascript
type Operation = 'multiply' | 'add' | 'divide';

type Result = number;

const calculator = (a: number, b: number, op : Operation) : Result => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if( b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
}

try {
  console.log(calculator(1, 5 , 'divide'))
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}
```

## @types/{npm_package}

TypeScripts expects all globally used code to be typed, and the community has created typed versions of most dependencies for commonly used `npm` packages. These are filed under packages with the `@types/` prefix, e.g. `@types/lodash`, `@types/mongoose` etc.

Typings are only used before compilation so they are only needed in `devDependencies` and not in the production build.

For example:
```
npm install --save-dev @types/node
```

## Improving the project

We can add new scripts to `package.json` to run specific files, e.g. `"multiply": "ts-node multiplier.ts"`.

Improved version of `multiplier.ts` defines the shape of the object being provided as parameter, and adds error handling:

 - The `interface` keyword is used to define the shape that an object should have
 - The parameter `args` is specified to be an `array` of type `string`
 - Errors are logged to the console using `try`-`catch` statement

```javascript
interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText,  a * b);
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
```

## More about tsconfig

`tsconfig.json` contains configurations for how strict the TypeScript code should be inspected.

## Importing packages

Importing packages are a bit different in TypeScript as they depend on the export method used in the imported package: 

 - In most cases, the `import ... from '...'` syntax is used
 - If that doesn't work, try using a combined method `import ... = require('...')`

In TypeScript (as in ES6 JavaScript):

 - modules are executed within their own scope, meaning variables, functions and classes declared in a module are not visible outside the modules unless explicitly exported using one of the `export` forms
 - to access these variables, functions, classes from a different module, they have to be imported using one of the `import` forms
 - any declaration (e.g. variables, functions, type aliases, interfaces) can be exported by adding the `export` keyword in front and adding `import { ... } from ./...` to the importing module
 - declarations can also be exported with a different name by stating `export { ... as ... };` in the exporting module
 - importing can be done for the entire module and assigned to a single variable, by stating `import * as ... from "./..."`
 - importing types can be done with the `import` key word or explicitly with `import type`, which guarantees removal from JavaScript
 - each module can optionally export a `default` export marked by `default`. This is limited to one export per module.

When exporting a module using `export =` syntax, it is necessary to also use TypeScript-specific syntax `import module = require("module")` to import the module.

## Adding express to the mix

**Installation**
```
npm install express
npm install --save-dev @types/express
```

**index.ts**
```javascript
import express from 'express';
const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

All front-end code will use the `import` syntax to import modules.

The `app.get()` method takes two parameters as usual, but `req` is never used. To avoid the unused variable error (which we have configured to be shown in `tsconfig.json`), we can prefix it with an underscore to inform the compiler that it does not need to be used.

To host an auto-reloading development environment, we can install `ts-node-dev` and add it to `scripts` under `package.json`.

**Installation**
```
npm install --save-dev ts-node-dev
```

**package.json**
```javascript
{
  // ...
  "scripts": {
      // ...
      "dev": "ts-node-dev index.ts",
  },
  // ...
}
```

## The horrors of `any`

In TypeScript, every untyped variable whose type cannot be inferred, becomes implicitly `any` typed. Things can also be explicitly typed `any`. Implicit `any` typings are usually considered problematic as it is often due to the coder forgetting to asing types.

The `noImplictAny` option exists for this reason and should be kept on at all times.

However, some packages, such as the `query` field of an express `Request` object, is explicitly typed `any`. This is the same of the `request.body` field used to post data to an app. We can use `eslint` and its Typescript extensions to disallow explict `any`. 

**Installation**
```
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

**.eslintrc** 
```javascript
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-explicit-any": 2
  }
}
```

**package.json**
```javascript
{
  // ...
  "scripts": {
      "lint": "eslint --ext .ts ."
      //  ...
  },
  // ...
}
```