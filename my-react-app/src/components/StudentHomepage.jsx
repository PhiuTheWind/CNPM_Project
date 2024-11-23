// src/components/StudentHomepage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/StudentHomepage.module.css';
import banner from '../assets/banner.png';
import Print from '../assets/Printbutton.png';
import Viewlog from '../assets/Viewlogbutton.png';
import axios from 'axios';

function StudentHomepage() {
  const url = `http://localhost:3000/api`;
  const token = localStorage.getItem('userCredentials') ? JSON.parse(localStorage.getItem('userCredentials')).token : null;


  const [studentInfo, setStudentInfo] = useState({
    name: 'vvvvv',
    pagebalance: 0
  });

  const Getinfo = async (event) => {
    //event.preventDefault();                 
    try {
      const response = await axios.post(url,{},{
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setStudentInfo({
          name: response.data.name,               // Lưu tên sinh viên
          pagebalance: response.data.pagebalance // Lưu pagebalance
        });
      }
      else if (response.status === 404) {
          navigate('/');            // Điều hướng tới homepage
      }
      console.log(response)

    }
    catch (error) {
      console.log(error)
  // if (error.response && error.response.status === 401) {
  //     // Nếu token không hợp lệ hoặc hết hạn, điều hướng tới trang login
  //     navigate('/login'); // Điều hướng tới trang login
  // }
    }    
  }                  
  

  
  useEffect(() => {
    Getinfo();  
  }, []); 


  return (

    <div className={styles.container}>
        <Header text={studentInfo.name} showLogout={true} />

        <section className={styles.banner}>
            <img src={banner} alt="Banner" className={styles.banner_image} />
            <Link to='/login'>
                    <img src={Print} alt="Print Button" className={styles.print_image} />
                </Link>
                <Link to='/login'>
                    <img src={Viewlog} alt="Viewlog Button" className={styles.Viewlog_image} />
                </Link>
          </section>

        
        <section className={styles.boxContainer}>
          <div className={styles.box}>
            <p>Maintenance Information</p>
            <button className={styles.viewButton}>View</button>
          </div>
          <div className={styles.box}>
            <p>Guideline - Instruction</p>
            <button className={styles.viewButton}>View</button>
          </div>
          <div className={styles.box}>
            <p>Contact - Support</p>
            <button className={styles.viewButton}>View</button>
          </div>
        </section>
      


        
        <Footer/>
    </div>

  );
}

export default StudentHomepage;
