import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

export const Screen6Campaigns: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Framework & Intelligence</h1>
          <p className="text-gray-600 text-lg">Configure campaign creation methods and automation rules</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { icon: '✏️', name: 'Manual', desc: 'Traditional campaign creation' },
            { icon: '🎯', name: 'Outcome-Based', desc: 'AI creates campaigns to meet goals' },
            { icon: '⚡', name: 'Queue-Triggered', desc: 'Auto-launch based on signals' },
            { icon: '🔌', name: 'API-Driven', desc: 'External system triggers' },
          ].map((method) => (
            <Card key={method.name} clickable className="p-5 text-center" selected={method.name === 'Outcome-Based'}>
              <div className="text-4xl mb-3">{method.icon}</div>
              <h3 className="font-semibold mb-1">{method.name}</h3>
              <p className="text-xs text-gray-600">{method.desc}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Financial Controls</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Margin Protection (%)', value: '15', desc: 'Minimum gross margin to maintain' },
              { label: 'Maximum Budget per Campaign', value: '5000', desc: 'Spend cap in USD' },
              { label: 'Minimum ROI Target', value: '3.0', desc: 'Required return multiple' },
              { label: 'Maximum Concurrent Campaigns', value: '10', desc: 'Active campaigns limit' },
            ].map((control) => (
              <div key={control.label} className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-semibold mb-2">{control.label}</label>
                <input type="text" defaultValue={control.value} className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2" />
                <p className="text-xs text-gray-600">{control.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Automation Progression</h3>
          <p className="text-sm text-gray-600 mb-4">Define how the system gradually increases automation as it learns</p>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
              <div className="font-semibold mb-2">Phase 1: Manual Approval (Days 1-30)</div>
              <p className="text-sm text-gray-600">All AI-suggested campaigns require human approval</p>
            </div>
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <div className="font-semibold mb-2">Phase 2: Supervised Automation (Days 31-60)</div>
              <p className="text-sm text-gray-600">Auto-launch campaigns under $500 with 80%+ confidence</p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <div className="font-semibold mb-2">Phase 3: Full Automation (Days 61+)</div>
              <p className="text-sm text-gray-600">Auto-launch all campaigns meeting ROI and margin thresholds</p>
            </div>
          </div>
          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 text-primary rounded" defaultChecked />
              <span className="text-sm font-medium">Enable progressive automation</span>
            </label>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
