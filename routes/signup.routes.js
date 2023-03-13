const express = require('express')
const router = express.Router()
const controller = require('../controllers/signup.controller')
const { validateSignup } = require('../validators/validateSignup.js')

router.post('/signup', validateSignup, controller.createUser)

module.exports = router
