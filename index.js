const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT
require('./models/User')

const app = express()

app.use(express.json())

//ROUTES:
const signupRoutes = require('./routes/signup.routes')
const loginRoutes = require('./routes/login.routes')
app.use(signupRoutes)
app.use(loginRoutes)

app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})
