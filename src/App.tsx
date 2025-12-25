import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import SuperAdminLayout from './layouts/SuperAdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import CompaniesPage from './pages/admin/Companies';
import UserProvisioning from './pages/admin/UserProvisioning';

import HRLayout from './layouts/HRLayout'; 
import HRDashboard from './pages/hr/Dashboard';
import ResumesList from './pages/hr/ResumesList';
import ResumeUpload from './pages/hr/ResumeUpload';
import JobsList from './pages/hr/JobsList';
import CreateJob from './pages/hr/CreateJob';
import HRAdminDashboard from './pages/hr/AdminDashboard';
import SmartMatch from './pages/hr/SmartMatch';
import MatchHistory from './pages/hr/MatchHistory';
import Profile from './pages/hr/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Super Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <SuperAdminLayout />
            </ProtectedRoute>
          }>
             <Route index element={<AdminDashboard />} />
             <Route path="companies" element={<CompaniesPage />} />
             <Route path="users" element={<UserProvisioning />} />
          </Route>

          {/* HR Admin Routes */}
          <Route path="/hr" element={
            <ProtectedRoute>
              <HRLayout />
            </ProtectedRoute>
          }>
             <Route path="dashboard" element={<HRDashboard />} />
             <Route path="talent" element={<ResumesList />} />
             <Route path="upload" element={<ResumeUpload />} />
             <Route path="jobs" element={<JobsList />} />
             <Route path="jobs/new" element={<CreateJob />} />
             <Route path="jobs/edit/:id" element={<CreateJob />} />
             <Route path="match" element={<SmartMatch />} />
             <Route path="history" element={<MatchHistory />} />
             <Route path="profile" element={<Profile />} />
             <Route path="admin" element={<HRAdminDashboard />} />
          </Route>

          {/* Default/Generic Dashboard Redirect */}
          <Route path="/dashboard" element={<Navigate to="/hr/dashboard" replace />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
