import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const CommandPalette = ({ isOpen, onClose, setActiveTab }) => {
  const [query, setQuery] = useState('');
  const { user } = useAuth();
  const textClass = "text-gray-800 dark:text-gray-100";

  const commands = [
    { category: 'Navigation', items: [
      { name: 'Go to Overview', icon: '📊', action: () => setActiveTab('overview'), roles: ['ALL'] },
      { name: 'Go to Attendance', icon: '📋', action: () => setActiveTab('attendance'), roles: ['ALL'] },
      { name: 'Go to Students', icon: '👨‍🎓', action: () => setActiveTab('students'), roles: ['ADMIN','FACULTY','HOD'] },
      { name: 'Go to Assignments', icon: '📄', action: () => setActiveTab('assignments'), roles: ['STUDENT','FACULTY'] },
      { name: 'Go to Forum', icon: '💬', action: () => setActiveTab('forum'), roles: ['ALL'] },
    ]},
    { category: 'Actions', items: [
      { name: 'Mark Attendance', icon: '📋', action: () => setActiveTab('attendance'), roles: ['FACULTY'] },
      { name: 'Create Assignment', icon: '📝', action: () => setActiveTab('assignments'), roles: ['FACULTY'] },
      { name: 'Add Student', icon: '➕', action: () => alert('Add Student form'), roles: ['ADMIN'] },
      { name: 'Generate Report', icon: '📊', action: () => setActiveTab('reports'), roles: ['ADMIN','HOD'] },
      { name: 'Upload Marks', icon: '📝', action: () => setActiveTab('marks'), roles: ['FACULTY'] },
      { name: 'Apply Leave', icon: '🏖️', action: () => setActiveTab('leave'), roles: ['STUDENT'] },
      { name: 'Pay Fees', icon: '💰', action: () => setActiveTab('fees'), roles: ['STUDENT'] },
    ]},
  ];

  const filtered = commands.flatMap(c => 
    c.items.filter(item => 
      (item.roles.includes('ALL') || item.roles.includes(user?.role)) &&
      item.name.toLowerCase().includes(query.toLowerCase())
    ).map(item => ({ ...item, category: c.category }))
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-3 border-b border-gray-100 dark:border-gray-700">
          <input
            type="text"
            className="w-full px-3 py-2 bg-transparent text-lg text-gray-800 dark:text-gray-200 focus:outline-none"
            placeholder="Type a command... (Ctrl+K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          {filtered.map((item, idx) => (
            <button
              key={idx}
              onClick={() => { item.action(); onClose(); }}
              className="w-full flex items-center space-x-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
            >
              <span className="text-lg">{item.icon}</span>
              <div className="text-left">
                <p className={`font-medium ${textClass}`}>{item.name}</p>
                <p className="text-xs text-gray-400">{item.category}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="p-2 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-400 flex justify-between">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>Esc Close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
