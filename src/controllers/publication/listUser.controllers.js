const Publication = require("../../models/Publication");

// List publications of a specific user with pagination
const listUser = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 5;

  try {
    // Find publications by user ID, sort by creation date, and paginate
    const publications = await Publication.find({ user: id })
      .sort({ createAt: -1 })
      .populate("user")
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    if (!publications.length) {
      return res.status(404).send({
        status: "error",
        message: "No publications found",
      });
    }

    // Count total publications for pagination
    const total = await Publication.countDocuments({ user: id });

    return res.status(200).send({
      status: "success",
      publications,
      page,
      itemsPerPage,
      total,
      pages: Math.ceil(total / itemsPerPage),
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error finding publications",
    });
  }
};

module.exports = listUser;
