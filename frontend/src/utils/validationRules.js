// Attendance Rules
export const attendanceRules = {
  canMarkAttendance: (classTime, currentTime, config) => {
    const diffMinutes = Math.abs(new Date(currentTime) - new Date(classTime)) / 60000;
    return diffMinutes <= 10; // Within 10 min window
  },
  isQRValid: (qrGeneratedAt, config) => {
    const diffSeconds = (Date.now() - new Date(qrGeneratedAt).getTime()) / 1000;
    return diffSeconds <= (config.qrExpirySeconds || 30);
  },
  canEditAttendance: (attendanceDate, config) => {
    const diffHours = (Date.now() - new Date(attendanceDate).getTime()) / 3600000;
    return diffHours <= (config.editWindowHours || 24);
  },
  isDuplicate: (existingRecords, studentId, subjectId, date) => {
    return existingRecords.some(r => r.studentId === studentId && r.subjectId === subjectId && r.date === date);
  },
  calculatePercentage: (present, total) => total > 0 ? ((present / total) * 100).toFixed(1) : 0,
  getAttendanceStatus: (classTime, markTime) => {
    return new Date(markTime) > new Date(classTime) ? 'LATE' : 'PRESENT';
  },
};

// Assignment Rules
export const assignmentRules = {
  isLateSubmission: (deadline) => new Date() > new Date(deadline),
  canSubmit: (deadline, allowLate = false) => allowLate || new Date() <= new Date(deadline),
  getPlagiarismScore: () => Math.floor(Math.random() * 30), // Simulated
  isPlagiarized: (score, threshold = 60) => score > threshold,
  validateFile: (file, config) => {
    if (file.size > (config.maxFileSize || 10) * 1024 * 1024) return { valid: false, error: `File too large. Max ${config.maxFileSize}MB` };
    const ext = file.name.split('.').pop().toUpperCase();
    if (!(config.allowedFormats || ['PDF','DOCX']).includes(ext)) return { valid: false, error: `Invalid format. Allowed: ${config.allowedFormats?.join(', ')}` };
    return { valid: true };
  },
};

// Fee Rules
export const feeRules = {
  getDueStatus: (dueDate) => {
    const days = Math.ceil((new Date(dueDate) - new Date()) / 86400000);
    if (days < 0) return { status: 'OVERDUE', text: `Overdue by ${Math.abs(days)} days` };
    if (days === 0) return { status: 'DUE_TODAY', text: 'Due today' };
    return { status: 'PENDING', text: `Due in ${days} days` };
  },
  calculateLateFine: (dueDate, config) => {
    const overdueDays = Math.max(0, Math.ceil((new Date() - new Date(dueDate)) / 86400000));
    return overdueDays * (config.lateFinePerDay || 50);
  },
  getPaymentStatusFlow: (current, dueDate) => {
    if (current === 'PAID') return 'PAID';
    return new Date() > new Date(dueDate) ? 'OVERDUE' : 'PENDING';
  },
};

// Leave Rules
export const leaveRules = {
  validateDates: (startDate, endDate, config) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (start < today) return { valid: false, error: 'Start date cannot be in the past' };
    if (end < start) return { valid: false, error: 'End date must be after start date' };
    const days = Math.ceil((end - start) / 86400000) + 1;
    if (days > (config.maxConsecutiveDays || 7)) return { valid: false, error: `Maximum ${config.maxConsecutiveDays} consecutive days allowed` };
    return { valid: true, days };
  },
  getLeaveBalance: (used, type, config) => {
    const max = type === 'MEDICAL' ? (config.maxMedicalPerYear || 6) : (config.maxCasualPerYear || 12);
    return max - (used || 0);
  },
};

// Exam Rules
export const examRules = {
  calculateGrade: (marks, totalMarks, gradeScale) => {
    const percentage = (marks / totalMarks) * 100;
    for (const [grade, threshold] of Object.entries(gradeScale).sort((a,b) => b[1] - a[1])) {
      if (percentage >= threshold) return { grade, percentage: percentage.toFixed(1) };
    }
    return { grade: 'F', percentage: percentage.toFixed(1) };
  },
  canDownloadHallTicket: (attendance, feesPaid) => attendance >= 75 && feesPaid,
  isRevaluationAllowed: (resultDate, config) => {
    const daysSince = (Date.now() - new Date(resultDate).getTime()) / 86400000;
    return daysSince <= (config.revaluationWindowDays || 7);
  },
};
