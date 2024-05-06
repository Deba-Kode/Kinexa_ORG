import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Query {
        users: [User]
        posts: [Post]
        comments: [Comment]
        userByUsername: UserByUserName
        commentsByPost(postId: ID!) : [Comment12]
    }

    type Comment12 {
        _id: ID
        commentContent: String
        postID: ID
        userID: User
        commentAt: String
    }

    type UserByUserName{
        _id: ID
        firstName: String
        lastName: String
        email: String
        userName: String
        dob: String
        phoneNumber: String
        country: String
        city: String
        state: String
        coverPic: String
        profilePic: String
    }

    type User{
        _id: ID
        firstName: String
        lastName: String
        email: String
        userName: String
        dob: String
        phoneNumber: String
        country: String
        city: String
        state: String
        coverPic: String
        profilePic: String
    }

    type Post{
        _id: ID
        imageUpload: String
        caption: String
        createdAt: String
        userID: User
        likeCount: Int
    }
    
    type Comment{
        _id: ID
        commentContent: String
        postID: ID
        userID: ID
    }
`;

export default typeDefs;