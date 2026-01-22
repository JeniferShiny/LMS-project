import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import CreateUser from './pages/CreateUser';
import ResetPassword from './pages/ResetPassword';

// Import the Layouts
import TrainerLayout from './components/TrainerLayout';
import TrainerDashboard from './pages/TrainerDashboard';
import LearnerLayout from './components/LearnerLayout';
import LearnerDashboard from './pages/Learnerdashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/users/create" element={<CreateUser />} />
          </Route>
        </Route>

        {/* Learner Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={['learner']} />}>
          {/* Fixed the name from LearnerDashboardLayout to LearnerLayout */}
          <Route element={<LearnerLayout />}>
            <Route path="/learner-dashboard" element={<LearnerDashboard />} />
          </Route>
        </Route>

        {/* Trainer Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={['trainer']} />}>
          <Route element={<TrainerLayout />}>
            <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;