// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChooseUser from './components/ChooseUser.jsx';
import HomeBeforeLogin from './components/HomeBeforeLogin.jsx';
import LoginPage from './components/Loginpage.jsx';
import StudentHomepage from './components/student_homepage.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeBeforeLogin />} />
        <Route path="/user" element={<ChooseUser />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student_homepage" element={<StudentHomepage />} />
      </Routes>
    </Router>
  );
}

export default App;
