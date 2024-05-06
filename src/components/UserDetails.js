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
      try {
        const coverPic = await getImage(user._id, user.coverPic);
        const profilePic = await getProfileImage(user._id, user.profilePic);
        images[user._id] = { coverPic, profilePic };
      } catch (error) {
        console.error("Error fetching images for user", user._id, ":", error);
      }
    }
    setUserImages(images);
  }

  async function getImage(user_id, img_name) {
    try {
      const response = await axios.post("http://192.168.0.164:3001/uploads/images", { user_id, img_name });
      return `data:image/png;base64,${response.data}`;
    } catch (error) {
      console.error("Error fetching cover picture for user", user_id, ":", error);
      throw error;
    }
  }

  async function getProfileImage(user_id, img_name) {
    try {
      const response = await axios.post("http://192.168.0.164:3001/uploads/imagesProfile", { user_id, img_name });
      return `data:image/png;base64,${response.data}`;
    } catch (error) {
      console.error("Error fetching profile picture for user", user_id, ":", error);
      throw error;
    }
  }

  const name = localStorage.getItem("userName");

  if (loading) return <h1>Loading</h1>;
  if (error) {
    console.log("Error fetching users:", error.message);
    return <h1>Error</h1>;
  }
  if (data.users.length === 0) {
    return <h3>No Users Available</h3>;
  }

  return (
    <div className='container my-container' style={{ width: "325px" }}>
      {data.users.map(user => (
        <blockquote key={user._id}>
          <div className="d-flex align-items-center">
            <h6 className="pe-3">
              {userImages[user._id] && (
                <img
                  src={userImages[user._id].profilePic}
                  className='img-fluid rounded-circle large-image'
                  alt='User Profile Pic'
                  style={{ width: '60px', height: '50px', border: "2px solid red", padding: "1px" }}
                />
              )}
            </h6>
            <div className="mr-3">
              <h6 className="mb-0" style={{ fontSize: "15px" }}>{user.firstName} {user.lastName}</h6>
            </div>
            <span className='btn btn-primary btn-sm ms-4' style={{ width: '80px' }}>Follow</span>
          </div>
        </blockquote>
      ))}
    </div>
  );
}






