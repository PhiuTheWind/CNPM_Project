import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import hook useNavigate
import styles from '../styles/PurchasePaperModal.module.css'; // Import file CSS để tạo kiểu cho modal
import OCB from '../assets/OCB.png'; // Import file ảnh OCB.png
import axios from 'axios';
const token = localStorage.getItem('userCredentials') ? JSON.parse(localStorage.getItem('userCredentials')).token : null;
function PurchasePaperModal({ onClose, name }) {
    const [paperCount, setPaperCount] = useState(100);

    const handleCloseModal = () => {
        onClose();
    };

    const handlePayment = () => {
        alert(`Thanh toán thành công!`);
        const response = axios.post('http://localhost:3000/api/buypage',
            {
                page: paperCount,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        if (response.status === 200) {
            console.log("Cap nhat thanh cong");
        }
        else {
            console.log("Cap nhat khong thanh cong");
        }
        window.location.reload();
        onClose();
    };

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h2 className={styles.h2}>MUA THÊM GIẤY IN</h2>
                    <button className={styles.close_button} onClick={handleCloseModal}>×</button>
                </div>
                <div className={styles.payment_section}>
                    <div className={styles.price_info}>
                        <p className={styles.price}>500.000 <span>VNĐ</span></p>
                        <p className={styles.name}>{name.toUpperCase()}</p>
                        <div className={styles.input_section}>
                            <label className={styles.label} htmlFor="paper_count">Số giấy mua thêm</label>
                            <input className={styles.input}
                                type="number"
                                id="paper_count"
                                value={paperCount}
                                onChange={(e) => setPaperCount(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.card_section}>
                        <img src={OCB} alt="OCB Card" className={styles.card_image} />
                        <button className={styles.pay_button} onClick={handlePayment}>THANH TOÁN</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchasePaperModal;
