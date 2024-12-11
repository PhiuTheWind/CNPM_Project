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

    const fetchHistory = async () => {
        setLoading(true); 
        try {
            const response = await axios.post('http://localhost:3000/api/printer_history', {
                printer_id: printerId,
            });
    
            if (response.status === 200) {
                const transformedData = response.data.data.map((item, index) => ({
                    stt: index + 1,
                    student_id: item.stu_id,
                    file_name: item.file_name,
                    print_start_date: new Date(item.start_date).toLocaleDateString('vi-VN'),
                    status: item.request_status,
                    size: item.paper_size,
                    range_page: item.selected_pages,
                    side: item.side_option === '1' ? 'Một mặt' : 'Hai mặt',
                    copy: item.num_copies,
                    receive_date: item.received_date ? new Date(item.received_date).toLocaleDateString('vi-VN') : 'Chưa nhận',
                    receive_place: item.location,
                }));
                setData(transformedData);
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

    const columns = useMemo(
        () => [
            {
                Header: 'STT',
                accessor: 'stt',
                Cell: ({ value }) => <div style={{ width: '80px' }}>{value}</div>, // Align text left
            },
            {
                Header: 'MSSV',
                accessor: 'student_id',
                Cell: ({ value }) => <div style={{ width: '100px' }}>{value}</div>, // Align text left
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
                                <label className={styles.field}>Mã số sinh viên:</label>
                                <span className={styles.value}>{selectedrow?.student_id}</span>
                            </div>
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
export default PrinterLog;
