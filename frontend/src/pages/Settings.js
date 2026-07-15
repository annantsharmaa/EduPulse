import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    language: 'English',
    timezone: 'IST (UTC+5:30)',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });
  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";
  const cardClass = "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5";

  return (
    <div className="p-6 max-w-2xl">
      <h2 className={`text-2xl font-bold ${textClass} mb-6`}>⚙️ Settings</h2>
      
      <div className="space-y-6">
        <div className={cardClass}>
          <h3 className={`font-semibold ${textClass} mb-4`}>👤 Profile</h3>
          <div className="space-y-3">
            <input className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" placeholder="Full Name" defaultValue="Ananya Sharma" />
            <input className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" placeholder="Email" defaultValue="student@edupulse.com" />
            <input className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" placeholder="Phone" defaultValue="+91 9876543210" />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Save Changes</button>
          </div>
        </div>

        <div className={cardClass}>
          <h3 className={`font-semibold ${textClass} mb-4`}>🎨 Appearance</h3>
          <div className="flex justify-between items-center">
            <span className={textClass}>Dark Mode</span>
            <button onClick={toggleDarkMode} className={`w-11 h-6 rounded-full transition ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
              <span className={`block w-5 h-5 rounded-full bg-white shadow transform transition ${darkMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>

        <div className={cardClass}>
          <h3 className={`font-semibold ${textClass} mb-4`}>🌐 Preferences</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center"><span className={textClass}>Language</span><select className="px-3 py-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm"><option>English</option><option>हिंदी</option><option>ಕನ್ನಡ</option></select></div>
            <div className="flex justify-between items-center"><span className={textClass}>Timezone</span><select className="px-3 py-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm"><option>IST (UTC+5:30)</option><option>EST (UTC-5)</option></select></div>
          </div>
        </div>

        <div className={cardClass}>
          <h3 className={`font-semibold ${textClass} mb-4`}>🔔 Notifications</h3>
          {[
            { label: 'Email Notifications', key: 'emailNotifications' },
            { label: 'SMS Alerts', key: 'smsNotifications' },
            { label: 'Push Notifications', key: 'pushNotifications' },
          ].map(item => (
            <div key={item.key} className="flex justify-between items-center py-2">
              <span className={textClass}>{item.label}</span>
              <button onClick={() => setSettings({...settings, [item.key]: !settings[item.key]})} className={`w-11 h-6 rounded-full transition ${settings[item.key] ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <span className={`block w-5 h-5 rounded-full bg-white shadow transform transition ${settings[item.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>

        <div className={cardClass}>
          <h3 className={`font-semibold ${textClass} mb-4`}>🔒 Security</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100">🔑 Change Password</button>
            <button className="w-full text-left px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100">📱 Two-Factor Authentication</button>
            <button className="w-full text-left px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100">💻 Active Sessions</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
