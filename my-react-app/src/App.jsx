// src/App.js
import React from 'react';
import { UserContext } from './context/UserContext.js'
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChooseUser from './components/ChooseUser.jsx';
import HomeBeforeLogin from './components/HomeBeforeLogin.jsx';
import LoginPage from './components/Loginpage.jsx';
import StudentHomepage from './components/StudentHomepage.jsx';
import SpsoHomepage from './components/SpsoHomepage.jsx';
import ManagePrinter from './components/ManagePrinter.jsx';
import ManageConfig from './components/ManageConfig.jsx';
import Report4SPSOMonth from './components/Report4SPSOMonth.jsx';
import Report4SPSOYear from './components/Report4SPSOYear.jsx';
import AddPrinter from './components/AddPrinter.jsx';
import PrinterLog from './components/PrinterLog.jsx';
import StudentViewLog from './components/StudentViewLog.jsx';
import SpsoViewStuLog from './components/SpsoViewStuLog.jsx';
import PrintingConfigure from './components/Printing_configure.jsx';
import ChoosePrinter from './components/ChoosePrinter.jsx';
import PurchasePaperModal from './components/PurchasePaperModal.jsx';
import StudentSummary from './components/StudentSummary.jsx';


function App() {
  const [user, setUser] = useState({ token: null, isSPSO: false, listFiles: [] });
  const [cookies] = useCookies();
  
  useEffect(() => {
    const userCredentials = JSON.parse(localStorage.getItem('userCredentials'));
    
    if (userCredentials === null || userCredentials === undefined) {
      setUser({ token: null, isSPSO: false, listFiles: [] });
    }
    else {
      setUser({ ...user, ...userCredentials });
    }
  }, [cookies]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomeBeforeLogin />} />
          <Route path="/user" element={<ChooseUser />} />
          <Route path='login'>
              <Route index element={<LoginPage />}/>
              <Route path='student' element={<LoginPage role='student' />}/>
              <Route path='spso' element={<LoginPage role='spso' />}/>
          </Route>
          <Route path="/student_homepage" element={<StudentHomepage />} />
            <Route path="/student_homepage/printing_configure" element={<PrintingConfigure />} />
            <Route path="/student_homepage/chooseprinter" element={<ChoosePrinter />} />
            <Route path="/student_homepage/purchase_paper" element={<PurchasePaperModal />} />
            <Route path="/student_homepage/view_log" element={<StudentViewLog />} />
            <Route path="/student_homepage/summary" element={<StudentSummary />} />

          <Route path="/spso_homepage" element={<SpsoHomepage />} />
            <Route path="/spso_homepage/manage_printer" element={<ManagePrinter />} />
            <Route path="/spso_homepage/manage_printer/add_printer" element={<AddPrinter />} />
            <Route path="/spso_homepage/manage_printer/printer_log" element={<PrinterLog />} />
            <Route path="/spso_homepage/manage_cofig" element={<ManageConfig />} />
            <Route path="/spso_homepage/view_stu_log" element={<SpsoViewStuLog />} />
            <Route path="/spso_homepage/spso_report_month" element={<Report4SPSOMonth />} />
            <Route path="/spso_homepage/spso_report_year" element={<Report4SPSOYear />} />

          <Route path="/printing_configure" element={<PrintingConfigure />} />
          <Route path="/PurchasePaperModal" element={<PurchasePaperModal />} />
        </Routes>
        
      </Router>
    </UserContext.Provider>
  );
}

export default App;
