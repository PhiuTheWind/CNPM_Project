// src/components/StudentHomepage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './utils/Header';
import Footer from './utils/Footer';
import styles from '../styles/StudentHomepage.module.css';
import banner from '../assets/banner.png';
import Print from '../assets/Printbutton.png';
import Viewlog from '../assets/Viewlogbutton.png';
import axios from 'axios';
import Bar from '../assets/Bar.png';
import wel_circle from '../assets/wel.png';
import welcome_box from '../assets/welcome.png';
import { Getinfo } from './utils/GetInfo'

function StudentHomepage() {
  const [studentInfo, setStudentInfo] = useState({
    name: 'STUDENT',
    pagebalance: 0,
  });
  const [error, setError] = useState(null);            

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const data = await Getinfo();
        setStudentInfo(data); // Update state with fetched data
      } catch (err) {
        setError('Failed to fetch student information');
        console.error(err);
      }
    };

    fetchStudentInfo();
  }, [studentInfo]);
  
  return (

    <div className={styles.container}>
      <Header text={studentInfo.name} paper={studentInfo.pagebalance} showLogout={true} isStudent={true} />

        <section className={styles.banner}>
            <img src={banner} alt="Banner" className={styles.banner_image} />
            <Link to='/student_homepage/printing_configure'>
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


      <Footer />
    </div>

  );
}

export default StudentHomepage;
