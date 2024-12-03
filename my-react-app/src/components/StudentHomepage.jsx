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
import Bar from '../assets/Bar.png';
import wel_circle from '../assets/wel.png';
import welcome_box from '../assets/welcome.png';
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
          name: response.data[0].username,              
          pagebalance: response.data[0].page_num 
        });
      }
      else if (response.status === 404) {
          navigate('/');           
      }
      console.log(response)

    }
    catch (error) {
      console.log(error)
    }    
  }                  
  
  useEffect(() => {
    Getinfo();  
  }, []); 

  return (

    <div className={styles.container}>
        <Header text={studentInfo.name} showLogout={true} isStudent={true}/>

        <section className={styles.banner}>
            <img src={banner} alt="Banner" className={styles.banner_image} />
            <Link to='/printing_configure'>
                    <img src={Print} alt="Print Button" className={styles.print_image} />
                </Link>
                <Link to='/student_homepage/view_log'>
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

        <div className={styles.lineSection}>
          <img src={Bar} alt="Full Bar" className={styles.fullBarImage} />
        </div>

        <div className={styles.imageSection}>
          <img src={wel_circle} alt="Welcome Circles" className={styles.welcomeImage} />
        </div>

        <div className={styles.bottomImageSection}>
          <img src= {welcome_box} alt="Welcome Character" className={styles.bottomImage} />
        </div>



        
        <Footer/>
    </div>

  );
}

export default StudentHomepage;
