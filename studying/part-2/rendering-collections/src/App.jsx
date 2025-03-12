import Note from './assets/Note'

const App = (props) => {
  const { notes } = props
	console.log(props);
	
  return (
    <div>
      <h1>Notes</h1>
      <ul>
      {notes.map(note => 
	  	<Note key={note.id} note={note}></Note>
        )}
      </ul>
    </div>
  )
}

export default App