import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

export const Screen5Redemption: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Redemption & Burning Rules</h1>
          <p className="text-gray-600 text-lg">Configure how customers can redeem their earned value</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: '💳', name: 'Instant Discount', desc: 'Apply at point of sale' },
            { icon: '🎁', name: 'Product Rewards', desc: 'Redeem for specific items' },
            { icon: '🎟️', name: 'Vouchers', desc: 'Generate reward vouchers' },
            { icon: '🌟', name: 'Experiences', desc: 'Special events & perks' },
            { icon: '🤝', name: 'Partner Rewards', desc: 'External partner catalog' },
            { icon: '❤️', name: 'Donations', desc: 'Donate to charities' },
          ].map((type) => (
            <Card key={type.name} clickable className="p-5 text-center">
              <div className="text-4xl mb-3">{type.icon}</div>
              <h3 className="font-semibold mb-1">{type.name}</h3>
              <p className="text-xs text-gray-600">{type.desc}</p>
              <label className="flex items-center justify-center gap-2 mt-3">
                <input type="checkbox" className="w-4 h-4 text-primary rounded" defaultChecked={type.name === 'Instant Discount'} />
                <span className="text-xs">Enable</span>
              </label>
            </Card>
          ))}
        </div>

        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Redemption Rules</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Minimum Redemption</label>
              <input type="number" defaultValue="100" placeholder="Minimum points" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Maximum per Transaction</label>
              <input type="number" placeholder="No limit" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Redemption Value</label>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue="100" className="px-3 py-2 border border-gray-300 rounded-lg w-24" />
                <span className="text-sm">points =</span>
                <input type="number" defaultValue="1" className="px-3 py-2 border border-gray-300 rounded-lg w-24" />
                <span className="text-sm">USD</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Combinability</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>Can combine with promotions</option>
                <option>Cannot combine</option>
                <option>Custom rules</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">AI Intelligence Features</h3>
          <div className="space-y-3">
            {[
              { feature: 'Optimal Redemption Timing', desc: 'Notify customers when redemption value is highest' },
              { feature: 'Personalized Recommendations', desc: 'Suggest rewards based on preferences' },
              { feature: 'Breakage Prediction', desc: 'Forecast unredeemed point liability' },
              { feature: 'Redemption Nudges', desc: 'Encourage redemption to drive visits' },
            ].map((item) => (
              <label key={item.feature} className="flex items-start gap-3 p-4 bg-gradient-intelligence border border-purple-200 rounded-lg cursor-pointer hover:bg-purple-50">
                <input type="checkbox" className="w-4 h-4 text-primary rounded mt-1" defaultChecked />
                <div>
                  <div className="font-semibold text-sm">{item.feature}</div>
                  <div className="text-xs text-gray-600 mt-1">{item.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
