const mongoose = require("mongoose");

const followerSchema = mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Follower = mongoose.model("follower", followerSchema);
module.exports = Follower;
