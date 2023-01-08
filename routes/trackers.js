const express = require('express')
const Tracker = require('../models/trackerModel')
const { getTracker, getTrackers, createTracker, deleteTracker, updateTracker } = require('../controllers/trackerController.js')

const router = express.Router()

// @desc    GET all weights
// @route   /api/trackers/
router.get('/', getTrackers) 

// @desc    GET single weight
// @route   /api/trackers/:id
router.get('/:id', getTracker)

// @desc    POST new weight
// @route   /api/trackers/
router.post('/', createTracker) 

// @desc    DELETE weight
// @route   /api/trackers/:id
router.delete('/:id', deleteTracker)

// @desc    PATCH new weight
// @route   /api/trackers/:id
router.patch('/:id', updateTracker)

module.exports = router
