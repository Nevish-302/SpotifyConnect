const {getCompatiability} = require('../controllers/getCompatiability')

const express = require('express')
const router = express.Router()

router.post('/getCompatiability', getCompatiability)

module.exports = router
