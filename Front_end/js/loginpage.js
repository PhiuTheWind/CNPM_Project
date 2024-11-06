document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Ngăn chặn việc gửi form mặc định

    // Lấy giá trị từ các input
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Kiểm tra đầu vào
    if (username == "student@hcmut.edu.vn" && password == "password") {
        // Kiểm tra đầu vào hợp lệ, gửi yêu cầu qua AJAX hoặc xử lý dữ liệu
        console.log("Username:", username);
        console.log("Password:", password);

        // Thực hiện chuyển hướng hoặc xử lý đăng nhập ở đây
        window.location.href = "student_homepage.html"; // Thay đổi URL nếu cần
    } 
    else if (username == "spso@hcmut.sps.vn" && password == "password") {
        // Kiểm tra đầu vào hợp lệ, gửi yêu cầu qua AJAX hoặc xử lý dữ liệu
        console.log("Username:", username);
        console.log("Password:", password);

        // Thực hiện chuyển hướng hoặc xử lý đăng nhập ở đây
        window.location.href = "spso_homepage.html"; // Thay đổi URL nếu cần
    }
    else {
        alert("Vui lòng nhập đầy đủ thông tin!");
    }
});
