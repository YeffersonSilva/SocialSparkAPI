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
    const params = req.body;
    // check validate data
    if (!params.name || !params.email || !params.password || !params.nick) {
        return res.status(400).json({
            status: "error",
            message: "All fields are required",
        });
    
    } 
    //create object user
    let userToSave = new User(params);
    
    // check if user exist

    // password encryption

    // save user in database

    // return response

    return res.status(200).json({
        status: "succes",

        message: "Register user",
        params,
        userToSave
    });
}

module.exports = { testUser, register};  
