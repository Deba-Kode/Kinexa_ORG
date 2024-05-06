import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS, GET_PARTICULAR_USER } from '../gqlOperations/queries';
import axios from 'axios';

const ParticularUser = () => {
    const { loading, error, data } = useQuery(GET_PARTICULAR_USER);
    const { loading: postLoading, error: postError, data: UserPosts } = useQuery(GET_ALL_POSTS);
    const [userData, setUserData] = useState({
        profilePic: '',
        coverPic: ''
    });
    const user = data?.userByUsername || {};

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                if (user._id && user.profilePic) {
                    await getProfilePic(user.profilePic, user._id);
                }
                if (user._id && user.coverPic) {
                    await getCoverPic(user.coverPic, user._id);
                }
            }
        };
        fetchData();
    }, [user]);

    const getProfilePic = async (img_name, userId) => {
        try {
            const response = await axios.post("http://192.168.0.164:3001/uploads/imagesProfile", { user_id: userId, img_name });
            const profilePic = `data:image/png;base64,${response.data}`;
            setUserData(prevData => ({
                ...prevData,
                profilePic
            }));
        } catch (error) {
            console.error('Error fetching profile picture:', error.message);
        }
    };

    const getCoverPic = async (img_name, userId) => {
        try {
            const response = await axios.post("http://192.168.0.164:3001/uploads/images", { user_id: userId, img_name });
            const coverPic = `data:image/png;base64,${response.data}`;
            setUserData(prevData => ({
                ...prevData,
                coverPic
            }));
        } catch (error) {
            console.error('Error fetching cover picture:', error.message);
        }
    };

    if (loading || postLoading) return <p>Loading...</p>;
    if (error || postError) return <p>Error: {error ? error.message : postError.message}</p>;
    if (!data || !data.userByUsername || data.userByUsername.length === 0) {
        return <h3>No Users Available</h3>;
    }

    let id = localStorage.getItem("userId");

    return (
        <>
            <div className="offcanvas offcanvas-start bg-dark" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel" style={{ width: "60%" }}>
                <button type="button" className="btn-close btn btn-light bg-white text-white position-absolute top-0 end-0 " data-bs-dismiss="offcanvas" aria-label="Close" style={{ zIndex: "1", marginRight: "25px", marginTop: "25px" }}></button>
                <div className="offcanvas-body">
                    <div className='row align-items-center'>
                        <div className='col-9 position-relative' style={{ width: '100%', height: '200px' }}>
                            {userData.coverPic && (
                                <img src={userData.coverPic} alt="Cover Picture" className="w-100 h-100" style={{ objectFit: "inherit", filter: "blur(1px)", borderRadius: "10px" }} />
                            )}
                            {userData.profilePic && (
                                <img
                                    src={userData.profilePic}
                                    alt="Profile Picture"
                                    className="position-absolute top-50 start-50 translate-middle rounded-circle border border-white shadow"
                                    style={{ width: '150px', height: '150px', zIndex: '1' }}
                                />
                            )}
                        </div>
                    </div>
                    <div style={{ color: "white" }}>
                        <div className="posts-container row d-flex flex-wrap" style={{ width: "100%", height: "auto" }}>
                            {UserPosts && UserPosts.posts
                                .filter(post => post.userID._id === id)
                                .map(post => (
                                    <div key={post._id} className="card m-3 mt-3 mx-auto" style={{ maxWidth: "14rem" }}>
                                        <img src={`http://192.168.0.164:3001/uploads/posts/${post._id}/${post.imageUpload}`} className="card-img-top mt-2 img-hover-zoom" alt="..." style={{ cursor: "pointer", transition: "transform 0.5s", borderRadius: "0.5rem" }} onMouseOver={(e) => e.target.style.transform = "scale(1.1)"} onMouseOut={(e) => e.target.style.transform = "scale(1.0)"} />
                                        <div className="card-body">
                                            <p className='m-0'><span className='fw-bold'>Caption: </span>{post.caption}</p>
                                            <p className='m-1'><span className='fw-bold'>Likes: </span>{post.likeCount}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ParticularUser;
