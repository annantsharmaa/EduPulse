import React from 'react';
import { useModules } from '../../context/ModuleContext';

const ModuleManager = () => {
  const { modules, toggleModule } = useModules();
  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";

  const categories = {
    'Core': ['attendance', 'assignments', 'examination', 'fees', 'leaves'],
    'Communication': ['forum', 'parentPortal'],
    'Advanced': ['ai', 'placement'],
    'Infrastructure': ['hostel', 'transport'],
  };

  return (
    <div>
      <p className={`text-sm ${subtextClass} mb-4`}>Enable or disable modules. Disabled modules are hidden from all users.</p>
      {Object.entries(categories).map(([category, moduleKeys]) => (
        <div key={category} className="mb-6">
          <h3 className={`font-semibold ${textClass} mb-3`}>{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {moduleKeys.map(key => {
              const mod = modules[key];
              if (!mod) return null;
              return (
                <div key={key} className={`p-4 rounded-xl border transition ${
                  mod.enabled 
                    ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-60'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{mod.icon}</span>
                      <div>
                        <p className={`font-medium text-sm ${textClass}`}>{mod.name}</p>
                        <p className={`text-xs ${subtextClass}`}>{Object.keys(mod.config || {}).length} config options</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleModule(key)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${mod.enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${mod.enabled ? 'left-5' : 'left-0.5'}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleManager;
