import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import './CreateUser.css'; // New CSS file

const CreateUser = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'learner' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.createUser(formData, user.token);
      navigate('/users'); 
    } catch (err) { 
      alert(err.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Create New User</h2>
          <p>Fill in the details to register new account.</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="Enter full name"
              required 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter email"
              required 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input
              type="password"
              placeholder='Enter Password'
              required
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}/>
          </div>

          <div className="form-group">
            <label>System Role</label>
            <select 
              value={formData.role} 
              onChange={e => setFormData({...formData, role: e.target.value})}
            >
              <option value="learner">Learner</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={() => navigate('/users')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;