import React, { useState } from 'react';

const CalendarWidget = () => {
  const [currentMonth, setCurrentMonth] = useState(6); // July
  const [currentYear, setCurrentYear] = useState(2026);
  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";

  const events = {
    '2026-07-15': [{ text: 'Data Structures Class', color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' }],
    '2026-07-18': [{ text: 'DBMS Assignment Due', color: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' }],
    '2026-07-20': [{ text: 'Binary Trees Deadline', color: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' }],
    '2026-07-25': [{ text: 'End Sem Exams Begin', color: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300' }],
    '2026-07-30': [{ text: 'Fee Payment Due', color: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300' }],
  };

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => { if(currentMonth===0){setCurrentMonth(11);setCurrentYear(currentYear-1);}else{setCurrentMonth(currentMonth-1);} }} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">←</button>
        <h3 className={`font-semibold ${textClass}`}>{months[currentMonth]} {currentYear}</h3>
        <button onClick={() => { if(currentMonth===11){setCurrentMonth(0);setCurrentYear(currentYear+1);}else{setCurrentMonth(currentMonth+1);} }} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">→</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className={`font-medium ${subtextClass}`}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-${String(i+1).padStart(2,'0')}`;
          const hasEvent = events[date];
          const isToday = date === today;
          return (
            <div key={i} className={`p-1 rounded text-xs ${isToday ? 'bg-blue-600 text-white font-bold' : hasEvent ? 'bg-gray-100 dark:bg-gray-700' : textClass}`} title={hasEvent ? hasEvent.map(e=>e.text).join(', ') : ''}>
              {i+1}
              {hasEvent && <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-0.5 ${hasEvent[0].color.split(' ')[0]}`} />}
            </div>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <p className={`text-xs font-medium ${textClass} mb-2`}>Upcoming:</p>
        {Object.entries(events).slice(0,3).map(([date, evts]) => (
          <div key={date} className="flex items-center space-x-2 text-xs mb-1">
            <span className={subtextClass}>{new Date(date).toLocaleDateString('en-IN', {day:'numeric',month:'short'})}</span>
            <span className={`px-1.5 py-0.5 rounded ${evts[0].color} text-xs`}>{evts[0].text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
