import React, { useState, useEffect } from 'react';
import { authApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import './UserManagement.css'; // Make sure to import the CSS file

const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await authApi.getAllUsers(user.token);
        setUsers(data);
      } catch (err) { console.error(err); }
    };
    fetchUsers();
  }, [user]);

  const toggleStatus = async (id, currentStatus) => {
    if (currentStatus && !window.confirm("Warning: Deactivate this user?")) return;
    try {
      await authApi.updateUserStatus(id, !currentStatus, user.token);
      setUsers(users.map(u => u._id === id ? { ...u, isActive: !currentStatus } : u));
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="um-container">
      <div className="um-header">
        <h2 className="um-title">User Directory</h2>
        <span className="um-count">{users.length} Total Users</span>
      </div>
      
      <div className="um-table-wrapper">
        <table className="um-table">
          <thead>
            <tr>
              <th>Name / Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="um-row">
                <td>
                  <div className="um-user-info">
                    <div className="um-avatar">{u.name.charAt(0)}</div>
                    <div>
                      <div className="um-name">{u.name}</div>
                      <div className="um-email">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="um-role-badge">{u.role}</span>
                </td>
                <td>
                  <span className={`um-status ${u.isActive ? 'is-active' : 'is-inactive'}`}>
                    {u.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="text-right">
                  <button 
                    onClick={() => toggleStatus(u._id, u.isActive)} 
                    className={`um-btn ${u.isActive ? 'btn-deactivate' : 'btn-activate'}`}
                  >
                    {u.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;