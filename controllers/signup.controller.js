const db = require('../db/db')
const bcryptjs = require('bcryptjs')

const createUser = async (req, res) => {
  const { user_name, partner_name, date,password, confirmPassword, email } = req.body
  const [alreadyExists] = await db.query('SELECT * FROM User WHERE email=?', [
    email
  ])

  if (alreadyExists.length) {
    res.status(409).send({ message: 'User already exists' })
  } else {
    //encriptar clave:
    if (password === confirmPassword) {
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
  createUser
}
