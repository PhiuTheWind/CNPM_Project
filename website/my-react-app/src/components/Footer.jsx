import React from 'react';
import styles from'../styles/Footer.module.css';
import spss from '../assets/PRINTING SERVICE.png';
import bkname from '../assets/bk_name_en.png';

function Footer(){
    return(
        <footer>
                <div className={styles.footer_left}>
                    <img src={spss} alt="BK Logo" className={styles.overlay_logo} />
                    <p className={styles.footer_text}>
                        Technical contact:<br />
                        Email: abc@gmail.com<br />
                        Phone: 09xxxxxxx<br />
                        Address:<br />
                        &copy; 2024 HCMUT_SSPS
                    </p>
                </div>
                <div className={styles.footer_right}>
                    <img src={bkname} alt="BK Right Logo" className={styles.overlay_logo} />
                    <p>VIETNAM NATIONAL UNIVERSITY HO CHI MINH CITY<br />
                        HO CHI MINH CITY UNIVERSITY OF TECHNOLOGY<br />
                        &copy; 2024 HCMUT_SSPS
                    </p>
                </div>
            </footer>
    );
};

export default Footer;