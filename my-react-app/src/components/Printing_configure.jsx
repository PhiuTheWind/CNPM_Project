import React, { useState, useEffect } from "react";
import Header from "./utils/Header";
import Footer from "./utils/Footer";
import Popup from "./utils/Popup.jsx"; // Import Popup component
import styles from "../styles/Printing_configure.module.css";
import Bar from "../assets/Bar.png";
import Upload_icon from "../assets/Upload_icon.png";
import DocxIcon from "../assets/docx-icon.png";
import PdfIcon from "../assets/pdf-icon.png";
import JpgIcon from "../assets/jpg-icon.png";
import PngIcon from "../assets/png-icon.png";
import SuccessModal from "./SuccessModal.jsx"; // Import SuccessModal component
import { Getinfo } from './utils/GetInfo';
import { useNavigate } from 'react-router-dom';
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import mammoth from "mammoth";

// Cấu hình worker cho pdf.js từ CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function PrintingConfigure() {
  const [studentInfo, setStudentInfo] = useState({
    name: "STUDENT",
    pagebalance: 0,
  });
  const navigate = useNavigate();
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
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Trạng thái cho modal thành công
  const fileIcons = {
    docx: DocxIcon,
    pdf: PdfIcon,
    jpg: JpgIcon,
    png: PngIcon,
  };
  const handleRedirect = () => {
    const printingConfig = {
      uploadedFiles,
      printSide,
      paperSize,
      numCopies,
      pageSelection,
      customPage,
    };

    // Lưu trữ vào localStorage trước khi điều hướng
    localStorage.setItem("printingConfig", JSON.stringify(printingConfig));

    // Điều hướng sang trang chọn máy in và truyền state
    navigate("/student_homepage/chooseprinter", {
      state: printingConfig,
    });
  };

  const supportedExtensions = ["pdf", "docx", "jpg", "png"]; // Các loại file được hỗ trợ
  
  // Get username and page balance
  useEffect(() => {
    // Khôi phục thông tin từ localStorage
    const savedConfig = localStorage.getItem("printingConfig");
    if (savedConfig) {
      const {
        uploadedFiles,
        printSide,
        paperSize,
        numCopies,
        pageSelection,
        customPage,
        numPages,
      } = JSON.parse(savedConfig);

      setUploadedFiles(uploadedFiles || []);
      setPrintSide(printSide || "");
      setPaperSize(paperSize || "");
      setNumCopies(numCopies || "");
      setPageSelection(pageSelection || "all");
      setCustomPage(customPage || "");
    }

    // Fetch thông tin sinh viên
    const fetchStudentInfo = async () => {
      try {
        const data = await Getinfo();
        setStudentInfo(data); // Update state với dữ liệu nhận được
      } catch (err) {
        setErrorMessage('Failed to fetch student information');
        console.error(err);
      }
    };

    fetchStudentInfo();
  }, []);


  const getFileIcon = (extension) => {
    return fileIcons[extension] || Upload_icon;
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
  
    if (uploadedFiles.length > 0) {
      setErrorMessage("Bạn chỉ được upload 1 file một lần!");
      setPopupMessage("Bạn chỉ được upload 1 file một lần!");
      return;
    }
  
    if (files.length > 0) {
      const file = files[0];
      const extension = file.name.split(".").pop().toLowerCase();
  
      if (!supportedExtensions.includes(extension)) {
        setErrorMessage("Định dạng tệp không được hỗ trợ!");
        setPopupMessage("Định dạng tệp không được hỗ trợ!");
        return;
      }
  
      const newFile = {
        name: file.name.split(".").slice(0, -1).join("."),
        extension: extension,
        content: file,
      };
  
      setUploadedFiles([newFile]);
      setRemovedFiles([]);
      setErrorMessage("");
      setPopupMessage("Tệp của bạn đã tải lên thành công!");
  
      if (extension === "pdf") {
        await handleGetNumberOfPages(file);
      }
  
      else if (extension === "docx") {
        handleGetNumberOfPagesDocx(file);
      }
    }
  };
  
  const handleDeleteFile = () => {
    setUploadedFiles([]);
    setErrorMessage("");
    setSelectedFileURL(null);
    setPopupMessage("Tệp đã bị xóa!");
  };

  const handleInspectFile = (file) => {
    if (file.extension === "jpg" || file.extension === "png") {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setSelectedFileURL(e.target.result);
      };
      fileReader.readAsDataURL(file.content);
    } else if (file.extension === "pdf") {
      const fileBlob = new Blob([file.content], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(fileBlob);
      setSelectedFileURL(fileURL);
    } else if (file.extension === "docx") {
      // Tải file lên một dịch vụ lưu trữ công khai và sử dụng Google Docs Viewer
      uploadFileToPublicURL(file.content)
        .then((publicURL) => {
          const googleViewerURL = `https://docs.google.com/viewer?url=${encodeURIComponent(publicURL)}&embedded=true`;
          setSelectedFileURL(googleViewerURL);
        })
        .catch(() => {
          setErrorMessage("Không thể tải file lên để xem trước.");
          setPopupMessage("Không thể tải file lên để xem trước.");
        });
    } else {
      setErrorMessage("Không thể xem trước loại file này.");
      setPopupMessage("Không thể xem trước loại file này.");
    }
  };

  const handleCloseInspect = () => {
    setSelectedFileURL(null);
  };

  const uploadFileToPublicURL = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://file.io", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        return data.link; // Trả về URL của file đã được upload
      } else {
        throw new Error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handleCheckSettings = () => {
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
    if (pageSelection === "custom") {
      if (customPage === "" || isNaN(customPage) || Number(customPage) <= 0) {
        setPopupMessage("Vui lòng nhập số trang hợp lệ!");
        return;
      }
    } else if (pageSelection !== "all" && pageSelection !== "even" && pageSelection !== "odd") {
      setPopupMessage("Vui lòng chọn kiểu in hợp lệ!");
      setCustomPage(0);
      return;
    }

    setShowSuccessModal(true); // Hiển thị modal thành công
  };
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };
  console.log(uploadedFiles);

  const handleGetNumberOfPages = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const typedarray = new Uint8Array(e.target.result);
      try {
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        const numPages = pdf.numPages;
        console.log(`Số trang của file PDF: ${numPages}`);
        setPopupMessage(`Số trang của file PDF: ${numPages}`);
      } catch (error) {
        console.error('Có lỗi khi đọc file PDF:', error);
        setPopupMessage('Có lỗi khi đọc file PDF');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleGetNumberOfPagesDocx = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target.result;
      try {
        // Sử dụng mammoth để đọc nội dung DOCX
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value; // Nội dung text của file DOCX

        // Đếm số đoạn hoặc số dòng để thay thế cho việc đếm số trang
        const numPages = text.split("\n").length / 40; // Giả sử mỗi trang có khoảng 40 dòng
        setPopupMessage(`Số trang ước tính của tài liệu là: ${Math.ceil(numPages)}`);
      } catch (error) {
        console.error("Có lỗi khi đọc file DOCX:", error);
        setPopupMessage("Có lỗi khi đọc file DOCX");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className={styles.container}>
      <Header text={studentInfo.name} paper={studentInfo.pagebalance} showLogout={true} isStudent={true} />

      {/* Thanh ngang */}
      <div className={styles.thanh_section}>
        <img src={Bar} alt="Full Bar" className={styles.thanh_image} />
      </div>


      <div className={styles.main_content}>

        <div className={styles.left_section}>
          <div className={styles.upload_box}>
            <div className={styles.upicon_section}>
              <img src={Upload_icon} alt="Upload Icon" className={styles.upcion_image} />
            </div>

            <div className={styles.upload_instructions}>
              <p className={styles.uploadText}>
                {uploadedFiles.length === 0 ? "Xin hãy lựa chọn tệp tin của bạn" : "Tệp của bạn đã tải lên thành công"}
              </p>

              {!uploadedFiles.length && (
                <label className={styles.upload_label}>
                  Chọn tệp
                  <input type="file" onChange={handleFileUpload} className={styles.file_input} />
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
                    <img src={getFileIcon(file.extension)} alt={file.name} className={styles.file_icon} />
                    <span>{file.name}</span>
                    <div>
                      <button className={styles.inspect_button} onClick={() => handleInspectFile(file)}>
                        🔍 Xem trước
                      </button>
                      <button className={styles.delete_button} onClick={handleDeleteFile}>
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>


            {selectedFileURL && (
              <div className={styles.inspect_file}>
                {selectedFileURL.includes("google.com/viewer") ? (
                  <iframe src={selectedFileURL} title="File Preview" className={styles.file_preview}></iframe>
                ) : (
                  <embed src={selectedFileURL} type="application/pdf" className={styles.file_preview} />
                )}
                <button className={styles.close_button} onClick={handleCloseInspect}>
                  Đóng
                </button>
              </div>
            )}
          </div>
        </div>


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
                    checked={printSide === "one_side"} // Sử dụng checked để điều kiện dựa vào state
                    onChange={(e) => setPrintSide(e.target.value)}
                  />
                  Một mặt
                </label>
                <label>
                  <input
                    type="radio"
                    name="print_side"
                    value="two_side"
                    checked={printSide === "two_side"} // Sử dụng checked để điều kiện dựa vào state
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
                <option value="">Chọn số trang</option>
                <option value="all">Tất cả</option>
                <option value="even">Trang chẵn</option>
                <option value="odd">Trang lẻ</option>
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


      {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage("")} />}


      {showSuccessModal && (
        <SuccessModal
          message="Các cài đặt in hợp lệ. Vui lòng chọn máy in!"
          onClose={handleSuccessModalClose}
          onRedirect={handleRedirect}
        />
      )}
      <Footer />
    </div>

  );
};

// Đảm bảo có đoạn này ở cuối file `Printing_configure.jsx`
export default PrintingConfigure;