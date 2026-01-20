import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css'; // Importing our premium style

const Layout = () => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active-nav' : '';

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="brand-badge">L</div>
          <div>
            <h1 className="brand-name">LMS ADMIN</h1>
            <p className="user-welcome">Hello, {user?.name}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                <span className="nav-icon">🏠</span> Dashboard Home
              </Link>
            </li>
            <li>
              <Link to="/users" className={`nav-link ${isActive('/users')}`}>
                <span className="nav-icon">👥</span> User Directory
              </Link>
            </li>
            <li>
              <Link to="/users/create" className={`nav-link ${isActive('/users/create')}`}>
                <span className="nav-icon">➕</span> Create New User
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={logout} className="logout-button">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="admin-main">
        <header className="admin-header">
          <h2 className="page-title">
            {location.pathname.split('/').pop() || 'Dashboard'}
          </h2>
        </header>

        <section className="admin-page-content">
          <div className="content-container">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Layout;