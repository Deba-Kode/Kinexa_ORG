import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../gqlOperations/queries.js';
import Comment from './Comment.js'; 
import img from '../altImage/user.png'

export default function PostsData() {
    const { loading, error, data } = useQuery(GET_ALL_POSTS);
    const [imgData, setIMG] = useState({});
    const [heartFilled, setHeartFilled] = useState({});

    useEffect(() => {
        if (data && data.posts && data.posts.length !== 0) {
            data.posts.forEach(post => {
                getPost(post);
            });
        }
        fetchLikedPosts();
    }, [data]);

    async function fetchLikedPosts() {
        try {
            const uID = localStorage.getItem('userId');
            const response = await axios.get(`http://192.168.0.164:3001/user-liked-posts?uID=${uID}`);
            const likedPosts = response.data;
            const newHeartFilled = {};
            likedPosts.forEach(post => {
                newHeartFilled[post._id] = true;
            });
            setHeartFilled(newHeartFilled);
        } catch (error) {
            console.error('Error fetching liked posts:', error.message);
        }
    }

    async function getPost(post) {
        try {
            const response = await axios.post("http://192.168.0.164:3001/uploads/posts", { post_id: post._id, img_name: post.imageUpload });
            const base64Image = `data:image/png;base64,${response.data}`;
            setIMG(prevState => ({
                ...prevState,
                [post._id]: base64Image
            }));

            if (post.userID && post.userID.profilePic) {
                const profilePicResponse = await axios.post("http://192.168.0.164:3001/uploads/imagesProfile", { user_id: post.userID._id, img_name: post.userID.profilePic });
                const profilePic = `data:image/png;base64,${profilePicResponse.data}`;

                setIMG(prevState => ({
                    ...prevState,
                    [`profilePic_${post.userID._id}`]: profilePic
                }));
            }
        } catch (error) {
            console.error('Error fetching image:', error.message);
        }
    }

    const handleHeartClick = async (post_id) => {
        try {
            const uID = localStorage.getItem('userId');
            setHeartFilled(prevState => ({
                ...prevState,
                [post_id]: !prevState[post_id]
            }));
            await axios.post(`http://192.168.0.164:3001/like-post`, { post_id, uID });
        } catch (error) {
            console.error('Error liking post:', error.message);
        }
    };

    function getTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const seconds = Math.floor(diff / 1000);
        if (seconds >= 24 * 3600) {
            const days = Math.floor(seconds / (24 * 3600));
            return `${days} d${days > 1 ? '' : ''}`;
        }
        else if (seconds >= 3600) {
            const hours = Math.floor(seconds / 3600);
            return `${hours} h${hours > 1 ? '' : ''}`;
        }
        else{
            const minutes = Math.floor(seconds / 60);
            return `${minutes} m${minutes > 1 ? '' : ''}`;
        }
    }

    if (loading) return <h1>Loading</h1>;
    if (error) {
        alert(error);
        console.error("Error fetching data:", error);
        return <h1>Error</h1>;
    }
    if (!data || !data.posts || data.posts.length === 0) {
        return <h3>No Posts Available</h3>;
    }

    return (
        <div className='container my-container'>
            {data.posts.map(post => (
                <div className="row justify-content-center mb-1" key={post._id}>
                    <div className="col-md-8 my-0 mb-3" style={{ maxWidth: "700px" }}>
                        <blockquote className="blockquote" style={{ padding: '0px' }}>
                            <div className='d-flex align-items-center gap-2 '>
                                <div className='m-1'>
                                    {post.userID && post.userID.profilePic && imgData[`profilePic_${post.userID._id}`] ? (
                                        <img src={imgData[`profilePic_${post.userID._id}`]} className='img-fluid rounded-circle large-image'
                                            alt='User Profile Pic'
                                            style={{ width: '50px', height: '50px', border: "2px solid red", padding: "1px" }} />
                                    ) : (
                                        <img src={img} className='img-fluid rounded-circle large-image'
                                            alt='User Profile Pic'
                                            style={{ width: '40px', height: '40px', border: "2px solid red", padding: "1px" }} />
                                    )}
                                </div>
                                <div className='d-flex justify-content-center align-item-center'>
                                    {
                                        post.userID && (
                                            <>
                                                <div className='me-2'>
                                                    <h6 style={{ textAlign: "left" }}>{`${post.userID.userName}`}</h6>
                                                </div>
                                                <div className='d-flex justify-content-start alignment-item-top'>
                                                    <span style={{ textAlign: "left", fontSize: "13px" }}>{`${getTimeAgo(post.createdAt)}`}</span>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                            <button
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    padding: 0,
                                    cursor: 'pointer'
                                }}
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
                            <p className="mt-0 mb-2" style={{ textAlign: "left", fontWeight: "bold" }}>{post.likeCount} Likes</p>
                            <p className="mt-0" style={{ textAlign: "left", fontWeight: "bold" }}>
                                {post.caption}
                            </p>
                            <hr />
                        </blockquote>
                    </div>
                    <Comment key={`comment-${post._id}`} postId={post._id} />
                </div>
            ))}
        </div>
    );
}











