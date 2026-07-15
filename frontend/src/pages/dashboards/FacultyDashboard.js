import React, { useState } from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import { useAuth } from '../../context/AuthContext';

const FacultyDashboard = ({ activeTab }) => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState(null);
  const [announcementText, setAnnouncementText] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  const facultyData = {
    name: 'Dr. Rajesh Kumar', designation: 'Professor & Head', department: 'Computer Science & Engineering',
    experience: '15 years', specialization: 'AI & Machine Learning',
    todayClasses: [
      { time: '9:00 AM', subject: 'Data Structures (CSE301)', room: 'CS-101', students: 60, batch: 'B.Tech 3rd Year' },
      { time: '11:00 AM', subject: 'Algorithms (CSE302)', room: 'CS-201', students: 55, batch: 'B.Tech 3rd Year' },
      { time: '2:00 PM', subject: 'AI Lab (CSE401)', room: 'Lab-3', students: 40, batch: 'B.Tech 4th Year' },
    ],
    subjects: [
      { name: 'Data Structures', code: 'CSE301', students: 60, attendance: 82, semester: 5 },
      { name: 'Design & Analysis of Algorithms', code: 'CSE302', students: 55, attendance: 78, semester: 5 },
      { name: 'Artificial Intelligence Lab', code: 'CSE401', students: 40, attendance: 85, semester: 7 },
    ],
    students: [
      { id: 1, name: 'Ananya Sharma', roll: '2021CSE045', attendance: 78, marks: 42, status: 'good' },
      { id: 2, name: 'Arjun Patel', roll: '2021CSE032', attendance: 65, marks: 28, status: 'risk' },
      { id: 3, name: 'Priya Singh', roll: '2021CSE018', attendance: 88, marks: 46, status: 'good' },
      { id: 4, name: 'Rahul Gupta', roll: '2021CSE055', attendance: 55, marks: 22, status: 'critical' },
      { id: 5, name: 'Neha Reddy', roll: '2021CSE067', attendance: 72, marks: 35, status: 'risk' },
      { id: 6, name: 'Vikram Rao', roll: '2021CSE023', attendance: 91, marks: 48, status: 'excellent' },
      { id: 7, name: 'Divya Iyer', roll: '2021CSE041', attendance: 80, marks: 40, status: 'good' },
      { id: 8, name: 'Suresh Nair', roll: '2021CSE039', attendance: 52, marks: 18, status: 'critical' },
    ],
    assignments: [
      { id: 1, title: 'Binary Trees Implementation', subject: 'CSE301', deadline: '2026-07-20', submitted: 45, total: 60 },
      { id: 2, title: 'Sorting Algorithms Analysis', subject: 'CSE302', deadline: '2026-07-25', submitted: 30, total: 55 },
      { id: 3, title: 'Neural Network Model', subject: 'CSE401', deadline: '2026-07-22', submitted: 35, total: 40 },
    ],
    marks: [
      { exam: 'Mid Term - CSE301', date: '2026-06-15', avg: 38, highest: 48, lowest: 15 },
      { exam: 'Mid Term - CSE302', date: '2026-06-18', avg: 35, highest: 46, lowest: 12 },
      { exam: 'Internal - CSE401', date: '2026-07-02', avg: 40, highest: 49, lowest: 20 },
    ],
    resources: [
      { name: 'Data Structures Lecture 5', type: 'PDF', size: '2.4 MB', date: '2026-07-10' },
      { name: 'Algorithms PPT - Greedy Method', type: 'PPT', size: '5.1 MB', date: '2026-07-08' },
      { name: 'AI Lab Manual', type: 'PDF', size: '8.2 MB', date: '2026-07-01' },
      { name: 'Previous Year Questions', type: 'PDF', size: '1.8 MB', date: '2026-06-25' },
    ],
    announcements: [
      { id: 1, text: 'Mid-term papers will be discussed in next class', date: '2026-07-14', to: 'CSE301' },
      { id: 2, text: 'Assignment deadline extended to July 25', date: '2026-07-12', to: 'All' },
    ],
  };

  const markAttendance = (id) => setSelectedStudents(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const cardClass = "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5";
  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";
  const bgClass = "bg-gray-50 dark:bg-gray-700/50";
  const inputClass = "w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500";
  const statusBadge = (s) => {
    const map = { excellent: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300', good: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300', risk: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300', critical: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' };
    return map[s] || '';
  };

  // OVERVIEW
  if (activeTab === 'overview') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-1`}>Welcome, {facultyData.name.split(' ').slice(0,2).join(' ')}! 👨‍🏫</h2>
        <p className={`${subtextClass} mb-6`}>{facultyData.designation} | {facultyData.department}</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard title="Today's Classes" value={facultyData.todayClasses.length} icon="📚" color="blue" />
          <StatsCard title="Pending Attendance" value="2" icon="📋" color="orange" />
          <StatsCard title="Pending Grading" value="15" icon="📝" color="red" />
          <StatsCard title="Student Queries" value="4" icon="💬" color="purple" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>📚 My Subjects</h3>
            <div className="space-y-3">
              {facultyData.subjects.map((s, i) => (
                <div key={i} className={`flex items-center justify-between p-3 ${bgClass} rounded-lg`}>
                  <div>
                    <p className={`font-medium text-sm ${textClass}`}>{s.name} <span className={subtextClass}>({s.code})</span></p>
                    <p className={`text-xs ${subtextClass}`}>Sem {s.semester} | {s.students} Students</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${s.attendance >= 75 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{s.attendance}%</p>
                    <p className={`text-xs ${subtextClass}`}>Attendance</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>⚠️ Students at Risk</h3>
            <div className="space-y-2">
              {facultyData.students.filter(s => s.status === 'critical' || s.status === 'risk').slice(0,4).map((s, i) => (
                <div key={i} className={`flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg`}>
                  <div>
                    <p className={`font-medium text-sm ${textClass}`}>{s.name}</p>
                    <p className={`text-xs ${subtextClass}`}>{s.roll}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-600 dark:text-red-400 font-bold text-sm">{s.attendance}%</p>
                    <p className={`text-xs ${subtextClass}`}>Marks: {s.marks}/50</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CLASSES
  if (activeTab === 'classes') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>📚 My Classes</h2>
        <div className="space-y-4">
          {facultyData.subjects.map((s, i) => (
            <div key={i} className={cardClass}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`font-bold text-lg ${textClass}`}>{s.name}</h3>
                  <p className={`text-sm ${subtextClass}`}>Code: {s.code} | Semester: {s.semester} | Students: {s.students}</p>
                  <div className="mt-2 w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className={`h-2 rounded-full ${s.attendance >= 75 ? 'bg-green-500' : 'bg-red-500'}`} style={{width: `${s.attendance}%`}}></div>
                  </div>
                  <p className={`text-xs ${subtextClass} mt-1`}>Avg Attendance: {s.attendance}%</p>
                </div>
                <div className="space-x-2">
                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium">Take Attendance</button>
                  <button className="px-3 py-1.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium">View Students</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ATTENDANCE
  if (activeTab === 'attendance') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-2`}>📋 Mark Attendance</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {facultyData.subjects.map((s, i) => (
            <button key={i} onClick={() => { setSelectedClass(s.code); setSelectedStudents([]); }} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selectedClass === s.code ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>{s.code}</button>
          ))}
        </div>
        {selectedClass && (
          <div className={cardClass}>
            <div className="flex justify-between mb-4">
              <h3 className={`font-semibold ${textClass}`}>Date: {new Date().toISOString().split('T')[0]}</h3>
              <button onClick={() => alert(`✅ Attendance saved! ${selectedStudents.length} students marked present.`)} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium">✅ Submit Attendance</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {facultyData.students.map((s, i) => (
                <div key={i} onClick={() => markAttendance(s.id)} className={`p-3 border rounded-lg cursor-pointer flex justify-between items-center transition ${selectedStudents.includes(s.id) ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700' : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                  <div>
                    <p className={`font-medium text-sm ${textClass}`}>{s.name}</p>
                    <p className={`text-xs ${subtextClass}`}>{s.roll}</p>
                  </div>
                  <input type="checkbox" checked={selectedStudents.includes(s.id)} readOnly className="w-4 h-4 accent-green-600" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // STUDENTS
  if (activeTab === 'students') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>👨‍🎓 Students</h2>
        <div className={`${cardClass} overflow-hidden !p-0`}>
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Roll No</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Name</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Attendance</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Marks</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Status</th>
                <th className={`px-4 py-3 text-left text-sm font-medium ${subtextClass}`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {facultyData.students.map((s, i) => (
                <tr key={i} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className={`px-4 py-3 text-sm ${textClass}`}>{s.roll}</td>
                  <td className={`px-4 py-3 text-sm font-medium ${textClass}`}>{s.name}</td>
                  <td className="px-4 py-3 text-sm"><span className={s.attendance >= 75 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>{s.attendance}%</span></td>
                  <td className={`px-4 py-3 text-sm ${textClass}`}>{s.marks}/50</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 text-xs rounded-full font-medium ${statusBadge(s.status)}`}>{s.status}</span></td>
                  <td className="px-4 py-3"><button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // MARKS
  if (activeTab === 'marks') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>📝 Marks & Results</h2>
        <div className="space-y-4">
          {facultyData.marks.map((m, i) => (
            <div key={i} className={cardClass}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className={`font-semibold ${textClass}`}>{m.exam}</h3>
                  <p className={`text-sm ${subtextClass}`}>Date: {m.date}</p>
                </div>
                <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium">Upload Marks</button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className={`text-center p-3 ${bgClass} rounded-lg`}>
                  <p className={`text-xs ${subtextClass}`}>Average</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{m.avg}/50</p>
                </div>
                <div className={`text-center p-3 ${bgClass} rounded-lg`}>
                  <p className={`text-xs ${subtextClass}`}>Highest</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{m.highest}/50</p>
                </div>
                <div className={`text-center p-3 ${bgClass} rounded-lg`}>
                  <p className={`text-xs ${subtextClass}`}>Lowest</p>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">{m.lowest}/50</p>
                </div>
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
          {facultyData.assignments.map((a, i) => (
            <div key={i} className={cardClass}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`font-semibold ${textClass}`}>{a.title}</h3>
                  <p className={`text-sm ${subtextClass}`}>{a.subject} | Deadline: {a.deadline}</p>
                  <div className="mt-2 w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: `${(a.submitted/a.total)*100}%`}}></div>
                  </div>
                  <p className={`text-xs ${subtextClass} mt-1`}>Submitted: {a.submitted}/{a.total} ({(a.submitted/a.total*100).toFixed(0)}%)</p>
                </div>
                <div className="space-x-2">
                  <button className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg font-medium">Evaluate</button>
                  <button className="px-3 py-1.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ANALYTICS
  if (activeTab === 'analytics') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>📈 Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>Subject Performance</h3>
            <div className="space-y-3">
              {facultyData.marks.map((m, i) => (
                <div key={i} className={`flex justify-between items-center p-3 ${bgClass} rounded-lg`}>
                  <p className={`text-sm ${textClass}`}>{m.exam}</p>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{m.avg}/50</span>
                </div>
              ))}
            </div>
          </div>
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>Student Distribution</h3>
            <div className="space-y-3">
              {[{label:'Excellent (45+)', val:'3 students', color:'text-purple-600 dark:text-purple-400'},{label:'Good (35-45)', val:'12 students', color:'text-green-600 dark:text-green-400'},{label:'Average (25-35)', val:'25 students', color:'text-yellow-600 dark:text-yellow-400'},{label:'Poor (<25)', val:'8 students', color:'text-red-600 dark:text-red-400'}].map((d, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className={textClass}>{d.label}</span>
                  <span className={`font-bold ${d.color}`}>{d.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // COMMUNICATION
  if (activeTab === 'communication') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>💬 Communication</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>Send Announcement</h3>
            <select className={`${inputClass} mb-3`}>
              <option>All Subjects</option>
              {facultyData.subjects.map((s,i) => <option key={i}>{s.code} - {s.name}</option>)}
            </select>
            <textarea className={`${inputClass} mb-3`} rows="3" placeholder="Type your announcement..." value={announcementText} onChange={(e) => setAnnouncementText(e.target.value)}></textarea>
            <button onClick={() => { if(announcementText) { alert('📢 Announcement sent!'); setAnnouncementText(''); }}} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium">📢 Send Announcement</button>
          </div>
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass} mb-4`}>Previous Announcements</h3>
            <div className="space-y-3">
              {facultyData.announcements.map((a, i) => (
                <div key={i} className={`p-3 ${bgClass} rounded-lg`}>
                  <p className={`text-sm ${textClass}`}>{a.text}</p>
                  <p className={`text-xs ${subtextClass} mt-1`}>To: {a.to} | {a.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RESOURCES
  if (activeTab === 'resources') {
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>📁 Resources</h2>
        <button className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">+ Upload New</button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {facultyData.resources.map((r, i) => (
            <div key={i} className={`${cardClass} flex justify-between items-center`}>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{r.type === 'PDF' ? '📄' : '📊'}</span>
                <div>
                  <p className={`font-medium text-sm ${textClass}`}>{r.name}</p>
                  <p className={`text-xs ${subtextClass}`}>{r.type} | {r.size} | {r.date}</p>
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
    return (
      <div className="p-6">
        <h2 className={`text-2xl font-bold ${textClass} mb-6`}>🤖 AI Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📝', title: 'Generate Question Paper', desc: 'AI creates exam papers', action: () => alert('Generated Paper:\n\n1. Explain BST (10 marks)\n2. Implement QuickSort (15 marks)\n3. BFS Algorithm (10 marks)\n4. Compare sorting (15 marks)') },
            { icon: '⚠️', title: 'Identify Weak Students', desc: 'Risk detection & alerts', action: () => alert('At-Risk Students:\n\n1. Rahul Gupta - 55% att, 22 marks\n2. Suresh Nair - 52% att, 18 marks\n3. Arjun Patel - 65% att, 28 marks\n\nRecommend: Extra classes + counseling') },
            { icon: '📚', title: 'Revision Suggestions', desc: 'Smart topic recommendations', action: () => alert('Recommended Topics:\n\n1. Tree Traversals (struggling)\n2. Graph Algorithms\n3. Hashing Techniques\n4. Stack Applications') },
          ].map((item, i) => (
            <button key={i} onClick={item.action} className={`${cardClass} text-center hover:shadow-md transition cursor-pointer`}>
              <span className="text-3xl">{item.icon}</span>
              <p className={`font-semibold mt-2 ${textClass}`}>{item.title}</p>
              <p className={`text-xs ${subtextClass} mt-1`}>{item.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return <div className="p-6 text-center py-12"><span className="text-5xl">🚧</span><p className={`mt-4 ${subtextClass}`}>Coming soon!</p></div>;
};

export default FacultyDashboard;
