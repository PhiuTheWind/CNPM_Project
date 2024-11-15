// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChooseUser from './components/ChooseUser.jsx';
import HomeBeforeLogin from './components/HomeBeforeLogin.jsx';
import LoginPage from './components/Loginpage.jsx';
import StudentHomepage from './components/StudentHomepage.jsx';
import SpsoHomepage from './components/SpsoHomepage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeBeforeLogin />} />
        <Route path="/user" element={<ChooseUser />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student_homepage" element={<StudentHomepage />} />
        <Route path="/spso_homepage" element={<SpsoHomepage />} />
      </Routes>
    </Router>
  );
}

export default App;
