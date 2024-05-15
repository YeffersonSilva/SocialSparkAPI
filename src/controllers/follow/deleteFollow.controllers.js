const Follow = require("../../models/Follow");

exports.unfollow = async (req, res) => {
  const userId = req.user.id;
  const followedId = req.params.id;

  try {
    // Find and remove the follow relationship
    const follow = await Follow.findOneAndRemove({ user: userId, followed: followedId });

    if (!follow) {
      return res.status(404).json({
        status: "error",
        message: "Follow relationship not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "You have unfollowed this user",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error unfollowing the user",
    });
  }
};
