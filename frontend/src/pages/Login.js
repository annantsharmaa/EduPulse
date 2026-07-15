import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async (type) => {
    setLoading(true);
    const accounts = {
      admin: { email: 'admin@edupulse.com', password: 'Admin@123' },
      faculty: { email: 'faculty@edupulse.com', password: 'Faculty@123' },
      student: { email: 'student@edupulse.com', password: 'Student@123' },
    };
    try {
      await login(accounts[type].email, accounts[type].password);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Left */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">🎓 EduPulse</h1>
          <p className="text-lg opacity-90 mb-6">Intelligent Student Management System</p>
          <div className="space-y-3">
            <div className="flex items-center space-x-2"><span>✅</span><span>Attendance Tracking</span></div>
            <div className="flex items-center space-x-2"><span>✅</span><span>Performance Analytics</span></div>
            <div className="flex items-center space-x-2"><span>✅</span><span>AI-Powered Insights</span></div>
            <div className="flex items-center space-x-2"><span>✅</span><span>QR/RFID Integration</span></div>
          </div>
        </div>

        {/* Right */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Welcome Back</h2>
          {error && <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input type="password" className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-3">Quick Login</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => quickLogin('admin')} className="p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-medium hover:bg-purple-100 dark:hover:bg-purple-900/50">Admin</button>
              <button onClick={() => quickLogin('faculty')} className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50">Faculty</button>
              <button onClick={() => quickLogin('student')} className="p-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-xs font-medium hover:bg-green-100 dark:hover:bg-green-900/50">Student</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
