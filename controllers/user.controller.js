const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const cryptojs = require('crypto-js')
const User = require('../models/user')
const Wedding = require('../models/wedding')
const { converToBase64 } = require('../helpers/convertoToBase64')

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
      id: userExists._id,
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
    const objectId = new ObjectId(id)
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

const updateImages = async (request, response) => {
  const id = request.params.id
  const { image1, image2 } = request.body

  try {
    const objectId = new ObjectId(id)
    const weddingExists = await Wedding.findById(objectId)

    if (weddingExists) {
      if (request.body[0] !== null) {
        weddingExists.set({ image1: request.body[0] })
      }
      if (request.body[1] !== null) {
        weddingExists.set({ image2: request.body[1] })
      }

      const savedImages = await weddingExists.save()

      response.status(200).send({ user: savedImages, message: 'Image updated' })
    } else {
      response.status(400).send({ message: 'User not found' })
    }
  } catch (error) {
    response.status(500).send({ message: error.message })
  }
}

const getWeddingById = async (request, response) => {
  const id = request.params.id

  try {
    const objectId = new ObjectId(id)
    const weddingExists = await Wedding.findById(objectId)

    if (weddingExists) {
      response
        .status(200)
        .send({ weddingExists, message: 'Wedding info retrieved' })
    } else {
      response.status(400).send({ message: 'Wedding not found' })
    }
  } catch (error) {
    response.status(500).send({ message: error.message })
  }
}

module.exports = {
  updateUser,
  getUserByEmail,
  updateImages,
  getWeddingById
}
