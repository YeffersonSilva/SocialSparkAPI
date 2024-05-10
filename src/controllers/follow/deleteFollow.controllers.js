const Follow = require("../../models/Follow");
const User = require("../../models/User");

exports.unfollow = (req, res) => {
  //get the user id
  const user = req.user;

  //get the user id unfollow
  const followed = req.params.id;
  // find the follow to delete

  Follow.find({ user: user.id, followed: followed }).remove(
    (err, followedDeleted) => {
      if (err)
        return res.status(500).send({ message: "Error al dejar de seguir" });
      res.status(200).send({
          message: "unfollow controller works",
        
     
      });
    }
  );
};
