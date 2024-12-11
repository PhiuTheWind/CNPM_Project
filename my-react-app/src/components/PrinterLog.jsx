import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table'
import { useLocation, useNavigate, useSearchParams  } from 'react-router-dom';
import Header from "./utils/Header";
import Footer from "./utils/Footer";
import styles from '../styles/PrinterLog.module.css'
import axios from 'axios';
import { IoSearch, IoEyeSharp } from "react-icons/io5"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PrinterLog() {
    const [searchParams] = useSearchParams();
    const printerId = searchParams.get('printer_id');

    const navigate = useNavigate();

    const [start_date, setStartDate] = useState(null);
    const [end_date, setEndDate] = useState(null);
    const [selectedrow, setSelectedRow] = useState(null);
    const [isView, setIsViewOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [data, setData] = useState([]); // Dynamic data state
    const [filteredData, setFilteredData] = useState([]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const fetchHistory = async () => {
        setLoading(true); 
        try {
            const response = await axios.post('http://localhost:3000/api/printer_history', {
                printer_id: printerId,
            });
    
            if (response.status === 200) {
                setData(response.data.data);
                setError(null); 
            } else {
                setError('Failed to fetch data.');
            }
        } catch (error) {
            console.error('Error fetching printer history:', error);
            setError('Failed to fetch history.');
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        const filtered = data.filter((row) => {
            const startDateFilter = start_date ? new Date(row.start_date) >= new Date(start_date) : true;
            const endDateFilter = end_date ? new Date(row.end_date) <= new Date(end_date) : true;

            return startDateFilter && endDateFilter;
        });

        setFilteredData(filtered);
    }, [data, start_date, end_date]);

    const columns = useMemo(
        () => [
            {
                Header: 'ID YÊU CẦU',
                accessor: 'request_id',
                Cell: ({ value }) => <div style={{ width: '120px',  textAlign: 'center' }}>{value}</div>, // Align text left
            },
            {
                Header: 'MSSV',
                accessor: 'stu_id',
                Cell: ({ value }) => <div style={{ width: '100px' }}>{value}</div>, // Align text left
            },
            {
                Header: 'TÊN FILE',
                accessor: 'file_name',
                Cell: ({ value }) => <div style={{ width: '200px', textAlign: 'center' }}>{value}</div>, // Align text left
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
            <Header text='SPSO NAME' showLogout={true} />

            <div className={styles.printer}>
                ID MÁY IN: {printerId}
            </div>

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
                <button className={styles.bnt_out} onClick={() => navigate('/spso_homepage/manage_printer')}>Thoát</button>
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
                                <label className={styles.field}>ID máy in:</label>
                                <span className={styles.value}>{printerId}</span>
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
                                <span className={styles.value}>{(selectedrow?.selected_pages).toLowerCase() === "all" ? "Tất cả trang" : (selectedrow?.selected_pages).toLowerCase() === "even" ? "Trang chẵn" : (selectedrow?.selected_pages).toLowerCase() === "odd" ? "Trang lẻ" : selectedrow?.selected_pages}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>In một/hai mặt:</label>
                                <span className={styles.value}>{selectedrow?.side_option === 'one_side' ? "Một mặt" : "Hai mặt"}</span>
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
export default PrinterLog;
