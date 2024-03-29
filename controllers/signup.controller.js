const db = require('../db/db')
const cryptojs = require('crypto-js')
const User = require('../models/user')
const Wedding=require('../models/wedding')

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
        const hashedPassword = cryptojs.AES.encrypt(
          password,
          process.env.CRYPTO_KEY
        ).toString()

        const user = new User({
          user_name,
          hashedPassword,
          email,
          date,
          partner_name
        })

        const userSaved = await user.save()

        //Creacion del wedding:
        const wedding=new Wedding({
          user_id: userSaved._id
        })

        const weddingCreated=await wedding.save()

        res.status(200).send({
          message: 'User created successfully. Please login',
          userSaved,
          weddingCreated
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
