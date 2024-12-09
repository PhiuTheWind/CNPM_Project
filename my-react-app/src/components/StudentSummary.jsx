import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Getinfo } from './utils/GetInfo';
import Header from './utils/Header';
import Footer from './utils/Footer';
import styles from '../styles/StudentSummary.module.css';
import ava from '../assets/avatar.png';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PurchasePaperModal from './PurchasePaperModal';

function StudentSummary() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentInfo, setStudentInfo] = useState({
        name: 'STUDENT',
        pagebalance: 0,
    });

    const currentYear = new Date().getFullYear();

    const [size_start_date, setSizeStartDate] = useState(null)
    const [size_end_date, setSizeEndDate] = useState(null)
    const [file_start_date, setFileStartDate] = useState(null)
    const [file_end_date, setFileEndDate] = useState(null)

    const [year, setYear] = useState(null);

    const paper_size_data = [50, 10] // A4, A3
    const file_type_data = [50, 10, 5, 5] // ["pdf", "doc", "jpg", "png"]
    const print_freq_data = [20, 10, 5, 5, 30, 10, 1, 5, 0, 26, 11, 8] // ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"]

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
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true); // Show the modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Hide the modal
    };

    return (
        <div className={styles.container}>
            <Header text={studentInfo.name} paper={studentInfo.pagebalance} showLogout={true} isStudent={true} />
            <div className={styles.title}>THÔNG TIN IN ẤN CỦA SINH VIÊN</div>
            <div className={styles.info}>
                <img src={ava} className={styles.ava} alt="Avatar" />
                <p className={styles.name}>{studentInfo.name}</p>
                <p className={styles.paper}>Số trang: {studentInfo.pagebalance}</p>
                <button className={styles.buy_paper} onClick={handleOpenModal}>Mua thêm giấy</button>
            </div>
            <div className={styles.paper_size}>
                <div className={styles.paper_size_title}>
                    <p>Khổ giấy</p>
                    <div className={styles.size_input_group}>
                        <label className={styles.size_search_label}>Từ</label>
                        <DatePicker
                            className={styles.size_datepick}
                            selected={size_start_date}
                            onChange={(date) => setSizeStartDate(date)} // Ensure the handler updates state
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    <div className={styles.size_input_group}>
                        <label className={styles.size_search_label}>Đến</label>
                        <DatePicker
                            className={styles.size_datepick}
                            selected={size_end_date}
                            onChange={(date) => setSizeEndDate(date)} // Ensure the handler updates state
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                </div>
                <Doughnut className={styles.doughnutchart}
                    data={{
                        labels: ["A4", "A3"],
                        datasets: [
                            {
                                label: 'Số lượng',
                                data: paper_size_data,
                                backgroundColor: ['#669A69', '#A2D997'],
                            }
                        ]
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                position: "top", // Position the legend on the left
                                labels: {
                                    boxWidth: 30, // Size of the color box next to the label
                                    padding: 10, // Add padding between items
                                    font: {
                                        family: "Quicksand, sans-serif", // Customize font
                                        size: 14,
                                        weight: "bold",
                                    },
                                    color: "#333", // Text color of the labels
                                },
                            },
                            tooltip: {
                                enabled: true, // Enables tooltips
                                titleFont: {
                                    family: 'Quicksand, sans-serif', // Tooltip title font
                                    size: 14, // Tooltip title font size
                                    weight: 'bold', // Tooltip title font weight
                                },
                                bodyFont: {
                                    family: 'Quicksand, monospace', // Tooltip body font
                                    size: 14, // Tooltip body font size
                                    weight: 'normal', // Tooltip body font weight
                                },
                                backgroundColor: '#FFF7E6', // Tooltip background color
                                titleColor: '#347758', // Tooltip title color
                                bodyColor: '#347758', // Tooltip body text color
                                borderColor: '#347758', // Tooltip border color
                                borderWidth: 1, // Tooltip border width
                            },
                        },
                    }}
                />
            </div>
            <div className={styles.file_type}>
                <div className={styles.file_type_title}>
                    Định dạng file
                    <div className={styles.file_date_search}>
                        <div className={styles.file_input_group}>
                            <label className={styles.file_search_label}>Từ</label>
                            <DatePicker
                                className={styles.file_datepick}
                                selected={file_start_date}
                                onChange={(date) => setFileStartDate(date)} // Ensure the handler updates state
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                        <div className={styles.file_input_group}>
                            <label className={styles.file_search_label}>Đến</label>
                            <DatePicker
                                className={styles.file_datepick}
                                selected={file_end_date}
                                onChange={(date) => setFileEndDate(date)} // Ensure the handler updates state
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                    </div>
                </div>
                <Bar className={styles.barchart}
                    data={{
                        labels: ["pdf", "doc", "jpg", "png"],
                        datasets: [
                            {
                                label: 'Số file',
                                data: file_type_data,
                                backgroundColor: '#FCCCCC',
                                borderRadius: 5,
                                borderColor: '#FF8C8C',
                                borderWidth: 1.5
                            }
                        ]
                    }}
                    options={{
                        indexAxis: 'y', // Makes the bar chart horizontal
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false, // Disables the label (File Types)
                            },
                            tooltip: {
                                enabled: true, // Enables tooltips
                                titleFont: {
                                    family: 'Quicksand, sans-serif', // Tooltip title font
                                    size: 14, // Tooltip title font size
                                    weight: 'bold', // Tooltip title font weight
                                },
                                bodyFont: {
                                    family: 'Quicksand, monospace', // Tooltip body font
                                    size: 14, // Tooltip body font size
                                    weight: 'normal', // Tooltip body font weight
                                },
                                backgroundColor: '#FFF7E6', // Tooltip background color
                                titleColor: '#FF5733', // Tooltip title color
                                bodyColor: '#333333', // Tooltip body text color
                                borderColor: '#FF8C8C', // Tooltip border color
                                borderWidth: 1, // Tooltip border width
                            },
                        },
                        scales: {
                            x: {
                                beginAtZero: true, // Ensures the x-axis starts at 0
                                ticks: {
                                    font: {
                                        family: 'Quicksand, sans-serif', // X-axis font family
                                        size: 14, // X-axis font size
                                        weight: '500', // X-axis font weight
                                    }

                                },
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    font: {
                                        family: 'Quicksand, sans-serif', // X-axis font family
                                        size: 14, // X-axis font size
                                        weight: '500', // X-axis font weight
                                    }
                                },
                            },
                        },
                    }}
                />
            </div>
            <div className={styles.print_freq}>
                <div className={styles.print_freq_title}>
                    <div className={styles.print_freq_input}>
                        <label className={styles.print_freq_input_lable}>Tần suất in trong năm: </label>
                        <DatePicker className={styles.print_freq_input_year}
                            selected={year}
                            onChange={(date) => setYear(date)}
                            showYearPicker
                            dateFormat="yyyy"
                            placeholderText={currentYear.toString()}
                        />
                    </div>
                    <button className={styles.view_log_btn} onClick={() => navigate('/student_homepage/view_log')}>Xem lịch sử in</button>
                </div>
                <div className={styles.linechart}>
                    <Line
                        data={{
                            labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
                            datasets: [
                                {
                                    label: 'Số lần in',
                                    data: print_freq_data,
                                    backgroundColor: '#FFBA59',
                                    borderColor: '#FFBA59',
                                    borderWidth: 1.5
                                }
                            ]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false, // Disables the label (File Types)
                                },
                                tooltip: {
                                    enabled: true, // Enables tooltips
                                    titleFont: {
                                        family: 'Quicksand, sans-serif', // Tooltip title font
                                        size: 14, // Tooltip title font size
                                        weight: 'bold', // Tooltip title font weight
                                    },
                                    bodyFont: {
                                        family: 'Quicksand, monospace', // Tooltip body font
                                        size: 14, // Tooltip body font size
                                        weight: 'normal', // Tooltip body font weight
                                    },
                                    backgroundColor: '#fff7ed', // Tooltip background color
                                    titleColor: '#FFBA59', // Tooltip title color
                                    bodyColor: '#FFBA59', // Tooltip body text color
                                    borderColor: '#FFBA59', // Tooltip border color
                                    borderWidth: 1, // Tooltip border width
                                },
                            },
                            scales: {
                                x: {
                                    beginAtZero: true, // Ensures the x-axis starts at 0
                                    ticks: {
                                        font: {
                                            family: 'Quicksand, sans-serif', // X-axis font family
                                            size: 14, // X-axis font size
                                            weight: '500', // X-axis font weight
                                        }

                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        font: {
                                            family: 'Quicksand, sans-serif', // X-axis font family
                                            size: 14, // X-axis font size
                                            weight: '500', // X-axis font weight
                                        }
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
            
            {isModalOpen && (
                <PurchasePaperModal onClose={handleCloseModal} name={studentInfo.name}/>
            )}
            <Footer />
        </div>
    );
}

export default StudentSummary;
