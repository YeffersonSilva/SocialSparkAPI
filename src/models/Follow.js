const { Schema, model } = require("mongoose");

const FollowSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
   // required: true,
  },

  followed: {
    type: Schema.Types.ObjectId,
    ref: "User",
  //  required: true,
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Follow", FollowSchema, "follows");
