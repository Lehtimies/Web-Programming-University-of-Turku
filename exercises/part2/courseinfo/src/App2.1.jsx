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
	console.log(props);
	return (
		<p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
	)
}

const Course = (props) => {
	console.log(props);
	return (
		<>
			<Header course={props.course} />
			<Content course={props.course} />
		</>
	)
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
		{
			name: 'Fundamentals of React',
			exercises: 10,
			id: 1
		},
		{
			name: 'Using props to pass data',
			exercises: 7,
			id: 2
		},
		{
			name: 'State of a component',
			exercises: 14,
			id: 3
		}
	]
}

  return <Course course={course} />
}

export default App