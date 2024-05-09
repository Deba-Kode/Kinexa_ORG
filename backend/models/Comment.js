// // Comment model
// import mongoose from "mongoose";
// const commentSchema = new mongoose.Schema({
//     commentContent: {
//         type: String
//     },
//     commentAt: {
//         type: Date,
//         default: Date.now
//     },
//     postID: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Post'
//     },
//     userID: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }
// });

// const Comment = mongoose.model("Comment", commentSchema);
// export default Comment;


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
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }]
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;