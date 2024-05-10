const Follow = require("../../models/Follow");
const User = require("../../models/User");

exports.saveFollow = (req, res) => {
  const params = req.body;
  const indenty = req.user;

  let userToFollow = new Follow({
    user: indenty.id,
    followed: params.followed,
});


  userToFollow.save((err, followStored) => {
    if (err)
      return res
        .status(500)
        .send({ message: "Error al guardar el seguimiento" });
    if (!followStored)
      return res
        .status(404)
        .send({ message: "El seguimiento no se ha guardado" });

    res.status(200).send({
        message: "saveFollow controller works",
        indenty: req.user,
      follow: followStored
      
    });
  });
};
