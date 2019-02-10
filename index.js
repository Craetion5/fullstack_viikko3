const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(express.static('build'))


let ppl = [
    {
        id: 1,
        name: 'me',
        number: '523253',
    },
    {
        id: 2,
        name: 'you',
        number: '234242',
    },
    {
        id: 3,
        name: 'idk who',
        number: '92323267',
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(ppl)
})

app.get('/info', (req, res) => {
    res.send('puhelinluettelossa ' + ppl.length + ' henkilön tiedot</br></br>' + Date(Date.now()).toString())
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = ppl.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    ppl = ppl.filter(person => person.id !== id);

    response.status(204).end();
});

app.post('/api/persons', (request, response) => {

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    const body = request.body
    console.log(body)

    if (body.name === undefined) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (body.number === undefined) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    ppl2 = ppl.filter(person => person.name === body.name);
    if (!(!Array.isArray(ppl2) || !ppl2.length)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: getRandomInt(99999),
        name: body.name,
        number: body.number
    }
    ppl = ppl.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
