const { check } = require('express-validator')
const { validateResult } = require('../helpers/validationsHelper')

const validateSignup = [
    check('password')
    .exists()
    .isLength({ min: 8 })
    .withMessage('The password must be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('The password must contain at least one uppercase letter')
    .matches(/[0-9]/)
    .withMessage('The password must contain at least one number'),

  check('email')
    .exists()
    .isEmail()
    .withMessage('Please enter a valid email address'),


  (request, response, next) => {
    validateResult(request, response, next)
  }
]

module.exports = { validateSignup }
