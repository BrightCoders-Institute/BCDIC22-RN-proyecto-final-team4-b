const mongoose = require('mongoose')

const weddingSchema = new mongoose.Schema({
  image1: {
    type: String
  },
  image2: {
    type: String
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  }
})

const Wedding = mongoose.model('Wedding', weddingSchema)
module.exports = Wedding
