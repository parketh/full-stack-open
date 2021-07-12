# Part 3 - (b) Deploying app to internet

## MongoDB

MongoDB is a document database (as opposed to relational database) that is useful for storing data for our application. It is classified under the NoSQL umbrella. MongoDB uses the concepts of: 

 - **collections**: a single database can hold one or more collections. A collection is similar to tables in relational databases, and contains documents. Collection items are automatically assigned a unique identifier that is stored under the `_id` variable
 - **documents**: data in collections are stored as BSON documents (similar to JSON) with specific data types. 
 - **schemas**: data stored in the database is given a schema, which defines the "shape" of the data in terms of its fields and the data types of those fields. Data objects are created with the help of **models**, which are constructor functions used to create objects based on the provided schema.

This tutorial uses MongoDB Atlas, which provides Mongo database services on the Cloud (rather than running it from our own computer). It also uses Mongoose to interact with the database which provides higher-level abstraction.

## Creating and saving objects

Objects are created by first defining a schema, then creating a model based on that schema, and finally creating a new object based on the model.

```javascript
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: false,
})
```

Notes are saved to the database with the `save()` method. The database connection must be closed with `mongoose.connection.close()` afterwards.

## Fetching objects from the database

Fetching objects from the database can be done with the `find()` method. Passing in an empty object `{}` tells Mongoose to get all notes stored in the collection, otherwise we can pass in an object representing our search conditions.

```javascript
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
```

## Connecting backend to database

The backend routes can be connected to the database by wiring the code to fetch / save objects to MongoDB to our GET / POST requests.

**Retrieving a list of existing notes**
```javascript
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})
```

**Creating a new note**
```javascript
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})
```

**Deleting a note**
```javascript
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
```

**Updating a note**
Note that the `{ new: true }` property is passed into the `findByIdAndUpdate` method to specify that the event handler return the updated note, rather than the original one.

```javascript
app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})
```

MongoDB automatically generates a `_id` variable for each piece of data, as well as a `__v` variable which describes the versioning, with the data. We can use the code below to modify the `toJSON` method and rename `_id` to `id`, while deleting `__v`. The `id` variable needs to call the `toString()` method as `_id` is an object, not a string.

```javascript
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
```

We can refactor all of the Mongoose code into its own file in a new `models` folder, and import this into `index.js` by using the following syntax.

**Exporting from models/Note.js**
```javascript
module.exports = mongoose.model('Note', noteSchema)
```

**Importing to index.js**
```javascript
const Note = require('./models/note')
```

We can then also store the MongoDB `url` in an environment variable, which can be set:

 - locally, be installing dotenv (`npm install dotenv`) and creating a `env` file at the root of the project containing `MONGODB_URI='mongodb+srv://fullstack:sekred@cluster0-ostce.mongodb.net/note-app?retryWrites=true'`. The `.env` file should be added to `.gitignore` so that it is not uploaded to Github. The library can be added to `index.js` with the command `require('dotenv').config()`
 - on Heroku, by going to the 'Settings' tab > Config Vars 

**index.js**
```javascript
require('dotenv').config()

const url = process.env.MONGODB_URI
```

**.env**
```javascript
MONGODB_URI='mongodb+srv://fullstack:sekred@cluster0-ostce.mongodb.net/note-app?retryWrites=true
```

## Testing

The backend should first be tested before moving on to the frontend. This can be done using Visual Studio Code's REST requests. 


## Error handling

We can improve the error handling of our application in two ways: 

 1. By returning a response of 404 (status code for not found) if a note with the requested id does not exist
 2. Logging any errors by implement a `.catch()` block to handle cases where the promises returned by `findById` are rejected. 

```javascript
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).end({ error: 'malformatted id' })
    })
})
```

## Moving error handling into middleware

Rather than logging errors amongst the code, it may be better to implement all error handling in one place. We can do this by passing the error forward with the `next` function, which is passed to the handler as a third parameter, after `request` and `response`. 

Passing the error to the `next` function passes it to the error handler middleware. The default error-handling middleware function is added to the end of the middleware function stack.

Custom error handling functions can also be written, and must be added to the end of the middleware function stack. For example, the error handler below returns an error labelled `malformatted id` if `error.name` is `CastError`. For all other cases, it returns the error to the default error handler with `next(error)`. 

```javascript
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)
```

## Order of middleware loading

There are some rules for ordering middleware:

 - The order in which middleware is defined and put into use (`app.use()`) determines their execution order
 - The JSON parser `express.json()` should be amongst the first middleware loaded because it is necessary for reading data from requests
 - Middleware for error handling should be placed after the HTTP requests so that the request first flows through the route handler, before the error handler


