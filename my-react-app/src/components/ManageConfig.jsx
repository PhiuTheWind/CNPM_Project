import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/ManageConfig.module.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ManageConfig() {
  const [date, setDate] = useState(new Date());
  return (
    <div className={styles.container}>
      <Header text='SPSO NAME' showLogout={true} />

      <section className={styles.config}>
        <form id="loginForm" className={styles.login_form}>
          <h1 className={styles.h1}>Quản lý cấu hình hệ thống</h1>
          <div className={styles.input_group}>
            <label className={styles.name}>Số giấy mặc định sinh viên nhận mỗi kỳ:</label>
            <input
              type="number"
              placeholder='Nhập số giấy...'
              className={styles.input}
              value={100}
              required
            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.name}>Ngày cấp giấy cho sinh viên:</label>
            <DatePicker className={styles.datepick}
              selected={date}
              onChange={date => setDate(date)}
              dateFormat='dd/MM/yyyy'
            />
          </div>
          <div className={styles.checkfiled}>
            <label className={styles.name}>Định dạng file cho phép:</label>
            <div className={styles.filetype}>
              <p> pdf <input className={styles.check} type='checkbox'/></p>
              <p> docx <input className={styles.check} type='checkbox'/></p>
              <p> jpg <input className={styles.check} type='checkbox'/></p>
              <p> png <input className={styles.check} type='checkbox'/></p>
            </div>
          </div>
          <button className={styles.button} type="submit">LƯU THAY ĐỔI</button>
        </form>

      </section>

      <Footer />
    </div>
  );
}

export default ManageConfig;
