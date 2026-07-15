import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import StudentDashboard from './dashboards/StudentDashboard';
import FacultyDashboard from './dashboards/FacultyDashboard';
import HODDashboard from './dashboards/HODDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import ParentDashboard from './dashboards/ParentDashboard';
import DashboardWidgets from '../components/dashboard/DashboardWidgets';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import AIAnalytics from '../components/dashboard/AIAnalytics';
import DiscussionForum from '../components/dashboard/DiscussionForum';
import ActivityLogViewer from '../components/dashboard/ActivityLogViewer';
import ModuleManager from '../components/dashboard/ModuleManager';
import { useAuth } from '../context/AuthContext';
import { useModules } from '../context/ModuleContext';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const { isModuleEnabled } = useModules();

  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";

  const renderContent = () => {
    // Special pages
    if (activeTab === 'forum' && isModuleEnabled('forum')) return <div className="p-6"><DiscussionForum /></div>;
    if (activeTab === 'ai-insights' && isModuleEnabled('ai')) return <div className="p-6"><AIAnalytics /></div>;
    if (activeTab === 'activity-log') return <div className="p-6"><h2 className={`text-2xl font-bold ${textClass} mb-6`}>📜 Activity Log</h2><ActivityLogViewer /></div>;
    if (activeTab === 'modules') return <div className="p-6"><h2 className={`text-2xl font-bold ${textClass} mb-6`}>🧩 Module Management</h2><ModuleManager /></div>;

    // Role-based dashboards
    switch (user?.role) {
      case 'ADMIN': return <AdminDashboard activeTab={activeTab} />;
      case 'FACULTY': return <FacultyDashboard activeTab={activeTab} />;
      case 'HOD': return <HODDashboard activeTab={activeTab} />;
      case 'PARENT': return <ParentDashboard activeTab={activeTab} />;
      default: return <StudentDashboard activeTab={activeTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} collapsed={collapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          {activeTab === 'overview' && user && (
            <div className="p-6">
              <DashboardWidgets role={user.role} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {renderContent()}
                </div>
                <div>
                  <CalendarWidget />
                </div>
              </div>
            </div>
          )}
          {activeTab !== 'overview' && renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
