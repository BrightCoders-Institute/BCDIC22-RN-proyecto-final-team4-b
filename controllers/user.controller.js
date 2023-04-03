const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const cryptojs = require('crypto-js')
const User = require('../models/user')

const getUserByEmail = async (req, res) => {
  const email = req.params.email

  const userExists = await User.findOne({ email })

  if (userExists) {
    const date = new Date(userExists.date)
    const formattedDate = date.toLocaleDateString('en-GB')
    const bytes = cryptojs.AES.decrypt(
      userExists.hashedPassword,
      process.env.CRYPTO_KEY
    )
    const decryptedPassword = bytes.toString(cryptojs.enc.Utf8)

    const userToShow = {
      id:userExists._id,
      user_name: userExists.user_name,
      hashedPassword: decryptedPassword,
      email: userExists.email,
      date: formattedDate,
      partner_name: userExists.partner_name
    }

    res.status(200).send({ message: 'User exists', userToShow })
  } else {
    res.status(400).send({ message: 'User not found' })
  }
}

const updateUser = async (request, response) => {
  const id = request.params.id
  const { date, partner_name, hashedPassword, user_name } = request.body

  try {
    const objectId = new ObjectId(id);
    const userExists = await User.findById(objectId)

    if (userExists) {
      const bytes = cryptojs.AES.decrypt(
        userExists.hashedPassword,
        process.env.CRYPTO_KEY
      )
      const decryptedPassword = bytes.toString(cryptojs.enc.Utf8)

      const dateString = date
      const dateObj = new Date(dateString)
      const isoString = dateObj.toISOString()

      if (hashedPassword === decryptedPassword) {
        userExists.date = isoString
        userExists.partner_name = partner_name
        userExists.user_name = user_name

        await userExists.save()

        response
          .status(200)
          .send({ user: userExists, message: 'User data updated' })
      } else {
        const _hashedPassword = cryptojs.AES.encrypt(
          hashedPassword,
          process.env.CRYPTO_KEY
        ).toString()

        userExists.date = isoString
        userExists.partner_name = partner_name
        userExists.hashedPassword = _hashedPassword
        userExists.user_name = user_name

        await userExists.save()

        response
          .status(200)
          .send({ user: userExists, message: 'User data updated' })
      }
    } else {
      response.status(400).send({ message: 'User not found' })
    }
  } catch (error) {
    response.status(500).send({ message: error.message })
  }
}

module.exports = {
  updateUser,
  getUserByEmail
}
