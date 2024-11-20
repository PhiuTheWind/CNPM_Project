// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChooseUser from './components/ChooseUser.jsx';
import HomeBeforeLogin from './components/HomeBeforeLogin.jsx';
import LoginPage from './components/Loginpage.jsx';
import StudentHomepage from './components/StudentHomepage.jsx';
import SpsoHomepage from './components/SpsoHomepage.jsx';
import ManagePrinter from './components/ManagePrinter.jsx';
import ManageConfig from './components/ManageConfig.jsx';
import Report4SPSO from './components/Report4SPSO.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeBeforeLogin />} />
        <Route path="/user" element={<ChooseUser />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student_homepage" element={<StudentHomepage />} />
        <Route path="/spso_homepage" element={<SpsoHomepage />} />
        <Route path="/spso_homepage/manage_printer" element={<ManagePrinter />} />
        <Route path="/spso_homepage/manage_cofig" element={<ManageConfig />} />
        <Route path="/spso_homepage/spsoreport" element={<Report4SPSO />} />
      </Routes>
    </Router>
  );
}

export default App;
