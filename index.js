const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3000

app.get('/',(request,repsonse)=>{
    repsonse.json("Connected lo local server")
})

app.listen(PORT, () => {
  console.log('Server running on port', PORT)
  
})
