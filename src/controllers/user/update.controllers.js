const User = require("../../models/User");
const bcrypt = require("bcrypt");

exports.update = async (req, res) => {
  try {
    // Get user data from the request body
    let userToUpdate = req.body;
    const userIdentity = req.user;

    // Remove sensitive data
    delete userToUpdate.iat;
    delete userToUpdate.exp;
    delete userToUpdate.role;
    delete userToUpdate.image;

    // Check if the user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: userToUpdate.email.toLowerCase() },
        { nick: userToUpdate.nick.toLowerCase() },
      ],
    });

    if (existingUser && existingUser._id.toString() !== userIdentity.id) {
      return res.status(409).json({
        status: "error",
        message: "User already exists",
      });
    }

    // Hash the new password if provided
    if (userToUpdate.password) {
      userToUpdate.password = await bcrypt.hash(userToUpdate.password, 10);
    }

    // Update the user in the database
    const userUpdated = await User.findByIdAndUpdate(
      userIdentity.id,
      userToUpdate,
      { new: true }
    );

    if (!userUpdated) {
      return res.status(500).json({
        status: "error",
        message: "Error updating user",
      });
    }

    // Remove the password from the response
    userUpdated.password = undefined;

    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user: userUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
