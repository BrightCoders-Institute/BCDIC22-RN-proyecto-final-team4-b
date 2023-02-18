const express = require('express')
const router = express.Router()
const controller=require('../controllers/signup.controller')

router.get('/signup', controller.signup)

module.exports = router
