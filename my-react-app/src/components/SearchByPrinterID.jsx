import { IoSearch} from "react-icons/io5"
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ManagePrinter.module.css'

export const SearchByPrinterID=() => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()
    return(
      <div className={styles.search_add}>
          <div className={styles.search_wrapper}>
            <IoSearch className={styles.search_icon}/>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Nhập ID máy in"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
         
          <button className={styles.addPrinter} onClick={() => navigate('/spso_homepage/manage_printer/add_printer')}>
            THÊM MÁY IN
          </button>
        </div>
    );
  };
