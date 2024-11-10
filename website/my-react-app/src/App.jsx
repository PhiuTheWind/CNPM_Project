// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChooseUser from './components/ChooseUser.jsx';
import HomeBeforeLogin from './components/HomeBeforeLogin.jsx';
import LoginPage from './components/Loginpage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeBeforeLogin />} />
        <Route path="/user" element={<ChooseUser />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
