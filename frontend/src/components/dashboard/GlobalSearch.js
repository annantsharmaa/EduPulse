import React, { useState, useEffect } from 'react';

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const textClass = "text-gray-800 dark:text-gray-100";

  const searchIndex = [
    { type: 'Student', name: 'Ananya Sharma', subtitle: '2021CSE045 | CSE Sem 5', icon: '👨‍🎓' },
    { type: 'Student', name: 'Arjun Patel', subtitle: '2021CSE032 | CSE Sem 5', icon: '👨‍🎓' },
    { type: 'Student', name: 'Priya Singh', subtitle: '2021CSE018 | CSE Sem 5', icon: '👨‍🎓' },
    { type: 'Faculty', name: 'Dr. Rajesh Kumar', subtitle: 'Professor | CSE', icon: '👨‍🏫' },
    { type: 'Faculty', name: 'Dr. Sunita Patel', subtitle: 'Associate Professor | CSE', icon: '👨‍🏫' },
    { type: 'Subject', name: 'Data Structures', subtitle: 'CSE301 | 60 Students', icon: '📚' },
    { type: 'Subject', name: 'Database Systems', subtitle: 'CSE302 | 55 Students', icon: '📚' },
    { type: 'Assignment', name: 'Binary Trees Implementation', subtitle: 'Due: Jul 20 | CSE301', icon: '📄' },
    { type: 'Exam', name: 'End Semester - Data Structures', subtitle: 'Aug 5, 2026 | CSE301', icon: '📝' },
    { type: 'Room', name: 'CS-101', subtitle: 'Capacity: 60 | CSE Block', icon: '🏫' },
    { type: 'Room', name: 'Lab-3', subtitle: 'Capacity: 40 | AI Lab', icon: '🔬' },
    { type: 'Department', name: 'Computer Science & Engineering', subtitle: '650 Students | 30 Faculty', icon: '🏛️' },
  ];

  useEffect(() => {
    if (query.length < 1) { setResults([]); return; }
    const filtered = searchIndex.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered.slice(0, 8));
  }, [query]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="🔍 Search students, faculty, subjects, rooms..."
        className="w-96 px-4 py-2 border dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          {results.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0">
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className={`text-sm font-medium ${textClass}`}>{item.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.subtitle}</p>
              </div>
              <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">{item.type}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
