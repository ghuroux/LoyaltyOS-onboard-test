import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-10 py-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <div>
            <div className="text-xl font-semibold text-gray-900">StratOS Loyalty</div>
            <div className="text-xs text-gray-500">Enterprise Intelligence Platform</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Implementation: DEMO-2025</span>
          <span className="px-3 py-1 bg-secondary text-white rounded text-xs font-semibold">
            CONFIGURATION MODE
          </span>
        </div>
      </div>
    </div>
  );
};
