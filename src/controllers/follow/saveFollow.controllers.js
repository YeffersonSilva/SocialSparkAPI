const Follow = require("../../models/Follow");

exports.saveFollow = async (req, res) => {
  const userId = req.user.id;
  const { followed } = req.body;

  try {
    // Check if the follow relationship already exists
    const existingFollow = await Follow.findOne({ user: userId, followed });
    if (existingFollow) {
      return res.status(400).json({
        status: "error",
        message: "You are already following this user",
      });
    }

    // Create a new follow relationship
    const newFollow = new Follow({ user: userId, followed });
    await newFollow.save();

    return res.status(200).json({
      status: "success",
      message: "Follow saved successfully",
      follow: newFollow,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error saving the follow",
    });
  }
};
