import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table'
import { useNavigate } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import styles from '../styles/ManagePrinter.module.css'
import { FaNewspaper } from "react-icons/fa6"
import { IoSearch, IoEyeSharp, IoSettingsSharp } from "react-icons/io5"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"
import MOCK_DATA from '../assets/MOCK_DATA'

function ManagePrinter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [selectedStatus, setStatus] = useState("")
  const statusOption = ["Bật", "Tắt", "Bảo trì"]
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
        <IoEyeSharp className={styles.icon} />
      </button>,
    },
    {
      Header: 'CÀI ĐẶT',
      accessor: 'setting',
      Cell: ({ row }) => <button
        className={styles.button}
        onClick={() => {
          setSelectedPrinter(row.original)
          setIsSettingOpen(true)
        }}>
        <IoSettingsSharp className={styles.icon} />
      </button>,
    },
  ]

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
      </div>

      {isSettingOpen && (
        <div className={styles.popup}>
          <div className={styles.popup_info}>
            <h2 className={styles.h2}>Thông Tin Máy In</h2>
            <div className={styles.info}>
              <div className={styles.row}>
                <label className={styles.field}>ID Máy In:</label>
                <span className={styles.value}>{selectedPrinter?.id}</span>
              </div>

              <div className={styles.row}>
                <label className={styles.field}>Tên Máy In:</label>
                <span className={styles.value}></span>
              </div>

              <div className={styles.row}>
                <label className={styles.field}>Địa Chỉ IP:</label>
                <span className={styles.value}></span>
              </div>

              <div className={styles.row}>
                <label className={styles.field}>Vị Trí:</label>
                <span className={styles.value}>{selectedPrinter?.location}</span>
              </div>

              <div className={styles.row}>
                <label className={styles.field}>Số Giấy:</label>
                <span className={styles.value}>{selectedPrinter?.paper}</span>
              </div>

              <div className={styles.row}>
                <label className={styles.field}>Trạng Thái:</label>
                <span className={styles.value}>{selectedPrinter?.status}</span>
              </div>
            </div>

            <div className={styles.mod}>
              <div className={styles.row}>
                <label className={styles.field}>Điều chỉnh trạng thái:</label>
                <div className={styles.dropdown}>
                  <div className={styles.dropdown_btn} onClick={(e) => setIsActive(!isActive)}>
                    <p>
                      {selectedPrinter?.status}
                    </p>
                  </div>

                  {isActive && (
                    <div className={styles.dropdown_content}>
                      {statusOption.map(option => (
                        <div key={option} className={styles.dropdown_item}
                          onClick={() => {
                            setStatus(option)
                            setIsActive(!isActive)
                          }
                          }>
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.popup_btn}>
              <button
                className={styles.close_popup}
                onClick={() => setIsSettingOpen(false)}
              >
                HỦY
              </button>
              <button
                className={styles.save_popup}
                onClick={() => setIsSettingOpen(false)}
              >
                LƯU
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ManagePrinter;