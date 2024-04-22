import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { GET_ALL_USERS } from '../gqlOperations/queries.js';
import axios from 'axios';

export default function UserDetails() {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [userImages, setUserImages] = useState({});

  useEffect(() => {
    if (data && data.users && data.users.length !== 0) {
      fetchImages();
    }
  }, [data]);

  async function fetchImages() {
    const images = {};
    for (const user of data.users) {
      const coverPic = await getImage(user._id, user.coverPic);
      const profilePic = await getProfileImage(user._id, user.profilePic);
      images[user._id] = { coverPic, profilePic };
    }
    setUserImages(images);
  }

  async function getImage(user_id, img_name) {
    try {
      const response = await axios.post("http://localhost:3001/uploads/images", { user_id, img_name });
      return `data:image/png;base64,${response.data}`;
    } catch (error) {
      console.error("Error fetching cover picture:", error);
      return null;
    }
  }

  async function getProfileImage(user_id, img_name) {
    try {
      const response = await axios.post("http://localhost:3001/uploads/imagesProfile", { user_id, img_name });
      return `data:image/png;base64,${response.data}`;
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      return null;
    }
  }

  if (loading) return <h1>Loading</h1>;
  if (error) {
    console.log(error.message);
    return <h1>Error</h1>;
  }
  if (data.users.length === 0) {
    return <h3>No Users Available</h3>;
  }

  return (
    <div className='container my-container'>
      {data.users.map(user => (
        <blockquote key={user._id}>
          <h4>Below is one of the user:-</h4>
          <h6>{user._id}</h6>
          <h6>{user.firstName}</h6>
          <h6>{user.lastName}</h6>
          <h6>{user.userName}</h6>
          <h6>{user.email}</h6>
          <h6>{user.dob}</h6>
          <h6>{user.phoneNumber}</h6>
          <h6>{user.country}</h6>
          <h6>{user.state}</h6>
          <h6>{user.city}</h6>
          <h6>{userImages[user._id] && <img src={userImages[user._id].coverPic} className='img-fluid rounded large-image' alt='User Cover Pic' style={{ width: "100px", height: "100px" }} />}</h6>
          <h6>{userImages[user._id] && <img src={userImages[user._id].profilePic} className='img-fluid rounded large-image' alt='User Profile Pic' style={{ width: "100px", height: "100px" }} />}</h6>
        </blockquote>
      ))}
    </div>
  );
}
