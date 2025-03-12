const Header = (props) => {
    console.log(props);
      return (
      <h1>{props.course.name}</h1>
    )
}

const Part = ({ note }) => {
    console.log("Note: ", note);
    return (
      <p>{note.name} {note.exercises}</p>
  )
}

const Content = (props) => {
  console.log(props);
  const parts = props.course.parts;
  return (	
      <div>
          {parts.map((part) => <Part key={part.id} note={part} />)}
      </div>
  )
}

const Total = (props) => {
  console.log("Total props: ", props);
  const parts = props.course.parts;
  const total = parts.reduce((sum, part) => {
      console.log("what is happening: ", sum, part)
      return sum + part.exercises;
  }, 0);

  return (
      <p style={{ fontWeight: 'bold' }}>Number of exercises: {total}</p>
  )
}

const Course = (props) => {
  console.log(props);
  return (
      <>
          <Header course={props.course} />
          <Content course={props.course} />
          <Total course={props.course} />
      </>
  )
}

export default Course