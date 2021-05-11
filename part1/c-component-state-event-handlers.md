# Component state, event handlers

## Component helper functions

Component helper functions are functions that are defined inside of other functions, to define the behaviour of a component (for example `bornYear` in the example below).

```javascript
const Hello = (props) => {
    const bornYear = () => {
        const yearNow = new Date().getFullYear()
        return yearNow - props.age
    }

    return (
        <div>
        <p>
            Hello {props.name}, you are {props.age} years old
        </p>
        <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}
```

## Destructuring

Destructuring makes the assignment of variables easier. We can assign the values of an object's properties into separate variables as follows. Note also that in the code below, `bornYear` declares a function as a single expression, which is a more compact form. 

```javascript
const Hello = (props) => {
    const { name, age } = props
    const bornYear = () => new Date().getFullYear() - age
}
```

This is equivalent to declaring:
```javascript
const name = props.name
const age = props.age
```

This can be taken one step further to directly destructure the props passed to the component into variables `name` and `age`.

```javascript
const Hello = ({ name, age }) => {
    const bornYear = () => new Date().getFullYear() - age
}
```

## Page re-rendering

When a file is changed React does not automatically refresh the page, so you need to reload the browser to get the new content to show. This can also be done by calling the `ReactDOM.render` method (same as defined in `index.js` on initial load), however this is not the recommended way to re-render components.

## Stateful component

We can use React's **state hook** to create stateful components, as follows:

**index.js**
```javascript
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, 
document.getElementById('root'))
```

**App.js**
```javascript
import React, { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}

export default App
```

In the example above, `{useState}` is a React Hook, `counter` is a stateful value, and `setCounter` is a fucntion to update that value. During the initial render, `counter` takes the value passed to it through `useState`, i.e. 0. 

The expression below that uses `setTimeout` to run function `setCounter` once every second, to increment `counter` by 1. Whenever the modifiying function (e.g. `setCounter`) is called, **React re-renders the component**. 

## Event handling

Event handlers are registered to be called when specific events occur (e.g. when the user clicks a button). Mouse events such as `onClick` are amongst the most commonly used. Event handler functions can be registered to a `click` event in two ways, either:
 1. as a separate function
 2. as a function defined directly within the code

**As a separate function**
```javascript
const App = () => {
    const handleClick = () => {
        setCounter(counter + 1)
    }
    return (
        <button onClick={handleClick}>
            plus
        </button>
    )
}
```

**Directly in the code**
```javascript
const App = () => {
    return (
        <button onClick={() => setCounter(counter + 1)}>
            plus
        </button>
    )
}
```

Defining event handlers within JSX-templates is usually not a good idea. It is better to seperate it into a different function, as below.

```javascript
const App = () => {
    const increaseByOne = () => setCounter(counter + 1)
    return (
        <div>{counter}</div>
        <button onClick={increaseByOne}>
            plus
        </button>
    )
}
```

## Passing state to child components

React best practices:
 - Write React components that are small and reusable across the application (or even across projects)
 - Lift the state up the component hierarchy. Often, several components need to reflect the same changing data, so the shared state should be lifted up to their closest common ancestor.

The version of the code below factors code into four smaller components, one for displaying the counter, and one each for the buttons to increment the count, decrement the count and reset the count.

```javascript
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
        <div>
            <Display counter={counter}/>
            <Button
                handleClick={increaseByOne}
                text='plus'
            />
            <Button
                handleClick={setToZero}
                text='zero'
            />     
            <Button
                handleClick={decreaseByOne}
                text='minus'
            />           
        </div>
    )
}

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}
```

**Whenever any of the buttons is clicked, the event handler is executed, which causes the entire `App` component, including all its children components, `Display` and `Button`, to be rerendered.**

## Refactoring the components

The `Display` and `Button` components can be refactored using the syntax set out above, as follows:

```javascript
const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
)
```