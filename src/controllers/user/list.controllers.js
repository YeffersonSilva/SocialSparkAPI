const User = require("../../models/User");
const followService = require("../../services/followServices");
const mongosePagination = require("mongoose-pagination");

exports.list = async (req, res) => {
  // Get the page number from the request parameters or default to 1
  const page = parseInt(req.params.page) || 1;
  const itemsPerPage = 5;

  try {
    // Find users with pagination
    const users = await User.find().sort("_id").paginate(page, itemsPerPage);
    const total = await User.countDocuments();
    if (!users.length) {
      return res.status(404).json({
        status: "error",
        message: "No users to show",
      });
    }

    // Get information about following and followers
    const followInfo = await followService.followThisUser(req.user.sub, userId);

    // Return user data with pagination info
    return res.status(200).json({
      status: "success",
      users,
      page,
      itemsPerPage,
      total,
      pages: Math.ceil(total / itemsPerPage),
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
