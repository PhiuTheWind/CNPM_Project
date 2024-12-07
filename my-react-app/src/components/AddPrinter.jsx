import React, {useState} from 'react';
import Header from './utils/Header';
import Footer from './utils/Footer';
import styles from '../styles/AddPrinter.module.css'
import { IoMdArrowDropdown } from "react-icons/io";

function AddPrinter() {
  const [isActive, setIsActive] = useState(false);
  const [selectedStatus, setStatus] = useState("");
  const [numPaper, setNumPaper] = useState(500); // Default paper count
  const [printerName, setPrinterName] = useState("");
  const [location, setLocation] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const statusOptions = ["Bật", "Tắt"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!printerName || !location || !ipAddress || !selectedStatus) {
      setErrorMessage("Vui lòng nhập tất cả các trường!");
      return;
    }

    const statusValue = selectedStatus === "Bật" ? "Bật" : "Tắt"; 

    // Call API
    try {
      const response = await fetch("http://localhost:3000/api/add_printer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num_paper: numPaper,
          location,
          status: statusValue,
          printer_name: printerName,
          ip: ipAddress,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(result.message);
        setErrorMessage("");
        // Reset form
        setPrinterName("");
        setLocation("");
        setIpAddress("");
        setStatus("");
      } else {
        setErrorMessage(result.message || "Có lỗi xảy ra, vui lòng thử lại.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error adding printer:", error);
      setErrorMessage("Không thể kết nối với server. Vui lòng thử lại sau.");
      setSuccessMessage("");
    }
  };

  return (
    <div className={styles.container}>
      <Header text='SPSO NAME' showLogout={true} />
      
      <section className={styles.add_printer_section}>
        {/* <form className={styles.form}> */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.header}>THÊM THÔNG TIN MÁY IN</h1>
          {/* <div className={styles.input_group}>
            <label className={styles.name}>ID máy in</label>
            <input 
              type='text'
              placeholder='Nhập ID máy in...'
              className={styles.input}
              required
            />
          </div> */}
          <div className={styles.input_group}>
            <label className={styles.name}>Tên máy in</label>
            <input 
              type='text'
              placeholder='Nhập tên máy in...'
              className={styles.input}
              required
              value={printerName}
              onChange={(e) => setPrinterName(e.target.value)}

            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.name}>Vị trí</label>
            <input 
              type='text'
              placeholder='Nhập vị trí máy in...'
              className={styles.input}
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.name}>Địa chỉ IP</label>
            <input 
              type='text'
              placeholder='Nhập địa chỉ IP máy in...'
              className={styles.input}
              required
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}

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
                  {statusOptions.map(option => (
                    <div key={option} 
                    className={styles.dropdown_item} 
                      onClick={() => {
                        setStatus(option);
                        setIsActive(false);
                      }
                    }>
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.input_group}>
            <label className={styles.name}>Số trang</label>
            <input 
              type="number"
              placeholder="Nhập số trang..."
              className={styles.input}
              required
              value={numPaper}
              onChange={(e) => setNumPaper(Number(e.target.value))}
            />
          </div>
          {/* <button className={styles.addbutton}>THÊM</button> */}
          <button className={styles.addbutton} type="submit">THÊM</button>
        </form>
      </section>

      <Footer />
    </div>
  );
}

export default AddPrinter;
