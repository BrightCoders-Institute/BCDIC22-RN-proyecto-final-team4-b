const db = require('../db/db')
const bcryptjs = require('bcryptjs')

let createAccountScreenInfo = null

const createAccount = (request, response) => {
  const { user_name, date, partner_name } = request.body
  console.log('Estoy en account back', user_name, partner_name, date)
  createAccountScreenInfo = {
    user_name: user_name,
    partner_name: partner_name,
    date: date
  }

  if (user_name && partner_name && date) {
    response.status(200).send({ message: 'Data saved' })
  } else {
    response.status(400).send({ message: 'Please fill all the fields to continue' })
  }

  console.log('createAccountScreenInfo', createAccountScreenInfo)
}

const createUser = async (req, res) => {
  const { user_name, partner_name, date,password, confirmPassword, email } = req.body
  console.log(
    'estoy en signup back',
    'passwrod',
    password,
    'passwrodConfirm',
    confirmPassword,
    'email',
    email
  )

  const [alreadyExists] = await db.query('SELECT * FROM User WHERE email=?', [
    email
  ])

  if (alreadyExists.length) {
    res.status(409).send({ message: 'User already exists' })
  } else {
    //encriptar clave:
    if (password === confirmPassword) {
      console.log('E NOPXISTS____', alreadyExists)
      try {
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const [rows] = await db.query(
          'INSERT INTO User (user_name, password, email, date, partner_name) VALUES(?,?,?,?,?)',
          [user_name, hashedPassword, email, date, partner_name]
        )
        res.status(200).send({
          id: rows.insertId,
          user_name,
          hashedPassword,
          email,
          date,
          partner_name,
          message: 'User created successfully'
        })
      } catch (error) {
        console.error(error)
        res
          .status(500)
          .send({ message: 'An error occurred while hashing the password' })
      }
    } else {
      res.status(400).send({ message: 'The passwords must match' })
    }
  }
}

module.exports = {
  createAccount,
  createUser
}
