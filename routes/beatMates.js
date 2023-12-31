const {addBeatMate, removeBeatmate, getBeatMates} = require('../controllers/beatmates')
const express = require('express')
const router = express.Router()

router.post('/addBeatMate', addBeatMate)

router.post('/removeBeatMate', removeBeatmate)

router.post('/getBeatMates', getBeatMates)

module.exports = router