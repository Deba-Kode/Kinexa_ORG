import './App.css';
import CommentSection from './components/Comment';
import PostsData from './components/PostsData';
import CreatePostModal from './components/Post';
import Signup from './components/Signup/Signup.js';
import UserDetails from './components/UserDetails';
import Home from './components/Home/home.js';
import Login from './components/Login/Login.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Signup /> */}
      {/* <UserDetails /> */}
      {/* <CreatePostModal /> */}
      {/* <PostsData /> */}
      {/* <CommentSection /> */}
      {/* <Home /> */}
      {/* <Login /> */}
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
