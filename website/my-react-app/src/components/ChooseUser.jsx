import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ChooseUser.module.css';
import spss from '../assets/PRINTING SERVICE.png';
import ava from '../assets/avatar.png';
import banner from '../assets/banner.png';
import userstu from '../assets/user_student.png';
import userspso from '../assets/user_spso.png';
import Footer from './Footer';

function ChooseUser(){
    return (
        <div className={styles.container}>
            <header>
                <div className={styles.header_logo}>
                    <img src={spss} alt="BK Student Smart Printing Service" />
                </div>
                <div className={styles.header_right}>
                    <div className={styles.avatar_container}>
                        <img src={ava} className={styles.avatar} alt="Avatar" />
                        <p className={styles.welcome_button}>XIN CHÀO</p>
                    </div>
                </div>
            </header>

            <section className={styles.banner}>
                <img src={banner} alt="Banner" className={styles.banner_image} />
                <Link to='/login'>
                    <img src={userstu} alt="Student Button" className={styles.student_image} />
                </Link>
                <Link to='/login'>
                    <img src={userspso} alt="SPSO Button" className={styles.spso_image} />
                </Link>
                
            </section>

            <Footer/>
        </div>
    );
};

export default ChooseUser;