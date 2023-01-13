const express = require('express')
const mongoose = require('mongoose')
const trackerRoutes = require('./routes/trackers')
const cors = require('cors')
const connectDB = require("./config/db");

// Load config
require('dotenv').config({ path: "./config/.env" });

// Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Logging
app.use((req, res, next) => { // see what routes are being used
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/trackers', trackerRoutes)
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// Mongoose new release
mongoose.set('strictQuery', false)

// Connect to DB
connectDB()

// Listen for Requests
app.listen(process.env.PORT, () => {
    console.log(`Listening for requests on PORT: ${process.env.PORT}.`)
    console.log(`Please visit: http://localhost:${process.env.PORT}`)
})


// etc, retrive documents from db
// function getData(callback) {
//     collection.find({}).toArray((err, docs) => {
//         callback(docs)
//     })
// }
