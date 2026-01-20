import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './TrainerLayout.css';

const TrainerLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="trainer-container">
      <nav className="trainer-nav">
        <div className="trainer-logo" onClick={() => navigate('/trainer-dashboard')}>
          👨‍🏫 Trainer Panel
        </div>
        <div className="trainer-profile-area">
          <div className="trainer-user-info">
            <span className="trainer-name">{user?.name}</span>
            <span className="trainer-tag">Instructor</span>
          </div>
          <button onClick={logout} className="trainer-logout-btn">
            Logout
          </button>
        </div>
      </nav>
      <main className="trainer-main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default TrainerLayout;