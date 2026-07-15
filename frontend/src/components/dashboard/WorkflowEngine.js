import React, { useState } from 'react';

const WorkflowEngine = ({ type = 'leave' }) => {
  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";

  const workflows = {
    leave: {
      title: 'Leave Request #LEAVE-2026-045',
      stages: [
        { name: 'Submitted', status: 'completed', actor: 'Ananya Sharma', timestamp: 'Jul 15, 9:30 AM', comment: 'Medical leave for 2 days' },
        { name: 'Faculty Review', status: 'completed', actor: 'Dr. Rajesh Kumar', timestamp: 'Jul 15, 10:15 AM', comment: 'Recommended for approval' },
        { name: 'HOD Review', status: 'active', actor: 'Dr. Rajesh Kumar (HOD)', timestamp: 'Pending', comment: 'Awaiting review' },
        { name: 'Admin Approval', status: 'pending', actor: 'Vikram Patel', timestamp: '-', comment: '' },
        { name: 'Completed', status: 'pending', actor: 'System', timestamp: '-', comment: 'Auto-update attendance' },
      ],
    },
    complaint: {
      title: 'Complaint #COMP-2026-012',
      stages: [
        { name: 'Filed', status: 'completed', actor: 'Arjun Patel', timestamp: 'Jul 14, 2:00 PM', comment: 'Hostel water issue' },
        { name: 'Assigned', status: 'completed', actor: 'Admin', timestamp: 'Jul 14, 2:30 PM', comment: 'Assigned to maintenance' },
        { name: 'In Progress', status: 'active', actor: 'Maintenance Team', timestamp: 'Jul 15, 9:00 AM', comment: 'Plumber assigned' },
        { name: 'Resolved', status: 'pending', actor: 'Maintenance Team', timestamp: '-', comment: '' },
        { name: 'Closed', status: 'pending', actor: 'Student', timestamp: '-', comment: 'Confirmation required' },
      ],
    },
    certificate: {
      title: 'Bonafide Certificate #CERT-2026-089',
      stages: [
        { name: 'Applied', status: 'completed', actor: 'Priya Singh', timestamp: 'Jul 13, 11:00 AM', comment: 'For passport application' },
        { name: 'Fee Payment', status: 'completed', actor: 'System', timestamp: 'Jul 13, 11:05 AM', comment: '₹100 paid' },
        { name: 'Verification', status: 'completed', actor: 'Admin', timestamp: 'Jul 14, 3:00 PM', comment: 'Documents verified' },
        { name: 'Issued', status: 'active', actor: 'HOD', timestamp: 'Pending', comment: 'Signature pending' },
        { name: 'Delivered', status: 'pending', actor: 'Student', timestamp: '-', comment: 'Collect from office' },
      ],
    },
  };

  const workflow = workflows[type];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500 animate-pulse';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-300 dark:bg-gray-600';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className={`font-semibold ${textClass}`}>🔄 {workflow.title}</h3>
        <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">Workflow</span>
      </div>

      <div className="relative">
        {workflow.stages.map((stage, idx) => (
          <div key={idx} className="flex items-start mb-4 relative">
            {/* Timeline line */}
            {idx < workflow.stages.length - 1 && (
              <div className={`absolute left-4 top-8 w-0.5 h-full ${stage.status === 'completed' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
            )}
            
            {/* Status dot */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getStatusColor(stage.status)} z-10`}>
              {stage.status === 'completed' ? '✓' : stage.status === 'active' ? '◉' : '○'}
            </div>

            {/* Content */}
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className={`font-medium text-sm ${textClass}`}>{stage.name}</p>
                  <p className={`text-xs ${subtextClass}`}>{stage.actor}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs ${subtextClass}`}>{stage.timestamp}</span>
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    stage.status === 'completed' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' :
                    stage.status === 'active' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' :
                    'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>{stage.status}</span>
                </div>
              </div>
              {stage.comment && (
                <p className={`text-xs ${subtextClass} mt-1 italic`}>"{stage.comment}"</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Actions for active stage */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex space-x-2">
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium">✓ Approve</button>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">✗ Reject</button>
        <button className="px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg text-sm">💬 Comment</button>
      </div>
    </div>
  );
};

export default WorkflowEngine;
