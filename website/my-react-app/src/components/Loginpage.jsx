import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import banner2 from '../assets/banner2.png'
import Footer from './Footer';
import styles from '../styles/Loginpage.module.css'
import Header from './Header';
import { FaUser, FaLock } from "react-icons/fa";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'student@hcmut.edu.vn' && password === 'password') {
      navigate('/student_homepage');
    } else if (username === 'spso@hcmut.spso.vn' && password === 'password') {
      navigate('/spso_homepage');
    } else {
      alert('Vui lòng nhập đầy đủ thông tin chính xác!');
    }
  };

  return (
    <div className={styles.container}>
      <Header text='XIN CHÀO'/>

      <section className={styles.banner}>
        <img src={banner2} alt="Banner" className={styles.banner_image} />
        
        {/* Login Form */}
        <form id="loginForm" className={styles.login_form} onSubmit={handleSubmit}>
          <label className={styles.Hello}>Xin chào!</label>
          <div className={styles.input_group}>
            <input
              type="text"
              placeholder='Tên đăng nhập'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className={styles.icon}/>
          </div>
          <div className={styles.input_group}>
            <input
              type="password"
              placeholder='Mật khẩu'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className={styles.icon}/>
          </div>
          <button type="submit">Đăng nhập</button>
        </form>
      </section>

      <Footer/>
    </div>
  );
}

export default LoginPage;