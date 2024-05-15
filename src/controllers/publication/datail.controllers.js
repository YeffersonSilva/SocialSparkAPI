const Publication = require("../../models/Publication");

// Get the details of a specific publication
const detail = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the publication by ID and populate the user data
    const publication = await Publication.findById(id).populate("user");
    if (!publication) {
      return res.status(404).send({
        status: "error",
        message: "Publication not found",
      });
    }
    return res.status(200).send({
      status: "success",
      publication,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error finding the publication",
    });
  }
};

module.exports = detail;
