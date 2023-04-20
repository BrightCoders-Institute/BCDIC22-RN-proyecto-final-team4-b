const db = require('../db/db')
const mongoose = require('mongoose')
const cryptojs = require('crypto-js')
const User = require('../models/user')
const PersonalReq = require('../models/personalRequirement')
const ObjectId = mongoose.Types.ObjectId

const createPersonalRequirement = async (req, res) => {
  const { title, date, category, note, wedding_id, icon } = req.body

  const personalReq = new PersonalReq({
    title,
    date,
    category,
    note,
    wedding_id,
    icon
  })

  const newPersonalRequirement = await personalReq.save()

  res.status(200).send({
    message: 'Requirement created successfully',
    newPersonalRequirement
  })
}

const getPersonalRequirements = async (req, res) => {
  const weddingId = req.params.id

  try {
    const fullRequirements = await PersonalReq.find({
      wedding_id: new ObjectId(weddingId)
    })

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
  try {
    const query = req.query.isChecked
    const reqId = req.params.id

    const updatedRequirement = await PersonalReq.findByIdAndUpdate(
      reqId,
      { isChecked: query },
      { new: true }
    )
    
    res.status(200).send({
      message: 'Requirement status updated successfully',
      updatedRequirement
    })
  } catch (e) {
    console.error(err)
    res.status(500).send({
      message: 'Error updating the requirement'
    })
  }
}

const updateDataRequirement = async (req, res) => {
  console.log("uipdated ata")
  try {
    const reqId = req.params.id
    console.log(req.body, "length")

    if (req.body) {
      const updatedRequirement = await PersonalReq.findByIdAndUpdate(
        reqId,
        req.body, 
        { new: true }
      )

      res.status(200).send({
        message: 'Requirement updated successfully',
        updatedRequirement
      })
    }else{
      res.status(400).send({
        message: 'You must provide data to update'
      })
    }
  } catch (e) {
    console.error(e)
    res.status(500).send({
      message: 'Error updating the requirement'
    })
  }
}

const deletePersonalRequirement = async (req, res) => {
  console.log('Delete api____')
  try {
    const reqId = req.params.id

    const deletedRequirement = await PersonalReq.findByIdAndDelete(reqId)

    if (!deletedRequirement) {
      return res.status(404).send({
        message: 'Requirement not found'
      })
    }

    res.status(200).send({
      message: 'Requirement deleted successfully',
      deletedRequirement
    })
  } catch (e) {
    console.error(e)
    res.status(500).send({
      message: 'Error deleting requirement',
      error: e
    })
  }
}

module.exports = {
  createPersonalRequirement,
  getPersonalRequirements,
  updatePersonalRequirement,
  deletePersonalRequirement,
  updateDataRequirement
}
