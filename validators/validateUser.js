const { check } = require('express-validator')
const { validateResult } = require('../helpers/validationsHelper')

const validateUserUpdate = [
  check('partner_name')
    .exists()
    .withMessage('A partner name is required')
    .isString()
    .matches(/^[a-zA-Z]+$/)
    .withMessage('The partner name can only contain letters'),

  check('user_name')
    .exists()
    .withMessage('A user name is required')
    .isString()
    .matches(/^[a-zA-Z]+$/)
    .withMessage('The user name can only contain letters'),

  check('date').exists().withMessage('A wedding date is required'),

  check('password')
    .exists()
    .isLength({ min: 8 })
    .withMessage('The password must be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('The password must contain at least one uppercase letter')
    .matches(/[0-9]/)
    .withMessage('The password must contain at least one number'),

  (request, response, next) => {
    validateResult(request, response, next)
  }
]

module.exports = { validateUserUpdate }
