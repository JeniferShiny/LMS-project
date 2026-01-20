import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import './LoginPage.css';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();

  /**
   * Memoized helper function to route users based on role.
   * Using useCallback prevents unnecessary re-renders and fixes the ESLint warning.
   */
  const redirectUserByRole = useCallback((role) => {
    switch (role) {
      case 'admin':
        navigate('/dashboard');
        break;
      case 'instructor':
        navigate('/trainer-dashboard');
        break;
      case 'learner':
        navigate('/learner-dashboard');
        break;
      default:
        // Optional: clear session if role is unknown
        navigate('/login');
    }
  }, [navigate]);

  /**
   * Automatically redirect if user is already logged in.
   */
  useEffect(() => {
    if (user && user.role) {
      redirectUserByRole(user.role);
    }
  }, [user, redirectUserByRole]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login(credentials.email, credentials.password);
      
      // Update Context
      login(response);

      // Redirect immediately using the role from the response
      const role = response.user?.role;
      if (role) {
        redirectUserByRole(role);
      } else {
        throw new Error("Login successful, but no role assigned to this user.");
      }

    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen-wrapper">
      <div className="login-container-card">
        <div className="login-brand-section">
          <h2>Login</h2>
          <p>LMS Management Portal</p>
        </div>

        {error && (
          <div className="login-alert-box">
            <span className="alert-icon">⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="login-inner-form">
          <div className="login-field">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              required 
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              required 
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>
          
          <div className="login-extra-links">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" disabled={loading} className="login-primary-btn">
            {loading ? "Logging in..." : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;