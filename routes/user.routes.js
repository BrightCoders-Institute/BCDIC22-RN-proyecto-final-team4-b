const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller')
const { validateUserUpdate } = require('../validators/validateUser.js')

router.get('/:email', controller.getUserByEmail)
router.patch('/:id',validateUserUpdate, controller.updateUser)

module.exports = router
