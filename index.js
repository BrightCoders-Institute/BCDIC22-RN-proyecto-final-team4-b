const express = require('express')
require('./db')
const app = express()
app.use(express.json())

const PORT = 3000

app.get('/', (request, response) => {
  response.json('Connected lo local server')
})

app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})
