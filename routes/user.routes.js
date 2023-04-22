const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller')
const { validateUserUpdate } = require('../validators/validateUser.js')

router.get('/:email', controller.getUserByEmail)
router.patch('/:id', validateUserUpdate, controller.updateUser)
router.put('/images/:id', controller.updateImages)
router.get('/wedding/:id', controller.getWeddingById)

module.exports = router
 