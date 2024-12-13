# Student Smart Printing Service (HCMUT_SSPS)

The **Student Smart Printing Service (HCMUT_SSPS)** is a campus-wide application developed by Ho Chi Minh City University of Technology (HCMUT) to enhance the printing experience for students. It provides seamless access to printers, document upload features, and quota management, while administrators have a dedicated platform for efficient printer oversight and system configuration.

---

## **Features**

### For Students
- **Printer Information**: View details of available printers, including printer IDs and campus locations.
- **Document Upload**: Upload documents for printing with options for number of pages, color settings, size, and scheduled print time.
- **Quota Management**: Monitor and purchase additional printing pages via the university's payment service.
- **Authentication**: Secure login through the HCMUT Student Authentication Service (HCMUT_SSO).
- **User-Friendly Interface**: Simple navigation and accessibility designed for all users.

### For Administrators (SPSO)
- **Printer Management**: Add, update, or remove printers and configure their settings.
- **Transaction Tracking**: Monitor all printing transactions and activities.
- **Reporting**: Generate customizable periodic reports for analysis.
- **System Configuration**: Adjust system settings to ensure optimal performance.

---

## **Installation**

Follow these steps to set up the application:

1. **Install NodeJS** on your system.
2. **Clone the repository** to your local machine.
3. **Navigate to the project folder** using your terminal.
4. **Install MySQL** to set up the database.
5. Update the configuration file located at `/Back_end/.env` with your environment variables.
6. Start the backend server by running:
   ```bash
   npm run start
   ```
7. Access the application at the VITE local address:
   ```
   http://localhost:5173
   ```

---

## **Login**

### 1. Student Accounts

Below is an example structure for student accounts:

| Username   | Password   | Student ID | Student Name            | Page Number |
|------------|------------|------------|-------------------------|-------------|
| student1   | password1  | 2252898    | Huỳnh Ngọc Vân          | 100         |
| student2   | password2  | 2252327    | Lê Hà Nguyên Khánh      | 100         |
| student3   | password3  | 2252293    | Huỳnh Mai Quốc Khang    | 100         |
| student4   | password4  | 2252608    | Hoàng Văn Phi           | 100         |
| student5   | password5  | 2252023    | Lê Đỗ Minh Anh          | 100         |

---

### 2. SPSO (Administrator)

Below are the credentials for the admin account:

| Field Name   | Description                              | Example              |
|--------------|------------------------------------------|----------------------|
| `username`   | Admin username                          | `spso1`              |
| `password`   | Default password for admin login         | `password1`          |

---

## **Contact**

For support or inquiries, please contact the IT Department at HCMUT:

- **Email**: phi.hoangsut0504@hcmut.edu.vn
- **Phone**: +84 28 1234 5678
