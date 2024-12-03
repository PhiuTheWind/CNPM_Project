import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Popup from "./Popup.jsx"; // Import Popup component
import styles from "../styles/Printing_configure.module.css";
import Bar from "../assets/Bar.png";
import Upload_icon from "../assets/Upload_icon.png";
import DocxIcon from "../assets/docx-icon.png";
import PdfIcon from "../assets/pdf-icon.png";
import JpgIcon from "../assets/jpg-icon.png";
import PngIcon from "../assets/png-icon.png";

const PrintingConfigure = () => {
  const url = `http://localhost:3000/api`;
  const token = localStorage.getItem("userCredentials")
    ? JSON.parse(localStorage.getItem("userCredentials")).token
    : null;

  const [studentInfo, setStudentInfo] = useState({
    name: "vvvvv",
    pagebalance: 0,
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileURL, setSelectedFileURL] = useState(null);
  const [removedFiles, setRemovedFiles] = useState([]);
  const [pageSelection, setPageSelection] = useState("all");
  const [customPage, setCustomPage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [popupMessage, setPopupMessage] = useState(""); // Thông báo cho Popup
  const [printSide, setPrintSide] = useState(""); // Tùy chọn in một mặt hoặc hai mặt
  const [paperSize, setPaperSize] = useState(""); // Tùy chọn khổ giấy
  const [numCopies, setNumCopies] = useState(""); // Số bản sao

  const fileIcons = {
    docx: DocxIcon,
    pdf: PdfIcon,
    jpg: JpgIcon,
    png: PngIcon,
  };

  const getFileIcon = (extension) => {
    return fileIcons[extension] || Upload_icon;
  };

  const fetchStudentInfo = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStudentInfo({
          name: data[0].username,
          pagebalance: data[0].page_num,
        });
      } else {
        console.error("Failed to fetch student info");
      }
    } catch (error) {
      console.error("Error fetching student info:", error);
    }
  };

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);

    if (uploadedFiles.length > 0) {
      setErrorMessage("Bạn chỉ được upload 1 file một lần!");
      setPopupMessage("Bạn chỉ được upload 1 file một lần!");
      return;
    }

    if (files.length > 0) {
      const file = files[0];
      const newFile = {
        name: file.name.split(".").slice(0, -1).join("."),
        extension: file.name.split(".").pop().toLowerCase(),
        content: file,
      };

      setUploadedFiles([newFile]);
      setRemovedFiles([]);
      setErrorMessage("");
      setPopupMessage("Tệp của bạn đã tải lên thành công!"); // Popup thông báo tệp đã được tải lên
    }
  };

  const handleDeleteFile = () => {
    setUploadedFiles([]);
    setErrorMessage("");
    setSelectedFileURL(null);
    setPopupMessage("Tệp đã bị xóa!"); // Popup thông báo tệp đã bị xóa
  };

  const handleCheckSettings = () => {
    // Kiểm tra xem tất cả điều kiện in đã được thiết lập hay chưa
    if (uploadedFiles.length === 0) {
      setPopupMessage("Vui lòng tải lên một tệp để in!");
      return;
    }
    if (printSide === "") {
      setPopupMessage("Vui lòng chọn in một mặt hoặc hai mặt!");
      return;
    }
    if (paperSize === "") {
      setPopupMessage("Vui lòng chọn khổ giấy!");
      return;
    }
    if (numCopies === "" || isNaN(numCopies) || Number(numCopies) <= 0) {
      setPopupMessage("Vui lòng nhập số bản sao hợp lệ!");
      return;
    }
    if (pageSelection === "custom" && (customPage === "" || isNaN(customPage))) {
      setPopupMessage("Vui lòng nhập số trang hợp lệ!");
      return;
    }

    // Nếu tất cả điều kiện hợp lệ
    setPopupMessage("Các cài đặt in hợp lệ! Vui lòng chọn máy in");
  };

  return (
    <div className={styles.container}>
      <Header text={studentInfo.name} showLogout={true} isStudent={true} />

      {/* Thanh ngang */}
      <div className={styles.thanh_section}>
        <img src={Bar} alt="Full Bar" className={styles.thanh_image} />
      </div>

      {/* Nội dung chính */}
      <div className={styles.main_content}>
        {/* Phần bên trái */}
        <div className={styles.left_section}>
          <div className={styles.upload_box}>
            <div className={styles.upicon_section}>
              <img
                src={Upload_icon}
                alt="Upload Icon"
                className={styles.upcion_image}
              />
            </div>

            <div className={styles.upload_instructions}>
              <p className={styles.uploadText}>
                {uploadedFiles.length === 0
                  ? "Xin hãy lựa chọn tệp tin của bạn"
                  : "Tệp của bạn đã tải lên thành công"}
              </p>

              {!uploadedFiles.length && (
                <label className={styles.upload_label}>
                  Chọn tệp
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className={styles.file_input}
                  />
                </label>
              )}

              <p className={styles.fileInfo}>
                .pdf, .docx, .jpg, .png
                <br />
                Độ lớn tệp tin tối đa 50MB
              </p>
            </div>

            <div className={styles.uploaded_files}>
              {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index} className={styles.file_item}>
                    <img
                      src={getFileIcon(file.extension)}
                      alt={file.name}
                      className={styles.file_icon}
                    />
                    <span>{file.name}</span>
                    <div>
                      <button
                        className={styles.inspect_button}
                        onClick={() => handleInspectFile(file)}
                      >
                        🔍 Inspect
                      </button>
                      <button
                        className={styles.delete_button}
                        onClick={handleDeleteFile}
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Phần bên phải */}
        <div className={styles.right_section}>
          <div className={styles.options_box}>
            <div className={styles.option_item}>
              <label>In trên</label>
              <div className={styles.checkbox_group}>
                <label>
                  <input
                    type="radio"
                    name="print_side"
                    value="one_side"
                    onChange={(e) => setPrintSide(e.target.value)}
                  />
                  Một mặt
                </label>
                <label>
                  <input
                    type="radio"
                    name="print_side"
                    value="two_side"
                    onChange={(e) => setPrintSide(e.target.value)}
                  />
                  Hai mặt
                </label>
              </div>
            </div>
            <div className={styles.option_item}>
              <label htmlFor="paper-size">Khổ giấy</label>
              <select
                id="paper-size"
                className={styles.dropdown}
                value={paperSize}
                onChange={(e) => setPaperSize(e.target.value)}
              >
                <option value="">Chọn khổ giấy</option>
                <option value="A4">A4 - 210 x 297 mm</option>
                <option value="A3">A3 - 297 x 420 mm</option>
                <option value="Letter">Letter - 216 x 279 mm</option>
              </select>
            </div>

            <div className={styles.option_item}>
              <label htmlFor="page-count">Số trang</label>
              <select
                id="page-count"
                className={styles.dropdown}
                value={pageSelection}
                onChange={(e) => setPageSelection(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="custom">Tùy chỉnh</option>
              </select>
              {pageSelection === "custom" && (
                <input
                  type="text"
                  placeholder="Nhập số trang"
                  className={styles.inputField}
                  value={customPage}
                  onChange={(e) => setCustomPage(e.target.value)}
                />
              )}
            </div>

            <div className={styles.option_item}>
              <label>Số bản sao</label>
              <input
                type="text"
                className={styles.inputFieldLarge}
                placeholder="Enter here"
                value={numCopies}
                onChange={(e) => setNumCopies(e.target.value)}
              />
            </div>

            <button className={styles.check_button} onClick={handleCheckSettings}>
              Kiểm tra cài đặt in
            </button>
          </div>
        </div>
      </div>

      {/* Hiển thị Popup nếu có thông báo */}
      {popupMessage && (
        <Popup message={popupMessage} onClose={() => setPopupMessage("")} />
      )}

      <Footer />
    </div>
  );
};

export default PrintingConfigure;
