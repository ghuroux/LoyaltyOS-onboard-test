import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

export const Screen13Data: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Strategy & ETL Configuration</h1>
          <p className="text-gray-600 text-lg">Define data sources and learning strategy for the AI engine</p>
        </div>

        <Card className="p-5 mb-5">
          <h3 className="text-lg font-semibold mb-4">Data Source Inventory</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'POS System', status: 'connected', quality: 95 },
              { name: 'CRM/CDP', status: 'pending', quality: 0 },
              { name: 'Inventory Management', status: 'pending', quality: 0 },
              { name: 'Marketing Platform', status: 'pending', quality: 0 },
            ].map((source) => (
              <div key={source.name} className="p-4 border border-gray-300 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{source.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${source.status === 'connected' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {source.status}
                  </span>
                </div>
                {source.status === 'connected' && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Data Quality Score</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${source.quality}%` }} />
                      </div>
                      <span className="text-sm font-semibold">{source.quality}%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 mb-5">
          <h3 className="text-lg font-semibold mb-4">Historical Data Assessment</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-brand-600 mb-2">24 months</div>
              <div className="text-sm text-gray-600">Transaction History</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-brand-600 mb-2">2.5M</div>
              <div className="text-sm text-gray-600">Customer Records</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-brand-600 mb-2">82%</div>
              <div className="text-sm text-gray-600">Data Completeness</div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-lg font-semibold mb-4">Learning Timeline</h3>
          <div className="space-y-3">
            {[
              { phase: 'Days 1-7', title: 'Baseline Establishment', desc: 'Initial data ingestion and pattern recognition', color: 'blue' },
              { phase: 'Days 8-30', title: 'Pattern Detection', desc: 'Identify customer behaviors and trends', color: 'yellow' },
              { phase: 'Days 31-60', title: 'Confidence Building', desc: 'Validate predictions with real outcomes', color: 'orange' },
              { phase: 'Days 61-90', title: 'Automation Enablement', desc: 'Begin autonomous decision making', color: 'green' },
            ].map((stage) => (
              <div key={stage.phase} className={`flex items-start gap-4 p-4 border-l-4 border-${stage.color}-500 bg-${stage.color}-50 rounded-r-lg`}>
                <div className="w-24 flex-shrink-0">
                  <div className="text-sm font-bold text-gray-700">{stage.phase}</div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold mb-1">{stage.title}</div>
                  <div className="text-sm text-gray-600">{stage.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
