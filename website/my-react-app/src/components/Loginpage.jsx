import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import spss from '../assets/PRINTING SERVICE.png';
import cricle from '../assets/Group 169.png';
import banner2 from '../assets/banner2.png'
import Footer from './Footer';
import '../styles/Loginpage.css'

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'student@hcmut.edu.vn' && password === 'password') {
      navigate('/student_homepage');
    } else if (username === 'spso@hcmut.sps.vn' && password === 'password') {
      navigate('/spso_homepage');
    } else {
      alert('Vui lòng nhập đầy đủ thông tin chính xác!');
    }
  };

  return (
    <div className="container">
      <header>
        <div className="header-logo">
            <img src={spss} alt="BK Student Smart Printing Service" />
        </div>
        <div className="header-right">
            <div className="frame-container">
                <img src={cricle} className="frame" />
            </div>
        </div>
      </header>

      <section className="banner">
        <img src={banner2} alt="Banner" className="banner-image" />
        
        {/* Login Form */}
        <form id="loginForm" className="login-form" onSubmit={handleSubmit}>
          <label className="Hello">Xin chào!</label>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Đăng nhập</button>
        </form>
      </section>

      <Footer/>
    </div>
  );
}

export default LoginPage;