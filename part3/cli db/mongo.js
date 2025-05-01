const mongoose = require('mongoose')

if (process.argv.length <= 2) {
    console.log("You must enter a password")
    process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const phone = process.argv[4]

const mongoURL = `mongodb+srv://facundoasprea09:${password}@cluster0.rildmif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(mongoURL)

const personSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
    Person.find({})
    .then(result => {
        console.log(result)
        mongoose.connection.close()
    })
}

else {
    const newPerson = new Person({
        name: personName,
        phoneNumber: phone
    })
    newPerson.save()
    .then(result => {
        console.log("Persona agregada: ", result)
        mongoose.connection.close()
    })
}
