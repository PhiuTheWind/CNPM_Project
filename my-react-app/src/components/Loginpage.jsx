import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import banner2 from '../assets/banner2.png'
import Footer from './Footer';
import styles from '../styles/Loginpage.module.css'
import Header from './Header';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';


function LoginPage({ role }) {
  const url = `http://localhost:3000/api/login/${role}`;
 
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } 
    else if (name === "password") {
      setPassword(value);
    }
  };
  // useEffect(() => {
  //   if (errors.length > 0) {
  //     console.log(errors);
  //     setShowErrors(true) 
  //   }
  // }, [errors]);

  
  useEffect(() => {
    let newErrors = [];
    // if (username === "" &&  password === ""){
    //   newErrors.push("Bạn chưa nhập tài khoản và mật khẩu");
    // }
    // else if (username === "") {
    //   newErrors.push("Bạn chưa nhập tài khoản");
    // }
    // else if (password === "") {
    //   newErrors.push("Bạn chưa nhập mật khẩu");
    // }
    setErrors(newErrors);
    setShowErrors(true);
  }, [username, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (errors.length > 0) {
      setShowErrors(true);
      return;
    }
    try {
      const validation = await axios.post(url, {
        requestedName: username,
        password: password
      }, {
        withCredentials: true
      });
      localStorage.setItem('userCredentials', JSON.stringify({ token: validation.data.token, isSPSO: role === 'spso' }));
      localStorage.setItem('files', JSON.stringify([]));
    
      if( role === 'spso'){
        window.location.assign('/spso_homepage');
      }
      else{
        window.location.assign('/student_homepage');
      }
    }
      
    catch (error) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          
          setErrors([error.response.data]);
        }
        if (error.response.status === 500) {
          setErrors([error.response.data]);
        }
      }
      else {
        setErrors(['Không kết nối được đến server!']);
      }
      setShowErrors(true);
      
    }
  }

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
              className={styles.input}
              type="text"
              placeholder='Tên đăng nhập'
              name="username" 
              value={username}
              onChange={handleChange}
              required
            />
            <FaUser className={styles.icon}/>
          </div>
          <div className={styles.input_group}>
            <input
              className={styles.input}
              type="password"
              placeholder='Mật khẩu'
              name="password" 
              value={password}
              onChange={handleChange}
              required
            />
            <FaLock className={styles.icon}/>
          </div>


          <button className={styles.button}type="submit">Đăng nhập</button>


          {showErrors && errors.length > 0 && (
            <div className={styles.error_container}>
              {errors.map((error, index) => (
                <p key={index} className={styles.error_message}>
                  {error}
                </p>

              ))}
            </div>
          )}


        </form>
      </section>

      <Footer/>
    </div>
  );
}

export default LoginPage;