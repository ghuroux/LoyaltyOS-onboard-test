import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { useOnboardingStore } from '../../store/onboardingStore';

const approaches = [
  { id: 'tier', name: 'Tier-Based', desc: 'Visible status tiers (Bronze, Silver, Gold)', icon: '🏆' },
  { id: 'behavioral', name: 'Behavioral', desc: 'AI-driven invisible segments', icon: '🧠' },
  { id: 'hybrid', name: 'Hybrid', desc: 'Combine visible tiers with hidden segments (Recommended)', icon: '⚡' },
];

export const Screen3Segmentation: React.FC = () => {
  const { segmentationApproach, setSegmentationApproach } = useOnboardingStore();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Segmentation Strategy</h1>
          <p className="text-gray-600 text-lg">Define how you'll segment customers for personalization and targeting</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {approaches.map((approach) => (
            <Card key={approach.id} clickable selected={segmentationApproach === approach.id} onClick={() => setSegmentationApproach(approach.id)} className="p-6 text-center">
              <div className="text-5xl mb-4">{approach.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{approach.name}</h3>
              <p className="text-sm text-gray-600">{approach.desc}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tier Configuration</h3>
            <div className="space-y-3">
              {['Bronze', 'Silver', 'Gold', 'Platinum'].map((tier, i) => (
                <div key={tier} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${['bg-amber-600', 'bg-gray-400', 'bg-yellow-400', 'bg-purple-500'][i]}`}>{i + 1}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{tier}</div>
                    <div className="text-xs text-gray-500">{[0, 1000, 5000, 10000][i]}+ points/year</div>
                  </div>
                  <input type="text" placeholder="Benefits" className="px-3 py-1 border border-gray-300 rounded text-sm w-40" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Behavioral Segments</h3>
            <div className="space-y-2">
              {['Champions', 'Loyal Customers', 'At Risk', 'New Customers', 'Churned', 'Hibernating'].map((segment) => (
                <label key={segment} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-primary rounded" defaultChecked />
                  <span className="text-sm font-medium">{segment}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" className="w-4 h-4 text-primary rounded" defaultChecked />
                <span className="text-sm font-semibold">Enable ML-powered micro-segmentation</span>
              </div>
              <p className="text-xs text-gray-600 ml-6">AI will create dynamic sub-segments based on behavior patterns</p>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};
