require('./config/db')
const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user.route')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/', userRouter)

module.exports = app