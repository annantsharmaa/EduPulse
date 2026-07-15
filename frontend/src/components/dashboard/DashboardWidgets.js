import React from 'react';

const DashboardWidgets = ({ role }) => {
  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";
  const cardClass = "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4";

  const widgets = {
    STUDENT: [
      { title: '📋 Attendance Today', content: 'Present: Data Structures, DBMS | Absent: AI Lab', color: 'border-l-4 border-l-green-500' },
      { title: '📄 Pending Assignments', content: '3 pending: Binary Trees (due Jul 20), Neural Network (Jul 22), OS Scheduling (Jul 25)', color: 'border-l-4 border-l-yellow-500' },
      { title: '📝 Upcoming Exams', content: 'End Sem: Data Structures (Aug 5), DBMS (Aug 8), AI (Aug 12)', color: 'border-l-4 border-l-red-500' },
      { title: '🧠 AI Health Score', content: 'Current: 72/100 | Based on attendance (78%), SGPA (8.2), submissions', color: 'border-l-4 border-l-blue-500' },
    ],
    FACULTY: [
      { title: '📋 Today\'s Classes', content: '9AM Data Structures (CS-101), 11AM Algorithms (CS-201), 2PM AI Lab (Lab-3)', color: 'border-l-4 border-l-blue-500' },
      { title: '⚠️ Students at Risk', content: '3 students below 65%: Rahul Gupta, Suresh Nair, Arjun Patel', color: 'border-l-4 border-l-red-500' },
      { title: '📄 Pending Grading', content: '15 assignments need evaluation', color: 'border-l-4 border-l-yellow-500' },
      { title: '📢 Announcements', content: 'Mid-term papers discussion next class', color: 'border-l-4 border-l-green-500' },
    ],
    ADMIN: [
      { title: '📊 Institution Stats', content: '2450 students, 120 faculty, 6 departments, ₹2.4Cr revenue', color: 'border-l-4 border-l-blue-500' },
      { title: '💰 Fee Collection', content: '₹1.8Cr collected, ₹18.5L pending, ₹5.2L overdue', color: 'border-l-4 border-l-green-500' },
      { title: '💼 Placement Stats', content: '48 companies, 156 offers, Highest: ₹45 LPA, Avg: ₹12 LPA', color: 'border-l-4 border-l-purple-500' },
      { title: '🔍 Recent Activity', content: '5 new students enrolled, 2 faculty joined, results published', color: 'border-l-4 border-l-orange-500' },
    ],
  };

  const roleWidgets = widgets[role] || widgets.STUDENT;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {roleWidgets.map((w, i) => (
        <div key={i} className={`${cardClass} ${w.color}`}>
          <h4 className={`font-semibold text-sm mb-2 ${textClass}`}>{w.title}</h4>
          <p className={`text-xs ${subtextClass}`}>{w.content}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardWidgets;
