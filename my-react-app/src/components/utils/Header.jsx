import React from 'react';
import styles from '../../styles/Header.module.css'
import spss from '../../assets/PRINTING SERVICE.png';
import ava from '../../assets/avatar.png';
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function Header({ text, paper, showLogout, isStudent }) {
    const navigate = useNavigate()

    return (
        <header className={styles.header}>
            <div className={styles.header_logo}>
                {!isStudent && showLogout && (<button className={styles.home_btn} onClick={() => navigate('/spso_homepage')}>
                    <img className={styles.img} src={spss} alt="BK Student Smart Printing Service" />
                </button>)}
                {isStudent && showLogout && (<button className={styles.home_btn} onClick={() => navigate('/student_homepage')}>
                    <img className={styles.img} src={spss} alt="BK Student Smart Printing Service" />
                </button>)}
                {!showLogout && (<button className={styles.home_btn} onClick={() => navigate('/')}>
                    <img className={styles.img} src={spss} alt="BK Student Smart Printing Service" />
                </button>)}
            </div>
            {showLogout && !isStudent && (
                <div className={styles.homebar}>

                    <div className={styles.bar}>
                        <button className={styles.button} onClick={() => navigate('/spso_homepage')}>HOME</button>
                        <button className={styles.button} onClick={() => navigate('/spso_homepage/manage_printer')}>MÁY IN</button>
                        <button className={styles.button} onClick={() => navigate('/spso_homepage/manage_cofig')}>CẤU HÌNH</button>
                        <button className={styles.button} onClick={() => navigate('/spso_homepage/view_stu_log')}>THÔNG TIN IN SINH VIÊN</button>
                        <button className={styles.button} onClick={() => navigate('/spso_homepage/spsoreport')}>BÁO CÁO</button>
                    </div>
                </div>
            )}


            {showLogout && isStudent && (
                <div className={styles.stuhomebar}>
                    <div className={styles.bar}>
                        <button className={styles.button} onClick={() => navigate('/student_homepage')}>HOME</button>
                        <button className={styles.button} onClick={() => navigate('/student_homepage/printing_configure')}>IN TÀI LIỆU</button>
                        <button className={styles.button} onClick={() => navigate('/student_homepage/view_log')}>LỊCH SỬ IN</button>
                    </div>
                </div>
            )}
            <div className={styles.header_right}>
                <div className={styles.avatar_container}>
                    <img src={ava} className={styles.avatar} alt="Avatar" />
                    <div className={styles.info}>
                        <p className={styles.username}>{text}</p>
                        {showLogout && isStudent && <p className={styles.paper}>Số trang: {paper}</p>}
                    </div>
                </div>
                {showLogout && (
                    <button className={styles.icon} onClick={() => navigate('/')}>
                        <IoIosLogOut size={30} color="#555" />
                    </button>
                )}
            </div>
        </header>
    );


};
export default Header;