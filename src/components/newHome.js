import './sass/main.css';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import accueil from './images/accueil.png'
import search from './images/search.png'
import compass from './images/compass.png'
import send from './images/send.png'
import Love from './images/love.png'
import tab from './images/tab.png'
import profile_img from './images/profile_img.jpg'
import Menu from './images/menu.png'
import reglage from './images/reglage.png'
import saveInstagram from './images/save-instagram.png'
import moon from './images/moon.png'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserDetails from '../UserDetails';
import PostsData from '../PostsData';
import ParticularUser from '../ParticularUser';
import ParticularUserPostsData from '../ParticularUserPostsData';

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                const UserName = localStorage.getItem('userName');
                if (!token) {
                    navigate('/');
                    return;
                }
                await axios.post('http://192.168.0.164:3001/NameUserLog', { UserName });

                const response = await axios.get('http://192.168.0.164:3001/api/verify', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    // console.log("User is authenticated");
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error occurred:', error);
            }

        };
        checkAuthentication();
    }, [navigate]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    async function handleLogout() {
        try {
            console.log('Logged out successfully');
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            localStorage.removeItem("userId")
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/');
                    return;
                }
                const response = await axios.get('http://192.168.0.164:3001/api/verify', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    // console.log("User is authenticated");
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error:', error);
                navigate('/');
            }
        };
        checkAuthentication();
    }, [navigate]);

    const [formData, setFormData] = useState({
        imageUpload: null,
        caption: '',
        userID: ''
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            imageUpload: file
        });
    };

    const handleCaptionChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    function handleCreateModal() {
        const modal = document.getElementById('exampleModal');
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        const userID = localStorage.getItem("userId")
        formDataToSend.append('imageUpload', formData.imageUpload);
        formDataToSend.append('caption', formData.caption);
        formDataToSend.append('userID', userID);
        try {
            // console.log("User id to send to the posts api", userID);

            const response = await axios.post('http://192.168.0.164:3001/upload-post', formDataToSend);
            // console.log(response.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
        document.getElementById("closeModal").click();
    };

    return (
        <div>
            <div className='d-flex' >
                <div className="post_page sign">
                    {/* ***** nav menu start ****** */}
                    <div className="nav_menu sign" style={{ flexGrow: 1 }}>
                        <div className="fix_top sign">
                            {/* nav for big->medium screen */}
                            <div className="nav sign padsize">






                                <div className="menu sign" style={{ marginLeft: "50px" }}>
                                    <ul>
                                        {/* <div className="ProLogo d-flex justify-content-left">
                                            <img className="logo" src={Logo} height="150px" width="150px" alt="logo" />
                                        </div> */}
                                        <li>
                                            <Link className="active" to="home.html">
                                                <img src={accueil} alt="" />
                                                <span className="d-none d-lg-block">Home</span>
                                            </Link>
                                        </li>
                                        <li id="search_icon">
                                            <Link to="#">
                                                <img src={search} alt="" />
                                                <span className="d-none d-lg-block">Search</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="./explore.html" className="" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                                                <img src={compass} alt="" />
                                                <span className="d-none d-lg-block">My Posts</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <img src={send} alt="" />
                                                <span className="d-none d-lg-block">Messages</span>
                                            </Link>
                                        </li>
                                        <li className="notification_icon">
                                            <Link to="#">
                                                <img src={Love} alt="" />
                                                <span className="d-none d-lg-block">Notifications</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" onClick={() => handleCreateModal()}>
                                                <img src={tab} alt="" />
                                                <span className="d-none d-lg-block">Create</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <span className="d-none d-lg-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><img className="circle1 story" src={profile_img} alt="" />Profile</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="more sign more_sign">
                                    <div className="btn-group dropup sign">
                                        <button type="button" className="btn dropdown-toggle" onClick={toggleDropdown} aria-expanded={isDropdownOpen}>
                                            <img src={Menu} alt="" />
                                            <span className="d-none d-lg-block prfilename">More</span>
                                        </button>
                                        <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''} dropup`}>
                                            <li>
                                                <Link className="dropdown-item" to="#">
                                                    <span>Settings</span>
                                                    <img src={reglage} alt="" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="#">
                                                    <span>Saved</span>
                                                    <img src={saveInstagram} alt="" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="#">
                                                    <span>Switch appearance</span>
                                                    <img src={moon} alt="" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item bold_border" to="#">
                                                    <span>Switch accounts</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/" onClick={handleLogout}>
                                                    <span>Log out</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- menu in the bottom for small screen  --> */}
                    <div className="nav_bottom sign">
                        <Link to="./home.html"><img src={accueil} alt="" /></Link>
                        <Link to="./explore.html"><img src={compass} alt="" /></Link>
                        <Link to="#" data-bs-toggle="modal" data-bs-target="#create_modal"><img src={tab} alt="" /></Link>
                        <Link to="profile.html"><img className="circle story" src={profile_img} alt="" /></Link>
                    </div>
                </div>







                <div className="suggest12345 m" style={{ maxHeight: "100vh", overflowY: "scroll", overflowX: "hidden", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
                    <div className="">
                        <div className="col-12 d-flex justify-content-center">
                            <PostsData />
                        </div>
                    </div>
                </div>







                <div className="container detailsUser suggest123" style={{ width: "400px" }}>
                    <div className="d-flex justify-content-center align-items-center">
                        <div>
                            <h5>Suggestions for you</h5>
                            <UserDetails />
                            {/* Other contents */}
                        </div>
                    </div>
                </div>



                <ParticularUserPostsData />



                <div className="offcanvas offcanvas-end " tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Your Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body" style={{ background: "linear-gradient(135deg, #3498db, #8e44ad)" }}>
                        <ParticularUser />
                    </div>
                </div>















                {/* <!-- search  --> */}
                {/* <div id="search" className="search_section sign">
                    <h2>Search</h2>
                    <form method="post">
                        <input type="text" placeholder="Search" />
                    </form>
                    <div className="find sign">
                        <div className="desc sign">
                            <h4>Recent</h4>
                            <p><Link to="#">Clear all</Link></p>
                        </div>
                        <div className="account sign">
                            <div className="cart sign">
                                <div>
                                    <div className="img sign">
                                        <img src={profile_img} alt="" />
                                    </div>
                                    <div className="info sign">
                                        <p className="name">Zineb_essoussi</p>
                                        <p className="second_name">Zim Ess</p>
                                    </div>
                                </div>
                                <div className="clear sign">
                                    <Link to="#">X</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <!-- search  -->

        <!-- notification --> */}
                {/* <div id="notification" className="notification_section sign">
                    <h2>Notifications</h2>
                    <div className="notifications sign">
                        <div className="notif follow_notif sign">
                            <div className="cart sign">
                                <div>
                                    <div className="img sign">
                                        <img src={profile_img} alt="" />
                                    </div>
                                    <div className="info sign">
                                        <p className="name">
                                            Zineb_essoussi
                                            <span className="desc">started following you.</span>
                                            <span className="time">2h</span>
                                        </p>

                                    </div>
                                </div>
                                <div className="follow_you sign">
                                    <button className="follow_text">Follow</button>
                                </div>
                            </div>
                        </div>
                        <div className="notif follow_notif sign">
                            <div className="cart sign">
                                <div>
                                    <div className="img">
                                        <img src={profile_img} alt="" />
                                    </div>
                                    <div className="info sign">
                                        <p className="name">
                                            Zineb_essoussi
                                            <span className="desc">started following you.</span>
                                            <span className="time">2h</span>
                                        </p>

                                    </div>
                                </div>
                                <div className="follow_you">
                                    <button className="follow_text">Follow</button>
                                </div>
                            </div>
                        </div>
                        <div className="notif story_notif">
                            <div className="cart">
                                <div>
                                    <div className="img">
                                        <img src={profile_img} alt="" />
                                    </div>
                                    <div className="info">
                                        <div className="info">
                                            <p className="name">
                                                Zineb_essoussi
                                                <span className="desc">liked your story.</span>
                                                <span className="time">2d</span>
                                            </p>

                                        </div>
                                    </div>
                                </div>
                                <div className="story_like">
                                    <img src={img2} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="notif follow_notif">
                            <div className="cart">
                                <div>
                                    <div className="img">
                                        <img src={profile_img} alt="" />
                                    </div>
                                    <div className="info">
                                        <p className="name">
                                            Zineb_essoussi
                                            <span className="desc">started following you.</span>
                                            <span className="time">2h</span>
                                        </p>

                                    </div>
                                </div>
                                <div className="follow_you">
                                    <button className="follow_text">Follow</button>
                                </div>
                            </div>
                        </div>
                        <div className="notif story_notif">
                            <div className="cart">
                                <div>
                                    <div className="img">
                                        <img src={profile_img} alt="" />
                                    </div>
                                    <div className="info">
                                        <div className="info">
                                            <p className="name">
                                                Zineb_essoussi
                                                <span className="desc">liked your story.</span>
                                                <span className="time">2d</span>
                                            </p>

                                        </div>
                                    </div>
                                </div>
                                <div className="story_like">
                                    <img src={img2} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="notif follow_notif">
                            <div className="cart">
                                <div>
                                    <div className="img">
                                        <img src={profile_img} alt="" />
                                    </div>
                                    <div className="info">
                                        <p className="name">
                                            Zineb_essoussi
                                            <span className="desc">started following you.</span>
                                            <span className="time">2h</span>
                                        </p>

                                    </div>
                                </div>
                                <div className="follow_you">
                                    <button className="follow_text">Follow</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* <!-- Modal for sending posts--> */}
                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title w-100 fs-5 d-flex align-items-end justify-content-between" id="exampleModalLabel">
                                    <span className="title_create" style={{ color: "black" }}>Create new post</span>
                                </h1>
                                <button type="button" id='closeModal' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <i className="bi bi-file-earmark" style={{ fontSize: '6rem', color: "black" }}></i>
                                <p style={{ color: "black" }}>Drag photos and videos here</p>
                                <form id="upload-form" className="text-center p-5 border rounded" onSubmit={handleSubmit}>
                                    <input className="form-control mb-3" type="file" id="image-upload" name="imageUpload" onChange={handleFileChange} />
                                    <input className="form-control mb-3" type="text" id="caption" name="caption" placeholder="Enter caption" value={formData.caption} onChange={handleCaptionChange} />
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;