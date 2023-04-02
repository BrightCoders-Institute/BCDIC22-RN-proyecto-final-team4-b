const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT
const db=require('./db/db')
const app = express()

app.use(express.json())

//ROUTES:
const signupRoutes = require('./routes/signup.routes')
const loginRoutes = require('./routes/login.routes')
const userRoutes = require('./routes/user.routes')

app.use('/api/v1/signup',signupRoutes)
app.use('/api/v1/login',loginRoutes)
app.use('/api/v1/user',userRoutes)

db()
app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})
