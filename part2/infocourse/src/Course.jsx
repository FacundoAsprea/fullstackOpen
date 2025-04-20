const Course = ( { course } ) => {
    const total = course.parts.reduce((acc, part) =>  acc += part.exercises, 0)
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map((part) => {
                 return (
                    <div key={part.id}>
                    <span>{part.name} {part.exercises}</span>
                    <br></br>
                    </div>
                 )
            })}
            <span>Total of exercises {total}</span>
        </div>
    )
}

export default Course