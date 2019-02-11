const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}
const password = process.argv[2]

const url =
    `mongodb+srv://dbuser1:${password}@fspersons-8ddus.mongodb.net/test?retryWrites=true
  `

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

//const person = new Person({
//    name: 'test',
//    number: '123123'
//})

//person.save().then(response => {
//  console.log('person saved!');
//  mongoose.connection.close();
//})

if (process.argv.length < 4) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
} else {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(response => {
        console.log('person saved!');
        mongoose.connection.close();
    })
}