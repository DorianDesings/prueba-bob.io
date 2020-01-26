const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')

const { mongoose } = require('./database/database')

const app = express()

//Settings
app.set('port', process.env.PORT || 4000)

//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//Routes
app.use(require('./routes/user.routes'))

//Errors
app.use((err, req, res, next) => {
    res.send({ error: err.message })
})

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})