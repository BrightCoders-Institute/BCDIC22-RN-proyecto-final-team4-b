const express = require('express')
require('./db')
const app = express()
app.use(express.json())
require('dotenv').config();
const PORT = process.env.PORT
//ROUTES:
const routes=require('./routes/signup.routes')
app.use(routes)

app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})
