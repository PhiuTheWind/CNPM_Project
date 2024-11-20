import React from 'react';
import styles from '../styles/Header.module.css'
import spss from '../assets/PRINTING SERVICE.png';
import ava from '../assets/avatar.png';
import { IoIosLogOut } from "react-icons/io";

function Header({ text, showLogout }){

    return (
        <header className={styles.header}>
            <div className={styles.header_logo}>
                <img src={spss} alt="BK Student Smart Printing Service" />
            </div>
            <div className={styles.header_right}>
                <div className={styles.avatar_container}>
                    <img src={ava} className={styles.avatar} alt="Avatar" />
                    <p className={styles.welcome_button}>{text}</p>
                </div>
                {showLogout && (
                <div className={styles.icon}>
                    <IoIosLogOut size={50} color="#555" />
                </div>
                )}
            </div>
        </header>
    );


};
export default Header;