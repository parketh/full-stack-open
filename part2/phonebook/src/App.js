import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ prompt, setPrompt ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePromptChange = (event) => {
    setPrompt(event.target.value)
  }

  const addEntry = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    persons.map((person) => person.name).includes(newName)
    ? window.alert('${newName} is already added to phonebook')
    : setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().search(prompt.toLowerCase()) !== -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter prompt={prompt} handlePromptChange={handlePromptChange}/>
      <h3>Add a new</h3>
      <PersonForm addEntry={addEntry} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

const Persons = ({ persons }) => {
  return (
    persons.map((person) => (
      <div>{ person.name } { person.number }</div>
    ))    
  )
}

const Filter = ({ prompt, handlePromptChange }) => {
  return (
    <div>
      filter shown with <input value={prompt} onChange={handlePromptChange} />
    </div>
  )
}

const PersonForm = ({ addEntry, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <button type="submit">add</button>
    </form>
  )
}

export default App