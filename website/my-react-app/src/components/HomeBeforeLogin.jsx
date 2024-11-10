import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeBeforeLogin.css';
import spss from '../assets/PRINTING SERVICE.png';
import ava from '../assets/avatar.png';
import banner from '../assets/banner.png';
import login from '../assets/login.png';
import Footer from './Footer';
function HomeBeforeLogin(){
    return(
        <div className="container">
            <header>
                <div className="header-logo">
                    <img src={spss} alt="BK Student Smart Printing Service" />
                </div>
                <div className="header-right">
                    <div className="avatar-container">
                        <img src={ava} className="avatar" alt="Avatar" />
                        <p className="welcome-button">XIN CHÀO</p>
                    </div>
                </div>
            </header>

            <section className="banner">
                <img src={banner} alt="Banner" className="banner-image" />
                <Link to='/user'>
                    <img src={login} alt="Login button" className="login-image"></img>                
                </Link>
            </section>

            <Footer/>
            
        </div>

    );
};

export default HomeBeforeLogin;