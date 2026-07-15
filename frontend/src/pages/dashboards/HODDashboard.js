import React from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import AIAnalytics from '../../components/dashboard/AIAnalytics';
import DiscussionForum from '../../components/dashboard/DiscussionForum';

const HODDashboard = ({ activeTab }) => {
  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";
  const cardClass = "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5";

  const deptStats = { strength: 650, faculty: 30, avgAttendance: 82, passPercent: 88 };
  const subjects = [
    { name: 'Data Structures', code: 'CSE301', faculty: 'Dr. Rajesh Kumar', students: 60, passRate: 85 },
    { name: 'Algorithms', code: 'CSE302', faculty: 'Dr. Amit Singh', students: 55, passRate: 78 },
    { name: 'DBMS', code: 'CSE303', faculty: 'Dr. Sunita Patel', students: 60, passRate: 82 },
    { name: 'AI', code: 'CSE401', faculty: 'Dr. Rajesh Kumar', students: 40, passRate: 90 },
  ];

  if (activeTab === 'overview') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>Department Overview - CSE 🏫</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard title="Department Strength" value={deptStats.strength} icon="👨‍🎓" color="blue" />
          <StatsCard title="Faculty Count" value={deptStats.faculty} icon="👨‍🏫" color="green" />
          <StatsCard title="Avg Attendance" value={`${deptStats.avgAttendance}%`} icon="📋" color="purple" />
          <StatsCard title="Pass %" value={`${deptStats.passPercent}%`} icon="📊" color="teal" />
        </div>
        <div className={cardClass}>
          <h3 className={`font-semibold ${textClass} mb-4`}>📚 Subject Overview</h3>
          <div className="space-y-3">
            {subjects.map((s,i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className={`font-medium text-sm ${textClass}`}>{s.name} <span className={subtextClass}>({s.code})</span></p>
                  <p className={`text-xs ${subtextClass}`}>Faculty: {s.faculty} | Students: {s.students}</p>
                </div>
                <span className="font-bold text-green-600 dark:text-green-400">{s.passRate}% pass</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'analytics') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>📈 Department Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>Attendance Trend</h3>
            <div className="space-y-2">
              {['Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'].map((sem,i) => (
                <div key={i} className="flex items-center space-x-3">
                  <span className={`text-sm w-16 ${textClass}`}>{sem}</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: `${75 + i*5}%`}}></div>
                  </div>
                  <span className={`text-sm font-bold ${textClass}`}>{75 + i*5}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>Result Trend</h3>
            <div className="space-y-2">
              {['Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'].map((sem,i) => (
                <div key={i} className="flex items-center space-x-3">
                  <span className={`text-sm w-16 ${textClass}`}>{sem}</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: `${80 + i*3}%`}}></div>
                  </div>
                  <span className={`text-sm font-bold ${textClass}`}>{80 + i*3}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'attendance') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>📋 Department Attendance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((s,i) => (
            <div key={i} className={cardClass}>
              <h3 className={`font-semibold ${textClass} mb-2`}>{s.name} ({s.code})</h3>
              <p className={`text-sm ${subtextClass} mb-2`}>Faculty: {s.faculty}</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: `${70 + Math.random()*20}%`}}></div>
              </div>
              <p className={`text-sm font-medium ${textClass}`}>{(70 + Math.random()*20).toFixed(0)}% average</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'ai-insights') {
    return <div className="p-6"><h2 className={`text-2xl font-bold ${textClass} mb-6`}>🤖 AI Insights</h2><AIAnalytics /></div>;
  }

  if (activeTab === 'forum') {
    return <div className="p-6"><DiscussionForum /></div>;
  }

  if (activeTab === 'reports') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>📊 Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Attendance Report', desc: 'Monthly department attendance', icon: '📋' },
            { title: 'Result Analysis', desc: 'Semester-wise pass percentage', icon: '📊' },
            { title: 'Faculty Workload', desc: 'Teaching hours distribution', icon: '👨‍🏫' },
          ].map((r,i) => (
            <div key={i} className={`${cardClass} hover:shadow-md transition cursor-pointer`}>
              <span className="text-3xl">{r.icon}</span>
              <h3 className={`font-semibold mt-3 ${textClass}`}>{r.title}</h3>
              <p className={`text-sm ${subtextClass} mt-1`}>{r.desc}</p>
              <button className="mt-3 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">Generate →</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div className="p-6 text-center py-12"><span className="text-5xl">🚧</span><p className={`mt-4 ${subtextClass}`}>Coming soon!</p></div>;
};

export default HODDashboard;
