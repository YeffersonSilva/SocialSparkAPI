const fs = require("fs");

exports.upload = (req, res) => {
  if (!req.file && !req.files) {
    return res.status(400).json({
      message: "No files uploaded",
    });
  }
  let images = req.file.originalname;

  const imageSplit = images.split(".");
  const extension = imageSplit[imageSplit.length - 1];

  if (extension !== "png" && extension !== "jpg" && extension !== "jpeg") {
    const filePath = req.filePath;
    const fileDelete = fs.unlinkSync(filePath);

    return res.status(400).json({
      status: "error",
      message: "Invalid file format",
    });
  }

  User.findOneAndUpdate(
    { _id: req.user._id },
    { image: req.file.filename },
    { new: true },
    (err, user) => {
      if (err || !userUpdated) {
        const filePath = req.filePath;
        const fileDelete = fs.unlinkSync(filePath);

        return res.status(400).json({
          status: "error",
          message: "User not found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Image uploaded successfully",
        user: user,
      });
    }
  );

  return res.status(200).json({
    message: "Upload image",
    user: req.user,
    file: req.file,
    files: req.files,
  });
};
