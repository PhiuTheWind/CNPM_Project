import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table'
import { useNavigate } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import styles from '../styles/ManagePrinter.module.css'
import { FaNewspaper } from "react-icons/fa6"
import { IoSearch, IoEyeSharp, IoSettingsSharp } from "react-icons/io5"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"

function ManagePrinter() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()
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
      Cell: ({ row }) => <button 
        className={styles.button} 
        onClick={() => {
        console.log('Row Data:', row.original); // Log the entire row data
      }}>
        <IoEyeSharp className={styles.icon}/>
      </button>,
    },
    {
      Header: 'CÀI ĐẶT',
      accessor: 'setting',
      Cell: ({ row }) => <button 
        className={styles.button}
        onClick={() => {
          console.log('Row Data:', row.original); // Log the entire row data
      }}>
        <IoSettingsSharp className={styles.icon}/>
      </button>,
    },
  ]
  const MOCK_DATA = [{"id":"Printer#1","location":"402A4-CS1","paper":93,"status":"Bảo trì"},
    {"id":"Printer#2","location":"401A4-CS1","paper":80,"status":"Bật"},
    {"id":"Printer#3","location":"402A4-CS1","paper":407,"status":"Tắt"},
    {"id":"Printer#4","location":"401A4-CS1","paper":194,"status":"Bảo trì"},
    {"id":"Printer#5","location":"401A4-CS1","paper":333,"status":"Bảo trì"},
    {"id":"Printer#6","location":"402A4-CS1","paper":483,"status":"Bảo trì"},
    {"id":"Printer#7","location":"401A4-CS1","paper":155,"status":"Bật"},
    {"id":"Printer#8","location":"402A4-CS1","paper":183,"status":"Bật"},
    {"id":"Printer#9","location":"401A4-CS1","paper":343,"status":"Bật"},
    {"id":"Printer#10","location":"401A4-CS1","paper":142,"status":"Bật"},
    {"id":"Printer#11","location":"401A4-CS1","paper":347,"status":"Bật"},
    {"id":"Printer#12","location":"402A4-CS1","paper":276,"status":"Bật"},
    {"id":"Printer#13","location":"401A4-CS1","paper":287,"status":"Bật"},
    {"id":"Printer#14","location":"402A4-CS1","paper":214,"status":"Bật"},
    {"id":"Printer#15","location":"401A4-CS1","paper":139,"status":"Tắt"},
    {"id":"Printer#16","location":"401A4-CS1","paper":322,"status":"Bật"},
    {"id":"Printer#17","location":"402A4-CS1","paper":329,"status":"Bật"},
    {"id":"Printer#18","location":"401A4-CS1","paper":490,"status":"Tắt"},
    {"id":"Printer#19","location":"401A4-CS1","paper":13,"status":"Bảo trì"},
    {"id":"Printer#20","location":"401A4-CS1","paper":149,"status":"Bật"}]

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const tableInstance = useTable({
    columns,
    data
  }, useSortBy)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance 

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
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
         
          <button className={styles.addPrinter} onClick={() => navigate('/spso_homepage/manage_printer/add_printer')}>
            THÊM MÁY IN
          </button>
        </div>
      

      <div className={styles.table_printer}>
        <div className={styles.table_wrapper}>
          <table className={styles.table} {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th className={styles.th} {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? <TiArrowSortedDown/> : <TiArrowSortedUp/>) : ''}
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
      </div>


      <Footer />
    </div>
  );
}

export default ManagePrinter;