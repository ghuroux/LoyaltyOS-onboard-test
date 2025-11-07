import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import {
  Settings,
  Link2,
  Building2,
  Coins,
  TrendingUp,
  Gift,
  Megaphone,
  Globe,
  BarChart3,
  Bell,
  Workflow,
  Rocket,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
} from 'lucide-react';

interface Screen {
  id: number;
  name: string;
  description: string;
  icon: React.ElementType;
  status: 'complete' | 'in-progress' | 'not-started';
  progress: number;
  estimatedTime: string;
  requiredFields?: number;
  completedFields?: number;
}

interface DashboardProps {
  onNavigate: (screenId: number) => void;
}

export const Screen0Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
}) => {
  const screens: Screen[] = [
    {
      id: 2,
      name: 'Platform Basics',
      description: 'Program name, currency, timezone, and basic settings',
      icon: Settings,
      status: 'not-started',
      progress: 0,
      estimatedTime: '5 min',
      requiredFields: 8,
      completedFields: 0,
    },
    {
      id: 3,
      name: 'External Integrations',
      description: 'Connect CRM, POS, payment systems, and marketing tools',
      icon: Link2,
      status: 'not-started',
      progress: 0,
      estimatedTime: '10 min',
      requiredFields: 3,
      completedFields: 0,
    },
    {
      id: 4,
      name: 'Organization & Customer Structure',
      description: 'Define business hierarchy, customer categories, and profiles',
      icon: Building2,
      status: 'in-progress',
      progress: 65,
      estimatedTime: '15 min',
      requiredFields: 12,
      completedFields: 8,
    },
    {
      id: 5,
      name: 'Points & Currency',
      description: 'Configure point values, expiration, and conversion rules',
      icon: Coins,
      status: 'not-started',
      progress: 0,
      estimatedTime: '10 min',
      requiredFields: 10,
      completedFields: 0,
    },
    {
      id: 6,
      name: 'Redemption & Rewards',
      description: 'Set up reward catalog and redemption rules',
      icon: Gift,
      status: 'not-started',
      progress: 0,
      estimatedTime: '15 min',
      requiredFields: 12,
      completedFields: 0,
    },
    {
      id: 7,
      name: 'Customer Segmentation',
      description: 'Define customer segments and behavioral groups',
      icon: TrendingUp,
      status: 'not-started',
      progress: 0,
      estimatedTime: '12 min',
      requiredFields: 8,
      completedFields: 0,
    },
    {
      id: 8,
      name: 'Automations & Triggers',
      description: 'Set up automated campaigns and event triggers',
      icon: Workflow,
      status: 'not-started',
      progress: 0,
      estimatedTime: '15 min',
      requiredFields: 10,
      completedFields: 0,
    },
    {
      id: 9,
      name: 'Safeguards & Controls',
      description: 'Configure fraud prevention and spending controls',
      icon: AlertCircle,
      status: 'not-started',
      progress: 0,
      estimatedTime: '10 min',
      requiredFields: 8,
      completedFields: 0,
    },
    {
      id: 10,
      name: 'Campaign Templates',
      description: 'Create promotional campaigns and targeted offers',
      icon: Megaphone,
      status: 'not-started',
      progress: 0,
      estimatedTime: '20 min',
      requiredFields: 10,
      completedFields: 0,
    },
    {
      id: 11,
      name: 'Intelligence Queues',
      description: 'Configure AI-powered insights and monitoring',
      icon: Bell,
      status: 'not-started',
      progress: 0,
      estimatedTime: '8 min',
      requiredFields: 5,
      completedFields: 0,
    },
    {
      id: 12,
      name: 'Data Strategy',
      description: 'Define data collection, storage, and retention policies',
      icon: Globe,
      status: 'not-started',
      progress: 0,
      estimatedTime: '12 min',
      requiredFields: 6,
      completedFields: 0,
    },
    {
      id: 13,
      name: 'Analytics & KPIs',
      description: 'Configure dashboards, KPIs, and reporting schedules',
      icon: BarChart3,
      status: 'not-started',
      progress: 0,
      estimatedTime: '10 min',
      requiredFields: 8,
      completedFields: 0,
    },
    {
      id: 14,
      name: 'Flow Orchestration',
      description: 'Design end-to-end customer journey flows',
      icon: Workflow,
      status: 'not-started',
      progress: 0,
      estimatedTime: '15 min',
      requiredFields: 10,
      completedFields: 0,
    },
    {
      id: 15,
      name: 'Review & Deploy',
      description: 'Validate configuration and deploy to production',
      icon: Rocket,
      status: 'not-started',
      progress: 0,
      estimatedTime: '10 min',
      requiredFields: 0,
      completedFields: 0,
    },
  ];

  const totalProgress = Math.round(
    screens.reduce((sum, screen) => sum + screen.progress, 0) / screens.length
  );

  const completedScreens = screens.filter((s) => s.status === 'complete').length;
  const inProgressScreens = screens.filter((s) => s.status === 'in-progress').length;

  const getStatusIcon = (status: Screen['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 size={20} className="text-green-600" />;
      case 'in-progress':
        return <Clock size={20} className="text-blue-600" />;
      default:
        return <AlertCircle size={20} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: Screen['status']) => {
    switch (status) {
      case 'complete':
        return 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50';
      case 'in-progress':
        return 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50';
      default:
        return 'border-gray-200 hover:border-gray-300 bg-white';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Configuration Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Build your loyalty platform step by step. Complete each section to create a fully configured system.
          </p>
        </div>

        {/* Overall Progress Card */}
        <Card className="mb-8 border-2 border-blue-300 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Overall Progress</h2>
                <p className="text-gray-600">
                  {completedScreens} of {screens.length - 1} sections complete
                  {inProgressScreens > 0 && ` • ${inProgressScreens} in progress`}
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {totalProgress}%
                </div>
                <div className="text-sm text-gray-600 mt-1">Complete</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${totalProgress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{completedScreens}</div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-blue-600">{inProgressScreens}</div>
                <div className="text-xs text-gray-600">In Progress</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-gray-400">
                  {screens.filter((s) => s.status === 'not-started').length}
                </div>
                <div className="text-xs text-gray-600">Not Started</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-purple-600">~2.5 hrs</div>
                <div className="text-xs text-gray-600">Est. Time Left</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Configuration Sections */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration Sections</h2>
          <p className="text-gray-600 mb-6">
            Click any section to begin or continue configuration
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {screens.map((screen) => {
            const Icon = screen.icon;
            return (
              <Card
                key={screen.id}
                className={`transition-all hover:shadow-lg cursor-pointer ${getStatusColor(screen.status)}`}
                onClick={() => onNavigate(screen.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-white rounded-xl shadow-sm border-2 border-gray-200">
                        <Icon size={28} className="text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-gray-900">{screen.name}</h3>
                          {getStatusIcon(screen.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{screen.description}</p>

                        {/* Progress Bar */}
                        {screen.progress > 0 && (
                          <div className="mb-2">
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                style={{ width: `${screen.progress}%` }}
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>⏱️ {screen.estimatedTime}</span>
                          {screen.requiredFields && screen.requiredFields > 0 && (
                            <span>
                              📝 {screen.completedFields}/{screen.requiredFields} fields
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400 mt-1" />
                  </div>

                  {screen.status === 'in-progress' && (
                    <div className="pt-3 border-t border-blue-200">
                      <div className="text-sm text-blue-700 font-medium">
                        Continue where you left off →
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            <Button variant="secondary" className="justify-center">
              📥 Import from Template
            </Button>
            <Button variant="secondary" className="justify-center">
              📤 Export Configuration
            </Button>
            <Button variant="secondary" className="justify-center">
              📋 View Documentation
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
