import { gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        users: [User]
        posts: [Post]
        comments: [Comment]
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
    }
    
    type Comment{
        commentContent: String
    }
`;

export default typeDefs;


// posts: [Post]


