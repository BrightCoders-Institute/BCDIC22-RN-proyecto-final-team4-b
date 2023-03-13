const express = require('express')
const router = express.Router()
const controller = require('../controllers/signup.controller')
const { validateCreate,validateCreateAccount } = require('../validators/validateCreateAccount.js')

//router.post('/signup', validateCreate, controller.createUser)
router.post('/account',validateCreateAccount, controller.createAccount)

module.exports = router
