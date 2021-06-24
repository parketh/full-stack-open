# Part 2 - (c) Getting data from server

This section uses a software development tool called [JSON Server](https://github.com/typicode/json-server) to act as the backend server. Our data will be stored in a local `db.json` file in the root directory of the project. Going forward, all notes inputted to the front end will be saved in the server so that it "persists" in memory.

JSON server can be installed globally using the command:

```
npm install -g json-server
```

Or simply run from the root directory of the app using the `npx` command, if administrative privileges are not available:

```
npx json-server --port 3001 --watch db.json
```

Note that `json-server` defaults to port 3000, which is reserved for `create-react-app`, so we define a alternative port (port 3001) instead.

## The browser as a runtime environment

One way to fetch data from the server using JavaScript is `XMLHttpRequest`, which is a technique introduced in 1999 but is **no longer recommended**. `XMLHttpRequest` works by:

 - Creating a `xhttp` object to represent the HTTP request
 - Registering an event handler for when the state of the `xhttp` object changes

Instead, browsers today support the `fetch` method, which is based on the concept of `promises`. 

JavaScript engines, or runtime environments:

 - follow the **asynchronous model**, meaning the event handler is called at a point in time in the future, not immediately
 - require all input-output operations to be executed as non-blocking, meaning code execution continues immediately after calling a function, without waiting for it to return
 - are single-threaded, meaning they cannot execute code in parallel
 - can cause the browser to get stuck if code execution takes up a lot of time.

Today's browsers allow parallelised code to be run using web workers, however the event loop of an individual browser is still single-threaded. 

### Detailed explanation of underlying concepts ([source](https://www.youtube.com/watch?v=8aGhZQkoFbQ))

- **the call stack**: JavaScript is a single-threaded runtime environment so there is a single call stack, which only runs one thing in the time. The call stack stores a series of functions. More specficially, is a data structure that records where in the program we are. If we step into a function, we push it onto the stack, and if we return from a function, we pop it off the top of the stack. 
- **blocking**: things in the call stack which are slow / take a long time to execute (e.g. network requests are slow). If JavaScript were synchronous, we would have to wait for each request to finish before continuing with execution. This is a problem because while waiting for the request to finish, the browser effectively freezes (it can't do anything else).
- **asynchronous callbacks**: the solution to blocking. Most commonly, uses the `setTimeout` function to allow rest of code to execute before running a function. The `setTimeout` function actually exists outside of the JS runtime environment - it is part of the WebAPIs provided by the browser. Other async requests work the same way (e.g. XHR WebAPI).
- **callback queue / task queue**: functions wrapped within `setTimeout` are pushed onto the task queue, which exists outside of the JS runtime environment. 
- **event loop**: the job of the event loop is to push the first item in the task queue onto the call stack whenever the call stack is empty. This way, once all of the code has been executed, the tasks pushed to the task queue by `setTimeout` will be executed. In effect these items are pushed to the end of the call stack. 

Lesson of all this is not to put slow code on the call stack because it prevents the browser of doing its proper job, i.e. providing a smooth, fluid UI.

![](runtime_env.png)

## npm

`npm` is the node package manager, which is used for adding external libraries (npm packages) to React projects. 

Packages are installed by running the following command at the root directory of the project.

```
npm install [package]
```

What this command does is:

 1. Download the library code to the `node_modules` directory
 2. Add the package to the `dependencies` object in `packages.json` (also found in the root directory of the project)

Packages can be installed either as:

 - a **runtime dependency**, meaning the execution of the program requires the existence of the library
 - a **development dependency**, meaning the library is only required for assistance during software development and the program can run without it.

```
npm install axios  // runtime dependency
npm install json-server --save-dev  // development dependency
```

We can also use the `scripts` object in `packages.json` to do things like run the server without parameter definitions. 

**packages.json**
```javascript
{
  // ... 
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server -p3001 --watch db.json"
  },
}
```

**command line**
```
npm run server
```

## Axios and promises

Two terminal windows may be needed to run `json-server` and the `react-app` simultaneously (one to keep the server running and the other to keep the app running).

```js
import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)
```

The `get` method returns a **promise**, an object representing the eventual completion or failure of an asynchronous operation. A **promise** has three states:

1. pending: final value is not yet available
2. fulfilled: operation has completed and final value is available (generally means operation was successful)
3. rejected: error prevented final value from being determined

In the example above, the first promise is fulfilled but the second promise is rejected. This is because the second address does not exist. 

To access the result of the operation represented by the promise, we use the method `then`, which is an event handler.

```javascript
const promise = axios.get('http://localhost:3001/notes')

promise.then(response => {
  console.log(response)
})
```

Generally, there is no need to store the promise in its own variable, and instead the `get` and `then` methods can be chained directly, as follows:

```javascript
axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
  })
```

The data is now stored in `notes` and can be used.

## Effect-hooks

*Note: This example continues from the example started in Part 2b.*

**Effect hooks** allow you to perform side effects in function components, including:

 - data fetching
 - setting up a subscription
 - manually changing the DOM in React components
 - and more.

In the example below (continued from Part 2b), we use a Request hook to request the notes from the local server inside the `App` component. 

**App.js**
```javascript
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  // Code from Part 2B
}
```

The `useEffect` function takes two parameters:

1. A function which defines the effect
2. An array which specifies how often the effect (function above) should be run:
   - Empty array means the effect is only run on the first render
   - Effect will be run whenever any variables passed into the array change

In this case, the data is requested from the server when the application first runs, stored in the `notes` variable, and displayed on the page.

