const Follow = require("../models/Follow");

// Function to get the follow information for a user
const followServices = async (userId) => {
    try {
        // Get the users that the given user is following
        const following = await Follow.find({ user: userId })
            .select("followed -_id")
            .exec();

        // Get the users that are following the given user
        const followed = await Follow.find({ followed: userId })
            .select("user -_id")
            .exec();

        // Clean the results to return only user IDs
        const followingClean = following.map(follow => follow.followed);
        const followedClean = followed.map(follow => follow.user);

        return {
            following: followingClean,
            followed: followedClean,
            followers: followed
        };
    } catch (err) {
        console.error(err);
        throw new Error("Error fetching follow data");
    }
};

// Function to check if a user is following another user
const followThisUser = async (identify, profileUserid) => {
    try {
        // Check if the user is following the profile user
        const following = await Follow.findOne({ user: identify, followed: profileUserid })
            .select("followed -_id")
            .exec();

        // Check if the profile user is following the user
        const follower = await Follow.findOne({ user: profileUserid, followed: identify })
            .select("user -_id")
            .exec();

        return { following, follower };
    } catch (err) {
        console.error(err);
        throw new Error("Error checking follow status");
    }
};

module.exports = { followServices, followThisUser };
