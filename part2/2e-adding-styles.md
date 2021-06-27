# Part 2 - (e) Adding styles to React app

## Adding styles

There are several ways to add styles to a React application: 

 1. A single `index.css` file under the `src` directory, without using a CSS preprocessor (a program that procedurally generates CSS code)
    - Must be manually refreshed
    - Uses selectors (e.g. element type, class, id) and style declarations
    - **Important**: `class` selector is replaced with `className` in React
 2. Inline styles, whereby any React component or element can be provided with a set of CSS properties as a JavaScript object through the `style` attribute. 
    - CSS properties are defined using camel case (e.g. `fontStyle`) rather than kebab case (e.g. `font-style`)
    - Numeric values for pixels are expressed as an integer rather than appended with `px` (e.g. `16` instead of `16px`)
    - Comes with some limitations - for example pseudo-classes (e.g. `:hover` don't work well)
  
Inline style example:
```javascript
const Footer = () => {
const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
}
return (
    <div style={footerStyle}>
    <br />
    <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
    </div>
)
}
```

Traditional schools of thought advocated the seperation of concerns (HTML, CSS and JavaScript). React advocates the integration of all three into discrete, functional components, as it realises that the seperation of content, styles and functionality does not scale well with larger applications. 

## Improved error message

Rather than using the `Window.alert()` method to handle error messages, we can use inline messages formatted with CSS. We use a new `Notification` component which displays the error message (which is stored as a state hook) for a set amount of time. The error message is formatted using an external CSS file.

**App.js**
```javascript
const App = () => {
  // ...
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  const toggleImportanceOf = id => {
    // ...
    noteService
      .update(changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      // ...
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}
```

**index.css**
```css
.error {
  color: red;
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}
```
