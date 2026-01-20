import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import './LoginPage.css'; 

const ResetPassword = () => {
  const { token } = useParams(); // Gets the token from the URL
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
        return setStatus({ type: 'error', message: 'Passwords do not match' });
    }

    try {
      // You will need to add this 'resetPassword' function to your authApi.js
      await authApi.resetPassword(token, password);
      setStatus({ type: 'success', message: 'Password reset successful! Redirecting to login...' });
      
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong' });
    }
  };

  return (
    <div className="login-screen-wrapper">
      <div className="login-container-card">
        <div className="login-brand-section">
          <h2>Create New Password</h2>
          <p>Please enter your new secure password below.</p>
        </div>

        {status.message && (
          <div className={`login-alert-box ${status.type === 'success' ? 'success-alert' : ''}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-inner-form">
          <div className="login-field">
            <label>New Password</label>
            <input 
              type="password" 
              placeholder="Enter new password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>Confirm New Password</label>
            <input 
              type="password" 
              placeholder="Confirm new password" 
              required 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="login-primary-btn">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;