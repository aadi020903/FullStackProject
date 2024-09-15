const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(

    {
        // conversation: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Conversation",
        //     required: true,
        // },
        text: {
            type: String,
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reciver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);