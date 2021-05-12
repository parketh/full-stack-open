# Part 1 - (b) JavaScript

## Introduction

Browsers do not yet support all of JavaScript's latest features, and a lot of code run in browsers is *transpiled* (usually using [Babel](https://babeljs.io/)) to an older, more compatible version.

`Node.js` is a JavaScript runtime environment based on Google's Chrome V8 JavaScript engine and works practically everywhere. `Node.js` is run using the command:

```javascript
node name_of_file.js
```

## Variables

There are two ways to go about defining variables in JavaScript:
 - `const`: which is immutable
 - `let`: which is mutable, and the type of which can change
  
`var` used to be the only way to define variables in JavaScript but it is no longer used.

## Arrays

Arrays that are defined with `const` can nonetheless be modified because the variable always points to the same object, even if the contents of that object changes.

```javascript
const t = [1, -1, 3]

t.push(5)

console.log(t.length) // 4 is printed
console.log(t[1])     // -1 is printed

t.forEach(value => {
  console.log(value)  // numbers 1, -1, 3, 5 are printed, each to own line
})      
```

As shown in the example above:
 - `.push()` can be used to add items to an array
 - `.length` can be used to return the length of an array
 - `.forEach` can be used in combination with a custom function to iterate through the items of an array

### `.concat()`

When using React, techniques from functional programming are often used, which include a preference for immutable data structures. This means that `.concat()` is used in place of `.push()`. The method `concat` creates a new array with a new item rather than extending the old array.

### `.map()`

`.map()` creates a new array, which is generated from a provided function that is applied to each item. Amongst other things, `map` can be used to transform arrays into strings of HTML.

```javascript
const t = [1, 2, 3]
const tSquared = t.map(p => p * p)
// tSquared is now [1, 4, 9]
```


### Destructuring assignment

Individual items of an array can be assigned to variables with the help of the **destructuring assignment**. Here, the variables `first` and `second` are assigned values 1 and 2, while the remaining integers are assigned to `rest`.

```javascript
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t  
// Notice that unlike Python, the variable names are also wrapped in an array.

console.log(first, second)  // 1, 2 is printed
console.log(rest)          // [3, 4 ,5] is printed
```

## Objects

Objects can be defined using object literals (similar to JSON) but specific to JavaScript.

```javascript
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}

const object2 = {
  name: {
    first: 'Dan',
    last: 'Abramov',
  },
  grades: [2, 3, 5, 3],
  department: 'Stanford University',
}
```

The properties of an object can be referenced using dot notation, or by using brackets. Properties can also be added on the fly using either notation.

```javascript
console.log(object1.name)         // Arto Hellas is printed
const fieldName = 'age' 
console.log(object1[fieldName])    // 35 is printed

object1.address = 'Helsinki'
object1['seceret number'] = 12341
```

## Functions

### Defining functions 

Arrow function:
```javascript
const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}
```
Arrow function with single parameter:
```javascript
const sum = p => {
  console.log(p)
  return p * p
}
```

Arrow function with single expression:
```javascript
const sum = p => p * p
```

### Referencing functions 

Two ways to refer to a function: 
 1. **Function declaration**: giving the function a name and referring to it by name
 2. **Function expression**: defining the function without giving a name, but storing it inside a variable instead

**Function declaration**
```javascript
function product(a, b) {
  return a * b
}

const result = product(2, 6)
// result is now 12
```

**Function expression**
```javascript
const average = function(a, b) {
  return (a + b) / 2
}

const result = average(2, 5)
// result is now 3.5
```

## Object methods and "this"

*The contents of this chapter are not relevant to the course because we use a version of React called React Hooks, which removes the need for defining objects with methods.*

We can assign methods to an object by defining properties that are functions:

```javascript
const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
    greet: function() {
        console.log('hello, my name is ' + this.name)
    },
}

arto.greet()  // "hello, my name is Arto Hellas" gets printed
```

We can also call a method through a reference variable, rather than through the method itself. However, in some cases we can run into an issue where the method loses knowledge of what was the original `this`. In this course, we avoid this issue by using this-less JavaScript.

```javascript
arto.greet()       // "hello, my name is Arto Hellas" gets printed

const referenceToGreet = arto.greet
referenceToGreet() // prints "hello, my name is undefined"
```

The original `this` can be preserved by using a method called `bind`.

```javascript
setTimeout(arto.greet.bind(arto), 1000)
```

## Classes

There are no classes in JavaScript as it is not an object-oriented programming language (OOP). However, there are classes which simulate object-oriented classes.

The type of both classes and objects created from them are actually both `Object`, as JavaScript does not support a `Class` data type.

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 35)
adam.greet()

const janja = new Person('Janja Garnbret', 22)
janja.greet()
```

## JavaScript materials

 - Mozilla's [JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
 - Mozilla's [re-introduction to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
 - You Dont Know JS Yet book series, hosted on [Github](https://github.com/getify/You-Dont-Know-JS)
 - [The Modern JavaScript Tutorial](https://javascript.info/)
 - [egghead.io](https://egghead.io/)
