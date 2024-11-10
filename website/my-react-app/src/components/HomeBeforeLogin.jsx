import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/HomeBeforeLogin.module.css';
import spss from '../assets/PRINTING SERVICE.png';
import ava from '../assets/avatar.png';
import banner from '../assets/banner.png';
import login from '../assets/login.png';
import Footer from './Footer';
function HomeBeforeLogin(){
    return(
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
                <Link to='/user'>
                    <img src={login} alt="Login button" className={styles.login_image}></img>                
                </Link>
            </section>

            <Footer/>
            
        </div>

    );
};

export default HomeBeforeLogin;