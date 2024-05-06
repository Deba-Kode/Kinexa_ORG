import './App.css';
import Signup from './components/Signup/Signup.js';
import Home from './components/Home/home.js';
import Login from './components/Login/Login.js';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage.js';
import ParticularUser from './components/ParticularUser.js';
import Forgot from './components/forgot.js';
import Reset from './components/reset.js';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/particularUser" element={<ParticularUser />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset-pass" element={<Reset />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;