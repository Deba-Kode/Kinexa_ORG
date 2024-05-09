import mongoose from "mongoose";
const replySchema = new mongoose.Schema({
    replyContent: {
        type: String
    },
    replyAt: {
        type: Date,
        default: Date.now
    },
    commentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Reply = mongoose.model("Reply", replySchema);
export default Reply;