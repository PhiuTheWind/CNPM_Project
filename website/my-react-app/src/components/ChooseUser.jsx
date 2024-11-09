import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ChooseUser.css';
import spss from '../assets/PRINTING SERVICE.png';
import ava from '../assets/avatar.png';
import banner from '../assets/banner.png';
import userstu from '../assets/user_student.png';
import userspso from '../assets/user_spso.png';
import bkname from '../assets/bk_name_en.png';
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
                        <button className="welcome-button">XIN CHÀO</button>
                    </div>
                </div>
            </header>
            
            <section className="banner">
                <img src={banner} alt="Banner" className="banner-image" />

                <img src={userstu} alt="SPSO Button" className="student-image" />

                <img src={userspso} alt="SPSO Button" className="spso-image" />
            </section>

            <footer>
                <div className="footer-left">
                    <img src={spss} alt="BK Logo" className="overlay-logo" />
                    <p className="footer-text">
                        Technical contact:<br />
                        Email: abc@gmail.com<br />
                        Phone: 09xxxxxxx<br />
                        Address:<br />
                        &copy; 2024 HCMUT_SSPS
                    </p>
                </div>
                <div className="footer-right">
                    <img src={bkname} alt="BK Right Logo" className="overlay-logo" />
                    <p>VIETNAM NATIONAL UNIVERSITY HO CHI MINH CITY<br />
                        HO CHI MINH CITY UNIVERSITY OF TECHNOLOGY<br />
                        &copy; 2024 HCMUT_SSPS
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ChooseUser;