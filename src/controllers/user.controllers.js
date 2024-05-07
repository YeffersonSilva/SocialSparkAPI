const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const jwt = require("../services/jwt.js");

const testUser = (req, res) => {
  return res.status(200).json({
    message: "Hello world user",
  });
};

// Register of user
const register = (req, res) => {
  // Get data of user
  const params = req.body;
  // Check validate data
  if (!params.name || !params.email || !params.password || !params.nick) {
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
    });
  }

  // Check if user exists
  User.find({
    $or: [
      { email: params.email.toLowerCase() },
      { nick: params.nick.toLowerCase() },
    ],
  }).exec(async (err, users) => {
      if (err) {
          return res.status(500).json({
              status: "error",
              message: "Error in the request",
          });
      }
      if (users && users.length >= 1) {
          return res.status(409).json({ // Changed status code to 409 Conflict
              status: "error",
              message: "User already exists",
          });
      }
 
      // Password encryption
      const pwd = await bcrypt.hash(params.password, 10);
      const userToSave = new User({
          ...params,
          password: pwd
      });

      // Save user in database
      userToSave.save((err, userStored) => {
          if (err) {
              return res.status(500).json({
                  status: "error",
                  message: "Error saving user",
              });
          }
          // Return response excluding sensitive data
          return res.status(201).json({ // Status code changed to 201 Created
              status: "success",
              message: "User registered successfully",
              user: {
                id: userStored._id,
                name: userStored.name,
                email: userStored.email,
                nick: userStored.nick
              }
          });
      });
  });
}


const login = (req, res) => {
  // Obtener los parámetros del cuerpo de la solicitud
  let params = req.body;

  if (!params.email || !params.password) {
    return res.status(400).send({
      status: "error",
      message: "All fields are required",
    });
  }

  // Buscar usuario en la base de datos
  User.findOne({ email: params.email })
    //.select({ password: 0 })
    .exec((err, user) => {
      if (err || !user) {
        return res.status(500).json({
          status: "error",
          message: "Error in the request",
        });
      }

      //check if password is correct
      let pwd = bcrypt.compareSync(params.password, user.password);
      if (!pwd) {
        return res.status(400).json({
          status: "error",
          message: "Incorrect password",
        });
      }

       // return token
      const token= jwt.createToken(user);
      // return data is user
      
      return res.status(200).json({
        status: "success",
        message: "User logged in successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          nick: user.nick
        },
        token

      });
    });
};


const profile = (req, res) => {
  // Get user id
  const userId = req.params.id;

  // Find user in database
  User.findById(userId, (err, user) => {
      if (err || !user) {
          return res.status(404).json({
              status: "error",
              message: "User not found",
          });
      }

      // Return user data
      return res.status(200).json({
          status: "success",
          user
      });
  });
} 

module.exports = { testUser, register ,login};

    