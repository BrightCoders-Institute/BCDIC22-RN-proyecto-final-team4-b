const { check } = require('express-validator')
const { validateResult } = require('../helpers/validationsHelper')

const validatePersonalReqCreate = [
  check('title').exists().withMessage('A title is required').isString(),

  check('date').exists().withMessage('A due date is required'),

  check('category')
    .exists()
    .withMessage('A category is required')
    .isString()
    .withMessage('A category is required'),

  check('wedding_id').exists().withMessage('A wedding_id is required'),

  (request, response, next) => {
    validateResult(request, response, next)
  }
]

module.exports = { validatePersonalReqCreate }
