import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SpsoHomepage.module.css';
import banner from '../assets/banner.png';
import Footer from './utils/Footer';
import Header from './utils/Header';
import { FaBell } from "react-icons/fa";


function SpsoHomepage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Header text='SPSO NAME' showLogout={true} isStudent={false} />

      <section className={styles.banner}>
        <img src={banner} alt="Banner" className={styles.banner_image} />
        <div className={styles.whiteRectangle}>
          <button className={styles.button} onClick={() => navigate('/spso_homepage/manage_printer')}>
            Quản lý máy in
            {/* <FaBell className={styles.noti}/> */}
          </button>
          <button className={styles.button} onClick={() => navigate('/spso_homepage/manage_cofig')}>
            Quản lý cấu hình hệ thống
          </button>
          <button className={styles.button} onClick={() => navigate('/spso_homepage/view_stu_log')}>
            Thông tin in của sinh viên
          </button>
          <button className={styles.button} onClick={() => navigate('/spso_homepage/spso_report_month')}>
            Báo cáo in ấn
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SpsoHomepage;