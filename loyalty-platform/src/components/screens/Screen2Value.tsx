import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { useOnboardingStore } from '../../store/onboardingStore';
import { Star, DollarSign, Ticket, RefreshCw } from 'lucide-react';

const valueTypes = [
  { id: 'points', icon: Star, name: 'Points-Based', desc: 'Traditional points accumulation with flexible redemption options' },
  { id: 'cashback', icon: DollarSign, name: 'Cashback Wallet', desc: 'Direct monetary value stored in customer wallets' },
  { id: 'credits', icon: Ticket, name: 'Credits/Vouchers', desc: 'Fixed-value credits or voucher-based rewards' },
  { id: 'hybrid', icon: RefreshCw, name: 'Hybrid Model', desc: 'Combine multiple value types for maximum flexibility' },
];

export const Screen2Value: React.FC = () => {
  const { valueType, setValueType } = useOnboardingStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configure Your Value Mechanisms</h1>
          <p className="text-gray-600 text-lg">Define how value is earned, stored, and redeemed in your loyalty program</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {valueTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.id}
                clickable
                selected={valueType === type.id}
                onClick={() => setValueType(type.id)}
                className="p-6"
              >
                <div className="flex justify-center mb-4">
                  <Icon size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">{type.name}</h3>
                <p className="text-sm text-gray-600 text-center">{type.desc}</p>
              </Card>
            );
          })}
        </div>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Points Configuration</h3>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold mb-2 text-sm">Point Value</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">1 point =</span>
                <input type="text" defaultValue="0.01" className="px-3 py-2 border border-gray-300 rounded-lg w-20" />
                <select className="px-3 py-2 border border-gray-300 rounded-lg">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-2 text-sm">Point Expiry</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>Never expire</option>
                <option>After 12 months</option>
                <option>After 24 months</option>
                <option>Annual reset</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2 text-sm">Minimum Redemption</label>
              <input type="number" defaultValue="100" placeholder="Minimum points to redeem" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-sm">Maximum Balance</label>
              <input type="text" placeholder="No limit" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-3 text-sm">Advanced Options</label>
            <div className="space-y-2">
              {['Allow fractional points', 'Enable family pooling', 'Allow point transfers between members', 'Enable point purchase', 'Different earn vs burn rates'].map((option) => (
                <label key={option} className="flex items-center gap-2 p-2">
                  <input type="checkbox" className="w-4 h-4 text-primary rounded" defaultChecked={option === 'Allow fractional points'} />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-2xl mr-2">🤖</span>
            <strong className="text-amber-900">AI Optimization:</strong>
            <span className="text-amber-800 text-sm ml-2">
              The system will analyze redemption patterns and automatically suggest optimal point values and expiry rules to maximize engagement while managing liability.
            </span>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
