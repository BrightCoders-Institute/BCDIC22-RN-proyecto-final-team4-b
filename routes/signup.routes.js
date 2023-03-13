const express = require('express')
const router = express.Router()
const controller = require('../controllers/signup.controller')
const { validateCreate } = require('../validators/signupValidator')

router.post('/signup', validateCreate, controller.createUser)
router.post('/create',controller.createAccount)

module.exports = router
