import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { useOnboardingStore } from '../../store/onboardingStore';
import { TestTube, BarChart, Zap } from 'lucide-react';

const deploymentOptions = [
  { id: 'pilot', icon: TestTube, name: 'Pilot Approach', desc: 'Test with select locations before full rollout', color: 'bg-blue-500' },
  { id: 'phased', icon: BarChart, name: 'Phased Rollout', desc: 'Gradual expansion across regions or features', color: 'bg-green-500' },
  { id: 'big-bang', icon: Zap, name: 'Big Bang', desc: 'Launch everywhere at once', color: 'bg-red-500' },
];

export const Screen13Deployment: React.FC = () => {
  const { deploymentStrategy } = useOnboardingStore();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Deployment Strategy & Activation</h1>
          <p className="text-gray-600 text-lg">Define your rollout plan and go-live timeline</p>
        </div>

        <div className="grid grid-cols-3 gap-5 mb-8">
          {deploymentOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Card key={option.id} clickable selected={deploymentStrategy === option.id} className="p-5 text-center">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 ${option.color} rounded-lg`}>
                    <IconComponent className="text-white" size={32} />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{option.name}</h3>
                <p className="text-sm text-gray-600">{option.desc}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-5 mb-5">
          <Card className="p-5">
            <h3 className="text-lg font-semibold mb-4">Go-Live Readiness Checklist</h3>
            <div className="space-y-3">
              {[
                { task: 'Organization structure configured', status: true },
                { task: 'Value mechanisms defined', status: true },
                { task: 'Earning rules configured', status: true },
                { task: 'Redemption options set', status: true },
                { task: 'Queue intelligence enabled', status: true },
                { task: 'Integrations connected', status: false },
                { task: 'Staff training completed', status: false },
                { task: 'Customer communication prepared', status: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">{item.task}</span>
                  {item.status ? (
                    <span className="text-green-500 font-bold">✓</span>
                  ) : (
                    <span className="text-gray-400">○</span>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-lg font-semibold mb-4">Launch Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-16 flex-shrink-0 text-sm font-bold text-gray-600">Week 1</div>
                <div className="flex-1 p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                  <div className="font-semibold text-sm">Final Testing & Training</div>
                  <div className="text-xs text-gray-600 mt-1">Internal validation and staff preparation</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-16 flex-shrink-0 text-sm font-bold text-gray-600">Week 2</div>
                <div className="flex-1 p-3 bg-green-50 border-l-4 border-green-500 rounded-r">
                  <div className="font-semibold text-sm">Soft Launch</div>
                  <div className="text-xs text-gray-600 mt-1">Pilot with 3 locations</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-16 flex-shrink-0 text-sm font-bold text-gray-600">Week 4</div>
                <div className="flex-1 p-3 bg-purple-50 border-l-4 border-purple-500 rounded-r">
                  <div className="font-semibold text-sm">Full Rollout</div>
                  <div className="text-xs text-gray-600 mt-1">Expand to all locations</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <h3 className="text-lg font-semibold mb-4">Intelligence Activation Settings</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-semibold mb-2">Learning Mode</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>Conservative (Recommended)</option>
                <option>Moderate</option>
                <option>Aggressive</option>
              </select>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-semibold mb-2">Initial Automation Level</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>Manual Approval Required</option>
                <option>Semi-Automated</option>
                <option>Fully Automated</option>
              </select>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-semibold mb-2">Override Permissions</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>Admin Only</option>
                <option>Managers + Admin</option>
                <option>All Users</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="mt-8 p-5 bg-brand-500 rounded-xl text-white text-center">
          <h2 className="text-2xl font-bold mb-2">🎉 Configuration Complete!</h2>
          <p className="text-white mb-4">
            Your StratOS Loyalty platform is ready to deploy. Review your configuration and launch when ready.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-brand-600 rounded-lg font-semibold hover:bg-gray-100">
              Download Configuration
            </button>
            <button className="px-6 py-3 bg-success-600 text-white rounded-lg font-semibold hover:bg-success-700">
              Launch Platform
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
