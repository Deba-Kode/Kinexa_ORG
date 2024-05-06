import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
function ResetPassword(dispatch) {
    const location = useLocation();
    const resetToken = new URLSearchParams(location.search).get('resettoken');
    console.log('resetToken=>', resetToken)
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
        password: '',
        confirm_pass: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const [error_msg, set_error_msg] = useState('');
    const [success_msg, set_success_msg] = useState('');
    const resetPass = async (e) => {
        e.preventDefault();
        try {
            set_error_msg('');
            set_success_msg('')
            const response = await axios.post("http://192.168.0.164:3001/reset", {
                password: formData.password,
                confirm_pass: formData.confirm_pass,
                resetToken: resetToken
            });
            set_success_msg(response.data)
            console.log('response =', response)
        } catch (error) {
            console.log(error.response.data)
            set_error_msg(error.response.data);
        }
    };
    return (
        <div className='bg-white text-dark p-2' style={{ width: '400px', height: '350px', borderRadius: "5px" }}>
            <h3 className="text-danger text-center" >{error_msg}</h3>
            <h3 className="text-success text-center" >{success_msg}</h3>
            <h1 className="mb-0 dark-signin"> Reset Password </h1>
            <form className="mt-4">
                <div className="form-group">
                    <h6 htmlFor="exampleInputEmail1"> New Password </h6>
                    <input type="password" className="form-control mb-2" id="exampleInputEmail1" placeholder="Enter new Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange} />
                </div>
                <div className="form-group mb-3">
                    <h6 htmlFor="exampleInputPassword1"> Confirm Password </h6>
                    <input type="password" className="form-control mb-0" id="exampleInputPassword1" placeholder="Confirm password" name="confirm_pass"
                        value={formData.confirm_pass}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="d-inline-block w-100">
                    <button type="submit" onClick={resetPass} className="btn btn-primary float-right" > Reset Password </button>
                </div>
                <div className="sign-info">
                    <span className="dark-color d-inline-block line-height-2"> <Link to="/">Go to sign In</Link> </span>
                </div>
            </form>
        </div>
    );
}
export default ResetPassword;