// action test
const User = require("../models/User.js");
const bcrypt = require("bcrypt-nodejs");

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
  let userToSave = new User(params);

  // check if user exist

  User.finde({
    $or: [
      { email: userToSave.email.toLowerCase() },
      { nick: userToSave.nicktoLowerCase },
    ],
  }).exec((err, users) => {
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
    } else {
        
    }
  });
  // password encryption

  // save user in database

  // return response

  return res.status(200).json({
    status: "succes",

    message: "Register user",
    params,
    userToSave,
  });
};

const ejempñ = (module.exports = { testUser, register });
