const mongoose = require('mongoose')

const personalReqSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  icon:{
    type:String
  },
  date:{
    type: Date
  },
  category:{
    type: String
  },
  note: {
    type: String
  },
  isChecked:{
    type: Boolean,
    default:false
  },
  wedding_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wedding',
    required:true
  }
})

const PersonalReq = mongoose.model('PersonalReq', personalReqSchema)
module.exports = PersonalReq
