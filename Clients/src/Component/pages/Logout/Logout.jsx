import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user session
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="logout-container">
      <div className="logout-card">
        <h1 className="logout-title">You’ve been logged out</h1>
        <p className="logout-message">
          Thank you for visiting 🌿 <br /> 
          You can log in again or return to the home page.
        </p>
        <div className="logout-actions">
          <button className="logout-btn primary" onClick={handleLogout}>
            Login Again
          </button>
          <button className="logout-btn secondary" onClick={handleGoHome}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
