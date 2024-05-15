const Publication = require("../../models/Publication");

// Remove a specific publication
const removePublication = async (req, res) => {
  const publicationId = req.params.id;

  try {
    // Find and remove the publication by ID and user ID
    const publication = await Publication.findOneAndRemove({
      user: req.user.id,
      _id: publicationId,
    });

    if (!publication) {
      return res.status(404).send({
        status: "error",
        message: "Publication not found",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Publication removed",
      publication: publicationId,
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "Error removing the publication",
    });
  }
};

module.exports = removePublication;
