const db = require('../db/db')
const bcryptjs = require('bcryptjs')

const getUserByEmail = async (req, res) => {
  const email = req.params.email

  const [userExists] = await db.query('SELECT * FROM User WHERE email=?;', [
    email
  ])
  if (userExists.length) {
    res.status(200).send({ message: 'User exissts', userExists })
  } else {
    res.status(400).send({ message: 'User not found' })
  }
}

const updateUser = async (request, response) => {
  const id = request.params.id
  console.log('id', id)
  const { date, partner_name, password, user_name } = request.body

  const [userExists] = await db.query('SELECT * FROM User WHERE id_user=?;', [
    id
  ])

  console.log(userExists, 'USEREXIXTS')

  if (userExists.length) {


    //const isMatch = await bcryptjs.compare(password, userExists[0].password)
    if (password===userExists[0].password) {
      console.log("es el mismo9")
      await db.query(
        'UPDATE User SET date=?, partner_name=?, password=?, user_name=? WHERE id_user=?;',
        [date, partner_name, password, user_name, id]
      )
      const [updatedUser] = await db.query(
        'SELECT * FROM User WHERE id_user=?;',
        [id]
      )

      response
        .status(200)
        .send({ user: updatedUser, message: 'User data updated' })
    } else{
      const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(password, salt)
      console.log("enos el mismo9")
      await db.query(
        'UPDATE User SET date=?, partner_name=?, password=?, user_name=? WHERE id_user=?;',
        [date, partner_name, hashedPassword, user_name, id]
      )
      const [updatedUser] = await db.query(
        'SELECT * FROM User WHERE id_user=?;',
        [id]
      )

      response
        .status(200)
        .send({ user: updatedUser, message: 'User data updated' })
    }

    
  } else {
    response.status(400).send({ message: 'User not found' })
  }
}

module.exports = {
  updateUser,
  getUserByEmail
}
