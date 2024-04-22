import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
    query getAllUsers{
        users{
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
`

export const GET_ALL_POSTS = gql`
    query getAllPosts{
        posts{
            _id
            imageUpload
            caption
            createdAt
        }
    }
`