# Part 2 - (b) Forms

## Controlled components

Controlled components are used in HTML forms to store the contents of a form and notify changes through callbacks like `onChange`. To set this up: 

 - the value of the form input can be stored in the `App` component's state with the `useState` function
 - an HTML `<form>` element is created with `<input>` and `<button>` elements
 - the `<input>` element will have `value` set equal to the stored component state, an `onChange` set to trigger the function that changes the component state by setting it equal to `event.target.value`
   - `event.target` refers to the `<form>` element
   - this means that `event.target.value` refers to the `value` input of the `<form>`
 - in other words, every time the user changes the text in the input field of the form, the component state updates to match this value. If no `handleNoteChange` function where defined and triggered, the value in the input field would simply never change.
 - as this is a notes app, the `<form>` element will have an `onSubmit` value which triggers a function (`addNote`) to add the new note to the list of notes. The `addNote` function:
   - triggers `event.preventDefault()` to stop the form from submitting (the default behaviour)
   - creates a new `noteObject` which stores the content of the note, the current date, a boolean `important` attribute, and an unique identifier
   - calls a function to change the component state of the notes list by using the `.concat()` function (this creates a copy of the list and extends it, rather than mutating component state directly (a big red flag))
 - the event handler also then resets the value of the controlled input element by calling the `setNewNote` function: `setNewNote('')`


```javascript
const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }
    
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
            <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>  
    </div>
  )
}
```

## Filtering Displayed Elements

We can add a piece of state the the `App` component to keep track of and control which elements on the page should be displayed.

```javascript
const [showAll, setShowAll] = useState(true)
```

 - In the example above, some of the notes are marked as "Important". 
 - We can create a new `notesToShow` variable, which includes all notes if `showAll` is set to `true`, and includes only the important notes if `showAll` is set to `false`. 

```javascript
const notesToShow = showAll ? notes : notes.filter(note => note.important)
```

 - We can then create a button with an `onClick` attribute that triggers a function to invert the value of `showAll`.

```html
<button onClick={() => setShowAll(!showAll)}>
    show {showAll ? 'important' : 'all' }
</button>
```

The button now controls whether to show all notes or only the important notes.






