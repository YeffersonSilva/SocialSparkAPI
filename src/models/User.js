const {Schema,model} = require('mongoose');


const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
    },
    nick: {
        type: String,
        unique: true,
        required: true
    },


    email: {
        type: String,
        required: true
    },