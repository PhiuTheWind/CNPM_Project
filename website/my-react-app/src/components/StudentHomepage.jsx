// src/components/StudentHomepage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/StudentHomepage.module.css';
import banner from '../assets/banner.png';
import Print from '../assets/Printbutton.png';
import Viewlog from '../assets/Viewlogbutton.png';

function StudentHomepage() {
  return (

    <div className={styles.container}>
        <Header text='STUDENT NAME' showLogout={true} />

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
