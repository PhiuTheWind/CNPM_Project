import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table'
import { useNavigate } from 'react-router-dom';
import Header from "./utils/Header";
import Footer from "./utils/Footer";
import styles from '../styles/SpsoViewStuLog.module.css'
import MOCK_DATA from '../assets/PRINTER_LOG_MOCK_DATA.json'
import { IoSearch, IoEyeSharp } from "react-icons/io5"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function SpsoViewStuLog() {
    const navigate = useNavigate()

    const [start_date, setStartDate] = useState(null)
    const [end_date, setEndDate] = useState(null)
    const [stuid, setStuID] = useState("")
    const [printerid, setPrinterID] = useState("")
    const [selectedrow, setSelectedRow] = useState(null)
    const [isView, setIsViewOpen] = useState(false)

    const data = useMemo(() => MOCK_DATA, [])
    const columns = useMemo(
        () => [
            {
                Header: 'STT',
                accessor: 'stt',
                Cell: ({ value }) => <div style={{ width: '50px' }}>{value}</div>,
            },
            {
                Header: 'MSSV',
                accessor: 'student_id',
                Cell: ({ value }) => <div style={{ width: '80px' }}>{value}</div>,
            },
            {
                Header: 'MÁY IN',
                Cell: () => <div style={{ width: '100px' }}>PRINTER#1</div>,
            },
            {
                Header: 'TÊN FILE',
                accessor: 'file_name',
                Cell: ({ value }) => <div style={{ textAlign: 'left' }}>{value}</div>, // Align text left
            },
            {
                Header: 'NGÀY IN',
                accessor: 'print_start_date',
            },
            {
                Header: 'TÌNH TRẠNG',
                accessor: 'status',
                Cell: ({ value }) => (
                    <div
                        className={`${styles.statusBadge} ${value === 'Đã nhận' ? styles.recv : value === 'Chưa nhận' ? styles.unrecv : styles.print}`}
                    >
                        {value}
                    </div>
                ),
            },
            {
                Header: 'CHI TIẾT',
                Cell: ({ row }) => (
                    <button
                        className={styles.button}
                        onClick={() => {
                            setSelectedRow(row.original)
                            setIsViewOpen(true)
                        }}
                    >
                        <IoEyeSharp className={styles.icon} />
                    </button>
                ),
            },
        ],
        []
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
    } = tableInstance

    return (
        <div className={styles.container}>
            <Header text='SPSO NAME' showLogout={true} isStudent={false}/>

            <div className={styles.search}>
                <div className={styles.input_group}>
                    <label className={styles.search_label}><IoSearch /> Từ</label>
                    <DatePicker
                        className={styles.datepick}
                        selected={start_date}
                        onChange={(date) => setStartDate(date)} // Ensure the handler updates state
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className={styles.input_group}>
                    <label className={styles.search_label}><IoSearch /> Đến</label>
                    <DatePicker
                        className={styles.datepick}
                        selected={end_date}
                        onChange={(date) => setEndDate(date)} // Ensure the handler updates state
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className={styles.input_stuid}>
                    <label className={styles.search_label}><IoSearch /> MSSV</label>
                    <input 
                        type='text'
                        className={styles.stuinput}
                        placeholder='Nhập MSSV'
                        value={stuid}
                        onChange={(e) => setStuID(e.target.value)}
                    />
                </div>
                <div className={styles.input_id}>
                    <label className={styles.search_label}><IoSearch /> ID máy in</label>
                    <input 
                        type='text'
                        className={styles.input}
                        placeholder='Nhập ID máy in'
                        value={printerid}
                        onChange={(e) => setPrinterID(e.target.value)}
                    />
                </div>
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

            {isView && (
                <div className={styles.popup}>
                    <div className={styles.popup_info}>
                        <h2 className={styles.h2}>Thông Tin Yêu Cầu In</h2>
                        <div className={styles.info}>
                            <div className={styles.row}>
                                <label className={styles.field}>Tên file:</label>
                                <span className={styles.value}>{selectedrow?.file_name}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Ngày in:</label>
                                <span className={styles.value}>{selectedrow?.print_start_date}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Ngày nhận:</label>
                                <span className={styles.value}>{selectedrow?.receive_date}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Nơi nhận:</label>
                                <span className={styles.value}>{selectedrow?.receive_place}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Trạng thái:</label>
                                <span className={`${styles.value} ${selectedrow?.status === 'Đã nhận' ? styles.receive : selectedrow?.status === 'Chưa nhận' ? styles.unreceive : styles.printing}`}
                                >
                                    {selectedrow?.status}
                                </span>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.row}>
                                <label className={styles.field}>Khổ giấy:</label>
                                <span className={styles.value}>{selectedrow?.size}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Trang in:</label>
                                <span className={styles.value}>{selectedrow?.range_page}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>In một/hai mặt:</label>
                                <span className={styles.value}>{selectedrow?.side}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Số bản sao:</label>
                                <span className={styles.value}>{selectedrow?.copy}</span>
                            </div>
                        </div>

                        <button className={styles.popup_btn} onClick={() => setIsViewOpen(false)}>
                            ĐÓNG
                        </button>
                    </div>

                </div>
            )}

            <Footer />
        </div>
    );

};
export default SpsoViewStuLog;
