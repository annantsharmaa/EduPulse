import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import GlobalSearch from './GlobalSearch';
import SmartNotifications from './SmartNotifications';
import CommandPalette from './CommandPalette';

const Header = ({ collapsed, setCollapsed, setActiveTab }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCommand, setShowCommand] = useState(false);

  const getDisplayName = () => {
    if (!user) return 'User';
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
    const email = user.email || '';
    if (email.includes('admin')) return 'Vikram Patel';
    if (email.includes('hod')) return 'Dr. Rajesh Kumar (HOD)';
    if (email.includes('faculty')) return 'Dr. Rajesh Kumar';
    if (email.includes('parent')) return 'Rajesh Sharma';
    if (email.includes('student')) return 'Ananya Sharma';
    return user.role || 'User';
  };

  const getInitials = () => getDisplayName().replace('(HOD)', '').trim().split(' ').slice(0,2).map(n => n[0]).join('');

  const handleSettings = () => { setActiveTab('settings'); setShowProfile(false); };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'k') { e.preventDefault(); setShowCommand(true); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <CommandPalette isOpen={showCommand} onClose={() => setShowCommand(false)} setActiveTab={setActiveTab} />
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <button onClick={() => setCollapsed(!collapsed)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl p-1">☰</button>
          <GlobalSearch />
          <button onClick={() => setShowCommand(true)} className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hidden lg:block">Ctrl+K</button>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={toggleDarkMode} className="text-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">{darkMode ? '☀️' : '🌙'}</button>
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative text-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">🔔<span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span></button>
            {showNotifications && <><div className="fixed inset-0 z-50" onClick={() => setShowNotifications(false)} /><div className="absolute right-0 mt-2 z-50"><SmartNotifications onClose={() => setShowNotifications(false)} /></div></>}
          </div>
          <div className="relative">
            <button onClick={() => setShowProfile(!showProfile)} className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">{getInitials()}</div>
              <span className="text-sm font-medium hidden md:block text-gray-700 dark:text-gray-200">{getDisplayName()}</span>
            </button>
            {showProfile && <><div className="fixed inset-0 z-50" onClick={() => setShowProfile(false)} /><div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-xl z-50">
              <div className="p-3 border-b dark:border-gray-700"><p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{getDisplayName()}</p><p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p></div>
              <button onClick={() => { setActiveTab('profile'); setShowProfile(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">👤 Profile</button>
              <button onClick={handleSettings} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">⚙️ Settings</button>
              <button onClick={() => { alert('❓ Help: support@edupulse.com | 1800-123-4567'); setShowProfile(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">❓ Help</button>
              <div className="border-t dark:border-gray-700" />
              <button onClick={() => { setShowProfile(false); logout(); }} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-b-lg">🚪 Logout</button>
            </div></>}
          </div>
        </div>
      </header>
    </>
  );
};

// Need useEffect import
import { useEffect } from 'react';

export default Header;
