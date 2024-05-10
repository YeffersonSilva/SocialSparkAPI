

const fs = require("fs");
const path = require("path");


exports.avatar =  (req, res) => {
  // push params to variables

  const file = req.params.file;

  // real path to file
  const filePath = "./src/uploads/avatars/" + file;

    fs.stat(filePath, (error, exists) => {
   
    if (!exists) {
        return res.status(404).send({ error: "File not found" });
    }

      // Si no es un archivo, por ejemplo, si es un directorio
      return res.sendFile(path.resolve(filePath));
    
  });
};
// check if file exists

// get is file