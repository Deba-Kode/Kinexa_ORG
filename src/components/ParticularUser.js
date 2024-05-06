import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PARTICULAR_USER } from '../gqlOperations/queries';
import axios from 'axios';

const ParticularUser = () => {
  const { loading, error, data } = useQuery(GET_PARTICULAR_USER);
  const [userData, setUserData] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    country: '',
    state: '',
    city: '',
    profilePic: '',
    coverPic: ''
  });

  const user = data?.userByUsername || {};

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setUserData(user);
        if (user._id && user.profilePic) {
          await getProfilePic(user.profilePic, user._id);
        }
        if (user._id && user.coverPic) {
          await getCoverPic(user.coverPic, user._id);
        }
      }
    };
    fetchData();
    return () => {
    };
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value || null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDataToUpdate = { ...userData };
      delete userDataToUpdate.coverPic;
      delete userDataToUpdate.profilePic;
  
      const response = await axios.post("http://192.168.0.164:3001/update-user", userDataToUpdate);
      console.log("User data updated successfully:", response.data);
      document.getElementById("offcanvasExample").classList.remove("show");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.userByUsername || data.userByUsername.length === 0) {
    return <h3>No Users Available</h3>;
  }

  return (
    <>
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
      <form onSubmit={handleSubmit}>
        <div>
          <input type="hidden" name="_id" value={userData._id || ''} />
          <div className='row my-1 align-items-center'>
            <div className='col-3 text-right'>
              <label className="col-form-label mb-0" style={{ fontWeight: "" }}>User Name:</label>
            </div>
            <div className='col-9'>
              <input
                type="text"
                name="userName"
                value={userData.userName || ''}
                onChange={handleInputChange}
                className="form-control text-center"
                style={{
                  border: "none",
                  background: "linear-gradient(135deg, #3498db, #8e44ad)",
                  color: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  width: "100%",
                  marginBottom: "10px"
                }}
              />
            </div>
          </div>

          <div className='row my-1 align-items-center'>
            <div className='col-3 text-right'>
              <label className="col-form-label mb-0" style={{ fontWeight: "" }}>First Name:</label>
            </div>
            <div className='col-9'>
              <input
                type="text"
                name="firstName"
                value={userData.firstName || ''}
                onChange={handleInputChange}
                className="form-control text-center"
                style={{
                  border: "none",
                  background: "linear-gradient(135deg, #3498db, #8e44ad)",
                  color: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  width: "100%",
                  marginBottom: "10px"
                }}
              />
            </div>
          </div>

          <div className='row my-1 align-items-center'>
            <div className='col-3 text-right'>
              <label className="col-form-label mb-0" style={{ fontWeight: "" }}>Last Name:</label>
            </div>
            <div className='col-9'>
              <input
                type="text"
                name="lastName"
                value={userData.lastName || ''}
                onChange={handleInputChange}
                className="form-control text-center"
                style={{
                  border: "none",
                  background: "linear-gradient(135deg, #3498db, #8e44ad)",
                  color: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  width: "100%",
                  marginBottom: "10px"
                }}
              />
            </div>
          </div>

          <div className='row my-1 align-items-center'>
            <div className='col-3 text-right'>
              <label className="col-form-label mb-0" style={{ fontWeight: "" }}>Email:</label>
            </div>
            <div className='col-9'>
              <input
                type="text"
                name="email"
                value={userData.email || ''}
                onChange={handleInputChange}
                className="form-control text-center"
                style={{
                  border: "none",
                  background: "linear-gradient(135deg, #3498db, #8e44ad)",
                  color: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  width: "100%",
                  marginBottom: "10px"
                }}
              />
            </div>
          </div>

          <div className='row my-1 align-items-center'>
            <div className='col-3 text-right'>
              <label className="col-form-label mb-0" style={{ fontWeight: "" }}>DOB:</label>
            </div>
            <div className='col-9'>
              <input
                type="text"
                name="dob"
                value={userData.dob || ''}
                onChange={handleInputChange}
                className="form-control text-center"
                style={{
                  border: "none",
                  background: "linear-gradient(135deg, #3498db, #8e44ad)",
                  color: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  width: "100%",
                  marginBottom: "10px"
                }}
              />
            </div>
          </div>

          <div className='row my-1 align-items-center'>
            <div className='col-3 text-right'>
              <label className="col-form-label mb-0" style={{ fontWeight: "" }}>Phone:</label>
            </div>
            <div className='col-9'>
              <input
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber || ''}
                onChange={handleInputChange}
                className="form-control text-center"
                style={{
                  border: "none",
                  background: "linear-gradient(135deg, #3498db, #8e44ad)",
                  color: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  width: "100%",
                  marginBottom: "10px"
                }}
              />
            </div>
          </div>

          <div className='row my-1 align-items-center'>
            <div className='col-3 text-right'>
              <label className="col-form-label mb-0" style={{ fontWeight: "" }}>Country:</label>
            </div>
            <div className='col-9'>
              <input
                type="text"
                name="country"
                value={userData.country || ''}
                onChange={handleInputChange}
                className="form-control text-center"
                style={{
                  border: "none",
                  background: "linear-gradient(135deg, #3498db, #8e44ad)",
                  color: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  width: "100%",
                  marginBottom: "10px"
                }}
              />
            </div>
          </div>

          <div className='row my-1 align-items-center'>
            <div className='col-3 text-right'>
              <label className="col-form-label mb-0" style={{ fontWeight: "" }}>State:</label>
            </div>
            <div className='col-9'>
              <input
                type="text"
                name="state"
                value={userData.state || ''}
                onChange={handleInputChange}
                className="form-control text-center"
                style={{
                  border: "none",
                  background: "linear-gradient(135deg, #3498db, #8e44ad)",
                  color: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  width: "100%",
                  marginBottom: "10px"
                }}
              />
            </div>
          </div>

          <div className='row my-1 align-items-center'>
            <div className='col-3 text-right'>
              <label className="col-form-label mb-0" style={{ fontWeight: "" }}>City:</label>
            </div>
            <div className='col-9'>
              <input
                type="text"
                name="city"
                value={userData.city || ''}
                onChange={handleInputChange}
                className="form-control text-center"
                style={{
                  border: "none",
                  background: "linear-gradient(135deg, #3498db, #8e44ad)",
                  color: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  width: "100%",
                  marginBottom: "10px"
                }}
              />
            </div>
          </div>

          <div className='row my-0 align-items-center'>
            <div className='col-12 text-center'>
              <button type="submit" className="btn btn-warning">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default ParticularUser;
