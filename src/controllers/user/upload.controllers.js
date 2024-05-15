const fs = require("fs");
const User = require("../../models/User");

exports.upload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: "error",
      message: "No files uploaded",
    });
  }

  // Split the filename to get the extension
  const imageSplit = req.file.originalname.split(".");
  const extension = imageSplit[imageSplit.length - 1];

  // Validate the file extension
  if (!["png", "jpg", "jpeg"].includes(extension)) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({
      status: "error",
      message: "Invalid file format",
    });
  }

  // Update the user's profile image
  User.findByIdAndUpdate(
    req.user._id,
    { image: req.file.filename },
    { new: true },
    (err, userUpdated) => {
      if (err || !userUpdated) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({
          status: "error",
          message: "User not found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Image uploaded successfully",
        user: userUpdated,
      });
    }
  );
};
