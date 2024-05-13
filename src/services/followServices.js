const Follow = require("../models/Follow");

const followServices = async (userId) => {
  const following = await Follow.find({ user: userId })
    .select({ _id: 0, __v: 0, user: 0 })
    .exec()
    .then((follows) => {
      return follows;
    })
    .catch((err) => {
      return handleError(err);
    });

  const followed = await Follow.find({ followed: userId })
    .select({ _id: 0, __v: 0, followed: 0 })
    .exec()
    .then((follows) => {
      return follows;
    })
    .catch((err) => {
      return handleError(err);
    });

  
  const followers = await Follow.find({ followed: userId })
    .select({ "user": 1, "_id": 0 })
    .exec()
    .then((follows) => {
      return follows;
    })
    .catch((err) => {
      return handleError(err);
    });
  const followingClean = [];

  following.forEach((follow) => {
    followingClean.push(follow.followed);
  });

  const followedClean = [];

  followed.forEach((follow) => {
    followedClean.push(follow.user);
  });

  return res.status(200).send({ status: "success", following: followingClean, followed: followedClean, followers: followers });
};

const followThisUser = async (identify, profileUserid) => {

  let following = await Follow.findOne({ "user": identify, "followed": profileUserid })
    .select({ "followed": 1, "_id": 0 })
    .exec()
  
  let follower = await Follow.findOne({ "user": profileUserid, "followed": identify })
    .select({ "user": 1, "_id": 0 })
    .exec()
 return { following, follower } 
}

module.exports = { followServices, followThisUser}
