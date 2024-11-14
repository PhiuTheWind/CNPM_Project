import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/HomeBeforeLogin.module.css';
import banner from '../assets/banner.png';
import login from '../assets/login.png';
import Footer from './Footer';
import Header from './header';

function HomeBeforeLogin(){
    return(
        <div className={styles.container}>
            <Header/>
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