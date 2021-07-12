# Part 3 - (b) Deploying app to internet

## Same origin policy and CORS

Cross-Origin Resource Sharing (CORS) is a mechanism that requires a web application running in a browser only be able to communicate with a server from the same origin (i.e. the same port - e.g. 3000). This is a universal principle for the operation of web applications. Our web application runs on two different origins:

 - the react dev server runs on `localhost:3000`
 - the node / express backend runs on `localhost:3001/api/notes`

Requests from other origins can be enabled using Node's `cors` middleware.

**Installation**
```
npm install cors
```

**index.js**
```javascript
const cors = require('cors')

app.use(cors())
```

## Deploying backend to the Internet

We can use Heroku to host our Node / express application on the Internet. A *Procfile* needs to be created at the root directory of the rpoject telling Heroku what command to run when starting the application. 

**Procfile**
```
web: npm start
```

The port definition of the application at the bottom of `index.js` then needs to be updated to allow for Heroku to configure the application port (which may be different from 3001). This is stored in the `PORT` environment variable.

```javascript
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

## Deploying frontend application to the Internet

To deploy the frontend, we first need to create a production build rather than a development build. This will create:

 - a `build` directory, which contains the HTML file `index.html`
 - a minified version of the JavaScript code which includes all of the JavaScript files and code from the application's dependencies.

We can deploy the frontend by copying the `build` directory to the root of the backend repository and configuring it to show `index.html` as its main page.

To allow express to show static content, we need to use a built-in middleware called `static`. The following tells express to first check if the `build` directory contains a file corresponding to the request's address, whenvever an HTTP GET request is received.

```javascript
app.use(express.static('build'))
```

Any references to the backend application can now be set to a relative URL as both frontend and backend are deployed from the same origin.

We can also add the following `scripts` to `packages.json`:

 -  `build:ui` builds the frontend and copies the `build` folder from the frontend directory to the backend directory.
 -  `deploy` pushes the changes to Heroku
 -  `deploy:full` builds the frontend, copies it to the backend directory, commits changes, and deploys them to heroku
 -  `logs:prod` displays Heroku logs

```javascript
{
  "scripts": {
    //...
    "build:ui": "rm -rf build && cd ../fullstackopen/part2/phonebook && npm run build --prod && xcopy /y /i 'build' '..\\..\\..\\fso-phonebook-backend\\build'",
    "deploy": "git push heroku main",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push && npm run deploy",    
    "logs:prod": "heroku logs --tail"
  }
}
```

On Windows it is necessary to first run:
```
npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
```

## Proxy

The frontend app no longer works in the React development environment because requests are now directed to a relative URL. To fix this, we can add a declaration `"proxy": "http://localhost:3001"` to `packages.json`. This will redirect any requests not managed by the React application itself to the specified address (`http://localhost:3001`).

