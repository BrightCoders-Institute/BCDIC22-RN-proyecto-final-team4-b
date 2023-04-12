const db = require('../db/db')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')

const createUser = async (req, res) => {
  const { user_name, partner_name, date, password, confirmPassword, email } =
    req.body

  const alreadyExists = await User.findOne({ email })

  if (alreadyExists) {
    res.status(409).send({ message: 'User already exists' })
  } else {
    //encriptar clave:
    if (password === confirmPassword) {
      try {
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const user = new User({
          user_name,
          hashedPassword,
          email,
          date,
          partner_name
        })

        const userSaved = await user.save()

        res.status(200).send({
          message: 'User created successfully',
          userSaved
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
