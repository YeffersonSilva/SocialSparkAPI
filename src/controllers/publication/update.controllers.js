const Publication = require("../../models/Publication");

// Update a specific publication
const updatePublication = async (req, res) => {
  const publicationId = req.params.id;
  const { text } = req.body;

  if (!text) {
    return res.status(400).send({
      status: "error",
      message: "Text field is required",
    });
  }

  try {
    // Find and update the publication by ID and user ID
    const publication = await Publication.findOneAndUpdate(
      { user: req.user.id, _id: publicationId },
      { text },
      { new: true }
    );

    if (!publication) {
      return res.status(404).send({
        status: "error",
        message: "Publication not found",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Publication updated",
      publication,
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "Error updating the publication",
    });
  }
};

module.exports = updatePublication;
