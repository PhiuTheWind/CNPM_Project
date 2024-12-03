// Popup.js
import React, { useEffect } from "react";
import styles from "../styles/Popup.module.css";

const Popup = ({ message, onClose, duration = 3000 }) => {
    return (
        <div className={styles.modal_overlay}>
          <div className={styles.modal_content}>
            <p>{message}</p>
            <button onClick={onClose} className={styles.close_button}>
              Đóng
            </button>
          </div>
        </div>
      );
};

export default Popup;
