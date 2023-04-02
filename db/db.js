const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Successful connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnection;