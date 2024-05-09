import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './style.css'
export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        phoneNumber: '',
        password: '',
        cnfPassword: '',
        bio: '',
        profession: '',
        interest: '',
        dob: '',
        gender: '',
        coverPic: null,
        profilePic: null,
        country: '',
        state: '',
        city: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleProfileFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            profilePic: file
        }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            coverPic: file
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("I am in Form");
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        try {
            const response = await axios.post('http://192.168.0.116:3001/register', formDataToSend);
            console.log(response.data); // Handle response as needed
        } catch (error) {
            console.error('Error:', error.message); // Handle error
        }
    };
    useEffect(() => {
        window.myExternalFunction();
    }, []);
    return (
        <div className="container formSign">
            <header>Signup Form</header>
            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                    <div className="step d-flex justify-content-between align-items-center">
                        <p className="font-weight-bold mb-1">Name</p>
                        <div className="bullet border border-dark rounded-circle d-inline-flex align-items-center justify-content-center"><span className="font-weight-bold">1</span></div>
                        <div className="check fas fa-check d-none"></div>
                    </div>
                    <div className="step d-flex justify-content-between align-items-center">
                        <p className="font-weight-bold mb-1">Contact</p>
                        <div className="bullet border border-dark rounded-circle d-inline-flex align-items-center justify-content-center"><span className="font-weight-bold">2</span></div>
                        <div className="check fas fa-check d-none"></div>
                    </div>
                    <div className="step d-flex justify-content-between align-items-center">
                        <p className="font-weight-bold mb-1">Birth</p>
                        <div className="bullet border border-dark rounded-circle d-inline-flex align-items-center justify-content-center"><span className="font-weight-bold">3</span></div>
                        <div className="check fas fa-check d-none"></div>
                    </div>
                    <div className="step d-flex justify-content-between align-items-center">
                        <p className="font-weight-bold mb-1">Submit</p>
                        <div className="bullet border border-dark rounded-circle d-inline-flex align-items-center justify-content-center"><span className="font-weight-bold">4</span></div>
                        <div className="check fas fa-check d-none"></div>
                    </div>
                </div>
            </div>
            <div className="form-outer">
                <form action="#" onSubmit={handleSubmit}>
                    <div className="page slide-page">
                        <div className="title">Basic Info:</div>
                        <div className="field">
                            <div className="label">First Name</div>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className="field">
                            <div className="label">Last Name</div>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>
                        <div className="field">
                            <div className="label">State</div>
                            <input type="text" name="state" value={formData.state} onChange={handleChange} />
                        </div>
                        <div className="field">
                            <button className="firstNext next">Next</button>
                        </div>
                    </div>
                    <div className="page">
                        <div className="title">Contact Info:</div>
                        <div className="field">
                            <div className="label">Email Address</div>
                            <input type="text" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="field">
                            <div className="label">Phone Number</div>
                            <input type="Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                        </div>
                        <div className="field">
                            <div className="label">Country</div>
                            <input type="text" name="country" value={formData.country} onChange={handleChange} />
                        </div>
                        <div className="field">
                            <div className="label">Cover Photo</div>
                            <input type="file" onChange={handleFileChange} />
                        </div>
                        <div className="field btns">
                            <button className="prev-1 prev">Previous</button>
                            <button className="next-1 next">Next</button>
                        </div>
                    </div>
                    <div className="page">
                        <div className="title">Date of Birth:</div>
                        <div className="field">
                            <div className="label">Date</div>
                            <input type="text" name="dob" value={formData.dob} onChange={handleChange} />
                        </div>
                        <div className="field">
                            <div className="label">Gender</div>
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="field">
                            <div className="label">City</div>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} />
                        </div>
                        <div className="field btns">
                            <button className="prev-2 prev">Previous</button>
                            <button className="next-2 next">Next</button>
                        </div>
                    </div>
                    <div className="page">
                        <div className="title">Login Details:</div>
                        <div className="field">
                            <div className="label">Username</div>
                            <input type="text" name="userName" value={formData.userName} onChange={handleChange} autoComplete="username" />
                        </div>
                        <div className="field">
                            <div className="label">Password</div>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="current-password" />
                        </div>
                        <div className="field">
                            <div className="label">Profile Photo</div>
                            <input type="file" onChange={handleProfileFileChange} />
                        </div>
                        <div className="field btns">
                            <button className="prev-4 prev">Previous</button>
                            <button className="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}