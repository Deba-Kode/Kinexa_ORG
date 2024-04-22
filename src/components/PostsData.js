import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../gqlOperations/queries.js';
import Comment from './Comment.js'; // Import Comment component

export default function PostsData() {
    const { loading, error, data } = useQuery(GET_ALL_POSTS);
    const [imgData, setIMG] = useState({});
    const [heartFilled, setHeartFilled] = useState({});

    useEffect(() => {
        if (data && data.posts && data.posts.length !== 0) {
            data.posts.forEach(post => {
                getPost(post._id, post.imageUpload);
            });
        }
    }, [data]);

    async function getPost(post_id, img_name) {
        try {
            const response = await axios.post("http://localhost:3001/uploads/posts", { post_id, img_name });
            const base64Image = `data:image/png;base64,${response.data}`;
            setIMG(prevState => ({
                ...prevState,
                [post_id]: base64Image
            }));
        } catch (error) {
            console.error('Error fetching image:', error.message);
        }
    }

    // Function to handle click event of heart icon 
    const handleHeartClick = (post_id) => {
        setHeartFilled(prevState => ({
            ...prevState,
            [post_id]: !prevState[post_id] // Toggle the filled state
        }));
    };

    // const handleCommentSubmit = async (commentContent, postId) => {
    //     try {
    //         const response = await axios.post('http://localhost:3001/user-comment', {
    //             commentContent,
    //             postId // Include the post ID when submitting the comment
    //         });
    //         // console.log(response.data);
    //     } catch (error) {
    //         console.error('Error:', error.message);
    //     }
    // };

    if (loading) return <h1>Loading</h1>;
    if (error) {
        console.log(error.message);
        return <h1>Error</h1>;
    }
    if (!data || !data.posts || data.posts.length === 0) {
        return <h3>No Posts Available</h3>;
    }

    return (
        <div className='container my-container'>
            {data.posts.map(post => (
                <div className="row justify-content-center mb-1" key={post._id}>
                    <div className="col-md-8 my-0 mb-3" style={{maxWidth: "700px" }}>
                        <blockquote className="blockquote" style={{ padding: '0px' }}>
                            <h5 style={{ textAlign: "left" }}>{post._id}</h5>
                            <button
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    padding: 0, // Remove default padding
                                    cursor: 'pointer' // Change cursor to pointer on hover
                                }}
                                data-bs-toggle="modal"
                                data-bs-target={`#exampleModal-${post._id}`}
                            >
                                <img
                                    src={imgData[post._id]}
                                    className="img-fluid rounded"
                                    alt="User Posts"
                                    style={{
                                        width: "100%",
                                        maxWidth: "700px",
                                        height: "auto",
                                        objectFit: "cover"
                                    }}
                                    onDoubleClick={() => handleHeartClick(post._id)}
                                />
                            </button>

                            <div className='d-flex gap-4 mt-3'>
                                <button style={{ border: 'none', background: 'none' }} onClick={() => handleHeartClick(post._id)}>
                                    <i
                                        className={`bi bi-heart${heartFilled[post._id] ? '-fill' : ''}`}
                                        style={{ fontSize: '1.7rem', cursor: 'pointer', color: heartFilled[post._id] ? 'red' : '' }}
                                    ></i>
                                </button>
                                <button
                                    style={{ border: 'none', background: 'none' }}
                                    data-bs-toggle="modal"
                                    data-bs-target={`#exampleModal-${post._id}`}
                                >
                                    <i className='bi bi-chat-right' style={{ fontSize: '1.7rem', cursor: 'pointer' }}></i>
                                </button>
                                <button style={{ border: 'none', background: 'none' }}>
                                    <i className='bi bi-send' style={{ fontSize: '1.7rem', cursor: 'pointer' }}></i>
                                </button>
                            </div>
                            <p className="" style={{ textAlign: "left", fontWeight: "bold" }}>
                                {post.caption}
                            </p>
                        </blockquote>
                    </div>
                    {/* Render the Comment modal component inside the map function */}
                    <Comment postId={post._id} />
                </div>
            ))}
        </div>
    );
}
