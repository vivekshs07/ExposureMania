const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: String,
  images: [String],
  timestamp: { type: Date, default: Date.now },
});

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
6