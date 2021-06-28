# Part 3 - (a) Node.js and Express

## Node

We use NodeJS, a JavaScript runtime based on Google's Chrome V8 JavaScript engine, to build the backend of the server. 

The node package manager `npm` originates from NodeJS. Not all of the applications are React applications. 

To create a new template for the application, run the following command and follow the questions to generate a `packages.json` file at the root directory. The file specifies, amongst other things, that the entry point to the application is `index.js`.

```
npm init
```

To run a file in the application (e.g. `index.js`), we can type:
```
node index.js
```
Or add this command to the `scripts` object:
```
{
  // ...
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
}
```
and run:
```
npm start
```
(note the syntax is slightly different from React which used `npm run start`).

## Simple web server

We can create a web application in `index.js` as follows:

 - `const http = require(http)` imports Node's built-in web server module and effectively works like `import http from 'http'` (the syntax is different because Node.js does not yet support ES6 modules but uses CommonJS modules)
 - the `createServer` method of the `http` module creates a new web server. The response is set to status code 200 with `Content-Type` of `text/plain`, and `Hello World` returned as the page
 - `app.listen(PORT)` assigns the http server to the app and listens for HTTP requests sent to port 3001

accessible via `http://localhost:3001/`.

**index.js**
```javascript
const http = require('http')

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

We can also serve data (as in our previous server) as follows:

**index.js**
```javascript
const http = require('http')

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

We now specify that the `Content-Type` is equal to `application/json`, and the `notes` are transformed to JSON format with the `JSON.stringify(notes)` method.

## Express

Express is a NodeJS library developed to ease server side development, as a replacement for the built-in http module. It can be installed by running:

```
npm install express
```
Which also adds `"express": "^4.17.1"` to the dependency object in `packages.json`. The ^ symbol means that the installed version will be at least 4.17.1 - more precisely, the middle number (17) and last number(1) can be higher but the first number (4) has to be the same.

To update the dependencies of the project, we can run:
```
npm update
```
To install all up-to-date dependencies of the project defined in `packages.json` on a new computer that does not have the packages installed, we can run:
```
npm install
```

## Web and express

With `express`, we can create a web server as follows, which:

 - creates an express application stored in the `app` variable
 - defines two **routes** to the application:
   - the first used to handle HTTP GET requests to the application's / root
   - the second used to handle HTTP GET requests 
 - the event handler function takes two parameters:
   - the `request` parameter contains all the information of the HTTP request
   - the `response` parameter is used to define how the request is responded to (e.g. the `send` method sends a string as response, which Express automatically detects to set `Content-Type` as `text/html`, while the `json` method sends the `notes` array, which Express automatically detects and converts to a JSON formatted string; it also sets `Content-Type` as `application/json`).

**index.js**
```javascript
const express = require('express')
const app = express()

let notes = [
  // ...
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

## node-repl

Node commands can be tested in the command line by typing `node` in the command line, which launches `node-repl` (REPL = Read-Evaluate-Print-Loop implementation), a tool that is run in the command line.

# nodemon

By default, NodeJS applications have to be restarted in order for changes to be updated. We can install a package called `nodemon` to have the browser automatically reload when changes are made. 

```
npm install --save-dev nodemon
```

The application is then run with the following command:

```
node_modules/.bin/nodemon index.js
```

But it is worth adding this to scripts under `dev`.

**packages.json**
```js
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

And simply running (note we need the `run` command, unlike with `start` and `test` scripts):

```
npm run dev
```

## REST

Representational State Transfer, or REST, is an architectural style for building scalable web applications. A key concept in RESTful thinking is that resources (e.g. individual notes) have an associated URL or unique address corresponding to their identifier (id).

Different operations can be executed on resources, including:

  - `GET`: fetches a resource
  - `POST`: creates a new resource based on data provided with the request
  - `DELETE`: removes the identified resource
  - `PUT`: replaces the entire identified resource with the request data
  - `PATCH`: replaces a part of the identified resource with the request data

There is a lot of confusion and debate over the meaning of a REST API, but the interpretation above suffices.

## Fetching a single resource (GET)

We need to create a route in our application to fetch a single resource. Resources are associated with an `id`, and we can define parameters for routes as follows:

 - the `:id` parameter can be accessed through the `request` object as `request.params.id`
 - we need to convert `request.params.id` to a number because it is stored as a string by default
 - the `.find()` method is used to find the note that matches the id
 - if a note with a matching id cannot be found, the variable `note` would be undefined. Undefined variables are falsy (meaning they evaluate to false in an if-condition), whereas JavaScript objects are truthy (meaning they evaluate to true in an if-condition)
 - the if condition returns the notes in JSON format if a match is found, and returns an error status code (404) if not.

```javascript
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
```

## Deleting resources

Resources can be deleted by making a DELETE request to the url of the resource. There is nothing to return apart from a status code (204 no content) which indicates the deletion was successful (or that the resource did not exist in the first place).

```javascript
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})
```

## VSCode REST client

The VSCode REST client is a tool for testing the backend of our application (other tools exist such as Postman or curl, a command line tool). To use it, create a directory at the root of the application named `/requests`, and add requests in files saved with the `.rest` extension, e.g:

**get_all_notes.rest**
```rest
GET http://localhost:3001/api/notes
```

Press the `Send Request` button that appears and the HTTP request will be executed, with a response from the server opened in the editor.





