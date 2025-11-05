import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const Screen4Earning: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Earning Rules & Mechanisms</h1>
          <p className="text-gray-600 text-lg">Configure how customers earn value through purchases and behaviors</p>
        </div>

        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Base Earning Rules</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Earn Rate</label>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue="1" className="px-3 py-2 border border-gray-300 rounded-lg w-20" />
                <span className="text-sm">point per</span>
                <input type="number" defaultValue="1" className="px-3 py-2 border border-gray-300 rounded-lg w-20" />
                <span className="text-sm">USD spent</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Calculation Method</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>Round down</option>
                <option>Round up</option>
                <option>Round nearest</option>
                <option>Fractional</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Exclusions</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>Tax & tips excluded</option>
                <option>Include tax</option>
                <option>Include tips</option>
                <option>Include all</option>
              </select>
            </div>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 text-primary rounded" />
              <span className="text-sm font-medium">Enable AI-powered dynamic multipliers</span>
            </label>
            <p className="text-xs text-gray-600 mt-1 ml-6">System will adjust earn rates based on customer value and behavior</p>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Category Multipliers</h3>
          <div className="space-y-3">
            {[
              { cat: 'Food & Beverage', mult: '1x', ai: true },
              { cat: 'Retail Products', mult: '2x', ai: true },
              { cat: 'Gift Cards', mult: '0x', ai: false },
              { cat: 'Promotional Items', mult: '3x', ai: true },
            ].map((item) => (
              <div key={item.cat} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 font-medium">{item.cat}</div>
                <input type="text" defaultValue={item.mult} className="w-20 px-3 py-1 border border-gray-300 rounded" />
                {item.ai && <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">🤖 AI Optimized</span>}
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" className="mt-3">+ Add Category</Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Behavioral Bonuses</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Frequency Bonus', desc: 'Extra points for multiple visits per week', points: '+50' },
              { name: 'Threshold Bonus', desc: 'Bonus when spending exceeds $100', points: '+100' },
              { name: 'First Purchase', desc: 'Welcome bonus for new customers', points: '+500' },
              { name: 'Birthday Month', desc: 'Double points during birthday month', points: '2x' },
            ].map((bonus) => (
              <div key={bonus.name} className="p-4 border border-gray-300 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold">{bonus.name}</div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-semibold">{bonus.points}</span>
                </div>
                <p className="text-sm text-gray-600">{bonus.desc}</p>
                <label className="flex items-center gap-2 mt-3">
                  <input type="checkbox" className="w-4 h-4 text-primary rounded" defaultChecked />
                  <span className="text-xs text-gray-600">Enable</span>
                </label>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
