import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './header';
import styles from '../styles/studenthomepage.css';

function StudentHomepage() {
    return (
        <div className={styles.container}>
            <Header/>
            <Footer/>
        </div>
    );
}

export default StudentHomepage; // Thêm dòng này để export component
