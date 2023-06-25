const {getChats, addMessage} = require('../controllers/chats')

const express = require('express')
const router = express.Router()

router.post('/getChats', getChats)

router.post('/addMessage', addMessage)

module.exports = router