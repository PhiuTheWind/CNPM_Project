import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ChooseUser.css';
import spss from '../assets/PRINTING SERVICE.png';
import ava from '../assets/avatar.png';
import banner from '../assets/banner.png';
import userstu from '../assets/user_student.png';
import userspso from '../assets/user_spso.png';
import Footer from './Footer';

function ChooseUser(){
    return (
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
                <Link to='/login'>
                    <img src={userstu} alt="Student Button" className="student-image" />
                </Link>
                <Link to='/login'>
                    <img src={userspso} alt="SPSO Button" className="spso-image" />
                </Link>
                
            </section>

            <Footer/>
        </div>
    );
};

export default ChooseUser;