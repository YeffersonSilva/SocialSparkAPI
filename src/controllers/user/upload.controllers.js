
exports.upload = (req, res) => {
    return res.status(200).json({
        message: "Upload image",
        user: req.user,
        file: req.file,
        files: req.files
    });
  }
  