const db = require('../db/db')
const cryptojs = require('crypto-js')
const User = require('../models/user')
const PersonalReq = require('../models/personalRequirement')

const createPersonalRequirement = async (req, res) => {
  console.log('Perosnalk', req.body)
  const { requirement_name, due_date, category, notes, wedding_id } = req.body

  const personalReq = new PersonalReq({
    requirement_name,
    due_date,
    category,
    notes,
    wedding_id
  })

  const newPersonalRequirement = await personalReq.save()

  res.status(200).send({
    message: 'Requirement created successfully',
    newPersonalRequirement
  })
}

const getPersonalRequirements=async(req,res)=>{
    console.log("get")
    res.status(200).send({
        message: 'Rgerequirement created successfully',
    
      })
}

module.exports = {
  createPersonalRequirement,getPersonalRequirements
}
