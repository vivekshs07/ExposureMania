// create a message.model.js file in the models directory and add the following code:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: mongoose.Schema.Types.String,
  },
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Message", messageSchema);
