import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import banner2 from '../assets/banner2.png'
import Footer from './Footer';
import styles from '../styles/Loginpage.module.css'
import Header from './Header';

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
      <Header/>

      <section className={styles.banner}>
        <img src={banner2} alt="Banner" className={styles.banner_image} />
        
        {/* Login Form */}
        <form id="loginForm" className={styles.login_form} onSubmit={handleSubmit}>
          <label className={styles.Hello}>Xin chào!</label>
          <div className={styles.input_group}>
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
          <div className={styles.input_group}>
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