import './sass/main.css';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from './images/Logo3.png'
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
import logo_menu from './images/logo_menu.png'
import addFriend from './images/add-friend.png'
import star from './images/star.png'
import img2 from './images/img2.jpg'
import uploaded_post from './images/uploaded_post.gif'
import upload from './images/upload.png'
import Heart from './images/heart.png'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/');
                    return;
                }
                const response = await axios.get('http://localhost:3001/api/verify', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    console.log("User is authenticated");
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

    // const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function handleCreateModal() {
        const modal = document.getElementById('create_modal');
        modal.classList.add('show');
        modal.style.display = 'block';
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    async function handleLogout() {
        try {
            console.log('Logged out successfully');
            localStorage.removeItem("token");
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
                const response = await axios.get('http://localhost:3001/api/verify', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    console.log("User is authenticated");
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

    return (
        <>
            <div className="post_page sign">
                {/* ***** nav menu start ****** */}
                <div className="nav_menu sign">
                    <div className="fix_top sign">
                        {/* nav for big->medium screen */}
                        <div className="nav sign padsize">
                            <div className="logo sign">
                                <Link to="./home.html">
                                    <img className="d-block d-lg-none small-logo" src={Logo} height="150px" width="150px" alt="logo" />
                                </Link>
                            </div>
                            <div className="menu sign">
                                <ul>
                                    <li>
                                        <Link className="active" to="home.html">
                                            <img src={accueil} alt="" />
                                            <span className="d-none d-lg-block ">Home</span>
                                        </Link>
                                    </li>
                                    <li id="search_icon">
                                        <Link to="#">
                                            <img src={search} alt="" />
                                            <span className="d-none d-lg-block search">Search </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="./explore.html">
                                            <img src={compass} alt="" />
                                            <span className="d-none d-lg-block ">Explore</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="./messages.html">
                                            <img src={send} alt="" />
                                            <span className="d-none d-lg-block ">Messages</span>
                                        </Link>
                                    </li>
                                    <li className="notification_icon">
                                        <Link to="#">
                                            <img src={Love} alt="" />
                                            <span className="d-none d-lg-block ">Notifications</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="" onClick={() => handleCreateModal()}>
                                            <img src={tab} alt="" />
                                            <span className="d-none d-lg-block ">Create</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="./profile.html">
                                            <img className="circle1 story" src={profile_img} alt="" />
                                            <span className="d-none d-lg-block profile_align">Profile</span>
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
                        {/* <!-- nav for small screen  --> */}
                        <div className="nav_sm sign">
                            <div className="content sign">
                                <div className="dropdown sign">
                                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img className="logo" src={logo_menu} alt="" />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="#">
                                            <span>Following</span>
                                            <img src={addFriend} alt="" />
                                        </Link>
                                        </li>
                                        <li><Link className="dropdown-item" to="#">
                                            <span>Favorites</span>
                                            <img src={star} alt="" />
                                        </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="left sign">
                                    <div className="search_bar sign">
                                        <div className="input-group sign">
                                            <div className="form-outline sign">
                                                <div>
                                                    <img src={search} alt="search" />
                                                </div>
                                                <input type="search" id="form1" className="form-control" placeholder="Search" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="notifications notification_icon sign">
                                        <Link to="./notification.html">
                                            <img src={Love} alt="" />
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* <!-- nav for ex-small screen  --> */}
                        <div className="nav_xm sign">
                            <div className="nav_xm sign">
                                <div className="dropdown sign">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img className="logo" src={logo_menu} alt="" />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="#">
                                            <span>Following</span>
                                            <img src={addFriend} alt="" />
                                        </Link></li>
                                        <li><Link className="dropdown-item" to="#">
                                            <span>Favorites</span>
                                            <img src={star} alt="" />
                                        </Link></li>
                                    </ul>
                                </div>
                                <div className="left sign">
                                    <img src={send} alt="" />
                                    <Link to="./notification.html">
                                        <img className="notification_icon" src={Love} alt="" />
                                    </Link>
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
            {/* <!-- search  --> */}
            <div id="search" className="search_section sign">
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
            </div>
            {/* <!-- search  -->

        <!-- notification --> */}
            <div id="notification" className="notification_section sign">
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
            </div>
            {/* <!-- search  --> */}
            {/* <div id="search" className="search_section">
                    {/* Your search section code here */}
            {/* </div> */}
            {/* <!-- notification --> */}
            {/* <div id="notification" className="notification_section"> */}
            {/* Your notification section code here */}
            {/* </div> */}

            {/* <div className="second_container"> */}
            {/* <!--***** posts_container start ****** --> */}
            {/* <div className="main_section"> */}
            {/* Your main section code here */}
            {/* </div> */}
            {/* <!--***** posts_container end ****** --> */}

            {/* <!--***** followers_container start ****** --> */}
            {/* <div className="followers_container"> */}
            {/* Your followers container code here */}
            {/* </div> */}
            {/* <!--***** followers_container end ****** --> */}
            {/* </div> */}

            {/* <!-- Modal for sending posts--> */}
            <div className="modal fade" id="send_message_modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal fade" id="send_message_modal" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Share</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="send">
                                    <div className="search_person">
                                        <p>To:</p>
                                        <input type="text" placeholder="Search" />
                                    </div>
                                    <p>Suggested</p>
                                    <div className="poeple">
                                        <div className="person">
                                            <div className="d-flex">
                                                <div className="img">
                                                    <img src={profile_img} alt="" />
                                                </div>
                                                <div className="content">
                                                    <div className="person">
                                                        <h4>namePerson</h4>
                                                        <span>zim ess</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="circle">
                                                <span></span>
                                            </div>
                                        </div>
                                        <div className="person">
                                            <div className="d-flex">
                                                <div className="img">
                                                    <img src={profile_img} alt="" />
                                                </div>
                                                <div className="content">
                                                    <div className="person">
                                                        <h4>namePerson</h4>
                                                        <span>zim ess</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="circle">
                                                <span></span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary">Send</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* <!-- Modal for add messages--> */}
                <div className="modal fade" id="message_modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal fade" id="message_modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Comments</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="comments">
                                        <div className="comment">
                                            <div className="d-flex">
                                                <div className="img">
                                                    <img src={profile_img} alt="" />
                                                </div>
                                                <div className="content">
                                                    <div className="person">
                                                        <h4>namePerson</h4>
                                                        <span>3j</span>
                                                    </div>
                                                    <p>Wow amzing shot</p>
                                                    <div className="replay">
                                                        <button className="replay">replay</button>
                                                        <button className="translation">see translation</button>
                                                    </div>
                                                    <div className="answers">
                                                        <button className="see_comment">
                                                            <span className="hide_com">Hide all responses</span>
                                                            <span className="show_c"> <span className="line"></span> See the <span> 1
                                                            </span> answers</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="like">
                                                <img className="not_loved" src={Love} alt="" />
                                                <img className="loved" src={Heart} alt="" />
                                                <p> 55</p>
                                            </div>
                                        </div>
                                        <div className="responses">
                                            <div className="response comment">
                                                <div className="d-flex">
                                                    <div className="img">
                                                        <img src={profile_img} alt="" />
                                                    </div>
                                                    <div className="content">
                                                        <div className="person">
                                                            <h4>namePerson</h4>
                                                            <span>3j</span>
                                                        </div>
                                                        <p>Wow amzing shot</p>
                                                        <div className="replay">
                                                            <button>replay</button>
                                                            <button>see translation</button>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="like">
                                                    <img className="not_loved" src={Love} alt="" />
                                                    <img className="loved" src={Heart} alt="" />
                                                    <p> 55</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <form method="post">
                                        <div className="input">
                                            <img src={profile_img} alt="" />
                                            <input type="text" id="emoji_comment" placeholder="Add a comment..." />
                                        </div>
                                        {/* <!-- <div className="emogi">
                                <img src="./images/emogi.png" alt="" />
                            </div> --> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!--Create model--> */}
                <div className="modal fade" id="create_modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal fade" id="create_modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title w-100 fs-5 d-flex align-items-end justify-content-between"
                                        id="exampleModalLabel">
                                        <span className="title_create">Create new post</span>
                                        <button className="next_btn_post btn_link"></button>
                                    </h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <img className="up_load" src={upload} alt="upload" />
                                    <p>Drag photos and videos here</p>
                                    <button className="btn btn-primary btn_upload">
                                        select from your computer
                                        <form id="upload-form">
                                            <input className="input_select" type="file" id="image-upload" name="image-upload" />
                                        </form>
                                    </button>
                                    <div id="image-container" className="hide_img">
                                    </div>
                                    <div id="image_description" className="hide_img">
                                        <div className="img_p"></div>
                                        <div className="description">
                                            <div className="cart">
                                                <div>
                                                    <div className="img">
                                                        <img src={profile_img} alt="" />
                                                    </div>
                                                    <div className="info">
                                                        <p className="name">Zineb_essoussi</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <form>
                                                <textarea type="text" id="emoji_create" placeholder="write your email"></textarea>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="post_published hide_img">
                                        <img src={uploaded_post} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Home;
