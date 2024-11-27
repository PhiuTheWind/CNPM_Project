import React, {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/AddPrinter.module.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddPrinter() {
  const [date, setDate] = useState(new Date());

  return (
    <div className={styles.container}>
      <Header text='SPSO NAME' showLogout={true} />
      
      <section className={styles.add_printer_section}>
        <form className={styles.form}>
          <h1 className={styles.header}>THÊM THÔNG TIN MÁY IN</h1>
          <div className={styles.input_group}>
            <label className={styles.name}>ID máy in</label>
            <input 
              type='text'
              placeholder='Nhập ID máy in...'
              className={styles.input}
              required
            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.name}>Tên máy in</label>
            <input 
              type='text'
              placeholder='Nhập tên máy in...'
              className={styles.input}
              required
            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.name}>Vị trí</label>
            <input 
              type='text'
              placeholder='Nhập vị trí máy in...'
              className={styles.input}
              required
            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.name}>Địa chỉ IP</label>
            <input 
              type='text'
              placeholder='Nhập địa chỉ IP máy in...'
              className={styles.input}
              required
            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.name}>Trạng thái</label>
            <div className={styles.dropdown}>
              <div className={styles.dropdown_btn}>Chọn trạng thái</div>
              <div className={styles.dropdown_content}>
                <div className={styles.dropdown_item}>Bật</div>
                <div className={styles.dropdown_item}>Tắt</div>
              </div>
            </div>
          </div>
          <button className={styles.addbutton}>THÊM</button>
        </form>
      </section>

      <Footer />
    </div>
  );
}

export default AddPrinter;
