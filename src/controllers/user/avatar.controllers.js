const fs = require("fs");
const path = require("path");

exports.avatar = (req, res) => {
  // Get the file parameter from the request
  const file = req.params.file;
  // Construct the file path
  const filePath = path.join(__dirname, "../uploads/avatars", file);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (error) => {
    if (error) {
      return res.status(404).send({ error: "File not found" });
    }
    // Send the file if it exists
    return res.sendFile(path.resolve(filePath));
  });
};
