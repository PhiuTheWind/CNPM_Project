import React, { useState, useEffect } from 'react';
import Header from './utils/Header';
import Footer from './utils/Footer';
import styles from '../styles/ManageConfig.module.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ManageConfig() {
  const [date, setDate] = useState(new Date());
  const [defaultPage, setDefaultPage] = useState('');
  const [fileTypes, setFileTypes] = useState({
    pdf: false,
    docx: false,
    jpg: false,
    png: false,
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sysconfig');
        const data = await response.json();
        console.log('Fetched Data:', data);
        if (data.success) {
          const page = data.page ? parseInt(data.page, 10) : 100; // Default = 100 
        
        const date = data.date ? new Date(data.date.split('/').reverse().join('-')) : new Date(); // Format YYYY-MM-DD
        
        const fileTypes = {
          pdf: data.type?.includes('pdf') || false,
          docx: data.type?.includes('docx') || false,
          jpg: data.type?.includes('jpg') || false,
          png: data.type?.includes('png') || false,
        };

        // set config theo env
        setDefaultPage(page);
        setDate(date);
        setFileTypes(fileTypes);
        } else {
          console.error('Error:', error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchConfig();
  }, []);

  const handleCheckboxChange = (type) => {
    setFileTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };


  const saveConfig = async () => {
    try {
      const payload = {
        page: defaultPage,
        date: date.toLocaleDateString('en-GB'),
        type: Object.keys(fileTypes)
          .filter((key) => fileTypes[key])
          .join(','),
      };

      const response = await fetch('http://localhost:3000/api/sysconfig_patch', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Response:', result);
        alert('Configuration updated successfully!');
      } else {
        console.error('Error:', result.message);
        alert(`Failed to update configuration: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the configuration.');
    }
  };



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
              //value={100}
              value={defaultPage}
              onChange={(e) => setDefaultPage(e.target.value)}
              required
            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.name}>Ngày cấp giấy cho sinh viên:</label>
            <DatePicker className={styles.datepick}
              selected={date}
              placeholderText="dd/mm/yyyy"
              onChange={date => setDate(date)}
              dateFormat='dd/MM/yyyy'
            />
          </div>
          <div className={styles.checkfiled}> 
            <label className={styles.name}>Định dạng file cho phép:</label>
            
            {/* <div className={styles.filetype}>
              <p> pdf <input className={styles.check} type='checkbox'/></p>
              <p> docx <input className={styles.check} type='checkbox'/></p>
              <p> jpg <input className={styles.check} type='checkbox'/></p>
              <p> png <input className={styles.check} type='checkbox'/></p>
            </div> */}
            <div className={styles.filetype}>
              {Object.keys(fileTypes).map((type) => (
                <p key={type}>
                  {type}{' '}
                  <input
                    className={styles.check}
                    type="checkbox"
                    checked={fileTypes[type]}
                    onChange={() => handleCheckboxChange(type)}
                  />
                </p>
              ))}
            </div>
            
          </div>
          {/* <button className={styles.button} type="submit"> */}
          <button className={styles.button} type="button" onClick={saveConfig}>
          LƯU THAY ĐỔI</button>
        </form>

      </section>

      <Footer />
    </div>
  );
}

export default ManageConfig;
