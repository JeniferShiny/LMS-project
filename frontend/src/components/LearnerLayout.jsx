import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Goes up one level to src, then into context
import './LearnerLayout.css';

const LearnerLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="learner-shell">
      <nav className="learner-nav">
        <div className="logo" onClick={() => navigate('/learner-dashboard')}>
          🎓 Learner App
        </div>
        <div className="user-section">
          <div className="profile-info">
            <p className="name">{user?.name}</p>
            <p className="role">Student</p>
          </div>
          <button onClick={logout} className="btn-logout">Logout</button>
        </div>
      </nav>
      <main className="learner-main">
        <Outlet /> {/* This is where LearnerDashboard will appear */}
      </main>
    </div>
  );
};

export default LearnerLayout;