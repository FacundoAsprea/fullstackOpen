const App = () => {
  const course = {
    courseName: 'Half stack application development',
    parts: [
      {
       name: "Fundamentals of React",
       exercises: 10
     },
      {
       name: "Using props to pass data",
       exercises: 7
     },
      {
       name: "State of a component",
       exercises: 14
     }
   ]
  }
  
  return (
    <div>
      <Header courseName = {course.courseName} />
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.courseName}</h1>
}

const Content = (props) => {
  return (
    <>
      <Part partName = {props.parts[0].name} partExercises = {props.parts[0].exercises}/>
      <Part partName = {props.parts[1].name} partExercises = {props.parts[1].exercises}/>
      <Part partName = {props.parts[2].name} partExercises = {props.parts[2].exercises}/>
    </>
  )
}

const Total = (props) => {
  return <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
}

const Part = (props) => {
  return <p>{props.partName} {props.partExercises}</p>
}

export default App