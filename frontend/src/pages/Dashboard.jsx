import React from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import'./Dashboard.css';

const Dashboard = () => {
    const {user} = useAuth();
  return (
    <div className="db-wrapper">
      <header className='db-welcome'>  
      <h1>Welcome, {user?.name || 'Admin'}</h1>
      </header>

      <div className="db-grid">
        <Link to="/users" className="db-card">
        <div className='db-card-content'>
          <h3>Manage Users </h3>
        </div>
        </Link>
        <Link to="/users/create" className="db-card">
        <div className='db-card-content'>  
          <h3>Register New User</h3>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;