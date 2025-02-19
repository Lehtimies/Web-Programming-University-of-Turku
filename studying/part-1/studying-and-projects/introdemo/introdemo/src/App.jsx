
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}

const App = () => {
  const friends = ['Peter', 'Danny', 'John', 'Jane'] 

  return (
    <div>
      <Hello name="Reader" />
      <Hello name="Not Reader" />
      <p>{friends}</p>
    </div>
  )
}

export default App