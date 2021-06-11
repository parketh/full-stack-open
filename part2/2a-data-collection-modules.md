# Part 2 - (a) Rendering a collection, modules

## Recap of past topics

 - Use `console.log` as much as possible to debug code
 - Concatenate statements using comma seperation rather than the Python way (e.g. `console.log('props value is', props)`)
 - Use Visual Studio Code snippets and tab completion to code faster (e.g. type `log` followed by `tab` key to create `console.log()` command)

## JavaScript Arrays

Recap of functional programming with arrays in JavaScript:

### 1 - Higher-order functions

 - In functional programming, functions are values. Variables can be assigned functions as a value and passed around. 
 - Higher-order functions refer to the passing of functions to other functions. Higher-order functions enable **composition**.
 - One example of a higher-order function is `filter`, which is a function on an array which accepts another function as an argument, which it uses to return a new, filtered version of the array. The function that is accepted is an argument is known as a **callback function**. 
 - In the example below, the use of `filter` allows us to write less code to capture the same logic, becaus the functions compose together.

```javascript
var animals = [
    { name: 'Fluffykins', species: 'rabbit' },
    { name: 'Caro', species: 'dog' },
    { name: 'Hamilton', species: 'dog' },
    { name: 'Harold', species: 'fish' },
    { name: 'Ursula', species: 'cat' },
    { name: 'Jimmy', species: 'fish' }
]

var dogs = animals.filter(function(animal) {
    return animal.species === 'dog'
})

/* Alternative method of implementing a filter
var dogs = []
for (var i = 0; i < animals.length; i++) {
    if (animals[i].species == 'dog')
        dogs.push(animals[i])
}*/
```
 - The callback function can also be declared seperately so that it is easier to think through conceptually and debug.

```javascript
var isDog = function(animal) {
    return animal.species === 'dog'
}

var dogs = animals.filter(isDog)
```

### 2 - Map

 - Like `filter`, the function `map` is a higher-order function. Rather than filtering through objects in an array, it transforms them. 
 - `map` takes a callback function and passes this to each item in the array

```javascript
var animals = [
    { name: 'Fluffykins', species: 'rabbit' },
    { name: 'Caro', species: 'dog' },
    { name: 'Hamilton', species: 'dog' },
    { name: 'Harold', species: 'fish' },
    { name: 'Ursula', species: 'cat' },
    { name: 'Jimmy', species: 'fish' }
]

var names = animals.map(function(animal) {
    return animal.name
})

/*
var names = []
for (var i = 0; i < animals.length; i++) {
    names.push(animals[i].name)
        
}*/
```

 - The code can be further reduced by using arrow notation, which removes the need to write `function()` and `return`.

```javascript
var names = animals.map(animal => animal.name)
```


### 3 - Reduce basics

 - Previous functions, `map` and `filter`, and others like `find` (same as `filter` but only returns first item) are all list transformations
 - `reduce` is the multi-tool of list transformations in that it can be used to implement functions like `map`, `filter`, `find`, or any other list transformation
 - `reduce` can be used when no pre-built tools exist for required purposes
 - In the example below, the function is run once per item of the array. After the first iteration, the amount 250 is passed in as `sum` in the second iteration, added to 400, and the total 540 is passed in as `sum in the third iteration, and so on.

```javascript
var orders = [
    { amount: 250 },
    { amount: 400 },
    { amount: 100 },
    { amount: 325 }
]

var totalAmount = orders.reduce(function(sum, order) {
    return sum + order.amount
}, 0)

/*
var totalAmount = 0
for (var i = 0; i < orders.length; i++) {
    totalAmount += orders[i].amount
}*/
```
 - As before, the `reduce` function can be further reduced in length using arrow notation. 

```javascript
var totalAmount = orders.reduce((sum, order) => sum + order.amount, 0)
```

## Rendering Collections

We can render a list of items (like the one in the sample app from Part 0) using frontend, or browser-side, application logic. 

In the example below, `notes` is defined in `index.js` and passed as a prop into `App.js`, which renders the list of notes as HTML code using the `map` function.

**App.js**
```javascript
const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => <li>{note.content}</li>)}
      </ul>
    </div>
  )
}
```

**index.js**
```javascript
import ReactDOM from 'react-dom'
import App from './App.js'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

ReactDOM.render(
  <App notes={notes} />,
  document.getElementById('root')
)
```