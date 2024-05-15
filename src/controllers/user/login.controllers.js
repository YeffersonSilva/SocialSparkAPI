const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require('../../services/jwt');

exports.login = (req, res) => {
  // Get email and password from the request body
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      status: "error",
      message: "All fields are required",
    });
  }

  // Find the user by email
  User.findOne({ email })
    .exec((err, user) => {
      if (err || !user) {
        return res.status(500).json({
          status: "error",
          message: "Error in the request",
        });
      }

      // Check if the password is correct
      const pwd = bcrypt.compareSync(password, user.password);
      if (!pwd) {
        return res.status(400).json({
          status: "error",
          message: "Incorrect password",
        });
      }

      // Create a token
      const token = jwt.createToken(user);

      // Return the user data and token
      return res.status(200).json({
        status: "success",
        message: "User logged in successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          nick: user.nick,
        },
        token,
      });
    });
};
