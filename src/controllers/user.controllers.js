// action test
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const testUser = (req, res) => {
  return res.status(200).json({
    message: "Hello world user",
  });
};

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


  // check if user exist

  User.find({
    $or: [
      { email: params.email.toLowerCase() },
      { nick: params.nicktoLowerCase },
    ],
  }).exec(async(err, users) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Error in the request",
      });
    }
    if (users && users.length >= 1) {
      return res.status(200).send({
        status: "error",
        message: "User already exists",
      });
    } 
 
  // password encryption
    let pwd = await bcrypt.hash(params.password, 10)
    params.password = pwd;
    
    let userToSave = new User(params);

        userToSave.password = pwd;
        // save user in database
       
            // return response
            return res.status(200).json({
                status: "success",
                message: "User saved",
                userToSave,
            });
        });
  // save user in database

  // return response


};

module.exports = { testUser, register };
