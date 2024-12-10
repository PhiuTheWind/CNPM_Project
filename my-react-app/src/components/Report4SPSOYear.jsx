import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './utils/Footer';
import Header from './utils/Header';
import styles from '../styles/Report4SPSOYear.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoSearch } from "react-icons/io5";
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import axios from 'axios';

function Report4SPSOYear() {
  const navigate = useNavigate();
  const [year, setYear] = useState(new Date().getFullYear());

  const [statistics, setStatistics] = useState(null); // API data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

   //const printer_id = ['Printer#1', 'Printer#2', 'Printer#3', 'Printer#4', 'Printer#5', 'Printer#6', 'Printer#7', 'Printer#8', 'Printer#9', 'Printer#10']

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post('http://localhost:3000/api/year_report', { year });
        if (response.data.success) {
          setStatistics(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError(err.message || 'Error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [year]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!statistics) return null;


  return (
    <div className={styles.container}>
      <Header text='SPSO NAME' showLogout={true} isStudent={false} />

      <div className={styles.option_wrapper}>
        <div className={styles.option}>
          <button className={styles.month} onClick={() => navigate('/spso_homepage/spso_report_month')}>Tháng</button>
          <button className={styles.year} onClick={() => navigate('/spso_homepage/spso_report_year')}>Năm</button>
        </div>

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
                //data: paper_size_data,
                data: statistics.paper_size,
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
            labels: ["pdf", "doc", "jpg", "png"],
            datasets: [
              {
                label: 'Số file',
                //data: file_type_data,
                data: statistics.file_extension,
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
              labels: Object.keys(statistics.printer_frequency),
              datasets: [
                {
                  label: 'Số file',
                  data: Object.values(statistics.printer_frequency).map(printer => printer.count),
                  backgroundColor: '#E4D0FF',
                  borderRadius: 5,
                  borderColor: '#B379FF',
                  borderWidth: 1.5,
                }
              ]
            }}
            // data={{
            //   //labels: printer_id,
            //   //labels: statistics.printer_frequency.id,
            //   datasets: [
            //     {
            //       label: 'Số file',
            //       //data: printer_freq,
            //       //data: statistics.printer_frequency.count,
            //       backgroundColor: '#E4D0FF',
            //       borderRadius: 5,
            //       borderColor: '#B379FF',
            //       borderWidth: 1.5
            //     }
            //   ]
            // }}
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
          <label className={styles.print_freq_input_lable}>Tần suất in trong năm</label>
        </div>
        <div className={styles.linechart}>
          <Line
            data={{
              labels: months,
              datasets: [
                {
                  label: 'Số lần in',
                  //data: print_freq,
                  data: statistics.month_frequency,
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

export default Report4SPSOYear;
