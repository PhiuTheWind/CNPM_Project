import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ChooseUser.module.css';
import banner from '../assets/banner.png';
import userstu from '../assets/user_student.png';
import userspso from '../assets/user_spso.png';
import Footer from './Footer';
import Header from './Header';

function ChooseUser(){
    return (
        <div className={styles.container}>
            <Header text='XIN CHÀO'/>

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