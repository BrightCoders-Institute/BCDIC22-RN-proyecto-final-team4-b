const db = require('../db/db')
const mongoose = require('mongoose')
const cryptojs = require('crypto-js')
const User = require('../models/user')
const PersonalReq = require('../models/personalRequirement')
const ObjectId = mongoose.Types.ObjectId

const createPersonalRequirement = async (req, res) => {
  console.log('Perosnalk', req.body)
  const { title, date, category, note, wedding_id } = req.body

  const personalReq = new PersonalReq({
    title,
    date,
    category,
    note,
    wedding_id
  })

  const newPersonalRequirement = await personalReq.save()

  res.status(200).send({
    message: 'Requirement created successfully',
    newPersonalRequirement
  })
}

const getPersonalRequirements = async (req, res) => {
  console.log('get')
  const weddingId = req.params.id
  console.log('wedding_id', weddingId)

  try {
    const fullRequirements = await PersonalReq.find({
      wedding_id: new ObjectId(weddingId)
    })
    console.log('fullRequirements', fullRequirements)
    res.status(200).send({
      message: 'Requirement created successfully',
      fullRequirements
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({
      message: 'Error retrieving requirements'
    })
  }
}

const updatePersonalRequirement = async (req, res) => {
  console.log('####___')
  try {
    
    const query = req.query.isChecked
    const reqId = req.params.id
    console.log('####', query, reqId)
   
    const updatedRequirement = await PersonalReq.findByIdAndUpdate(
      reqId,
      { isChecked: query },
      { new: true }
    )



    res.status(200).send({
      message: 'Requirement created successfully',
      updatedRequirement
    })
  } catch (e) {}
}

module.exports = {
  createPersonalRequirement,
  getPersonalRequirements,
  updatePersonalRequirement
}
