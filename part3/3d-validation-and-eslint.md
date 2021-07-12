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
