const db = require('../db/db')
const {validateCreate}=require('../validators/signupValidator')

const createUser = async (req, res) => {
  const { user_name, password, email } = req.body
  const [rows] = await db.query(
    'INSERT INTO User (user_name, password, email) VALUES(?,?,?)',
    [user_name, password, email]
  )
  res.send({
    id: rows.insertId,
    user_name,
    password,
    email
  })
}

module.exports = {
  createUser
}
