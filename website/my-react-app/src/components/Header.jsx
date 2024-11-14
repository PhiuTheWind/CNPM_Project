import React from 'react';
import styles from '../styles/Header.module.css'
import spss from '../assets/PRINTING SERVICE.png';
import ava from '../assets/avatar.png';
function header(){

    return (
        <header className={styles.header}>
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
    );


};
export default header;