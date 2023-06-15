const express = require('express')
const {register, refresh} = require('../controllers/login_1')
//const {logout} = require('../controllers/logout')
//const {register_g, register_p} = require('../controllers/register.js')

const router =  express.Router()

router.post('/register', register)

router.post('/refresh', refresh)

module.exports = router