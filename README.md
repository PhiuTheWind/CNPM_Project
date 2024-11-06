**Student Smart Printing Service (HCMUT_SSPS)**


The Student Smart Printing Service (HCMUT_SSPS) is a campus-wide app developed by Ho Chi Minh City University of Technology to improve the printing experience for students. It enables students to locate available printers, upload documents for printing, and manage their printing quotas. Administrators have a dedicated interface to oversee printers and configure system settings.

**Features**


For Students


+ Printer Information: View details of available printers, including printer IDs and campus locations.
+ Document Upload: Upload documents for printing with options for number of pages, color settings, size, and scheduled print time.
+ Quota Management: Monitor and purchase additional printing pages through the university's payment service.
+ Authentication: Secure login via HCMUT Student Authentication Service (HCMUT_SSO).
+ User-Friendly Interface: Easy navigation and accessibility for all users.
For Administrators (SPSO)
Printer Management: Add, update, or remove printers and configure their settings.
Transaction Tracking: Monitor all printing transactions and activities.
Reporting: Generate customizable periodic reports.
System Configuration: Adjust system settings to optimize service performance.
Installation
Clone the Repository

bash
Copy code
git clone https://github.com/HCMUT-SSPS/hcmut_ssps.git
Navigate to the Project Directory

bash
Copy code
cd hcmut_ssps
Install Dependencies

bash
Copy code
npm install
Configure Environment Variables

Create a .env file based on the .env.example template.
Set up database connections and other necessary configurations.
Run Database Migrations

bash
Copy code
npm run migrate
Start the Application

bash
Copy code
npm start
Usage
Access the Application

Navigate to http://localhost:3000 in your web browser.
Student Login

Log in using your student credentials via HCMUT_SSO.
View Printers

Access the "Printers" section to view available printers and their details.
Upload Documents

Go to the "Print" section to upload documents and set your printing preferences.
Manage Quota

Check your remaining pages and purchase additional pages if needed.
For Administrators
Administrator Login

Log in using your SPSO credentials provided by the system administrator.
Printer Management

Navigate to the "Admin Dashboard" to add or manage printers.
Configure Settings

Access the "Settings" section to adjust system configurations.
Monitor Transactions

View real-time transaction logs in the "Transactions" section.
Generate Reports

Go to the "Reports" section to create and download periodic reports.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For support or inquiries, please contact the IT Department at HCMUT:

Email: support@hcmut.edu.vn
Phone: +84 28 1234 5678
