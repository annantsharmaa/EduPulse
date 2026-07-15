import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useModules } from '../../context/ModuleContext';

const menuItems = {
  ADMIN: [
    { icon: '📊', label: 'Overview', id: 'overview' },
    { icon: '👥', label: 'Users', id: 'users' },
    { icon: '🏫', label: 'Departments', id: 'departments' },
    { icon: '💰', label: 'Fees', id: 'fees', module: 'fees' },
    { icon: '💼', label: 'Placement', id: 'placement', module: 'placement' },
    { icon: '🤖', label: 'AI Insights', id: 'ai-insights', module: 'ai' },
    { icon: '💬', label: 'Forum', id: 'forum', module: 'forum' },
    { icon: '📈', label: 'Reports', id: 'reports' },
    { icon: '📜', label: 'Activity Log', id: 'activity-log' },
    { icon: '🧩', label: 'Modules', id: 'modules' },
    { icon: '🔒', label: 'Security', id: 'security' },
  ],
  FACULTY: [
    { icon: '📊', label: 'Overview', id: 'overview' },
    { icon: '📚', label: 'My Classes', id: 'classes' },
    { icon: '📋', label: 'Attendance', id: 'attendance', module: 'attendance' },
    { icon: '👨‍🎓', label: 'Students', id: 'students' },
    { icon: '📝', label: 'Marks', id: 'marks', module: 'examination' },
    { icon: '📄', label: 'Assignments', id: 'assignments', module: 'assignments' },
    { icon: '📈', label: 'Analytics', id: 'analytics' },
    { icon: '💬', label: 'Communication', id: 'communication' },
    { icon: '📁', label: 'Resources', id: 'resources' },
    { icon: '🤖', label: 'AI Tools', id: 'ai', module: 'ai' },
    { icon: '💬', label: 'Forum', id: 'forum', module: 'forum' },
  ],
  STUDENT: [
    { icon: '📊', label: 'Overview', id: 'overview' },
    { icon: '📋', label: 'Attendance', id: 'attendance', module: 'attendance' },
    { icon: '📅', label: 'Timetable', id: 'timetable' },
    { icon: '📄', label: 'Assignments', id: 'assignments', module: 'assignments' },
    { icon: '📝', label: 'Exams', id: 'exams', module: 'examination' },
    { icon: '🔔', label: 'Notifications', id: 'notifications' },
    { icon: '🏖️', label: 'Leave', id: 'leave', module: 'leaves' },
    { icon: '📁', label: 'Documents', id: 'documents' },
    { icon: '💬', label: 'Forum', id: 'forum', module: 'forum' },
    { icon: '🤖', label: 'AI Assistant', id: 'ai', module: 'ai' },
    { icon: '👤', label: 'Profile', id: 'profile' },
  ],
  PARENT: [
    { icon: '📊', label: 'Overview', id: 'overview' },
    { icon: '💰', label: 'Fees', id: 'fees', module: 'fees' },
    { icon: '🏖️', label: 'Leave History', id: 'leaves', module: 'leaves' },
    { icon: '📋', label: 'Attendance', id: 'attendance', module: 'attendance' },
    { icon: '💬', label: 'Chat Assistant', id: 'chat' },
  ],
  HOD: [
    { icon: '📊', label: 'Overview', id: 'overview' },
    { icon: '📈', label: 'Analytics', id: 'analytics' },
    { icon: '📋', label: 'Attendance', id: 'attendance', module: 'attendance' },
    { icon: '🤖', label: 'AI Insights', id: 'ai-insights', module: 'ai' },
    { icon: '💬', label: 'Forum', id: 'forum', module: 'forum' },
    { icon: '📊', label: 'Reports', id: 'reports' },
  ],
};

const Sidebar = ({ activeTab, setActiveTab, collapsed }) => {
  const { user } = useAuth();
  const { isModuleEnabled } = useModules();
  const items = (menuItems[user?.role] || menuItems.STUDENT).filter(item => !item.module || isModuleEnabled(item.module));

  return (
    <div className={`bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-screen overflow-y-auto transition-all duration-300 flex-shrink-0 ${collapsed ? 'w-16' : 'w-60'}`}>
      <div className="p-4 border-b dark:border-gray-700 flex items-center justify-center">
        <h1 className={`font-bold text-blue-600 dark:text-blue-400 ${collapsed ? 'text-lg' : 'text-xl'}`}>{collapsed ? '🎓' : '🎓 EduPulse'}</h1>
      </div>
      <nav className="p-2">
        {items.map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-1 transition text-sm ${
              activeTab === item.id ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            } ${collapsed ? 'justify-center' : ''}`} title={collapsed ? item.label : ''}>
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
