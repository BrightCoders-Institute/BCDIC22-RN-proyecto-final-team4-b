const { check } = require('express-validator')
const { validateResult } = require('../helpers/validationsHelper')

const validatePersonalReqCreate = [
  check('requirement_name')
  .exists()
  .withMessage('A requirement name is required')
  .isString(),

  check('due_date').exists().withMessage('A due date is required'),

  check('category')
    .exists()
    .withMessage('A category is required')
    .isString()
    .matches(/^[a-zA-Z ]+$/)
    .withMessage('The category can only contain letters'),

  check('wedding_id')
  .exists()
  .withMessage('A wedding_id is required'),
  (request, response, next) => {
    validateResult(request, response, next)
  }
]

module.exports = { validatePersonalReqCreate }
