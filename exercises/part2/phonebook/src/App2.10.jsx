import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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