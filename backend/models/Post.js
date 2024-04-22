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
    }
});
const Post = mongoose.model("Post", postSchema)
export default Post ;
