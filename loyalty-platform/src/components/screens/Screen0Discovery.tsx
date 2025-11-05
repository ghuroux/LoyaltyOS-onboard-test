import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useOnboardingStore, type Template } from '../../store/onboardingStore';

const industries = [
  { id: 'retail-franchise', icon: '🏪', name: 'Retail Franchise', desc: 'Multi-location, franchise model' },
  { id: 'retail-chain', icon: '🛍️', name: 'Retail Chain', desc: 'Company-owned locations' },
  { id: 'online-retail', icon: '💻', name: 'Online Retail', desc: 'E-commerce focused' },
  { id: 'hospitality', icon: '🏨', name: 'Hospitality', desc: 'Hotels, QSR, Restaurants' },
  { id: 'airlines', icon: '✈️', name: 'Airlines', desc: 'Routes & partners' },
  { id: 'banking', icon: '🏦', name: 'Banking', desc: 'Products & accounts' },
  { id: 'telecom', icon: '📱', name: 'Telecom', desc: 'Subscribers & plans' },
  { id: 'custom', icon: '⚙️', name: 'Custom', desc: 'Build from scratch' },
];

const templates: { [key: string]: Template[] } = {
  'retail-franchise': [
    { name: 'Quick Service Restaurant', badge: 'POPULAR', implementations: 47, timeline: '30 days', patterns: 52 },
    { name: 'Multi-Brand Franchise', badge: 'ADVANCED', implementations: 23, timeline: '45 days', patterns: 68 },
  ],
  'retail-chain': [
    { name: 'Fashion Retail Chain', badge: 'PROVEN', implementations: 35, timeline: '30 days', patterns: 44 },
    { name: 'Grocery Chain', badge: 'COMPLEX', implementations: 18, timeline: '60 days', patterns: 73 },
  ],
  'hospitality': [
    { name: 'Hotel Loyalty Program', badge: 'PREMIUM', implementations: 29, timeline: '45 days', patterns: 61 },
    { name: 'Restaurant Group', badge: 'FLEXIBLE', implementations: 41, timeline: '30 days', patterns: 49 },
  ],
};

export const Screen0Discovery: React.FC = () => {
  const { selectedIndustry, selectedTemplate, setIndustry, setTemplate } = useOnboardingStore();
  const [localIndustry, setLocalIndustry] = useState<string | null>(selectedIndustry);

  const handleIndustrySelect = (industryId: string) => {
    setLocalIndustry(industryId);
    setIndustry(industryId);
    setTemplate(null); // Reset template when industry changes
  };

  const handleTemplateSelect = (template: Template) => {
    setTemplate(template);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Let's build your intelligence platform
          </h1>
          <p className="text-gray-600 text-lg">
            Select your industry to get started with pre-configured patterns and proven intelligence models
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {industries.map((industry) => (
            <Card
              key={industry.id}
              clickable
              selected={localIndustry === industry.id}
              onClick={() => handleIndustrySelect(industry.id)}
              className="p-6 text-center"
            >
              <div className="text-4xl mb-3">{industry.icon}</div>
              <div className="font-semibold text-gray-900 mb-1">{industry.name}</div>
              <div className="text-xs text-gray-500">{industry.desc}</div>
            </Card>
          ))}
        </div>

        {localIndustry && templates[localIndustry] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                📚 Available Templates for{' '}
                <span className="text-primary">
                  {industries.find((i) => i.id === localIndustry)?.name}
                </span>
              </h2>
              <Button variant="secondary" size="sm" onClick={() => setTemplate(null)}>
                Start from Scratch
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {templates[localIndustry].map((template, index) => (
                <Card
                  key={index}
                  clickable
                  selected={selectedTemplate?.name === template.name}
                  onClick={() => handleTemplateSelect(template)}
                  className="p-5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <span className="px-2 py-1 bg-secondary text-white rounded text-xs font-semibold">
                      {template.badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {template.patterns} pre-configured intelligence patterns
                  </p>
                  <div className="flex gap-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                    <div>
                      <strong className="text-gray-900">{template.implementations}</strong> live
                    </div>
                    <div>
                      <strong className="text-gray-900">{template.timeline}</strong> to deploy
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">🎯 Define Your Success Metrics</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              'Increase Customer Lifetime Value',
              'Reduce Operational Decision Time',
              'Improve Campaign ROI',
              'Reduce Customer Churn',
              'Increase Transaction Frequency',
              'Optimize Inventory Turnover',
            ].map((metric) => (
              <label key={metric} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" className="w-4 h-4 text-primary rounded" defaultChecked={metric.includes('Lifetime')} />
                <span className="text-sm text-gray-700">{metric}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
