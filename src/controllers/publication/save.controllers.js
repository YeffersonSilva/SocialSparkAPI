const Publication = require("../../models/publication/publication.model");

const save = async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send({
      status: "error",
      message: "El campo de texto es obligatorio",
    });
  }
  const publication = new Publication();
  publication.user = req.user.id;
  publication.text = text;
  publication.file = null;
  publication.createAt = new Date();
  try {
    await publication.save();
    return res.status(200).send({
      status: "success",
      message: "Publicación creada",
      publication,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error al guardar la publicación",
    });
  }
};

module.exports = {
  testPubli,
};
