import React from "react";
import styles from "../styles/Buymorepaper.module.css";

const BuymorepaperModal = ({ message, onClose, onClick }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modal_overlay} onClick={handleOverlayClick}>
      <div className={styles.modal_content}>
        <p className={styles.message}>{message}</p>
        <div className={styles.button_container}>
          <button onClick={onClick} className={styles.redirect_button}>
            Mua thêm giấy
          </button>
          <button onClick={onClose} className={styles.close_button}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuymorepaperModal;
