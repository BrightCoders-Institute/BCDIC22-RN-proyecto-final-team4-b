const mongoose = require('mongoose')

const personalReqSchema = new mongoose.Schema({
  requirement_name: {
    type: String,
    required:true
  },
  due_date:{
    type: Date
  },
  category:{
    type: String,
    required:true
  },
  notes: {
    type: String
  },
  wedding_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wedding',
    required:true
  }
})

const PersonalReq = mongoose.model('PersonalReq', personalReqSchema)
module.exports = PersonalReq
