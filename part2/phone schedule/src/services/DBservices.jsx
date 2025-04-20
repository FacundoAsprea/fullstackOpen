import axios from 'axios'

const DBservices = {
    getAllPersonsData: () => axios.get('http://localhost:3001/persons'),

    createNewPerson: (newPerson) => axios.post('http://localhost:3001/persons', newPerson),

    deletePerson: (personId) => axios.delete(`http://localhost:3001/persons/${personId}`),

    replacePerson: (personId, person) => axios.put(`http://localhost:3001/persons/${personId}`, person)
}

export default DBservices