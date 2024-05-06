// import mongoose from 'mongoose';

// const postSchema = new mongoose.Schema({
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     caption: {
//         type: String
//     },
//     imageUpload: {
//         type: String
//     },
//     userID: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }
// });

// const Post = mongoose.model("Post", postSchema);

// export default Post;


import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    caption: {
        type: String
    },
    imageUpload: {
        type: String
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

const Post = mongoose.model("Post", postSchema);

export default Post;


