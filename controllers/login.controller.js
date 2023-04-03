const db = require('../db/db')
const cryptojs = require('crypto-js')
const User = require('../models/user')

const loginUser = async (request, response) => {
  const { password, email } = request.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    const bytes = cryptojs.AES.decrypt(userExists.hashedPassword, process.env.CRYPTO_KEY)
    const decryptedPassword = bytes.toString(cryptojs.enc.Utf8)

    if (decryptedPassword === password) {
      response.status(200).send({ message: 'Successful login', userExists });
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
