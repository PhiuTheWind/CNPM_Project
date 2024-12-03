import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/ChoosePrinter.module.css';
import { FaNewspaper } from "react-icons/fa6";
import { IoSearch, IoEyeSharp, IoSettingsSharp } from "react-icons/io5";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

function ChoosePrinter() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [selectedStatus, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false); // Popup cho trường hợp hợp lệ
  const statusOption = ["Bật", "Tắt", "Bảo trì"];
  const navigate = useNavigate();

  const fetchPrinters = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/manage_printer');
      const json = await response.json();

      if (json.success) {
        setData(json.data);
      } else {
        throw new Error(json.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const url = `http://localhost:3000/api`;
  const token = localStorage.getItem("userCredentials")
    ? JSON.parse(localStorage.getItem("userCredentials")).token
    : null;

  const [studentInfo, setStudentInfo] = useState({
    name: "vvvvv",
    pagebalance: 0,
  });

  const fetchStudentInfo = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStudentInfo({
          name: data[0].username,
          pagebalance: data[0].page_num,
        });
      } else {
        console.error("Failed to fetch student info");
      }
    } catch (error) {
      console.error("Error fetching student info:", error);
    }
  };

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  useEffect(() => {
    fetchPrinters();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'ID MÁY IN',
        accessor: 'printer_id',
      },
      {
        Header: 'VỊ TRÍ',
        accessor: 'location',
      },
      {
        Header: 'TÌNH TRẠNG',
        accessor: 'status',
        Cell: ({ value }) => (
          <div
            className={`${styles.statusBadge} ${value === 'Bật' ? styles.bật : value === 'Tắt' ? styles.tắt : styles.bảo_trì}`}
          >
            {value}
          </div>
        ),
      },
      {
        Header: 'CHỌN',
        Cell: ({ row }) => (
          <div>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={selectedPrinter?.printer_id === row.original.printer_id}
              onChange={() => setSelectedPrinter(row.original)}
            />
          </div>
        ),
      },
    ],
    [selectedPrinter]
  );

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;

  const handleCheckSettings = () => {
    if (!selectedPrinter) {
      setShowPopup(true);
      return;
    }

    if (selectedPrinter.status === "Tắt" || selectedPrinter.status === "Bảo trì") {
      setShowPopup(true);
    } else {
      setSuccessPopup(true); // Hiển thị Popup cho máy in hợp lệ
    }
  };

  const handleRedirectToHomepage = () => {
    navigate('/student_homepage'); // Chuyển hướng đến trang Homepage
  };

  return (
    <div className={styles.container}>
      <Header text={studentInfo.name} showLogout={true} isStudent={true} />
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.search_add}>
        <div className={styles.search_wrapper}>
          <IoSearch className={styles.search_icon} />
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
      </div>

      <div className={styles.table_printer}>
        {!loading && !error && (
          <div className={styles.table_wrapper}>
            <table className={styles.table} {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th className={styles.th} {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (column.isSortedDesc ? <TiArrowSortedDown /> : <TiArrowSortedUp />) : ''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td className={styles.td} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className={styles.check_button_wrapper}>
        <button className={styles.check_button} onClick={handleCheckSettings}>
          KIỂM TRA
        </button>
      </div>

      {/* Hiển thị Popup nếu không hợp lệ */}
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popup_info}>
            <p className={styles.error}>Lựa chọn máy in không phù hợp, hãy chọn lại.</p>
            <button className={styles.close_popup} onClick={() => setShowPopup(false)}>
              ĐÓNG
            </button>
          </div>
        </div>
      )}

      {/* Hiển thị Popup cho máy in hợp lệ */}
      {successPopup && (
        <div className={styles.popup}>
          <div className={styles.popup_info}>
            <p className={styles.success}>Các cài đặt máy in đã được kiểm tra và phù hợp.</p>
            <p className={styles.success}>Cảm ơn bạn đã sử dụng dịch vụ</p>
            <button className={styles.close_popup} onClick={handleRedirectToHomepage}>
              QUAY VỀ HOMEPAGE
            </button>
          </div>
        </div>
      )}

      {isSettingOpen && (
        <div className={styles.popup}>
          <div className={styles.popup_info}>
            {/* Thông tin máy in đã chọn */}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ChoosePrinter;
