# Part 3 - (d) Validation and ESLint

## Validation with Mongoose

A smarter way of validating data stored in the database is to use the `validation` function available in Mongoose, rather than defining the constraint in the route handler itself. The validation rules are specified in the schema.

There are a number of useful validators:

 - `minLength`, which specifies the minimum length of, e.g. a string
 - `required`, which specifies that the field is required

Custom validators can also be built using the following syntax, with an optional error message that can be passed: 

```javascript
const userSchema = new Schema({
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true
  }
});
```

If data passed is rejected by the validator, it will throw an exception which can be handled by the error handler middleware (using `.catch(error => next(error))`). These types of errors can be accessed in our custom error handler by specifying `if (error.name === 'ValidationError')`.

## Promise chaining

Promise chaining can be used to conduct asynchronous operations that have to be done in sequence. It uses the `.then()` method to pass a promise, meaning the downstream code is only executed when the promise has been fulfilled. 

## Validation for duplicates

We can use `mongoose-unique-validator` to build in pre-save validation for unique fields within a Mongoose schema (e.g. `name` cannot be the same as an entry already in the database). 

## Lint

Lint is a tool that detects and flags errors in programming languages, including stylistic errors. Linters perform static analysis of the source code (i.e. without actually compiling the program). 

ESLint is used for static analysis in JavaScript.

**Installation**
```
npm install eslint --save-dev
```

**Initial configuration**
```
node_modules/.bin/eslint --init
```

After answering the questions, this creates a linting file that is saved in `\node_modules\.bin\eslint`. The following can be run to start linting: `node_modules/.bin/eslint index.js`. Or alternatively, the following can be added to `package.json`, in combination with a `eslintignore` file to exclude checking of certain files (e.g. the build directory).

A better alternative to running `eslint` in the command line is to configure an `eslint-plugin` to the editor so that it runs continuously. The settings can be configured by editing the `.eslintrc.js ` file, under `rules`. Rules can be disabled by setting their value to `0`.