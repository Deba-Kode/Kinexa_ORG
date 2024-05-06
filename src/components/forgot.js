import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function ForgetPassword() {
    useEffect(() => {
        const loadingElement = document.getElementById('loading');
        setTimeout(() => {
            if (loadingElement) {
                loadingElement.style.transition = 'opacity 1s ease';
                loadingElement.style.opacity = '0';
                setTimeout(() => {
                    if (loadingElement) {
                        loadingElement.style.display = 'none';
                    }
                }, 200);
            }
        }, 200);
    }, []);

    const [formData, setFormData] = useState({
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [error_msg, set_error_msg] = useState('');
    const [succ_msg, set_succ_msg] = useState('');

    const sendLink = async (e) => {
        e.preventDefault();
        try {
            set_error_msg('');
            set_succ_msg('');
            const response = await axios.post("http://192.168.0.164:3001/forgot", formData);
            set_succ_msg(response.data.ans);
        } catch (error) {
            set_error_msg(error.response.data.err);
        }
    };

    return (
        <>
            <div className='bg-white text-dark p-2' style={{ width: '400px', height: '500px', borderRadius: "5px" }}>
                <h5 className="text-danger text-center mb-0">{error_msg}</h5>
                <h5 className="text-success text-center mb-0">{succ_msg}</h5>
                <i className="bi bi-shield-lock-fill" style={{ fontSize: '5rem' }}></i>
                <h6 className="" >Trouble with logging in?</h6>
                <p className=''>Enter your email address and we'll send you a link to get back into your account.</p>
                <form onSubmit={sendLink}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mt-3">Request Reset Link</button>
                </form>
                <div className='d-flex align-items-center'>
                    <div style={{ flex: '1' }}>
                        <hr style={{ width: '100%', borderTop: '1px solid black' }} />
                    </div>
                    <div className="px-2">OR</div>
                    <div style={{ flex: '1' }}>
                        <hr style={{ width: '100%', borderTop: '1px solid black' }} />
                    </div>
                </div>
                <span className="dark-color"><Link to="/Signup">Create a New Account</Link></span>
                <hr></hr>
                <div>
                    <span className="dark-color"><Link to="/">Back to Login</Link></span>
                </div>
            </div>
        </>
    );
}

export default ForgetPassword;
