import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ModuleProvider } from './context/ModuleContext';
import { ActivityProvider } from './context/ActivityContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading EduPulse...</p>
      </div>
    </div>
  );
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ModuleProvider>
          <ActivityProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              </Routes>
            </div>
          </ActivityProvider>
        </ModuleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
