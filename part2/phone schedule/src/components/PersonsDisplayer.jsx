const PersonsDisplayer = ( {filter, persons, filteredPersons, deleteFunction} ) => {

    return (
        <ol>
        { 
        filter === '' ? 
        persons.map((person) => <li key={person.id}>{person.name} {person.number}<button onClick={() => {deleteFunction(person.id)}}>delete</button></li>) :
        filteredPersons.map((person) => <li key={person.id}>{person.name} {person.number}<button onClick={() => deleteFunction(person.id)}>delete</button></li>)
          }
      </ol>
    )
}
export default PersonsDisplayer