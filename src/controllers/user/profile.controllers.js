const User = require("../../models/User");
const followService = require("../../services/followServices");

exports.profile = async (req, res) => {
  // Get the user ID from the request parameters
  const userId = req.params.id;

  try {
    // Find the user in the database
    const user = await User.findById(userId).select("-password -role");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Get information about following and followers
    const followInfo = await followService.followThisUser(req.user.sub, userId);

    // Return user data
    return res.status(200).json({
      status: "success",
      user,
      following: followInfo.following,
      follower: followInfo.follower,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error in the request",
    });
  }
};
