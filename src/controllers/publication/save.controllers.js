const Publication = require("../../models/Publication");

// Save a new publication
const save = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send({
      status: "error",
      message: "Text field is required",
    });
  }

  const publication = new Publication({
    user: req.user.id,
    text,
    file: null,
    createAt: new Date(),
  });

  try {
    await publication.save();
    return res.status(200).send({
      status: "success",
      message: "Publication created",
      publication,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error saving the publication",
    });
  }
};

module.exports = save;
