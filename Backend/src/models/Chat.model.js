const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the schema for chat model
const chatSchema = new Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
                default: [],
            },
        ],
    },
    { timestamps: true }
);

// create the model for chat and expose it to our app
module.exports = mongoose.model("Chat", chatSchema);
