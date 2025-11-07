import React, { useState } from 'react';
import { ChevronDown, Save, Check, AlertCircle, User, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  clientName?: string;
  clientId?: string;
  environment?: 'dev' | 'staging' | 'production';
  saveStatus?: 'saved' | 'saving' | 'unsaved' | 'error';
  userName?: string;
  userEmail?: string;
  currentScreen?: number;
  onNavigateToDashboard?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  clientName = 'Demo Client',
  clientId = 'DEMO-2025',
  environment = 'dev',
  saveStatus = 'saved',
  userName = 'Demo User',
  userEmail = 'demo@stratos.com',
  currentScreen = 0,
  onNavigateToDashboard,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showEnvMenu, setShowEnvMenu] = useState(false);

  // Show dashboard button if not on Discovery (0), Dashboard (1), or Platform Basics (2) screens
  const showDashboardButton = currentScreen >= 3 && onNavigateToDashboard;

  const environmentColors = {
    dev: 'bg-blue-500',
    staging: 'bg-yellow-500',
    production: 'bg-red-500',
  };

  const environmentLabels = {
    dev: 'DEV',
    staging: 'STAGING',
    production: 'PROD',
  };

  const saveStatusConfig = {
    saved: { icon: Check, text: 'All changes saved', color: 'text-green-600' },
    saving: { icon: Save, text: 'Saving...', color: 'text-blue-600' },
    unsaved: { icon: AlertCircle, text: 'Unsaved changes', color: 'text-yellow-600' },
    error: { icon: AlertCircle, text: 'Save failed', color: 'text-red-600' },
  };

  const StatusIcon = saveStatusConfig[saveStatus].icon;

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-3.5">
      <div className="flex justify-between items-center">
        {/* Left: Logo & Client Context */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-sm">
              S
            </div>
            <div>
              <div className="text-base font-semibold text-gray-900">StratOS Configurator</div>
              <div className="text-xs text-gray-500">Loyalty Platform Builder</div>
            </div>
          </div>

          {/* Client Context */}
          <div className="pl-6 border-l border-gray-200">
            <div className="text-xs text-gray-500 font-medium">Configuring for:</div>
            <div className="font-semibold text-sm text-gray-900">{clientName}</div>
            <div className="text-xs text-gray-500">ID: {clientId}</div>
          </div>
        </div>

        {/* Right: Environment, Save Status, User */}
        <div className="flex items-center gap-3">
          {/* Quick Nav to Dashboard */}
          {showDashboardButton && (
            <button
              onClick={onNavigateToDashboard}
              className="flex items-center gap-2 px-3.5 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors shadow-sm font-medium text-sm"
              title="Go to Configuration Dashboard"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </button>
          )}

          {/* Save Status */}
          <div className={`flex items-center gap-2 ${saveStatusConfig[saveStatus].color}`}>
            <StatusIcon size={16} />
            <span className="text-sm font-medium">{saveStatusConfig[saveStatus].text}</span>
          </div>

          {/* Environment Selector */}
          <div className="relative">
            <button
              onClick={() => setShowEnvMenu(!showEnvMenu)}
              className={`flex items-center gap-2 px-3 py-1.5 ${environmentColors[environment]} text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity`}
            >
              {environmentLabels[environment]}
              <ChevronDown size={14} />
            </button>
            {showEnvMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    Development
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    Staging
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    Production
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <User size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-900">{userName.split(' ')[0]}</span>
              <ChevronDown size={14} className="text-gray-600" />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="font-semibold text-gray-900">{userName}</div>
                  <div className="text-sm text-gray-500">{userEmail}</div>
                </div>
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-700">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-700">
                    Switch Client
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-700">
                    Help & Documentation
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
