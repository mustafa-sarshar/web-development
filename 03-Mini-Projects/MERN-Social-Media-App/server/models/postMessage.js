import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

const postSchema = Schema({
    title: { type: String },
    message: { type: String },
    creator: { type: String },
    tags: [{ type: String }],
    selectedFile: { type: String },
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;