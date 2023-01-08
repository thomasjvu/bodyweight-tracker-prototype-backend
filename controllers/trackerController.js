const Tracker = require('../models/trackerModel');
const mongoose = require('mongoose')

// READ (all) bodyweight tracker
const getTrackers = async (req, res) => {
    const trackers = await Tracker.find({}).sort({ createdAt: -1 });

    res.status(200).json(trackers);
};

// READ (single) bodyweight tracker
const getTracker = async (req, res) => {
    const { id } = req.params;

    // checks if ID is not valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such bodyweight tracker' })
    }

    const tracker = await Tracker.findById(id);

    if (!tracker) {
        return res.status(404).json({ error: 'No such bodyweight tracker' });
    }

    res.status(200).json(tracker);
};

// CREATE new bodyweight tracker
const createTracker = async (req, res) => {
    const { weight, date } = req.body;

    let emptyFields = []
    if (!weight) {
        emptyFields.push('weight')
    }
    if (!date) {
        emptyFields.push('date')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    // add document to db collection
    try {
        const tracker = await Tracker.create({ weight, date });
        res.status(200).json(tracker);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE a bodyweight tracker
const deleteTracker = async (req, res) => {
    const { id } = req.params

    // check if ID is not valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such bodyweight tracker' })
    }

    const tracker = await Tracker.findOneAndDelete({_id: id})

    if (!tracker) {
        return res.status(404).json({ error: 'No such bodyweight tracker' })
    }

    res.status(200).json(tracker)

}

// UPDATE a bodyweight tracker
const updateTracker = async (req, res) => {
    const { id } = req.params

    // check if ID is not valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such bodyweight tracker' })
    }

    const tracker = await Tracker.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!tracker) {
        return res.status(404).json({ error: 'No such bodyweight tracker' })
    }

    res.status(200).json(tracker)
}

module.exports = { getTrackers, getTracker, createTracker, deleteTracker, updateTracker };
