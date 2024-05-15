const User = require("../../models/User");
const bcrypt = require("bcrypt");

exports.register = (req, res) => {
  // Get user data from the request body
  const { name, email, password, nick } = req.body;

  if (!name || !email || !password || !nick) {
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
    });
  }

  // Check if the user already exists
  User.find({
    $or: [
      { email: email.toLowerCase() },
      { nick: nick.toLowerCase() },
    ],
  }).exec(async (err, users) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Error in the request",
      });
    }
    if (users.length >= 1) {
      return res.status(409).json({
        status: "error",
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userToSave = new User({
      ...req.body,
      password: hashedPassword,
    });

    // Save the user in the database
    userToSave.save((err, userStored) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Error saving user",
        });
      }
      return res.status(201).json({
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
