import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '../api/authApi';
import './LoginPage.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await authApi.ForgotPassword(email);
      setMessage(`If an account exists for ${email}, a reset link has been sent.`);
    }catch(err){
      console.error("Reset error : ",err);
      setMessage("An error occurred. Please try again later.")
    }
  };

  return (
    <div className="login-screen-wrapper">
      <div className="login-container-card">
        <div className="login-brand-section">
          <h2>Reset Password</h2>
          <p>Enter your email to receive a recovery link</p>
        </div>

        {message ? (
          <div className="login-alert-box success-alert">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-inner-form">
            <div className="login-field">
              <label>Recovery Email</label>
              <input 
                type="email" 
                placeholder="Enter the email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <button type="submit" className="login-primary-btn">
              Send Reset Link
            </button>
          </form>
        )}

        <div className="login-extra-links">
          <Link to="/login" className="back-link">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;