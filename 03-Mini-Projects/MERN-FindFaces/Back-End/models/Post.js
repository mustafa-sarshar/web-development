const mongoose = require("mongoose"),
    AutoIncrement = require("mongoose-sequence")(mongoose);

const postSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

postSchema.plugin(AutoIncrement, {
    inc_field: "ticket",
    id: "ticketNums",
    start_seq: 500,
});

const Post = mongoose.model("Post", postSchema);
module.exports = { Post };
