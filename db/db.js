const { createPool } = require('mysql2/promise')
require('dotenv').config()

const db = createPool({
  host: process.env.DB_HOST,
  port: '3306',
  user: 'admin',
  password: process.env.DB_PASSWORD,
  database: 'wedding_app_db'
})

module.exports = db
