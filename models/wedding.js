const mongoose = require('mongoose')

const weddingSchema = new mongoose.Schema({
  image1: {
    type: String,
    default: ''
  },
  image2: {
    type: String,
    default: ''
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Wedding = mongoose.model('Wedding', weddingSchema)
module.exports = Wedding
