const mongoose = require('mongoose');

const connection = async () => {
    try {
        const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/socialnetwork';
        await mongoose.connect(dbUri);
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
        throw new Error('Error to connect to database');
    }
}

module.exports = connection;
