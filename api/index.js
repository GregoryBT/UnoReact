require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT || 6666
const UsersRoutes = require('./routes/users')

// database connection
require('./config/database')

app.use(cors())
//sdqs
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// routes
app.use('/users', UsersRoutes)

// server running status
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`The app listening at http://localhost: ${PORT}`)
})