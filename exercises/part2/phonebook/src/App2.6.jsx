import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'},
    { name: 'Ada Lovelace' },
    { name: 'Dan Abramov'},
    { name: 'Mary Poppendieck'}
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (newName.trim() === '') {
      alert('Name cannot be empty')
      return
    }
    
    console.log('addPerson', event);
    const personObject = {
      name: newName,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handlePersonChange = (event) => {
    console.log('newName', event.target.value);
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{
        persons.map(person => {
          console.log('person', person);
          return <div key={person.name}>{person.name}</div>
        })
      }</div>
    </div>
  )
}

export default App