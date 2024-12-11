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
import BuymorepaperModal from "./Buymorepaper.jsx"; // Import BuymorepaperModal component
import { Getinfo } from './utils/GetInfo';
import { useNavigate } from 'react-router-dom';
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import mammoth from "mammoth";
import axios from "axios";
import process from 'process';
import { PageNumber } from "docx";
import PurchasePaperModal from './PurchasePaperModal';

window.process = process;


// import DocxIcon from '../assets/docx-icon.png'; // Thay bằng đường dẫn thực tế
// import PdfIcon from '../assets/pdf-icon.png';
// import JpgIcon from '../assets/jpg-icon.png';
// import PngIcon from '../assets/jpg-icon.png';

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
  const [Buymorepapers, setBuyMorepapers] = useState(false); // Trạng thái cho modal mua thêm giấy
  const [numPages, setNumPages] = useState(0); // Khởi tạo số trang bằng 0
  //const [numPages_file, setNumPages_file] = useState(0); // Khởi tạo số trang bằng 0
  const [supportedExtensions, setSupportedExtensions] = useState([]); // Khởi tạo state rỗng
  const [student_page, setStudentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page_need_to_print, setPageNeedToPrint] = useState(0);
  
  const fileIcons = {
    docx: DocxIcon,
    pdf: PdfIcon,
    jpg: JpgIcon,
    png: PngIcon,
  };

  // Get username and page balance
  useEffect(() => {
    // Khôi phục thông tin từ localStorage
    const savedConfig = localStorage.getItem("printingConfig");
    if (savedConfig) {
      const {
        file_name,
        uploadedFiles,
        printSide,
        paperSize,
        numCopies,
        pageSelection,
        customPage,
        numPages,

        page_need_to_print,          
      } = JSON.parse(savedConfig);

      setUploadedFiles(uploadedFiles || []);
      setPrintSide(printSide || "");
      setPaperSize(paperSize || "");
      setNumCopies(numCopies || "");
      setPageSelection(pageSelection || "all");
      setCustomPage(customPage || "");
      setNumPages(numPages || 0);
      setPageNeedToPrint(page_need_to_print || 0);


    }

    // Fetch thông tin sinh viên
    const fetchStudentInfo = async () => {
      try {
        const data = await Getinfo();
        setStudentInfo(data); // Update state với dữ liệu nhận được
        setStudentPage(data.pagebalance);
        console.log(student_page);
      } catch (err) {
        setErrorMessage('Failed to fetch student information');
        console.error(err);
      }
    };

    fetchStudentInfo();

    const fetchConfig = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sysconfig');
        const data_spso = await response.json();
       
        if (data_spso.success) {
        console.log('Fetched Data:', data_spso);
        const typeArray = data_spso.type.split(',');
        console.log(typeArray); // Output: ["pdf", "docx", "jpg", "png"]
        setSupportedExtensions(typeArray); // Lưu vào state ["pdf", "docx", "jpg", "png"]
        }
        else {
          console.error('Error:', error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchConfig();
  }, [studentInfo]);

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

      // Kiểm tra kích thước file
      const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage("Dung lượng tệp vượt quá 50MB!");
        setPopupMessage("Dung lượng tệp vượt quá 50MB!");
        return;
      }

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
      } else if (extension === "docx") {
        handleGetNumberOfPagesDocx(file);
      }
    }
  };
    const handleOpenModal = () => {
        setIsModalOpen(true); // Show the modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Hide the modal
        setBuyMorepapers(false); 
    };

  const handleRedirect = () => {
    if (numPages === 0) {
      setPopupMessage("Không xác định được số trang của tệp tin!");
      return;
    }

    const printingConfig = {
      uploadedFiles,
      file_name: uploadedFiles[0].name + "." + (uploadedFiles[0].extension === "docx" ? "doc": uploadedFiles[0].extension),
      printSide,
      paperSize,
      numCopies,
      pageSelection,
      customPage,
      numPages,
      page_need_to_print,
    };

    localStorage.setItem("printingConfig", JSON.stringify(printingConfig));
    navigate("/student_homepage/chooseprinter", { state: printingConfig });
  };

  const handleDeleteFile = () => {
    setUploadedFiles([]);
    setNumPages(0);
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
    const calculateSelectedPages = (pageSelection, numPages, customPage = "") => {
    let selectedPages = [];
    
    switch (pageSelection) {
      case "all":
        for (let i = 1; i <= numPages; i++) {
          selectedPages.push(i);
        }
        break;
      
      case "even":
        for (let i = 1; i <= numPages; i++) {
          if (i % 2 === 0) {
            selectedPages.push(i);
          }
        }
        break;
      
      case "odd":
        for (let i = 1; i <= numPages; i++) {
          if (i % 2 !== 0) {
            selectedPages.push(i);
          }
        }
        break;
      
      case "custom":
        const validFormat = /^(\d+(-\d+)?)(,\s*\d+(-\d+)?)*$/;
        if (!validFormat.test(customPage)) {
          throw new Error("Lỗi tùy chỉnh số trang. Vui lòng kiểm tra lại!");
        }
        
        const ranges = customPage.split(",").map((range) => range.trim());
        ranges.forEach((range) => {
          if (range.includes("-")) {
            const [start, end] = range.split("-").map(Number);
            if (start <= end) {
              for (let i = start; i <= end; i++) {
                selectedPages.push(i);
              }
            }
          } else {
            selectedPages.push(Number(range));
          }
        });
        break;
      
      default:
        throw new Error("Lựa chọn số trang không hợp lệ!");
    }
  
    return selectedPages;
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
    if (!Number.isInteger(Number(numCopies)) || Number(numCopies) <= 0) {
      setPopupMessage("Vui lòng nhập số bản sao hợp lệ!");
      return;
    }
  
    try {
      const selectedPages = calculateSelectedPages(pageSelection, numPages, customPage);
      let totalPageCount = selectedPages.length;  // Tính tổng số trang

      if(printSide === "two_side") {
        if(totalPageCount % 2 !== 0) {
          totalPageCount /=  2;
          totalPageCount = totalPageCount + 0.5;
        }
        else totalPageCount /=  2;
      }

      if (paperSize === "A3") {
        totalPageCount *= 2;
      }

      if (numCopies !== 0) {
        totalPageCount *= numCopies;
      }

      // Kiểm tra số trang in vượt quá số trang còn lại
      if (student_page < totalPageCount) {
        setBuyMorepapers(true);
        return;
      }
  
      // // Kiểm tra số trang vượt quá số trang trong file
      // if (selectedPages[selectedPages.length - 1] > numPages) {
      //   setPopupMessage("Số trang in vượt quá số trang của file!");
      //   return;
      // }

      for (var i = 0; i < selectedPages.length; i++)
      {
        if (selectedPages[i] > numPages) {
          setPopupMessage("Số trang in vượt quá số trang của file!");
          return;
        }
      }

      console.log("Selected Pages:", selectedPages);
      console.log("Total Pages:", selectedPages.length);
      console.log("Total Pages to compare with Student_Pages: ", totalPageCount);


      //setCustomPage(selectedPages);
      setShowSuccessModal(true); // Hiển thị modal thành công
      setPageNeedToPrint(totalPageCount);
    } 
    
    catch (error) {
      setPopupMessage(error.message);
    }
  };
  
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };
  //console.log(uploadedFiles);

  const handleBuymorepaperClose = () => {
    setBuyMorepapers(false);
  };
  console.log(uploadedFiles);

  const handleGetNumberOfPages = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const typedarray = new Uint8Array(e.target.result);
      try {
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        const pages = pdf.numPages;
        console.log(`Số trang của file PDF: ${pages}`);
        setNumPages(pages); // Cập nhật số trang
        setPopupMessage(`Số trang của file PDF: ${pages}`);
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
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value; // Nội dung text của file DOCX
        const estimatedPages = Math.ceil(text.split("\n").length / 40); // Giả sử mỗi trang có 40 dòng
        console.log(`Số trang ước tính của file DOCX: ${estimatedPages}`);
        setNumPages(estimatedPages); // Cập nhật số trang
        setPopupMessage(`Số trang ước tính của file DOCX: ${estimatedPages}`);
      } catch (error) {
        console.error("Có lỗi khi đọc file DOCX:", error);
        setPopupMessage("Có lỗi khi đọc file DOCX");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Hiển thị định dạng dưới dạng chuỗi
  const extensionsString = supportedExtensions.join(", ");

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
                {extensionsString}
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
                        🔍 Xem trước
                      </button>
                      <button
                        className={styles.delete_button}
                        onClick={() => handleDeleteFile(file)}
                      >
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
            <div>
              {numPages > 0 && (
                <p className={styles.pageInfo}>Số trang: {numPages}</p>
              )}
            </div>

            {/* end of upload box */}
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
                  placeholder="Nhập số trang. Ví dụ: 1-5, 8, 11-13"
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

      {Buymorepapers && (
        <BuymorepaperModal
          message="Thiếu giấy! Xin vui lựa chọn mua thêm giấy hoặc chỉnh lại số giấy muốn in!"
          onClose={handleBuymorepaperClose}
          onClick={handleOpenModal} // Mở PurchasePaperModal
        />
      )}

      {isModalOpen && (
        <PurchasePaperModal onClose={handleCloseModal} name={studentInfo.name} />
      )}

      <Footer />
    </div>

  );
};

// Đảm bảo có đoạn này ở cuối file `Printing_configure.jsx`
export default PrintingConfigure;