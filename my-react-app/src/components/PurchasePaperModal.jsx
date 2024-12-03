import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import hook useNavigate
import styles from '../styles/PurchasePaperModal.module.css'; // Import file CSS để tạo kiểu cho modal
import OCB from '../assets/OCB.png'; // Import file ảnh OCB.png

function PurchasePaperModal() {
    const [paperCount, setPaperCount] = useState(100);
    const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng

    const handleCloseModal = () => {
        alert('Đóng modal');
    };

    const handlePayment = () => {
        alert(`Thanh toán thành công!`);
        navigate('/student_homepage'); // Điều hướng về /student_homepage sau khi thanh toán thành công
    };

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h2>MUA THÊM GIẤY IN</h2>
                    <button className={styles.close_button} onClick={handleCloseModal}>×</button>
                </div>
                <div className={styles.payment_section}>
                    <div className={styles.price_info}>
                        <p className={styles.price}>500.000 <span>VNĐ</span></p>
                        <button className={styles.name_button}>HUỲNH NGỌC VĂN</button>
                        <div className={styles.input_section}>
                            <label htmlFor="paper_count">Số giấy mua thêm</label>
                            <input
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
