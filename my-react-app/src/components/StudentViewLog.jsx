import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table'
import { useNavigate } from 'react-router-dom';
import Header from "./utils/Header";
import Footer from "./utils/Footer";
import styles from '../styles/StudentViewLog.module.css'
import { IoSearch, IoEyeSharp } from "react-icons/io5"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { Getinfo } from './utils/GetInfo'

function StudentViewLog() {
    const log_url = `http://localhost:3000/api/log`;

    const token = localStorage.getItem('userCredentials') ? JSON.parse(localStorage.getItem('userCredentials')).token : null;
    const [studentLogInfo, setStudentLogInfo] = useState([]);


    const GetLogInfo = async () => {
        try {
            const response = await axios.post(log_url, {}, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setStudentLogInfo(response.data)
            }
            else if (response.status === 404) {
                navigate('/');
            }
            console.log(response)

        }
        catch (error) {
            console.log(error)
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    const navigate = useNavigate()
    const [studentInfo, setStudentInfo] = useState({
        name: 'STUDENT',
        pagebalance: 0,
    });
    const [error, setError] = useState(null);
    const [start_date, setStartDate] = useState(null)
    const [end_date, setEndDate] = useState(null)
    const [filename, setFilename] = useState("")
    const [selectedrow, setSelectedRow] = useState(null)
    const [isView, setIsViewOpen] = useState(false)


    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                const data = await Getinfo();
                setStudentInfo(data); // Update state with fetched data
            } catch (err) {
                setError('Failed to fetch student information');
                console.error(err);
            }
        };

        fetchStudentInfo();
        GetLogInfo();
    }, []);

    // Filter Data Based on Search Criteria
    const filteredData = useMemo(() => {
        return studentLogInfo.filter((log) => {
            const logStartDate = new Date(log.start_date);
            const logEndDate = new Date(log.end_date);

            const isStartDateValid = start_date === null || logStartDate >= new Date(start_date);
            const isEndDateValid = end_date === null || logEndDate <= new Date(end_date);
            const isFilenameValid = filename === "" || log.file_name.toLowerCase().includes(filename.toLowerCase());

            return isStartDateValid && isEndDateValid && isFilenameValid;
        });
    }, [studentLogInfo, start_date, end_date, filename]);
    
    const columns = useMemo(
        () => [
            {
                Header: 'STT',
                accessor: 'request_id',
                Cell: ({ value }) => <div style={{ width: '80px' }}>{value}</div>, // Align text left
            },
            {
                Header: 'TÊN FILE',
                accessor: 'file_name',
                Cell: ({ value }) => <div style={{ textAlign: 'left' }}>{value}</div>, // Align text left
            },
            {
                Header: 'BẮT ĐẦU IN',
                accessor: 'start_date',
                Cell: ({ value }) => formatDate(value),
            },
            {
                Header: 'KẾT THÚC IN',
                accessor: 'end_date',
                Cell: ({ value }) => formatDate(value),
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
            <Header text={studentInfo.name} paper={studentInfo.pagebalance} showLogout={true} isStudent={true} />

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
                <div className={styles.input_filename}>
                    <label className={styles.search_label}><IoSearch /> Tên file</label>
                    <input
                        type='text'
                        className={styles.input}
                        placeholder='Nhập tên file'
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
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
                                <span className={`${styles.value} ${selectedrow?.status === 'Đã nhận' ? styles.receive : selectedrow?.status === 'Chưa nhận' ? styles.unreceive : styles.printing}`}
                                >
                                    {selectedrow?.status}
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
export default StudentViewLog;