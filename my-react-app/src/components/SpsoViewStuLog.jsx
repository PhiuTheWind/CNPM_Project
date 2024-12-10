import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table'
import { useNavigate } from 'react-router-dom';
import Header from "./utils/Header";
import Footer from "./utils/Footer";
import styles from '../styles/SpsoViewStuLog.module.css'
import { IoSearch, IoEyeSharp } from "react-icons/io5"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function SpsoViewStuLog() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [start_date, setStartDate] = useState(null)
    const [end_date, setEndDate] = useState(null)
    const [stuid, setStuID] = useState("")
    const [printerid, setPrinterID] = useState("")
    const [selectedrow, setSelectedRow] = useState(null)
    const [isView, setIsViewOpen] = useState(false)
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/history');
            if (response.data.success) {
                setData(response.data.data);
            } else {
                throw new Error(response.data.message);
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter((row) => {
            const startDateFilter = start_date ? new Date(row.start_date) >= new Date(start_date) : true;
            const endDateFilter = end_date ? new Date(row.start_date) <= new Date(end_date) : true;
            const stuIdFilter = stuid ? row.stu_id.includes(stuid) : true;
            const printerIdFilter = printerid ? row.printer_id === Number(printerid) : true;

            return startDateFilter && endDateFilter && stuIdFilter && printerIdFilter;
        });

        setFilteredData(filtered);
    }, [data, start_date, end_date, stuid, printerid]);

    const columns = useMemo(
        () => [
            {
                Header: 'MSSV',
                accessor: 'stu_id',
                Cell: ({ value }) => <div style={{ width: '80px' }}>{value}</div>,
            },
            {
                Header: 'MÁY IN',
                accessor: 'printer_id',
                Cell: ({ value }) => <div style={{ width: '100px' }}>PRINTER#{value}</div>,
            },
            {
                Header: 'TÊN FILE',
                accessor: 'file_name',
                Cell: ({ value }) => <div style={{ textAlign: 'left' }}>{value}</div>, // Align text left
            },
            {
                Header: 'NGÀY IN',
                accessor: 'start_date',
                Cell: ({ value }) => formatDate(value),
            },
            {
                Header: 'TÌNH TRẠNG',
                accessor: 'request_status',
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
            data: filteredData,
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
            <Header text='SPSO NAME' showLogout={true} isStudent={false} />

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
                        type='number'
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
                                <label className={styles.field}>MSSV:</label>
                                <span className={styles.value}>{selectedrow?.stu_id}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Tên sinh viên:</label>
                                <span className={styles.value}>{selectedrow?.stu_name}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Tên file:</label>
                                <span className={styles.value}>{selectedrow?.file_name}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Ngày bắt đầu in:</label>
                                <span className={styles.value}>{formatDate(selectedrow?.start_date)}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Ngày kết thúc in:</label>
                                <span className={styles.value}>{formatDate(selectedrow?.end_date)}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Ngày nhận:</label>
                                <span className={styles.value}>{formatDate(selectedrow?.received_date)}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Nơi nhận:</label>
                                <span className={styles.value}>{selectedrow?.location}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Trạng thái:</label>
                                <span className={`${styles.value} ${selectedrow?.request_status === 'Đã nhận' ? styles.receive : selectedrow?.status === 'Chưa nhận' ? styles.unreceive : styles.printing}`}
                                >
                                    {selectedrow?.request_status}
                                </span>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.row}>
                                <label className={styles.field}>Khổ giấy:</label>
                                <span className={styles.value}>{selectedrow?.paper_size}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Trang in:</label>
                                <span className={styles.value}>{selectedrow?.selected_pages}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>In một/hai mặt:</label>
                                <span className={styles.value}>{selectedrow?.side_option}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Số bản sao:</label>
                                <span className={styles.value}>{selectedrow?.num_copies}</span>
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
