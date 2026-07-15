import React from 'react';

const StatsCard = ({ title, value, icon, color, trend }) => {
  const colors = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    red: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    orange: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    teal: 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <div className={`w-11 h-11 ${colors[color]} rounded-xl flex items-center justify-center text-xl`}>
          {icon}
        </div>
      </div>
      {trend !== undefined && (
        <p className={`text-xs mt-3 font-medium ${trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last month
        </p>
      )}
    </div>
  );
};

export default StatsCard;
