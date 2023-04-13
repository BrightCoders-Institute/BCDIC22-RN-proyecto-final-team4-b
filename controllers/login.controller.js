const mongoose = require('mongoose');
const cryptojs = require('crypto-js')
const User = require('../models/user')
const Wedding=require('../models/wedding')
const PersonalReq=require('../models/personalRequirement')

const ObjectId = mongoose.Types.ObjectId;

const loginUser = async (request, response) => {
  const { password, email } = request.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    const bytes = cryptojs.AES.decrypt(userExists.hashedPassword, process.env.CRYPTO_KEY)
    const decryptedPassword = bytes.toString(cryptojs.enc.Utf8)
    const user_id_look=userExists._id
    const wedding=await Wedding.findOne({ user_id: user_id_look })

    //COnsulta los requerimentos con el wedding ID:
    const fullRequirements=await PersonalReq.find({wedding_id:wedding._id})
    console.log("fullRequirements",fullRequirements)


    if (decryptedPassword === password) {
      response.status(200).send({ message: 'Successful login', userExists, wedding: wedding, requirements: fullRequirements});
    } else {
      response.status(400).send({ message: 'Wrong password' });
    }
  } else {
    response.status(400).send({ message: 'User not found' });
  }
};

module.exports = {
  loginUser
}
 