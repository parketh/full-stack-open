# Part 1 - (a) Introduction to React

## Installation and setup

We need to first install [Node.js](https://nodejs.org/en/) to gain access to the `npm` tool.
We then need to install npx, a manager for npm binaries.
```
npm install -g npx
```
We can create a new react app using the following command:
```
npx create-react-app part1
cd part1
```
We can start the application by running:
```
npm start
```

## Application structure

 - The code of the application resides inside the `src` folder
 - The HTML template (amongst other resources) is contained inside the `public` folder
 - The `src` folder contains (amongst other files) `index.js` and `App.js`

In React, all content that needs to be rendered is defined as **React components**. 
Based on the sample code in this project, `App.js` defines a React component with the name `App`. In particular, the constant variable App receives no parameters and returns a piece of code.

```javascript
const App = () => (
  <div>
    <p>Hello world</p>
  </div>
)
```

`index.js` then renders its contents into the `div` element with `id` value `root`, as defined in `index.html`.

```javascript
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
```

It is also possible to render dynamic content inside of a React component. For example:

```javascript
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}
```

## JSX

Although React components seem to be written in HTML markup, this is not the case. The layout of React components is instead written in JSX, which is compiled into JavaScript under the hood.

After compilation, the above element turns into:
```javascript
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p', null, 'Hello world, it is ', now.toString()
    ),
    React.createElement(
      'p', null, a, ' plus ', b, ' is ', a + b
    )
  )
}
```
JSX is similar to HTML, except it is possible to embed dynamic content by writing appropriate JavaScript within curly braces. JSX is XML-like in that every tag needs to be closed.

## Multiple components

Components can be re-used as many times as needed, including inside other components. A core philosophy of React is to compose applications with many specialised, reusable components. `App` is normally a root component at the top of the component tree of the application. 

## props - passing data to components

`props` can be used to pass data to components. The `Hello` component receives as an argument an object `props`, which has fields corresponding to all the props defined under `App`. Props and their values can be hard-coded or declared as a Javascript expression.

```javascript
const Hello = (props) => {
    return (
      <div>
        <p>Hello {props.name}, you are {props.age} years old</p>
      </div>
    )
}
  
const App = () => {
    const name = 'Peter'
    const age = 10
    
    return (
      <div>
        <h1>Greetings</h1>
        <Hello name="George" age={26 + 10}/>
        <Hello name={name} age={age}/>
      </div>
    )
}
```

## Some rules

- React component names must be capitalised
- React components need to contain one root element, e.g. a `<div>` element. Alternatively, it is possible to use **fragments**. which wrap the elements to be returned by the component with an empty element to avoid the extra `<div>` elements in the DOM-tree.

```javascript
const App = () => {
    const name = 'Peter'
    const age = 10

    return (
        <>
        <h1>Greetings</h1>
        <Hello name="Maya" age={26 + 10} />
        <Hello name={name} age={age} />
        <Footer />
        </>
    )
}
```
