const db = require('../db/db')
const { validateCreate } = require('../validators/signupValidator')

const createUser = async (req, res) => {
  const { user_name, password, email, date, partner_name } = req.body

  const [alreadyExists] = await await db.query(
    'SELECT * FROM User WHERE user_name=?',
    [user_name]
  )
  console.log('alreadyExists', alreadyExists)
  if (alreadyExists.length) {
    res.status(409).send({ message: 'User already exists' })
  } else {
    //encriptar claev:
    //const passwordToHash = await encrypt(password)

    const [rows] = await db.query(
      'INSERT INTO User (user_name, password, email, date, partner_name) VALUES(?,?,?,?,?)',
      [user_name, password, email, date, partner_name]
    )
    res.send({
      id: rows.insertId,
      user_name,
      password,
      email,
      date,
      partner_name
    })
  }
}

module.exports = {
  createUser
}
