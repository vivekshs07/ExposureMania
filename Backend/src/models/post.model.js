const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption: String,
  path: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  pictureID: String,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
