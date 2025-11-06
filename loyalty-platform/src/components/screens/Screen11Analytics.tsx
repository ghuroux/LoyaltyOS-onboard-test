import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

export const Screen11Analytics: React.FC = () => {
  const kpiCategories = [
    {
      category: 'Customer Metrics',
      kpis: ['Customer Lifetime Value', 'Churn Rate', 'Acquisition Cost', 'Retention Rate', 'Average Order Value'],
    },
    {
      category: 'Store Performance',
      kpis: ['Sales per Sq Ft', 'Traffic Conversion', 'Basket Size', 'Peak Hour Efficiency'],
    },
    {
      category: 'Program Health',
      kpis: ['Active Members', 'Redemption Rate', 'Points Liability', 'Engagement Score'],
    },
    {
      category: 'Campaign ROI',
      kpis: ['Campaign ROAS', 'Incremental Revenue', 'Cost per Acquisition', 'Response Rate'],
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & KPI Configuration</h1>
          <p className="text-gray-600 text-lg">Select and configure success metrics based on available data</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {kpiCategories.map((cat) => (
            <Card key={cat.category} className="p-6">
              <h3 className="text-lg font-semibold mb-4">{cat.category}</h3>
              <div className="space-y-2">
                {cat.kpis.map((kpi) => (
                  <label key={kpi} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-primary rounded" defaultChecked />
                    <span className="text-sm font-medium flex-1">{kpi}</span>
                    <span className="text-xs text-gray-500">✓ Available</span>
                  </label>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Dashboard Designer</h3>
          <p className="text-sm text-gray-600 mb-4">Drag KPIs to design your executive dashboard</p>
          <div className="grid grid-cols-3 gap-4 min-h-[200px] bg-gray-50 rounded-lg p-4">
            {['Customer Lifetime Value', 'Active Members', 'Campaign ROAS', 'Churn Rate', 'Sales per Sq Ft', 'Redemption Rate'].map((kpi) => (
              <div key={kpi} className="p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg text-center">
                <div className="text-sm font-semibold text-gray-700">{kpi}</div>
                <div className="text-2xl font-bold text-primary mt-2">--</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Alert Configuration</h3>
          <div className="space-y-3">
            {[
              { metric: 'Churn Rate', condition: 'exceeds', threshold: '5%', action: 'Email + Slack' },
              { metric: 'Points Liability', condition: 'exceeds', threshold: '$100K', action: 'Email' },
              { metric: 'Campaign ROAS', condition: 'falls below', threshold: '2.5x', action: 'Dashboard Alert' },
            ].map((alert, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 grid grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Metric</label>
                    <input type="text" value={alert.metric} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" readOnly />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Condition</label>
                    <select className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                      <option>{alert.condition}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Threshold</label>
                    <input type="text" value={alert.threshold} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Action</label>
                    <select className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                      <option>{alert.action}</option>
                    </select>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-700">✕</button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
