const db = require('../db/db')
const bcryptjs = require('bcryptjs')
const User=require('../models/user')

const loginUser = async (request, response) => {
  const { password, email } = request.body

  const userExists=await User.findOne({ email })

  if (userExists) {
    console.log("PASSWORD",userExists)
    const isMatch = await bcryptjs.compare(password, userExists.hashedPassword)
    if (isMatch) {
      response.status(200).send({ message: 'Successful login' ,userExists})
    } else {
      response.status(400).send({ message: 'Wrong password' })
    }
  } else {
    response.status(400).send({ message: 'User not found' })
  }
}

module.exports = {
  loginUser
}
