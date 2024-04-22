import { User } from './models/User.js';
import Post from './models/Post.js';
import Comment from './models/Comment.js';

const resolvers = {
    Query: {
        users: async () => {
            try {
                const users = await User.find();
                return users;
            } catch (error) {
                console.error('Error fetching users:', error);
                throw new Error('Failed to fetch users');
            }
        },
        posts: async () => {
            try {
                const posts = await Post.find();
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
        }
    }
};

export default resolvers;


// import { User } from './models/User.js';
// import Post from './models/Post.js';

// const resolvers = {
//     Query: {
//         users: async () => {
//             try {
//                 const users = await User.find();
//                 const posts = await Post.find();
//                 return { users, posts };
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//                 throw new Error('Failed to fetch users');
//             }
//         }
//     }
// };

// export default resolvers;

