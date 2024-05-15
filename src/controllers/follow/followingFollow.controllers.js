const Follow = require("../../models/Follow");
const followServices = require("../../services/followServices");
const mongoosePaginate = require("mongoose-pagination");

exports.following = async (req, res) => {
  let userId = req.params.id || req.user.id;
  let page = req.params.page || 1;
  const itemsPerPage = 5;

  try {
    // Find following users with pagination
    const follows = await Follow.find({ user: userId })
      .populate("user followed", "-password -role -__v")
      .paginate(page, itemsPerPage);

    if (!follows.length) {
      return res.status(404).json({
        status: "error",
        message: "You are not following any users",
      });
    }

    // Get follow information
    const followUserIds = await followServices(req.user.id);

    return res.status(200).json({
      status: "success",
      total: follows.total,
      pages: Math.ceil(follows.total / itemsPerPage),
      follows,
      users_following: followUserIds.following,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error fetching following users",
    });
  }
};
