import { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonForm = ({ addPerson, newName, newNumber, handlePersonChange, handleNumberChange }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handlePersonChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ persons }) => (
  <div>
    {persons.map(person => (
      <div key={person.name}>{person.name} {person.number}</div>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // Load data from server
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    if (newName.trim() === '' || newNumber.trim() === '') {
      alert('Name or number cannot be empty')
      return
    }
    console.log('addPerson', event);
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response => {
          console.log('response', response);
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handlePersonChange = (event) => {
    console.log('newName', event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('newNumber', event.target.value);
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App