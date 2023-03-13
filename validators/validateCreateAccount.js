const { check } = require('express-validator')
const { validateResult } = require('../helpers/validationsHelper')

const validateCreateAccount = [
  check('user_name')
    .exists()
    .not()
    .isEmpty()
    .withMessage('You must provide your name to continue')
    .isString()
    .matches(/^[^0-9]*$/)
    .withMessage('The name must not contain numbers'),

  check('partner_name')
    .exists()
    .not()
    .isEmpty()
    .withMessage('You must provide your partners name to continue')
    .isString()
    .matches(/^[^0-9]*$/)
    .withMessage('The partners name must not contain numbers'),


  (request, response, next) => {
    validateResult(request, response, next)
  }
]

module.exports = { validateCreateAccount }
