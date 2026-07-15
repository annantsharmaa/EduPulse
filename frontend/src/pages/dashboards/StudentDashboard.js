import React, { useState } from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = ({ activeTab }) => {
  const { user } = useAuth();
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveDates, setLeaveDates] = useState({ start: '', end: '' });
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Assignment deadline: Data Structures in 2 days', type: 'warning', time: '2h ago', read: false },
    { id: 2, text: 'Attendance below 75% in AI - attend next 5 classes', type: 'alert', time: '1d ago', read: false },
    { id: 3, text: 'End Semester exam schedule published', type: 'info', time: '2d ago', read: true },
    { id: 4, text: 'Fee payment receipt generated', type: 'success', time: '3d ago', read: true },
  ]);

  const studentData = {
    name: 'Ananya Sharma', roll: '2021CSE045', department: 'Computer Science & Engineering',
    semester: 5, batch: '2021-2025', attendance: 78, sgpa: 8.2, cgpa: 7.9, credits: 22,
    rank: '15/120', aiHealthScore: 72, profileCompletion: 85,
    todaysClasses: [
      { time: '9:00 AM', subject: 'Data Structures', room: 'CS-101', faculty: 'Dr. Rajesh Kumar' },
      { time: '11:00 AM', subject: 'Database Systems', room: 'CS-201', faculty: 'Dr. Sunita Patel' },
      { time: '2:00 PM', subject: 'AI Lab', room: 'Lab-3', faculty: 'Dr. Amit Singh' },
    ],
    weeklyTimetable: [
      { day: 'Monday', classes: ['Data Structures (9AM)', 'DBMS (11AM)', 'AI Lab (2PM)'] },
      { day: 'Tuesday', classes: ['Maths (9AM)', 'OS (11AM)', 'Soft Skills (2PM)'] },
      { day: 'Wednesday', classes: ['Data Structures Lab (9AM)', 'DBMS Lab (11AM)', 'Free'] },
      { day: 'Thursday', classes: ['AI (9AM)', 'Maths (11AM)', 'OS Lab (2PM)'] },
      { day: 'Friday', classes: ['DBMS (9AM)', 'AI (11AM)', 'Sports (2PM)'] },
    ],
    assignments: [
      { subject: 'Data Structures', title: 'Binary Trees Implementation', deadline: '2026-07-20', status: 'pending', marks: 30 },
      { subject: 'Database Systems', title: 'SQL Query Optimization', deadline: '2026-07-18', status: 'submitted', marks: 25 },
      { subject: 'AI', title: 'Neural Network Model', deadline: '2026-07-22', status: 'late', marks: 40 },
      { subject: 'OS', title: 'Process Scheduling Algorithm', deadline: '2026-07-25', status: 'pending', marks: 20 },
    ],
    subjectAttendance: [
      { subject: 'Data Structures', code: 'CSE301', percentage: 82, classes: 45, present: 37, required: 34 },
      { subject: 'Database Systems', code: 'CSE302', percentage: 75, classes: 40, present: 30, required: 30 },
      { subject: 'AI', code: 'CSE401', percentage: 68, classes: 35, present: 24, required: 27 },
      { subject: 'Mathematics', code: 'MATH201', percentage: 85, classes: 38, present: 32, required: 29 },
      { subject: 'Operating Systems', code: 'CSE303', percentage: 90, classes: 30, present: 27, required: 23 },
    ],
    exams: [
      { subject: 'Data Structures', type: 'Mid Term', date: '2026-06-15', marks: '42/50', grade: 'A' },
      { subject: 'Database Systems', type: 'Mid Term', date: '2026-06-18', marks: '38/50', grade: 'B+' },
      { subject: 'AI', type: 'Internal', date: '2026-07-02', marks: '44/50', grade: 'A' },
    ],
    leaveHistory: [
      { date: '2026-07-05', reason: 'Fever', status: 'Approved', days: 1 },
      { date: '2026-06-20', reason: 'Family function', status: 'Approved', days: 2 },
    ],
    documents: [
      { name: 'Aadhaar Card', type: 'PDF', size: '245 KB' },
      { name: 'Bonafide Certificate', type: 'PDF', size: '180 KB' },
      { name: 'Mark Sheet Sem 4', type: 'PDF', size: '320 KB' },
      { name: 'Fee Receipt 2026', type: 'PDF', size: '150 KB' },
    ],
  };

  const markRead = (id) => setNotifications(notifications.map(n => n.id === id ? {...n, read: true} : n));

  const cardClass = "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5";
  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";
  const bgClass = "bg-gray-50 dark:bg-gray-700/50";

  // OVERVIEW
  if (activeTab === 'overview') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-1`}>Welcome back, {studentData.name.split(' ')[0]}! 👋</h2>
        <p className={`${subtextClass} mb-6`}>{studentData.roll} | {studentData.department} | Semester {studentData.semester}</p>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">AI Academic Health Score</p>
              <p className="text-sm text-blue-100">Based on attendance, marks, and assignments</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold">{studentData.aiHealthScore}</span>
              </div>
              <p className="text-xs mt-1 text-blue-100">out of 100</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <StatsCard title="Attendance" value={`${studentData.attendance}%`} icon="📋" color={studentData.attendance >= 75 ? 'green' : 'red'} trend={2} />
          <StatsCard title="SGPA" value={studentData.sgpa} icon="📊" color="blue" trend={0.3} />
          <StatsCard title="CGPA" value={studentData.cgpa} icon="🎯" color="purple" trend={0.1} />
          <StatsCard title="Credits" value={studentData.credits} icon="⭐" color="teal" />
          <StatsCard title="Rank" value={studentData.rank} icon="🏆" color="orange" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>📅 Today's Schedule</h3>
            <div className="space-y-3">
              {studentData.todaysClasses.map((cls, idx) => (
                <div key={idx} className={`flex items-center space-x-4 p-3 ${bgClass} rounded-lg`}>
                  <div className="w-16 text-center">
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{cls.time.split(' ')[0]}</p>
                    <p className={`text-xs ${subtextClass}`}>{cls.time.split(' ')[1]}</p>
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${textClass}`}>{cls.subject}</p>
                    <p className={`text-xs ${subtextClass}`}>Room: {cls.room} | {cls.faculty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>📄 Assignments Due</h3>
            <div className="space-y-3">
              {studentData.assignments.slice(0,3).map((a, idx) => (
                <div key={idx} className={`flex items-center justify-between p-3 ${bgClass} rounded-lg`}>
                  <div>
                    <p className={`font-medium text-sm ${textClass}`}>{a.title}</p>
                    <p className={`text-xs ${subtextClass}`}>{a.subject} | Due: {a.deadline}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    a.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300' :
                    a.status === 'submitted' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
                  }`}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ATTENDANCE
  if (activeTab === 'attendance') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-2`}>📋 Attendance</h2>
        <p className={`${subtextClass} mb-6`}>Overall: {studentData.attendance}% | Required: 75%</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6">
          <div className={`h-4 rounded-full ${studentData.attendance >= 75 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${studentData.attendance}%` }}></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {studentData.subjectAttendance.map((s, idx) => (
            <div key={idx} className={cardClass}>
              <div className="flex justify-between mb-2">
                <h4 className={`font-medium ${textClass}`}>{s.subject} <span className={`text-xs ${subtextClass}`}>({s.code})</span></h4>
                <span className={`font-bold ${s.percentage >= 75 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{s.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div className={`h-2 rounded-full ${s.percentage >= 75 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${s.percentage}%` }}></div>
              </div>
              <p className={`text-xs ${subtextClass}`}>Present: {s.present}/{s.classes} | Need {Math.max(0, s.required - s.present)} more to reach 75%</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // TIMETABLE
  if (activeTab === 'timetable') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>📅 Weekly Timetable</h2>
        <div className="space-y-3">
          {studentData.weeklyTimetable.map((day, idx) => (
            <div key={idx} className={cardClass}>
              <h3 className={`font-semibold ${textClass} mb-2`}>{day.day}</h3>
              <div className="flex flex-wrap gap-2">
                {day.classes.map((c, i) => (
                  <span key={i} className={`px-3 py-1 rounded-full text-sm font-medium ${
                    c === 'Free' ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400' : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                  }`}>{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ASSIGNMENTS
  if (activeTab === 'assignments') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>📄 Assignments</h2>
        <div className="space-y-4">
          {studentData.assignments.map((a, idx) => (
            <div key={idx} className={`${cardClass} flex justify-between items-center`}>
              <div>
                <p className={`font-medium ${textClass}`}>{a.title}</p>
                <p className={`text-sm ${subtextClass}`}>{a.subject} | Marks: {a.marks} | Deadline: {a.deadline}</p>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                a.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300' :
                a.status === 'submitted' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
              }`}>{a.status}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // EXAMS
  if (activeTab === 'exams') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>📝 Examinations</h2>
        <div className={`${cardClass} overflow-hidden !p-0`}>
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Subject</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Exam</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Date</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Marks</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {studentData.exams.map((e, idx) => (
                <tr key={idx} className="border-t border-gray-100 dark:border-gray-700">
                  <td className={`px-4 py-3 text-sm ${textClass}`}>{e.subject}</td>
                  <td className={`px-4 py-3 text-sm ${textClass}`}>{e.type}</td>
                  <td className={`px-4 py-3 text-sm ${textClass}`}>{e.date}</td>
                  <td className={`px-4 py-3 text-sm font-medium ${textClass}`}>{e.marks}</td>
                  <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full font-medium">{e.grade}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // NOTIFICATIONS
  if (activeTab === 'notifications') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>🔔 Notifications</h2>
        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className={`p-4 rounded-xl border cursor-pointer transition ${
              n.read ? `${cardClass}` : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
            }`} onClick={() => markRead(n.id)}>
              <div className="flex justify-between items-start">
                <p className={`text-sm font-medium ${textClass}`}>{n.text}</p>
                <span className={`text-xs ${subtextClass} ml-2 flex-shrink-0`}>{n.time}</span>
              </div>
              <div className="flex items-center mt-1 space-x-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  n.type === 'alert' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' :
                  n.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300' :
                  n.type === 'success' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                }`}>{n.type}</span>
                {!n.read && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // LEAVE
  if (activeTab === 'leave') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>🏖️ Leave Management</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>Apply Leave</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert('Leave application submitted!'); setLeaveReason(''); setLeaveDates({ start: '', end: '' }); }} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textClass} mb-1`}>Start Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500" value={leaveDates.start} onChange={(e) => setLeaveDates({...leaveDates, start: e.target.value})} required />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textClass} mb-1`}>End Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500" value={leaveDates.end} onChange={(e) => setLeaveDates({...leaveDates, end: e.target.value})} required />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textClass} mb-1`}>Reason</label>
                <textarea className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500" rows="3" value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} required></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition">Submit Application</button>
            </form>
          </div>
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>Leave History</h3>
            <div className="space-y-3">
              {studentData.leaveHistory.map((l, idx) => (
                <div key={idx} className={`flex justify-between items-center p-3 ${bgClass} rounded-lg`}>
                  <div>
                    <p className={`text-sm font-medium ${textClass}`}>{l.reason}</p>
                    <p className={`text-xs ${subtextClass}`}>{l.date} | {l.days} day(s)</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">{l.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DOCUMENTS
  if (activeTab === 'documents') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>📁 Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studentData.documents.map((doc, idx) => (
            <div key={idx} className={`${cardClass} flex justify-between items-center`}>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📄</span>
                <div>
                  <p className={`font-medium text-sm ${textClass}`}>{doc.name}</p>
                  <p className={`text-xs ${subtextClass}`}>{doc.type} | {doc.size}</p>
                </div>
              </div>
              <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">Download</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // AI
  if (activeTab === 'ai') {
    const handleAiQuery = () => {
      const q = aiQuery.toLowerCase();
      let r = 'I can help with attendance, study plans, SGPA, and more!';
      if (q.includes('attendance')) r = `Your overall attendance is ${studentData.attendance}%. You need more classes in AI to reach 75%.`;
      else if (q.includes('class')) r = 'You can miss 2 more classes in Data Structures and still be above 75%.';
      else if (q.includes('study') || q.includes('plan')) r = 'Focus on AI and DBMS. Suggested: 2 hours daily on AI, 1 hour on DBMS.';
      else if (q.includes('sgpa')) r = `Current SGPA: ${studentData.sgpa}. To reach 9.0, score A grade in remaining subjects.`;
      setAiResponse(r);
    };
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>🤖 AI Assistant</h2>
        <div className={`${cardClass} max-w-2xl`}>
          <div className="flex space-x-2 mb-4">
            <input type="text" className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500" placeholder="Ask about attendance, study plans..." value={aiQuery} onChange={(e) => setAiQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAiQuery()} />
            <button onClick={handleAiQuery} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">Ask</button>
          </div>
          {aiResponse && <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><p className={`text-sm ${textClass}`}>{aiResponse}</p></div>}
          <div className="mt-4">
            <p className={`text-sm ${subtextClass} mb-2`}>Suggested:</p>
            <div className="flex flex-wrap gap-2">
              {['How is my attendance?', 'How many classes can I miss?', 'Generate a study plan', 'How to improve SGPA?'].map((q, i) => (
                <button key={i} onClick={() => { setAiQuery(q); }} className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 font-medium">{q}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PROFILE
  if (activeTab === 'profile') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>👤 Profile</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`${cardClass} text-center`}>
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
              {studentData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className={`font-bold text-lg ${textClass}`}>{studentData.name}</h3>
            <p className={`text-sm ${subtextClass}`}>{studentData.roll}</p>
            <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${studentData.profileCompletion}%` }}></div>
            </div>
            <p className={`text-xs ${subtextClass} mt-1`}>{studentData.profileCompletion}% complete</p>
          </div>
          <div className={`lg:col-span-2 ${cardClass}`}>
            <h3 className={`font-semibold ${textClass} mb-4`}>Personal Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Full Name', studentData.name], ['Roll Number', studentData.roll], ['Department', studentData.department],
                ['Semester', studentData.semester], ['Batch', studentData.batch], ['Email', user?.email || 'ananya@edupulse.com'],
                ['Phone', '+91 9876543210'], ['Location', 'Bengaluru, Karnataka']
              ].map(([label, value], i) => (
                <div key={i}>
                  <span className={subtextClass}>{label}:</span> <span className={`font-medium ${textClass}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="p-6 text-center py-12"><span className="text-5xl">🚧</span><p className={`mt-4 ${subtextClass}`}>Coming soon!</p></div>;
};

export default StudentDashboard;
