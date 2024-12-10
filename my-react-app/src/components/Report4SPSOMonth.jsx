import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './utils/Footer';
import Header from './utils/Header';
import styles from '../styles/Report4SPSOMonth.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoSearch } from "react-icons/io5";
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import axios from 'axios';

function Report4SPSOMonth() {
  const navigate = useNavigate();

  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('Tháng 1');
  const [monthIdx, setMonthIdx] = useState(0);
  const [dateList, setDateList] = useState([]);
  const months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const [paperSizeData, setPaperSizeData] = useState([]);
  const [fileTypeData, setFileTypeData] = useState({});
  const [printerFreqData, setPrinterFreqData] = useState([]);
  const [printerIds, setPrinterIds] = useState([]);
  const [printFreq, setPrintFreq] = useState([]);

  

  // const paper_size_data = [50, 10] // A4, A3
  // const file_type_data = [50, 10, 5, 5] // ["pdf", "doc", "jpg", "png"]
  // const printer_id = ['Printer#1', 'Printer#2', 'Printer#3', 'Printer#4', 'Printer#5', 'Printer#6', 'Printer#7', 'Printer#8', 'Printer#9', 'Printer#10']
  // const printer_freq = [20, 50, 10, 45, 30, 90, 10, 27, 3, 26]
  // const print_freq = [20, 50, 10, 45, 30, 90, 10, 27, 3, 26]

  // Function to generate a list of dates based on year and month
  const generateDates = (monthIndex, year) => {
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate(); // Get days in the month
    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1); // Create a list [1, 2, ..., daysInMonth]
    setDateList(dates);
    setMonthIdx(monthIndex);
  };

  // Handle month selection
  const handleMonthSelect = (month, index) => {
    setSelectedMonth(month);
    generateDates(index, year); // Generate dates for the selected month and year
  };

  const fetchStatistics = async (month, year) => {
    try {
      const response = await axios.post('http://localhost:3000/api/month_report', { month, year });
      if (response.data.success) {
        const { paper_size, file_extension, printer_frequency, month_frequency } = response.data.data;

        setPaperSizeData([paper_size.A4, paper_size.A3]);
        setFileTypeData(file_extension);
        setPrinterFreqData(Object.values(printer_frequency).map(p => p.count));
        setPrinterIds(Object.values(printer_frequency).map(p => `Printer#${p.id}`));
        setPrintFreq(month_frequency);
      } else {
        console.error(response.data.message || 'Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching statistics:', error.message || error);
    }
  };

  useEffect(() => {
    generateDates(monthIdx, year);
    fetchStatistics(monthIdx + 1, year); // Fetch data for the current month and year
  }, [monthIdx, year]);

  useEffect(() => {
    generateDates(monthIdx, year); // Index 0 corresponds to "Tháng 1"
  }, [year]);
  
  
  return (
    <div className={styles.container}>
      <Header text='SPSO NAME' showLogout={true} isStudent={false} />

      <div className={styles.option_wrapper}>
        <div className={styles.option}>
          <button className={styles.month} onClick={() => navigate('/spso_homepage/spso_report_month')}>Tháng</button>
          <button className={styles.year} onClick={() => navigate('/spso_homepage/spso_report_year')}>Năm</button>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.input_year_group}>
          <label className={styles.search_label}><IoSearch /></label>
          <DatePicker className={styles.input_year}
            selected={new Date(year, 0)} // Display the current year
            onChange={(date) => setYear(date.getFullYear())} // Update year
            showYearPicker
            dateFormat="yyyy"
            placeholderText={year.toString()}
          />
        </div>
        <div className={styles.month_group}>
          <div className={styles.leftColumn}>
            {months.slice(0, 6).map((month, index) => (
              <button
                key={index}
                className={`${styles.monthButton} ${selectedMonth === month ? styles.selected : ''}`}
                onClick={() => handleMonthSelect(month, index)}
              >
                {month}
              </button>
            ))}
          </div>
          <div className={styles.rightColumn}>
            {months.slice(6).map((month, index) => (
              <button
                key={index}
                className={`${styles.monthButton} ${selectedMonth === month ? styles.selected : ''}`}
                onClick={() => handleMonthSelect(month, index + 6)}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>


      
      
      <div className={styles.paper_size}>
        <div className={styles.paper_size_title}>
          <p>Khổ giấy</p>
        </div>
        <Doughnut className={styles.doughnutchart}
          data={{
            labels: ["A4", "A3"],
            datasets: [
              {
                label: 'Số lượng',
                // data: paper_size_data,
                data: paperSizeData,
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
        </div>
        <Bar className={styles.barchart}
          data={{
            //labels: ["pdf", "doc", "jpg", "png"],
            labels: Object.keys(fileTypeData),
            datasets: [
              {
                label: 'Số file',
                //data: file_type_data,
                data: Object.values(fileTypeData),
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
                bodyColor: '#FF5733', // Tooltip body text color
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

      <div className={styles.printer}>
        <div className={styles.printer_title}>
          Tần suất sử dụng máy in
        </div>
        <div className={styles.printer_barchart}>
          <Bar
            data={{
              //labels: printer_id,
              labels: printerIds,
              datasets: [
                {
                  label: 'Số file',
                  //data: printer_freq,
                  data: printerFreqData,
                  backgroundColor: '#E4D0FF',
                  borderRadius: 5,
                  borderColor: '#B379FF',
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
                  backgroundColor: '#FFF7E6', // Tooltip background color
                  titleColor: '#B379FF', // Tooltip title color
                  bodyColor: '#B379FF', // Tooltip body text color
                  borderColor: '#B379FF', // Tooltip border color
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

      <div className={styles.print_freq}>
        <div className={styles.print_freq_title}>
          <label className={styles.print_freq_input_lable}>Tần suất in trong tháng</label>
        </div>
        <div className={styles.linechart}>
          <Line
            data={{
              labels: dateList,
              datasets: [
                {
                  label: 'Số lần in',
                  //data: print_freq,
                  data: printFreq,
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
      <Footer />
    </div>
  );
}

export default Report4SPSOMonth;
