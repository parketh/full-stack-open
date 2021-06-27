# Part 2 - (d) Altering data in server

## REST convention

In REST:
 - **Resources** are individual data objects (e.g. notes) that have a unique address associated with it (e.g. *notes/3* for the note with *id* of 3)
 - Resources are fetched from the server using HTTP GET requests
 - resources are created using an HTTP POST request according to the REST convention; `json-server` requires data to be sent in JSON format
   - data must be a correctly formatted string
   - request must contain `Content-Type` request header

## Sending data to the server

In the example below, the note object is sent to the server using the axios `post` method. The newly created note resource is stored in the value of the `data` property of the `response` object.

```javascript
addNote = (event) => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    date: new Date(),
    important: Math.random() < 0.5,
  }

  axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      console.log(response)
    })
}
```

We can use the *Network* tab of the Chrome developer tools to check that the POST request has been sent correctly. 

Rather than creating an `id` for the `noteObject`, it is better to let the server generate this for us. Strictly speaking, we should also let the server add the creation date as the machine can be wrongly configured. This requires programming the backend server and will be done below.

## Changing the importance of notes

We can modify existing resources stored in the server in two ways: 

 - using an HTTP PUT request to replace the entire note
 - using an HTTP PATCH request to change some of the note's properties.

The example below uses a PUT request to replace the entire note that has changed. It:

 - Finds the note to be changed using the `.find` method
 - Creates a new note that is a copy of the old note but changes the `important` property, using the object spread syntax
   - `{...note}` creates a copy of the old note with all its properties
   - by specifying a value for the `important` property, we amend it relative to the original object
   - Creating a copy of the note rather than amending it directly is preferred as we must never mutate state directly in React.
 - The note is sent to the server using the `.put` method, which takes two parameters, the URL for the note to be changed and the new object. 
 - The local `notes` array is updated with the version returned by the server in `response.data` and the `.map` method, which is used to create a copy of the old array apart from the item that has changed.

```javascript
const toggleImportanceOf = id => {
  const url = `http://localhost:3001/notes/${id}`
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  axios.put(url, changedNote).then(response => {
    setNotes(notes.map(note => note.id !== id ? note : response.data))
  })
}
```

## Extracting communication with the backend into a separate module and promise chaining

Extracting communication with the backend into its own module is advisable to reduce bloating and ensure that each module has responsibility over a single part of the programme.

These modules can be stored inside of the *src/services* directory, e.g. in a module called `noteService.js` which contains three functions, `getAll`, `create`, and `update`, to handle the `GET`, `POST` and `PUT` requests respectively. In each case, the `then` method is used to directly return `response.data`. 


**src/services/noteService.js**
```javascript
import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}
```

The object exported by the module takes the format of key-value pairs seperated by commas. Where the value is the function defined in the module and the key is used to refer to the function. Where the key and function are the same, it can be rewritten in a more compact form (similar to how props can be passed in a condensed form): 

```javascript
export default { getAll, create, update }
```

The callback function in `App.js` is then structured as follows: 
 - `noteService.getAll()` executes a GET request from the server, and `response.data` is returned via the first `.then()` method (in `noteService.js`)
 - a second `.then()` method is used to store the returned notes into `notes` using the `setNotes()` method.

This is an example of promise chaining. The value returned from the first `then()` handler is passed to the next `then()` handler, and so on.

**App.js**
```javascript
// Retrieve notes (with GET request)
noteService
  .getAll()
  .then(initialNotes => {
    setNotes(initialNotes)
  })

// Create note (with POST request)
noteService
  .create(noteObject)
  .then(returnedNote => {
    setNotes(notes.concat(returnedNote))
    setNewNote('')
  })

// Update note (with PUT request)
noteService
  .update(id, changedNote)
  .then(returnedNote => {
    setNotes(notes.map(note => note.id !== id ? note : returnedNote))
  })
```

## Promises and errors

Promises that are rejected (e.g. where an HTTP request fails, because we are sending a PUT request to a note that does not exist) are not handled automatically (the user sees nothing). To define the behaviour of the app when the promise is rejected, we can use the `catch` handler. 

The `catch` handler is usually placed at the end of the promise chain. In the example below, if the PUT request fails, it dispalys an alert and updates the state of `notes` to remove the missing note.

```javascript
noteService
  .update(id, changedNote).then(returnedNote => {
    setNotes(notes.map(note => note.id !== id ? note : returnedNote))
  })
  .catch(error => {
    alert(
      `the note '${note.content}' was already deleted from server`
    )
    setNotes(notes.filter(n => n.id !== id))
  })
```

