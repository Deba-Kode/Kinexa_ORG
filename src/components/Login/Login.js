// import React, { useState } from 'react'
// import img1 from './images/Logo.png'
// import googleLogo from './images/google.png'
// import axios from 'axios'
// import './style.css';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

// export default function Login() {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage(''); // Clear previous messages
//     if (!username || !password) {
//       setMessage('Please enter username and password.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:3001/api/login', { username, password });
//       if (response.status === 200 && response.data.success) { // Check response status and data
//         console.log(response.data.token);
//         // Store token in local storage
//         localStorage.setItem("token", response.data.token);
//         navigate('/dashboard');
//       } else {
//         console.error('Error');
//         setMessage('Invalid username or password');
//       }
//     } catch (error) {
//       console.error('Error occurred:', error);
//       setMessage('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <section className="log-container vh-100">
//       <div className="login-container">
//         <div className="circle circle-one">
//           <img src={img1} style={{ borderRadius: '50%' }} height="100px" width="100px" alt="" />
//         </div>
//         <div className="form-container">
//           <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration" />
//           <h1 className="opacity-l1">LOGIN</h1>
//           <form className="form_login" onSubmit={handleLogin}>
//             <input type="text" placeholder="USERNAME" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
//             <input type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
//             <button type="submit" className="opacity">SUBMIT</button>
//             {message && <p style={{ color: "red" }}>{message}</p>}
//           </form>
//           <div className="register-forget opacity">
//             <a href="/"><b>FORGOT PASSWORD</b></a>
//           </div>
//           {/* <div className="input-group mb-3">
//                   <button className="btn btn-lg btn-light w-100 fs-6"><img src={googleLogo} alt="" style={{width:"20px"}} className="me-2" /><small>Sign in with google</small></button>
//                 </div> */}
//           <div className="input-group mb-3">
//             <button
//               className="btn btn-lg btn-light w-100 fs-6"
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: '1.25rem', // equivalent to fs-6
//                 backgroundColor: '#f8f9fa', // btn-light background color
//                 width: '100%', // w-100
//                 border: '1px solid #ced4da', // default Bootstrap button border
//                 borderRadius: '0.25rem', // default Bootstrap button border-radius
//                 padding: '0.5rem 1rem', // default Bootstrap button padding
//                 color: '#212529', // default Bootstrap text color
//                 cursor: 'pointer',
//                 textDecoration: 'none', // Remove underline from text
//               }}
//             >
//               <img
//                 src={googleLogo}
//                 alt=""
//                 style={{
//                   width: '20px',
//                   marginRight: '0.5rem', // equivalent to me-2
//                 }}
//               />
//               <small>Sign in with Google</small>
//             </button>
//           </div>

//           <div className="row">
//             <small>Don't have an account? <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Sign Up
//             </span></small>
//           </div>
//         </div>
//         <div className="circle circle-two"></div>
//       </div>
//       <div className="theme-btn-container"></div>
//     </section>
//   )
// }


import React, { useState } from 'react'
import img1 from './images/Logo.png'
import googleLogo from './images/google.png'
import axios from 'axios'
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    if (!username || !password) {
      setMessage('Please enter username and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password });
      if (response.status === 200 && response.data.success) { // Check response status and data
        console.log(response.data.token);
        // Store token in local storage
        localStorage.setItem("token", response.data.token);
        navigate('/dashboard');
      } else {
        console.error('Error');
        setMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <section className="log-container">
      <div className="login-container">
        <div className="circle circle-one">
          <img src={img1} style={{ borderRadius: '50%' }} height="100px" width="100px" alt="" />
        </div>
        <div className="form-container">
          <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration" />
          <h1 className="opacity-l1">LOGIN</h1>
          <form className="form_login" onSubmit={handleLogin}>
            <input type="text" placeholder="USERNAME" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
            <input type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            <button type="submit" className="opacity">SUBMIT</button>
            {message && <p style={{ color: "red" }}>{message}</p>}
          </form>
          <div className="register-forget opacity">
            <a href="/"><b>FORGOT PASSWORD</b></a>
          </div>
          <div className="input-group mb-3">
            <button
              className="btn btn-lg btn-light w-100 fs-6"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem', // equivalent to fs-6
                backgroundColor: '#f8f9fa', // btn-light background color
                width: '100%', // w-100
                border: '1px solid #ced4da', // default Bootstrap button border
                borderRadius: '0.25rem', // default Bootstrap button border-radius
                padding: '0.5rem 1rem', // default Bootstrap button padding
                color: '#212529', // default Bootstrap text color
                cursor: 'pointer',
                textDecoration: 'none', // Remove underline from text
              }}
            >
              <img
                src={googleLogo}
                alt=""
                style={{
                  width: '20px',
                  marginRight: '0.5rem', // equivalent to me-2
                }}
              />
              <small>Sign in with Google</small>
            </button>
          </div>
          <div className="row">
            <small>Don't have an account? <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Sign Up</span></small>
          </div>
        </div>
        <div className="circle circle-two"></div>
      </div>
      <div className="theme-btn-container"></div>
    </section>
  )
}
