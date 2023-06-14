const express = require('express')
const {login} = require('../controllers/login_1')
//const {logout} = require('../controllers/logout')
//const {register_g, register_p} = require('../controllers/register.js')
const { getUser } = require('../controllers/getUser')

const router =  express.Router()

router.post('/getUser', getUser)

router.post('/login', login)

module.exports = router