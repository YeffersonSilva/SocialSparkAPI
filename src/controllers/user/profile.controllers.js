const User = require("../../models/User");
const followService =require("../../services/followServices")

exports.profile = (req, res) => {
    // Get user id
    const userId = req.params.id;
  
    // Find user in database
    User.findById(userId)
      .select({ password: 0, role: 0 })
      .exec(async(err, user) => {
        if (err || !user) {
          return res.status(404).json({
            status: "error",
            message: "User not found",
          });
        }
  
        //info about following and followers
        const followInfo =await followService.followThisUser(req.user.sub, userId);

        // Return user data
        return res.status(200).json({
          status: "success",
          user,
          following: followInfo.following,
          follower: followInfo.follower
        });
      });
  };