import { User } from './models/User.js';
import Post from './models/Post.js';
import Comment from './models/Comment.js';

const resolvers = {
    Query: {
        users: async (_, args, context) => {
            try {
                const users = await User.find({ userName: { $ne: context.UserLoggedInFront } });
                return users;
            } catch (error) {
                console.error('Error fetching users:', error);
                throw new Error('Failed to fetch users');
            }
        },
        userByUsername: async (_, args, context) => {
            try {
                const users = await User.findOne({ userName: context.UserLoggedInFront })
                return users;
            } catch (error) {
                console.error('Error fetching users:', error);
                throw new Error('Failed to fetch users');
            }
        },
        posts: async () => {
            try {
                const posts = await Post.find().sort({ createdAt: -1 }).populate('userID', '_id userName coverPic profilePic');
                return posts;
            } catch (error) {
                console.error('Error fetching posts:', error);
                throw new Error('Failed to fetch posts');
            }
        },
        comments: async () => {
            try {
                const comments = await Comment.find();
                return comments;
            } catch (error) {
                console.log('Error fethcing comments', error);
                throw new Error('Failed to fetch the comments')
            }
        },
        commentsByPost: async (_, { postId }) => {
            try {
                const comments = await Comment.find({ postID: postId }).populate('userID');
                return comments;
            } catch (error) {
                console.error('Error fetching comments:', error);
                throw new Error('Failed to fetch comments');
            }
        }
    },
    Post: {
        likeCount: async (parent) => {
            try {
                const post = await Post.findById(parent._id);
                return post.likes.length;
            } catch (error) {
                console.error('Error fetching like count:', error);
                throw new Error('Failed to fetch like count');
            }
        }
    }
};

export default resolvers;