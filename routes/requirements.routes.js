const express = require('express')
const router = express.Router()
const controller = require('../controllers/requirement.controller')
const { validatePersonalReqCreate } = require('../validators/validateRequirement')

router.post('/', validatePersonalReqCreate,controller.createPersonalRequirement)
router.get('/:id',controller.getPersonalRequirements)
router.put('/:id',controller.updatePersonalRequirement)

module.exports = router
