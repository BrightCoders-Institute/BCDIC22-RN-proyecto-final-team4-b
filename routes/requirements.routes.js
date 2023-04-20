const express = require('express')
const router = express.Router()
const controller = require('../controllers/requirement.controller')
const { validatePersonalReqCreate } = require('../validators/validateRequirement')

router.post('/', validatePersonalReqCreate,controller.createPersonalRequirement)
router.get('/:id',controller.getPersonalRequirements)
router.put('/:id',controller.updatePersonalRequirement)
router.put('/update/:id',controller.updateDataRequirement)
router.delete('/:id',controller.deletePersonalRequirement)

module.exports = router
