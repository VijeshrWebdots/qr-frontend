// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Update imports
import LoginPage from './LoginPage';
import Main from './Main';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (data) => {
    setIsLoggedIn(data);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
console.log(isLoggedIn,"islogign")
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Main onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
