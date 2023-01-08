const express = require('express')
const mongoose = require('mongoose')
const trackerRoutes = require('./routes/trackers')
const cors = require('cors')
require('dotenv').config()

// Mongoose new release
mongoose.set('strictQuery', false)

// express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => { // see what routes are being used
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/trackers', trackerRoutes)

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// connect to db
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to DB')
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Listening for requests on PORT: ${process.env.PORT}.`)
            console.log(`Please visit: http://localhost:${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })

// retrive documents from db
// function getData(callback) {
//     collection.find({}).toArray((err, docs) => {
//         callback(docs)
//     })
// }
