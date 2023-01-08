const mongoose = require('mongoose')

const Schema = mongoose.Schema

const trackerSchema = new Schema({
    weight: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Tracker', trackerSchema)
