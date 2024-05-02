const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/socialnetwork'); 
        console.log('Connected to database');


    } catch (error) {
        console.log(error);
        throw new Error('Error to connect to database');
    }
}
module.exports = connection;