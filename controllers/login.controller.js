const db = require('../db/db')

const getResult = async (req, res) => {
  const [result] = await db.query('SELECT 1+1 AS result')
  res.json(result[0])
}

const putResult = (req, res) => {
  res.json('hola')
}

module.exports = {
  getResult,
  putResult
}
