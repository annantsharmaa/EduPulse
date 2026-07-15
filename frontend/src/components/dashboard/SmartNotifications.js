import React, { useState } from 'react';

const SmartNotifications = ({ onClose }) => {
  const [filter, setFilter] = useState('all');
  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";

  const notifications = {
    academics: { label: '📚 Academics', color: 'bg-blue-500', items: [
      { id: 1, text: 'Assignment deadline: Data Structures', time: '2h ago', priority: 'high', read: false },
      { id: 2, text: 'New study material uploaded: AI', time: '5h ago', priority: 'normal', read: true },
    ]},
    attendance: { label: '📋 Attendance', color: 'bg-yellow-500', items: [
      { id: 3, text: 'Attendance below 75% in AI', time: '1d ago', priority: 'urgent', read: false },
    ]},
    exams: { label: '📝 Exams', color: 'bg-red-500', items: [
      { id: 4, text: 'End Sem timetable published', time: '2d ago', priority: 'high', read: true },
    ]},
    fees: { label: '💰 Fees', color: 'bg-green-500', items: [
      { id: 5, text: 'Fee payment due next week', time: '3d ago', priority: 'high', read: false },
    ]},
    system: { label: '⚙️ System', color: 'bg-purple-500', items: [
      { id: 6, text: 'Profile updated successfully', time: '4d ago', priority: 'normal', read: true },
    ]},
  };

  const unreadCount = Object.values(notifications).flatMap(g => g.items).filter(n => !n.read).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-96">
      <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h3 className={`font-semibold text-sm ${textClass}`}>Notifications</h3>
          <span className="text-xs text-blue-600">{unreadCount} unread</span>
        </div>
        <div className="flex space-x-2">
          <button className="text-xs text-blue-600 hover:underline">Mark all read</button>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
      </div>

      <div className="flex overflow-x-auto p-2 space-x-1 border-b border-gray-100 dark:border-gray-700">
        {['all', ...Object.keys(notifications)].map(key => (
          <button key={key} onClick={() => setFilter(key)} className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-medium transition ${
            filter === key ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}>{key === 'all' ? 'All' : notifications[key].label}</button>
        ))}
      </div>

      <div className="max-h-72 overflow-y-auto">
        {Object.entries(notifications).filter(([key]) => filter === 'all' || filter === key).map(([key, group]) => (
          <div key={key}>
            <div className="px-3 py-1.5 bg-gray-50 dark:bg-gray-700/50">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{group.label}</span>
            </div>
            {group.items.map(n => (
              <div key={n.id} className={`p-3 border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${n.read ? '' : 'bg-blue-50/50 dark:bg-blue-900/10'}`}>
                <div className="flex items-start space-x-2">
                  {!n.read && <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.priority === 'urgent' ? 'bg-red-500' : n.priority === 'high' ? 'bg-yellow-500' : 'bg-blue-500'}`} />}
                  <div className="flex-1">
                    <p className={`text-sm ${textClass}`}>{n.text}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs ${subtextClass}`}>{n.time}</span>
                      {n.priority === 'urgent' && <span className="text-xs px-1.5 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-full">Urgent</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartNotifications;
