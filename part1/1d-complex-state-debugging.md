# Part 1 - (d) Complex state, debugging React apps

## Complex state

Where an application requires more than a single state, the `useState` function can be used multiple times to create multiple "pieces" of state.

The code below maintains two pieces of state, `left` and `right`, both set to an initial value of 0.

```javascript
const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)

    return (
        <div>
            {left}
            <button onClick={() => setLeft(left + 1)}>
                left
            </button>
            <button onClick={() => setRight(right + 1)}>
                right
            </button>
            {right}
        </div>
    )
}
```

The code above initialises the values of `left` and `right` seperately, but this can be combined into a single object as follows:
```javascript
const App = () => {
    const [clicks, setClicks] = useState({
        left: 0, right: 0
    })

    const handleLeftClick = () => setClicks({...clicks, left: clicks.left + 1 })
    const handleRightClick = () => setClicks({...clicks, right: clicks.right + 1 })

    return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
}  
```

`...clicks` above is an example of **object spread** syntax, which allows an iterable such as an array to be expanded in places where zero or more arguments are expected. In practice, `{...clicks}` creates a new object that copies all of the properties of `clicks`, while taking on the value of anything we specify explicitly, e.g. `right` being equal to 1.

Note that the state of `left` and `right` are always updated through the `setClicks` function, rather than set directly. This is because **it is forbidden in React to mutate state directly**. Whenever we update a state variable, we are really creating a new object and replacing its value.

## Handling arrays

State variables can also be defined as arrays rather than single variables. In the example below, `allClicks` is initialised as an empty array, and every click appends a letter to that array using the `concat` method. This is used in place of the `push` method so as not to directly mutate state. In the JSX-code, a `join` method is used to render the elements of the `allClicks` array.

```javascript
const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>
    </div>
  )
}
```

## Conditional rendering

Components support **conditional rendering**, in that we can use an `if` statement to return different JSX-code depending on the state of the application. 

## Old React

Old versions of react before version 16.8.0 did not have React hooks and required use of class components (using JavaScript class syntax) to define state.

## Debugging React applications

Debugging and reading existing code is where the large part of a typical developer's time is spent. React is an extremely developer-friendly library when it comes to debugging.

Notes on debugging:
 1. Keep the browser's developer console open at all times
 2. When there is a problem with the code, find and fix the problem immediately rather than continuing to finish code
 3. Old school, print-based debugging is a good idea. This can be done using `console.log()` to print variables out to the console. Note combining multiple within `console.log()` is done with the comma seperator rather than the plus operator.
 4. The execution of application code can be paused at any time by writing the command `debugger` anywhere in the code. At this point, it is possible to inspect the current state of the variables by entering the *Console* tab.
 5. The code can also be executed line by line by setting breakpoints, and by using the controls on the right-hand side of the Sources tab.
 6. Install the 'React developer tools' Chrome extension, which adds a new tab to inspect different React elements, including their state and props. Note the state of hooks are shown in order of their definition in the code.

## Rules of hooks

The `useState` function should never be called from inside of a loop or conditional expression. This is to ensure hooks are always called in the same order.

## Event handling revisited & functions that return functions

Event handlers should always be assigned a variable that is a function, not a function call (where the event handler is actually assigned the returned value). Event handlers can be defined directly in the attribute of the button but it is better to define it as a seperate function. When defining as a seperate function, there is a syntactic difference in that the code is now wrapped in long curly braces.

Event handlers can also be defined using a function that returns a function. In the below example, the `onClick` method executes a function call, which returns another (correctly defined) function.

```javascript
const App = () => {
    const [value, setValue] = useState(10)

    const hello = (who) => {
        () => {
          console.log('hello', who)
        }
    }

    return (
        <div>
            {value}
            <button onClick={hello('world')}>button</button>
            <button onClick={hello('react')}>button</button>
            <button onClick={hello('function')}>button</button>
        </div>
    )
}
```

Doing so allows custom arguments to be passed in to generate individualised event handlers. In other words, **functions returning functions can be utilised in defining generic functionality that can be customised with parameters**.


## Passing Event Handlers to Child Components

Event handlers can also be passed to child components through a prop. In this case, the event handler function is passed through the `handleClick` prop.

```javascript
const Button = (props) => {
    <button onClick={props.handleClick}>{props.text}</button>
}

const App = () => {
    const [value, setValue] = useState(10)

    return (
        <div>
            {value}
            <Button handleClick={() => setValue(1000))} text="thousand" />
            <Button handleClick={() => setValue(0))} text="reset" />
            <Button handleClick={() => setValue(value + 1))} text="increment" />
        </div>
    )
}
```

## Do Not Define Components Within Components

Never define components inside other components as this can lead to many unpleasant problems. In particular, React treats a component defined inside of another component as a new component in every render. 

## Useful reading

 - [Official React documentation](https://reactjs.org/docs/hello-world.html)
 - 