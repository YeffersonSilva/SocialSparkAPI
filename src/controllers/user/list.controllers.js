const User = require("../../models/User");

const mongosePagination = require("mongoose-pagination");

exports.list = (req, res) => {
    // Get page
  
    const page = req.params.page ? parseInt(req.params.page) : 1;
  
    //consult with pagination
    let itemsPerPage = 5;
  
    User.find()
      .sort("_id")
      .paginate(page, itemsPerPage, (err, users, total) => {
        if (err) {
          return res.status(500).json({
            status: "error",
            message: "Error in the request",
          });
        }
        if (!users) {
          return res.status(404).json({
            status: "error",
            message: "No users to show",
          });
        }
  
        // Return user data
        return res.status(200).json({
          status: "success",
          users,
          page,
          itemsPerPage,
          total,
          pages:Math.ceil(total / itemsPerPage)
        });
      });
  };