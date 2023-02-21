const express = require('express')
require('./db')
const app = express()
app.use(express.json())
require('dotenv').config();

const PORT = process.env.PORT


app.get('/', (request, response) => {
  response.json('Connected lo local server')
})

app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})
