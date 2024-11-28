import React, {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/AddPrinter.module.css'
import { IoMdArrowDropdown } from "react-icons/io";

function AddPrinter() {
  const [date, setDate] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [selectedStatus, setStatus] = useState("")
  const statusOption = ["Bật", "Tắt"]

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
              <div className={styles.dropdown_btn} onClick={(e) => setIsActive(!isActive)}>
                <p className={`
                  ${styles.text_status} ${selectedStatus === "Bật"
                    ? styles.on
                    : selectedStatus === "Tắt"
                      ? styles.off
                      : ""
                  }
                `}>
                  {selectedStatus || "Chọn trạng thái"}
                </p>
                <IoMdArrowDropdown className={styles.dropicon}/>
              </div>
              {isActive && (
                <div className={styles.dropdown_content}>
                  {statusOption.map(option => (
                    <div key={option} className={styles.dropdown_item} 
                      onClick={() => {
                        setStatus(option)
                        setIsActive(!isActive)
                      }
                    }>
                      {option}
                    </div>
                  ))}
                </div>
              )}
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
