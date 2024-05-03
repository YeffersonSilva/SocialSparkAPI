// action test
const User = require("../models/User.js");


const testUser = (req, res) => {
    return res.status(200).json({
        message: "Hello world user"
    });
}

// Register of user 
const register = (req, res) => {
    //get data of user
    const {name, surname, nick, email, password} = req.body;
    // check validate data

    // check if user exist

    // password encryption

    // save user in database

    // return response

    return res.status(200).json({
        message: "Register user",
        params
    });
}

module.exports = { testUser, register};  
