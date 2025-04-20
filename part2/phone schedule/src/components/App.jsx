import { useEffect, useState } from 'react'
import Filter from './Filter.jsx'
import PersonForm from './PersonForm.jsx'
import PersonsDisplayer from './PersonsDisplayer.jsx'
import DBservices from '../services/DBservices.jsx'


const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  let successMessage = document.getElementById("successMessage")

  const showSuccessMessage = () => {
    successMessage.style.setProperty("display", "block")
    setTimeout(() => {
      successMessage.style.setProperty("display", "none")
    }, 2000)
  }

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    DBservices.getAllPersonsData()
    .then(response => setPersons(response.data))
  }

  const registerInput = (event, mode) => {
    mode ? setNewName(event.target.value.toString()) : setNewNumber(event.target.value.toString())
    console.log(newName, newNumber)
  }

  const isRepeated = (name) => persons.some((person) => person.name === name)

  const filteredPersons = persons.filter((person) => person.name.trim().toLowerCase().includes(filter))


  const addNewPerson = (event) => {
    event.preventDefault()

    if(isRepeated(newName) && window.confirm(`${newName} is already added to the phonebook, would you like to replace the old number with a new one?`)) {
      showSuccessMessage()
      DBservices.replacePerson(`${persons.find(person => person.name === newName).id}`  ,{ name: newName, number: newNumber, id: (persons.length + 1).toString() })
      .catch(() => {
        successMessage.innerHTML = `information of ${newName} has already been removed from the server`
        successMessage.style.setProperty("color", "red")
        successMessage.style.setProperty("border", "red")
        showSuccessMessage()
      })
      .then(() => getData())
    }
    else {
      successMessage.innerHTML = `Added ${newName}`
      successMessage.style.setProperty("color", "red")
      successMessage.style.setProperty("border", "red")
      showSuccessMessage()
      DBservices.createNewPerson({ name: newName, number: newNumber, id: (persons.length + 1).toString() })
      .then(() => getData())
    }
    return
  }


  const deleteAndRefresh = (personId) => {
      if(window.confirm(`Delete ${(persons.find(person => person.id === personId).name)}?`)) {
        DBservices.deletePerson(personId)
        .then(() => console.log("borrado"))
        .then(() => getData())
      }
      return
  }

  return (
    <div>
      <Filter filterParameter={(event) => setFilter(event.target.value.trim().toLowerCase())}/>
      <h2>Phonebook</h2>
      <h3 id="successMessage"></h3>
      <PersonForm addNewPersonFunction={addNewPerson} eventListener={[(event) => registerInput(event, true), (event) => registerInput(event, false)]}/>
      <h2>Numbers</h2>
      <PersonsDisplayer filter={filter} persons={persons} filteredPersons={filteredPersons} deleteFunction={deleteAndRefresh} />
    </div>
  )
}

export default App