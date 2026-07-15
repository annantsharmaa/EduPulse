import React, { useState } from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = ({ activeTab }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const adminData = {
    stats: { students: 2450, faculty: 120, departments: 6, attendance: 78, revenue: '₹2.4Cr', placements: 156, activeUsers: 892, pendingFees: '₹18.5L' },
    departments: [
      { name: 'Computer Science & Engineering', code: 'CSE', students: 650, faculty: 30, hod: 'Dr. Rajesh Kumar', attendance: 82 },
      { name: 'Electronics & Communication', code: 'ECE', students: 480, faculty: 25, hod: 'Dr. Sunita Verma', attendance: 78 },
      { name: 'Mechanical Engineering', code: 'ME', students: 400, faculty: 22, hod: 'Dr. Amit Sharma', attendance: 75 },
      { name: 'Electrical Engineering', code: 'EE', students: 350, faculty: 18, hod: 'Dr. Priya Menon', attendance: 80 },
      { name: 'Civil Engineering', code: 'CE', students: 320, faculty: 15, hod: 'Dr. Suresh Iyer', attendance: 72 },
      { name: 'Information Technology', code: 'IT', students: 250, faculty: 10, hod: 'Dr. Neha Gupta', attendance: 85 },
    ],
    users: [
      { name: 'Ananya Sharma', email: 'ananya@edupulse.com', role: 'Student', dept: 'CSE', status: 'Active' },
      { name: 'Dr. Rajesh Kumar', email: 'rajesh.kumar@edupulse.com', role: 'Faculty', dept: 'CSE', status: 'Active' },
      { name: 'Arjun Patel', email: 'arjun@edupulse.com', role: 'Student', dept: 'ECE', status: 'Active' },
      { name: 'Vikram Singh', email: 'vikram@edupulse.com', role: 'Student', dept: 'ME', status: 'Inactive' },
      { name: 'Dr. Sunita Verma', email: 'sunita@edupulse.com', role: 'Faculty', dept: 'ECE', status: 'Active' },
    ],
    fees: [
      { student: 'Ananya Sharma', roll: '2021CSE045', amount: '₹85,000', status: 'Paid', date: '2026-07-01' },
      { student: 'Arjun Patel', roll: '2021ECE032', amount: '₹85,000', status: 'Pending', date: '-' },
      { student: 'Rahul Gupta', roll: '2021CSE055', amount: '₹85,000', status: 'Overdue', date: '-' },
      { student: 'Priya Singh', roll: '2021CSE018', amount: '₹60,000', status: 'Paid', date: '2026-06-28' },
    ],
    placements: [
      { company: 'Google', package: '₹45 LPA', selected: 8, driveDate: '2026-05-15' },
      { company: 'Microsoft', package: '₹38 LPA', selected: 12, driveDate: '2026-04-20' },
      { company: 'Amazon', package: '₹32 LPA', selected: 15, driveDate: '2026-03-10' },
      { company: 'TCS', package: '₹8 LPA', selected: 45, driveDate: '2026-02-15' },
    ],
    auditLogs: [
      { action: 'User Login', user: 'Ananya Sharma', ip: '192.168.1.45', time: '10 min ago' },
      { action: 'Attendance Marked', user: 'Dr. Rajesh Kumar', ip: '192.168.1.20', time: '1 hour ago' },
      { action: 'Fee Payment', user: 'Priya Singh', ip: '192.168.1.88', time: '3 hours ago' },
      { action: 'Result Published', user: 'Admin', ip: '192.168.1.1', time: 'Yesterday' },
    ],
  };

  const cardClass = "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5";
  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";
  const bgClass = "bg-gray-50 dark:bg-gray-700/50";
  const inputClass = "px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500";

  // OVERVIEW
  if (activeTab === 'overview') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>Institution Overview 🏛️</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard title="Total Students" value={adminData.stats.students.toLocaleString()} icon="👨‍🎓" color="blue" trend={8} />
          <StatsCard title="Faculty" value={adminData.stats.faculty} icon="👨‍🏫" color="green" />
          <StatsCard title="Departments" value={adminData.stats.departments} icon="🏫" color="purple" />
          <StatsCard title="Revenue" value={adminData.stats.revenue} icon="💰" color="teal" trend={12} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard title="Today's Attendance" value={`${adminData.stats.attendance}%`} icon="📋" color="orange" />
          <StatsCard title="Placements" value={adminData.stats.placements} icon="💼" color="blue" trend={15} />
          <StatsCard title="Active Users" value={adminData.stats.activeUsers} icon="👥" color="green" />
          <StatsCard title="Pending Fees" value={adminData.stats.pendingFees} icon="💸" color="red" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>📊 Department Overview</h3>
            <div className="space-y-3">
              {adminData.departments.map((d, i) => (
                <div key={i} className={`flex justify-between items-center p-3 ${bgClass} rounded-lg`}>
                  <div>
                    <p className={`font-medium text-sm ${textClass}`}>{d.name}</p>
                    <p className={`text-xs ${subtextClass}`}>HOD: {d.hod}</p>
                  </div>
                  <span className={`font-bold ${d.attendance >= 75 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{d.attendance}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>🔍 Audit Logs</h3>
            <div className="space-y-3">
              {adminData.auditLogs.map((log, i) => (
                <div key={i} className={`p-3 ${bgClass} rounded-lg text-sm flex justify-between`}>
                  <div>
                    <p className={`font-medium ${textClass}`}>{log.action}</p>
                    <p className={`text-xs ${subtextClass}`}>{log.user} | IP: {log.ip}</p>
                  </div>
                  <span className={`text-xs ${subtextClass}`}>{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // USERS
  if (activeTab === 'users') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>👥 User Management</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <input type="text" placeholder="Search users..." className={`${inputClass} w-64`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">+ Add User</button>
        </div>
        <div className={`${cardClass} overflow-hidden !p-0`}>
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Name</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Email</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Role</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Dept</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Status</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminData.users.map((u, i) => (
                <tr key={i} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className={`px-4 py-3 text-sm font-medium ${textClass}`}>{u.name}</td>
                  <td className={`px-4 py-3 text-sm ${textClass}`}>{u.email}</td>
                  <td className={`px-4 py-3 text-sm ${textClass}`}>{u.role}</td>
                  <td className={`px-4 py-3 text-sm ${textClass}`}>{u.dept}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 text-xs rounded-full font-medium ${u.status === 'Active' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'}`}>{u.status}</span></td>
                  <td className="px-4 py-3 text-sm space-x-2">
                    <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Edit</button>
                    <button className="text-red-600 dark:text-red-400 font-medium hover:underline">Suspend</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // DEPARTMENTS
  if (activeTab === 'departments') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>🏫 Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminData.departments.map((d, i) => (
            <div key={i} className={cardClass}>
              <h3 className={`font-bold text-lg ${textClass}`}>{d.name}</h3>
              <p className={`text-sm ${subtextClass} mt-1`}>Code: {d.code}</p>
              <div className="mt-3 space-y-2 text-sm">
                <p className={textClass}>👨‍🎓 Students: <span className="font-medium">{d.students}</span></p>
                <p className={textClass}>👨‍🏫 Faculty: <span className="font-medium">{d.faculty}</span></p>
                <p className={textClass}>📋 Attendance: <span className={`font-medium ${d.attendance >= 75 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{d.attendance}%</span></p>
                <p className={textClass}>👤 HOD: <span className="font-medium">{d.hod}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // FEES
  if (activeTab === 'fees') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>💰 Fee Management</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[{label:'Total Collected', val:'₹1.8Cr', color:'text-green-600 dark:text-green-400'},{label:'Pending', val:'₹18.5L', color:'text-yellow-600 dark:text-yellow-400'},{label:'Overdue', val:'₹5.2L', color:'text-red-600 dark:text-red-400'},{label:'Scholarships', val:'₹12L', color:'text-blue-600 dark:text-blue-400'}].map((s, i) => (
            <div key={i} className={`${cardClass} text-center`}>
              <p className={`text-sm ${subtextClass}`}>{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
            </div>
          ))}
        </div>
        <div className={`${cardClass} overflow-hidden !p-0`}>
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Student</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Roll</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Amount</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Status</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Date</th>
              </tr>
            </thead>
            <tbody>
              {adminData.fees.map((f, i) => (
                <tr key={i} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className={`px-4 py-3 text-sm font-medium ${textClass}`}>{f.student}</td>
                  <td className={`px-4 py-3 text-sm ${textClass}`}>{f.roll}</td>
                  <td className={`px-4 py-3 text-sm ${textClass}`}>{f.amount}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 text-xs rounded-full font-medium ${f.status === 'Paid' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' : f.status === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300' : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'}`}>{f.status}</span></td>
                  <td className={`px-4 py-3 text-sm ${textClass}`}>{f.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // PLACEMENT
  if (activeTab === 'placement') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>💼 Placements</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[{label:'Companies', val:'48', color:'text-blue-600 dark:text-blue-400'},{label:'Offers', val:'156', color:'text-green-600 dark:text-green-400'},{label:'Highest', val:'₹45 LPA', color:'text-purple-600 dark:text-purple-400'},{label:'Average', val:'₹12 LPA', color:'text-teal-600 dark:text-teal-400'}].map((s, i) => (
            <div key={i} className={`${cardClass} text-center`}>
              <p className={`text-sm ${subtextClass}`}>{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
            </div>
          ))}
        </div>
        <div className={`${cardClass} overflow-hidden !p-0`}>
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Company</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Package</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Selected</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Drive Date</th>
              </tr>
            </thead>
            <tbody>
              {adminData.placements.map((p, i) => (
                <tr key={i} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className={`px-4 py-3 text-sm font-medium ${textClass}`}>{p.company}</td>
                  <td className={`px-4 py-3 text-sm font-bold text-green-600 dark:text-green-400`}>{p.package}</td>
                  <td className={`px-4 py-3 text-sm ${textClass}`}>{p.selected} students</td>
                  <td className={`px-4 py-3 text-sm ${textClass}`}>{p.driveDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // REPORTS
  if (activeTab === 'reports') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>📈 Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Attendance Report', desc: 'Department-wise monthly attendance', icon: '📋' },
            { title: 'Performance Report', desc: 'Semester-wise results analysis', icon: '📊' },
            { title: 'Fee Collection Report', desc: 'Paid vs pending fee status', icon: '💰' },
            { title: 'Placement Report', desc: 'Company-wise placement data', icon: '💼' },
            { title: 'Faculty Workload', desc: 'Subject allocation and hours', icon: '👨‍🏫' },
            { title: 'Student Risk Report', desc: 'At-risk students identification', icon: '⚠️' },
          ].map((r, i) => (
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

  // SECURITY
  if (activeTab === 'security') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>🔒 Security & Audit</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>Recent Activity</h3>
            <div className="space-y-3">
              {adminData.auditLogs.map((log, i) => (
                <div key={i} className={`p-3 ${bgClass} rounded-lg text-sm flex justify-between`}>
                  <div>
                    <p className={`font-medium ${textClass}`}>{log.action}</p>
                    <p className={`text-xs ${subtextClass}`}>User: {log.user} | IP: {log.ip}</p>
                  </div>
                  <span className={`text-xs ${subtextClass}`}>{log.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>Security Settings</h3>
            <div className="space-y-3">
              {[
                { icon: '🔑', label: 'Change Admin Password', color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
                { icon: '📋', label: 'View All Audit Logs', color: 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' },
                { icon: '💾', label: 'Backup Database', color: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
                { icon: '🔄', label: 'Restore Backup', color: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
              ].map((btn, i) => (
                <button key={i} className={`w-full p-3 ${btn.color} rounded-lg text-sm font-medium hover:opacity-80 transition`}>{btn.icon} {btn.label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STUDENTS / FACULTY / NOTIFICATIONS / EXAMINATION / ATTENDANCE (Admin)
  return (
    <div className="p-6">
      <h2 className={`text-2xl font-bold ${textClass} mb-6 capitalize`}>{activeTab}</h2>
      <div className={`${cardClass} text-center py-12`}>
        <span className="text-5xl">🚧</span>
        <p className={`mt-4 ${subtextClass}`}>Full {activeTab} module coming soon!</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
