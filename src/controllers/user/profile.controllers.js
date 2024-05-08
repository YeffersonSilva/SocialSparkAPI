const User = require("../../models/User");


exports.profile = (req, res) => {
    // Get user id
    const userId = req.params.id;
  
    // Find user in database
    User.findById(userId)
      .select({ password: 0, role: 0 })
      .exec((err, user) => {
        if (err || !user) {
          return res.status(404).json({
            status: "error",
            message: "User not found",
          });
        }
  
        // Return user data
        return res.status(200).json({
          status: "success",
          user,
        });
      });
  };