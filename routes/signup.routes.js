const express = require('express')
const router = express.Router()
const controller = require('../controllers/signup.controller')
const { validateCreateAccount } = require('../validators/validateCreateAccount.js')
const { validateSignup } = require('../validators/validateSignup.js')

router.post('/signup', validateSignup, controller.createUser)
router.post('/account',validateCreateAccount, controller.createAccount)

module.exports = router
