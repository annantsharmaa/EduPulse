import React, { createContext, useContext, useState, useCallback } from 'react';

const ActivityContext = createContext();
export const useActivity = () => useContext(ActivityContext);

export const ActivityProvider = ({ children }) => {
  const [logs, setLogs] = useState([
    { id: 1, user: 'Vikram Patel', role: 'ADMIN', action: 'Deleted student', entity: 'Rahul Gupta', entityId: '2021CSE055', timestamp: new Date(Date.now() - 3600000), ip: '192.168.1.1' },
    { id: 2, user: 'Dr. Rajesh Kumar', role: 'FACULTY', action: 'Marked attendance', entity: 'CSE301 - 55 students', entityId: 'CSE301', timestamp: new Date(Date.now() - 7200000), ip: '192.168.1.20' },
    { id: 3, user: 'Ananya Sharma', role: 'STUDENT', action: 'Submitted assignment', entity: 'Binary Trees - Data Structures', entityId: 'ASGN001', timestamp: new Date(Date.now() - 10800000), ip: '192.168.1.45' },
    { id: 4, user: 'Rajesh Sharma', role: 'PARENT', action: 'Viewed report', entity: 'Ananya Sharma - Attendance', entityId: '2021CSE045', timestamp: new Date(Date.now() - 14400000), ip: '192.168.1.100' },
    { id: 5, user: 'Vikram Patel', role: 'ADMIN', action: 'Added faculty', entity: 'Dr. Amit Singh', entityId: 'FAC002', timestamp: new Date(Date.now() - 18000000), ip: '192.168.1.1' },
    { id: 6, user: 'Dr. Rajesh Kumar', role: 'FACULTY', action: 'Uploaded marks', entity: 'Mid Term - CSE301', entityId: 'EXAM001', timestamp: new Date(Date.now() - 86400000), ip: '192.168.1.20' },
    { id: 7, user: 'Ananya Sharma', role: 'STUDENT', action: 'Applied leave', entity: 'Medical Leave - 2 days', entityId: 'LEAVE001', timestamp: new Date(Date.now() - 172800000), ip: '192.168.1.45' },
    { id: 8, user: 'Vikram Patel', role: 'ADMIN', action: 'Changed fee structure', entity: 'Tuition Fee updated', entityId: 'FEE001', timestamp: new Date(Date.now() - 259200000), ip: '192.168.1.1' },
  ]);

  const addLog = useCallback((action, entity, entityId) => {
    const newLog = {
      id: Date.now(),
      user: 'Current User',
      role: 'USER',
      action,
      entity,
      entityId,
      timestamp: new Date(),
      ip: '192.168.1.' + Math.floor(Math.random() * 255),
    };
    setLogs(prev => [newLog, ...prev]);
  }, []);

  const clearLogs = () => setLogs([]);
  const getFilteredLogs = (filters = {}) => {
    return logs.filter(log => {
      if (filters.role && log.role !== filters.role) return false;
      if (filters.action && !log.action.includes(filters.action)) return false;
      if (filters.startDate && new Date(log.timestamp) < new Date(filters.startDate)) return false;
      if (filters.endDate && new Date(log.timestamp) > new Date(filters.endDate)) return false;
      return true;
    });
  };

  return (
    <ActivityContext.Provider value={{ logs, addLog, clearLogs, getFilteredLogs }}>
      {children}
    </ActivityContext.Provider>
  );
};
