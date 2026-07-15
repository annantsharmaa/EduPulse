import React, { useState } from 'react';

const AIAnalytics = () => {
  const [activeInsight, setActiveInsight] = useState('dropout');
  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";
  const cardClass = "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5";

  const insights = {
    dropout: {
      title: '⚠️ Dropout Risk Prediction',
      description: 'Students likely to drop out based on attendance, marks, and engagement patterns.',
      students: [
        { name: 'Rahul Gupta', roll: '2021CSE055', risk: 92, factors: ['Low attendance (55%)', 'Poor marks (22/50)', '3 consecutive absences'] },
        { name: 'Suresh Nair', roll: '2021CSE039', risk: 85, factors: ['Low attendance (52%)', 'Failed 2 subjects', 'No fee payment'] },
        { name: 'Arjun Patel', roll: '2021CSE032', risk: 68, factors: ['Declining attendance', 'Below average marks', 'Medical leave pattern'] },
      ],
    },
    performance: {
      title: '📈 Performance Forecasting',
      description: 'Predicted end-semester performance based on current trends.',
      subjects: [
        { name: 'Data Structures', currentAvg: 38, predictedAvg: 42, trend: 'up' },
        { name: 'Database Systems', currentAvg: 35, predictedAvg: 40, trend: 'up' },
        { name: 'AI', currentAvg: 40, predictedAvg: 38, trend: 'down' },
        { name: 'Operating Systems', currentAvg: 45, predictedAvg: 48, trend: 'up' },
      ],
    },
    studyPlan: {
      title: '🤖 Personalized Study Plans',
      description: 'AI-generated study recommendations for each student.',
      plans: [
        { student: 'Ananya Sharma', focus: 'AI & DBMS', schedule: '2hr AI daily, 1hr DBMS, weekend practice tests', weakTopics: ['Neural Networks', 'SQL Joins'] },
        { student: 'Arjun Patel', focus: 'Data Structures', schedule: '3hr DS daily, focus on trees and graphs', weakTopics: ['Binary Trees', 'Graph Algorithms'] },
      ],
    },
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'dropout', label: '⚠️ Dropout Prediction' },
          { id: 'performance', label: '📈 Performance Forecast' },
          { id: 'studyPlan', label: '🤖 Study Plans' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveInsight(tab.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeInsight === tab.id ? 'bg-blue-600 text-white' : `bg-gray-100 dark:bg-gray-700 ${textClass} hover:bg-gray-200 dark:hover:bg-gray-600`
          }`}>{tab.label}</button>
        ))}
      </div>

      {/* Dropout Prediction */}
      {activeInsight === 'dropout' && (
        <div className="space-y-4">
          <div className={cardClass}>
            <h3 className={`font-semibold ${textClass}`}>{insights.dropout.title}</h3>
            <p className={`text-sm ${subtextClass} mt-1`}>{insights.dropout.description}</p>
          </div>
          {insights.dropout.students.map((s, i) => (
            <div key={i} className={cardClass}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className={`font-medium ${textClass}`}>{s.name} <span className={subtextClass}>({s.roll})</span></p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  s.risk >= 80 ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' :
                  s.risk >= 60 ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300' : 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                }`}>Risk: {s.risk}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                <div className="h-2 rounded-full bg-red-500" style={{width: `${s.risk}%`}}></div>
              </div>
              <div className="space-y-1">
                <p className={`text-xs ${subtextClass} font-medium`}>Risk Factors:</p>
                {s.factors.map((f, j) => (
                  <p key={j} className={`text-xs ${subtextClass}`}>• {f}</p>
                ))}
              </div>
              <button className="mt-3 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">📧 Notify Parent | 📋 Schedule Counseling</button>
            </div>
          ))}
        </div>
      )}

      {/* Performance Forecast */}
      {activeInsight === 'performance' && (
        <div className="space-y-4">
          {insights.performance.subjects.map((s, i) => (
            <div key={i} className={cardClass}>
              <div className="flex justify-between items-center mb-2">
                <h4 className={`font-medium ${textClass}`}>{s.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${s.trend === 'up' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'}`}>
                  {s.trend === 'up' ? '↑ Improving' : '↓ Declining'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center`}>
                  <p className={`text-xs ${subtextClass}`}>Current Avg</p>
                  <p className={`text-xl font-bold ${textClass}`}>{s.currentAvg}/50</p>
                </div>
                <div className={`p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-center`}>
                  <p className="text-xs text-blue-500 dark:text-blue-400">Predicted</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{s.predictedAvg}/50</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Study Plans */}
      {activeInsight === 'studyPlan' && (
        <div className="space-y-4">
          {insights.studyPlan.plans.map((plan, i) => (
            <div key={i} className={cardClass}>
              <h4 className={`font-semibold ${textClass} mb-2`}>📝 {plan.student}</h4>
              <div className="space-y-3">
                <div className={`p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg`}>
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Focus Areas</p>
                  <p className={`text-sm ${textClass}`}>{plan.focus}</p>
                </div>
                <div className={`p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg`}>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Schedule</p>
                  <p className={`text-sm ${textClass}`}>{plan.schedule}</p>
                </div>
                <div className={`p-3 bg-red-50 dark:bg-red-900/30 rounded-lg`}>
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">Weak Topics</p>
                  <p className={`text-sm ${textClass}`}>{plan.weakTopics.join(', ')}</p>
                </div>
              </div>
              <button className="mt-3 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">📤 Share with Student | 📊 Full Report</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIAnalytics;
