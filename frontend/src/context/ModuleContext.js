import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ModuleContext = createContext();
export const useModules = () => useContext(ModuleContext);

const defaultModules = {
  attendance: { enabled: true, name: 'Attendance', icon: '📋', config: { qrExpirySeconds: 30, geofenceRadius: 50, editWindowHours: 24, autoUpdatePercentage: true, requiredPercentage: 75 } },
  assignments: { enabled: true, name: 'Assignments', icon: '📄', config: { maxFileSize: 10, allowedFormats: ['PDF','DOCX','ZIP','JPG'], plagiarismThreshold: 60, lateSubmissionAllowed: true } },
  examination: { enabled: true, name: 'Examination', icon: '📝', config: { gradeScale: { 'A+': 90, 'A': 80, 'B+': 70, 'B': 60, 'C': 50, 'F': 0 }, revaluationWindowDays: 7 } },
  fees: { enabled: true, name: 'Fees', icon: '💰', config: { lateFinePerDay: 50, currency: '₹', reminderDaysBefore: 7, finalNoticeDays: 15 } },
  leaves: { enabled: true, name: 'Leave', icon: '🏖️', config: { maxCasualPerYear: 12, maxMedicalPerYear: 6, maxConsecutiveDays: 7, approvalRequired: true } },
  forum: { enabled: true, name: 'Forum', icon: '💬', config: { maxPostsPerDay: 10, moderationRequired: false } },
  ai: { enabled: true, name: 'AI Module', icon: '🤖', config: { dropoutAttendanceThreshold: 65, dropoutMarksThreshold: 30, forecastAccuracy: 80 } },
  hostel: { enabled: false, name: 'Hostel', icon: '🏠', config: { rooms: 200, checkInTime: '9:00 AM', checkOutTime: '6:00 PM' } },
  transport: { enabled: false, name: 'Transport', icon: '🚌', config: { maxRoutes: 20, pickupWindowMinutes: 15 } },
  placement: { enabled: true, name: 'Placement', icon: '💼', config: { minAttendanceEligibility: 75, minCGPAPercentage: 60 } },
  parentPortal: { enabled: true, name: 'Parent Portal', icon: '👨‍👩‍👧', config: { showAttendance: true, showMarks: true, showFees: true, chatEnabled: true } },
};

export const ModuleProvider = ({ children }) => {
  const { user } = useAuth();
  const [modules, setModules] = useState(defaultModules);

  const isModuleEnabled = (moduleName) => modules[moduleName]?.enabled ?? false;
  const getModuleConfig = (moduleName) => modules[moduleName]?.config ?? {};
  const toggleModule = (moduleName) => {
    setModules(prev => ({ ...prev, [moduleName]: { ...prev[moduleName], enabled: !prev[moduleName].enabled } }));
  };

  return (
    <ModuleContext.Provider value={{ modules, isModuleEnabled, getModuleConfig, toggleModule, setModules }}>
      {children}
    </ModuleContext.Provider>
  );
};
