import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
    query getAllUsers {
        users {
            _id
            firstName
            lastName
            email
            userName
            dob
            phoneNumber
            country
            city
            state
            coverPic
            profilePic
        }
    }
`;

export const GET_ALL_POSTS = gql`
    query getAllPosts {
        posts {
            _id
            imageUpload
            caption
            createdAt
            userID {
                _id
                userName
                profilePic
                coverPic
            }
            likeCount
        }
    }
`;

export const GET_PARTICULAR_USER = gql`
    query getParticularUser {
        userByUsername {
            _id
            firstName
            lastName
            email
            userName
            dob
            phoneNumber
            country
            city
            state
            coverPic
            profilePic
        }
    }
`;

export const GET_ALL_COMMENTS = gql`
    query getAllComments {
        comments {
            commentContent
        }
    }
`;

export const GET_COMMENTS_BY_POST = gql`
    query GetCommentsByPost($postId: ID!) {
        commentsByPost(postId: $postId) {
            _id
            commentContent
            userID {
                _id
                userName
            }
            commentAt
        }
    }
`;