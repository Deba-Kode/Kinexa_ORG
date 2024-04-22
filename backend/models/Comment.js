// Comment model
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commentContent: {
        type: String
    },
    commentAt: {
        type: Date,
        default: Date.now
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
