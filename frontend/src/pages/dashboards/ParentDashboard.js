import React, { useState } from 'react';
import StatsCard from '../../components/dashboard/StatsCard';

const ParentDashboard = ({ activeTab }) => {
  const [selectedChild, setSelectedChild] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I can help you with your child\'s academic information. What would you like to know?', time: 'Now' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const parentData = {
    name: 'Rajesh Sharma',
    relation: 'Father',
    children: [
      {
        name: 'Ananya Sharma', roll: '2021CSE045', department: 'CSE', semester: 5,
        attendance: 78, sgpa: 8.2, cgpa: 7.9, photo: 'AS',
        recentMarks: [
          { subject: 'Data Structures', marks: '42/50', grade: 'A' },
          { subject: 'Database Systems', marks: '38/50', grade: 'B+' },
          { subject: 'AI', marks: '44/50', grade: 'A' },
        ],
        attendanceDetails: [
          { subject: 'Data Structures', attendance: 82, required: 75, status: 'good' },
          { subject: 'Database Systems', attendance: 75, required: 75, status: 'borderline' },
          { subject: 'AI', attendance: 68, required: 75, status: 'risk' },
        ],
        fees: [
          { type: 'Tuition Fee', amount: '₹85,000', dueDate: '2026-07-30', status: 'Pending' },
          { type: 'Library Fee', amount: '₹5,000', dueDate: '2026-06-15', status: 'Paid' },
        ],
        leaves: [
          { date: '2026-07-05', reason: 'Fever', days: 1, status: 'Approved' },
          { date: '2026-06-20', reason: 'Family Function', days: 2, status: 'Approved' },
        ],
        alerts: [
          { type: 'danger', text: 'Attendance in AI is below 75%. Need 3 more classes.', icon: '⚠️' },
          { type: 'warning', text: 'Fee payment of ₹85,000 pending for this semester.', icon: '💰' },
        ],
      },
      {
        name: 'Rohan Sharma', roll: '2023CSE012', department: 'CSE', semester: 3,
        attendance: 88, sgpa: 9.1, cgpa: 8.8, photo: 'RS',
        recentMarks: [
          { subject: 'Operating Systems', marks: '46/50', grade: 'A+' },
          { subject: 'Computer Networks', marks: '44/50', grade: 'A' },
        ],
        attendanceDetails: [
          { subject: 'Operating Systems', attendance: 90, required: 75, status: 'good' },
          { subject: 'Computer Networks', attendance: 85, required: 75, status: 'good' },
        ],
        fees: [
          { type: 'Tuition Fee', amount: '₹85,000', dueDate: '2026-08-30', status: 'Paid' },
        ],
        leaves: [],
        alerts: [],
      },
    ],
  };

  const child = parentData.children[selectedChild];
  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";
  const cardClass = "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5";
  const bgClass = "bg-gray-50 dark:bg-gray-700/50";

  const handleChat = () => {
    if (!newMessage.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: newMessage, time: 'Now' };
    setChatMessages([...chatMessages, userMsg]);
    setNewMessage('');
    setTimeout(() => {
      const q = newMessage.toLowerCase();
      let reply = 'I can help with attendance, marks, fees, and leave status for your child.';
      if (q.includes('attendance')) reply = `${child.name}'s attendance is ${child.attendance}%. ${child.attendanceDetails.filter(a=>a.status==='risk').map(a=>a.subject+' needs improvement ('+a.attendance+'%)').join('. ') || 'All subjects are above 75%.'}`;
      else if (q.includes('marks') || q.includes('result')) reply = `${child.name}'s recent marks: ${child.recentMarks.map(m=>m.subject+': '+m.marks+' ('+m.grade+')').join(', ')}.`;
      else if (q.includes('fee')) reply = `${child.fees.map(f=>f.type+': '+f.amount+' - '+f.status).join('. ')}.`;
      else if (q.includes('leave')) reply = child.leaves.length ? child.leaves.map(l=>`${l.reason} (${l.date}, ${l.days} day) - ${l.status}`).join('. ') : `${child.name} has no leave history.`;
      const botMsg = { id: Date.now()+1, sender: 'bot', text: reply, time: 'Now' };
      setChatMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="p-6">
      {/* Child Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {parentData.children.map((c, i) => (
          <button key={i} onClick={() => setSelectedChild(i)} className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition font-medium text-sm ${
            selectedChild === i ? 'bg-blue-600 text-white' : `bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${textClass} hover:bg-gray-50 dark:hover:bg-gray-700`
          }`}>
            <span className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">{c.photo}</span>
            <span>{c.name}</span>
            <span className="text-xs opacity-70">{c.roll}</span>
          </button>
        ))}
      </div>

      {/* Alerts */}
      {child.alerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {child.alerts.map((a, i) => (
            <div key={i} className={`p-3 rounded-lg flex items-center space-x-3 ${a.type === 'danger' ? 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800' : 'bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800'}`}>
              <span className="text-xl">{a.icon}</span>
              <p className={`text-sm font-medium ${a.type === 'danger' ? 'text-red-700 dark:text-red-300' : 'text-yellow-700 dark:text-yellow-300'}`}>{a.text}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <StatsCard title="Attendance" value={`${child.attendance}%`} icon="📋" color={child.attendance >= 75 ? 'green' : 'red'} />
            <StatsCard title="SGPA" value={child.sgpa} icon="📊" color="blue" />
            <StatsCard title="CGPA" value={child.cgpa} icon="🎯" color="purple" />
            <StatsCard title="Semester" value={child.semester} icon="📚" color="teal" />
            <StatsCard title="Fees Status" value={child.fees.some(f => f.status === 'Pending') ? '⚠️ Due' : '✅ Paid'} icon="💰" color={child.fees.some(f => f.status === 'Pending') ? 'red' : 'green'} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Marks */}
            <div className={cardClass}>
              <h3 className={`font-semibold ${textClass} mb-4`}>📝 Recent Marks</h3>
              <div className="space-y-2">
                {child.recentMarks.map((m, i) => (
                  <div key={i} className={`flex justify-between items-center p-3 ${bgClass} rounded-lg`}>
                    <span className={`text-sm ${textClass}`}>{m.subject}</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{m.marks} <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full ml-1">{m.grade}</span></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance Detail */}
            <div className={cardClass}>
              <h3 className={`font-semibold ${textClass} mb-4`}>📋 Subject Attendance</h3>
              <div className="space-y-3">
                {child.attendanceDetails.map((a, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className={textClass}>{a.subject}</span>
                      <span className={`font-bold ${a.status === 'risk' ? 'text-red-600 dark:text-red-400' : a.status === 'borderline' ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}`}>{a.attendance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className={`h-2 rounded-full ${a.status === 'risk' ? 'bg-red-500' : a.status === 'borderline' ? 'bg-yellow-500' : 'bg-green-500'}`} style={{width: `${a.attendance}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'fees' && (
        <div className={cardClass}>
          <h3 className={`font-semibold ${textClass} mb-4`}>💰 Fee History</h3>
          <div className="space-y-3">
            {child.fees.map((f, i) => (
              <div key={i} className={`flex justify-between items-center p-3 ${bgClass} rounded-lg`}>
                <div>
                  <p className={`font-medium text-sm ${textClass}`}>{f.type}</p>
                  <p className={`text-xs ${subtextClass}`}>Due: {f.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${textClass}`}>{f.amount}</p>
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${f.status === 'Paid' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300'}`}>{f.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'leaves' && (
        <div className={cardClass}>
          <h3 className={`font-semibold ${textClass} mb-4`}>🏖️ Leave History</h3>
          {child.leaves.length > 0 ? (
            <div className="space-y-3">
              {child.leaves.map((l, i) => (
                <div key={i} className={`flex justify-between items-center p-3 ${bgClass} rounded-lg`}>
                  <div>
                    <p className={`font-medium text-sm ${textClass}`}>{l.reason}</p>
                    <p className={`text-xs ${subtextClass}`}>{l.date} | {l.days} day(s)</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">{l.status}</span>
                </div>
              ))}
            </div>
          ) : <p className={`text-sm ${subtextClass}`}>No leave history</p>}
        </div>
      )}

      {activeTab === 'chat' && (
        <div className={cardClass}>
          <h3 className={`font-semibold ${textClass} mb-4`}>💬 Parent Assistant</h3>
          <div className={`${bgClass} rounded-lg p-4 h-80 overflow-y-auto mb-4 space-y-3`}>
            {chatMessages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${m.sender === 'user' ? 'bg-blue-600 text-white' : `bg-white dark:bg-gray-700 ${textClass}`}`}>
                  <p>{m.text}</p>
                  <p className={`text-xs mt-1 ${m.sender === 'user' ? 'text-blue-200' : subtextClass}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input type="text" className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500 text-sm" placeholder="Ask about attendance, marks, fees..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleChat()} />
            <button onClick={handleChat} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;
