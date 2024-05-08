const User = require("../../models/User");
const bcrypt = require("bcrypt");

// Register of user
exports.register = (req, res) => {
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
        return res.status(409).json({
          // Changed status code to 409 Conflict
          status: "error",
          message: "User already exists",
        });
      }
  
      // Password encryption
      const pwd = await bcrypt.hash(params.password, 10);
      const userToSave = new User({
        ...params,
        password: pwd,
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
        return res.status(201).json({
          // Status code changed to 201 Created
          status: "success",
          message: "User registered successfully",
          user: {
            id: userStored._id,
            name: userStored.name,
            email: userStored.email,
            nick: userStored.nick,
          },
        });
      });
    });
  };