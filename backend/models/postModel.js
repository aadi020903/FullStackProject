const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
        caption : {
        type: String,
        default: "",
      
        },
        img: {
        type: String,
        default: "",
        required: true,

        },
        likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        ],
        comments: [
        {
            commentUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            },
            comment: {
            type: String,
            },
            commentLike: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            ],
        },
        ],
    
    },
    { timestamps: true }
);
