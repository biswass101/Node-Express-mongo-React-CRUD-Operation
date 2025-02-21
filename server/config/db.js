require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)
 .then(res => console.log("Mongoose is connected"))
 .catch(err => console.log(err.message))