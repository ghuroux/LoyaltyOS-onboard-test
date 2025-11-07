import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import { useOnboardingStore } from '../../store/onboardingStore';

export const Screen9Queues: React.FC = () => {
  const { queues, updateQueue } = useOnboardingStore();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">⭐ Queue Intelligence Configuration</h1>
          <p className="text-gray-600 text-lg">Configure queue-based operational intelligence (key differentiator)</p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {queues.map((queue) => (
            <Card key={queue.id} className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{queue.name}</h3>
                  <p className="text-sm text-gray-600">{queue.description}</p>
                </div>
                <Toggle checked={queue.enabled} onChange={(enabled) => updateQueue(queue.id, { enabled })} />
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Patterns Detected:</h4>
                <div className="flex flex-wrap gap-2">
                  {queue.patterns.map((pattern) => (
                    <span key={pattern} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {pattern}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Automated Actions:</h4>
                <div className="space-y-1">
                  {queue.actions.map((action) => (
                    <div key={action} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      {action}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-xs font-semibold mb-2 text-gray-700">Detection Threshold</label>
                <input type="range" min="1" max="100" defaultValue="70" className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Conservative</span>
                  <span>Aggressive</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-5 p-5 bg-gray-50 border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">🤖 Intelligence Level</h3>
          <p className="text-sm text-gray-700 mb-4">
            Queues continuously learn from your data and become more accurate over time. The system will start conservative and gradually increase confidence.
          </p>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Queue Items Processed', value: '0' },
              { label: 'Patterns Identified', value: '0' },
              { label: 'Actions Triggered', value: '0' },
              { label: 'Confidence Level', value: 'Learning' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-brand-600 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
