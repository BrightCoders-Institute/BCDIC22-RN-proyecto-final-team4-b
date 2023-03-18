const db = require('../db/db')
const bcryptjs = require('bcryptjs')

const loginUser = async (request, response) => {
  console.log("estoy en login")
  const { password, email } = request.body
  const [userExists] = await db.query('SELECT * FROM User WHERE email=?;', [
    email
  ])

  if (userExists.length) {
    const isMatch = await bcryptjs.compare(password, userExists[0].password)
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
