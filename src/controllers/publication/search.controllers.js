const Publication = require("../../models/Publication");

// Search publications by text
const searchPublications = async (req, res) => {
  const { query } = req.query;
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 5;

  if (!query) {
    return res.status(400).send({
      status: "error",
      message: "Search query is required",
    });
  }

  try {
    // Find publications that match the search query, sort by creation date, and paginate
    const publications = await Publication.find({ text: new RegExp(query, 'i') })
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

    // Count total matching publications for pagination
    const total = await Publication.countDocuments({ text: new RegExp(query, 'i') });

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
      message: "Error searching publications",
    });
  }
};

module.exports = searchPublications;
