import React, { useState } from 'react';
import { useActivity } from '../../context/ActivityContext';

const ActivityLogViewer = () => {
  const { logs, getFilteredLogs, clearLogs } = useActivity();
  const [filters, setFilters] = useState({ role: '', action: '' });
  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";

  const filteredLogs = getFilteredLogs(filters);

  const roleColors = {
    ADMIN: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
    FACULTY: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    STUDENT: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
    PARENT: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <select className="px-3 py-1.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300" value={filters.role} onChange={e => setFilters({...filters, role: e.target.value})}>
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
          <option value="PARENT">Parent</option>
        </select>
        <select className="px-3 py-1.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300" value={filters.action} onChange={e => setFilters({...filters, action: e.target.value})}>
          <option value="">All Actions</option>
          <option value="Deleted">Deleted</option>
          <option value="Marked">Marked Attendance</option>
          <option value="Submitted">Submitted</option>
          <option value="Uploaded">Uploaded</option>
          <option value="Applied">Applied</option>
          <option value="Changed">Changed</option>
        </select>
        <button onClick={clearLogs} className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">Clear Logs</button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredLogs.map(log => (
          <div key={log.id} className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 text-sm">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${roleColors[log.role]}`}>{log.role}</span>
            <div className="flex-1">
              <p className={textClass}><span className="font-medium">{log.user}</span> {log.action.toLowerCase()} <span className="font-medium">{log.entity}</span></p>
              <p className={`text-xs ${subtextClass} mt-1`}>{new Date(log.timestamp).toLocaleString('en-IN')} | IP: {log.ip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogViewer;
