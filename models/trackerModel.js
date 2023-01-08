const mongoose = require('mongoose')

const Schema = mongoose.Schema

const trackerSchema = new Schema({
    weight: {
        type: Number,
        min: 0,
        max: 1000,
        required: true
    },
    date: {
        type: Date,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Tracker', trackerSchema)
