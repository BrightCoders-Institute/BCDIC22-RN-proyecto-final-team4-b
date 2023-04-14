const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  date: {
    type: Date,
    required: true
  },
  partner_name: {
    type: String,
    required: true,
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User