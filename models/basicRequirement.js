const mongoose = require('mongoose')

const basicRequirementSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
})

const BasicRequirement = mongoose.model('BasicRequirement', basicRequirementSchema)
module.exports = BasicRequirement
