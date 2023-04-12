const express = require('express')
const router = express.Router()
const controller = require('../controllers/requirement.controller')
const { validatePersonalReqCreate } = require('../validators/validateRequirement')

router.post('/', validatePersonalReqCreate,controller.createPersonalRequirement)
router.get('/',controller.getPersonalRequirements)

module.exports = router
