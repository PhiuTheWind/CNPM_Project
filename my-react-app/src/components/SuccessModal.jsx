import React from "react";
import styles from "../styles/SuccessModal.module.css";

const SuccessModal = ({ message, onClose, onRedirect }) => {
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <p>{message}</p>
        <button onClick={onRedirect} className={styles.redirect_button}>
          Chọn Máy In
        </button>
        <button onClick={onClose} className={styles.close_button}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
