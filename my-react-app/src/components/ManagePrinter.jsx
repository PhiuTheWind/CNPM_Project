import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table'
import { useNavigate } from 'react-router-dom';
import MOCK_DATA from '../assets/MOCK_DATA'
import Header from './Header'
import Footer from './Footer'
import styles from '../styles/ManagePrinter.module.css'
import { FaNewspaper } from "react-icons/fa6"
import { IoSearch, IoEyeSharp, IoSettingsSharp } from "react-icons/io5"

function ManagePrinter() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const COLUMNS = [
    {
      Header: 'ID MÁY IN',
      accessor: 'id'
    },
    {
      Header: 'VỊ TRÍ',
      accessor: 'location'
    },
    {
      Header: 'SỐ GIẤY',
      accessor: 'paper',
      Cell: ({ value }) => (
        <div>
          {value}
          <button className={styles.button}>
            < FaNewspaper style={{ verticalAlign: 'middle', marginLeft: '25px', height: '25px', width: '25px' }} />
          </button>
        </div>
      )
    },
    {
      Header: 'TRẠNG THÁI',
      accessor: 'status',
      Cell: ({ value }) => (
        <div
          className={`${styles.statusBadge} ${value === "Bật"
              ? styles.bật
              : value === "Tắt"
                ? styles.tắt
                : styles.bảo_trì
            }`}
        >
          {value}
        </div>
      )
    },
    {
      Header: 'LỊCH SỬ IN',
      accessor: 'log',
      Cell: () => <button className={styles.button}><IoEyeSharp className={styles.icon}/></button>,
    },
    {
      Header: 'CÀI ĐẶT',
      accessor: 'setting',
      Cell: () => <button className={styles.button}><IoSettingsSharp className={styles.icon}/></button>,
    },
  ]
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const tableInstance = useTable({
    columns,
    data
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className={styles.container}>
      <Header text='SPSO NAME' showLogout={true} />
      
      <div className={styles.search_add}>
        <div className={styles.search_wrapper}>
          <IoSearch className={styles.search_icon}/>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Nhập ID máy in"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
       

        <button className={styles.addPrinter} onClick={() => navigate('/spso_homepage/manage_printer/add_printer')}>
          THÊM MÁY IN
        </button>
      </div>

      <div className={styles.table_printer}>
        <div className={styles.table_wrapper}>
          <table className={styles.table} {...getTableBodyProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th className={styles.th} {...column.getHeaderProps()}>
                      {column.render("Header")}
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
      </div>


      <Footer />
    </div>
  );
}

export default ManagePrinter;