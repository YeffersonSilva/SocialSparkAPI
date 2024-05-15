const Follow = require("../../models/Follow");
const User = require("../../models/User");

exports.follow = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // Check if the user to be followed exists
    const userToFollow = await User.findById(id);
    if (!userToFollow) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Check if the follow relationship already exists
    const existingFollow = await Follow.findOne({ user: userId, followed: id });
    if (existingFollow) {
      return res.status(400).json({
        status: "error",
        message: "You are already following this user",
      });
    }

    // Create a new follow relationship
    const newFollow = new Follow({ user: userId, followed: id });
    await newFollow.save();

    return res.status(200).json({
      status: "success",
      message: "You are now following this user",
      follow: newFollow,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error following the user",
    });
  }
};
