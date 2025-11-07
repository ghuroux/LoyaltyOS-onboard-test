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
    { name: 'Quick Service Restaurant', badge: 'POPULAR', description: 'Optimized for fast-casual dining with drive-through and delivery support' },
    { name: 'Multi-Brand Franchise', badge: 'ADVANCED', description: 'Manage multiple brands under one franchise umbrella with consolidated insights' },
    { name: 'Retail Store Network', badge: 'FLEXIBLE', description: 'Traditional retail with product categories and inventory intelligence' },
  ],
  'retail-chain': [
    { name: 'Fashion Retail Chain', badge: 'POPULAR', description: 'Apparel and accessories with seasonal collections and style preferences' },
    { name: 'Grocery Chain', badge: 'COMPREHENSIVE', description: 'Fresh and packaged goods with basket analysis and shopper missions' },
    { name: 'Department Store', badge: 'ENTERPRISE', description: 'Multi-category retail with cross-department intelligence' },
  ],
  'online-retail': [
    { name: 'E-Commerce Platform', badge: 'POPULAR', description: 'Digital-first with cart abandonment recovery and browse behavior tracking' },
    { name: 'Marketplace Model', badge: 'ADVANCED', description: 'Multi-vendor platform with seller performance and product recommendations' },
    { name: 'Subscription Commerce', badge: 'SPECIALIZED', description: 'Recurring revenue model with churn prediction and upgrade paths' },
  ],
  'hospitality': [
    { name: 'Hotel Loyalty Program', badge: 'PREMIUM', description: 'Stay-based rewards with room preferences and ancillary upsells' },
    { name: 'Restaurant Group', badge: 'FLEXIBLE', description: 'Dining rewards with reservation preferences and menu personalization' },
    { name: 'QSR Chain', badge: 'POPULAR', description: 'Fast service with mobile ordering and pickup/delivery optimization' },
  ],
  'airlines': [
    { name: 'Full-Service Carrier', badge: 'COMPREHENSIVE', description: 'Miles-based program with cabin upgrades and partner networks' },
    { name: 'Low-Cost Carrier', badge: 'STREAMLINED', description: 'Simplified rewards focused on flight frequency and ancillary purchases' },
    { name: 'Regional Airline', badge: 'SPECIALIZED', description: 'Route-specific rewards with business traveler focus' },
  ],
  'banking': [
    { name: 'Retail Banking', badge: 'POPULAR', description: 'Account-based rewards with product cross-sell and financial wellness' },
    { name: 'Credit Card Program', badge: 'ADVANCED', description: 'Spend-based rewards with category bonuses and redemption flexibility' },
    { name: 'Wealth Management', badge: 'PREMIUM', description: 'Relationship-based benefits with asset milestones and service tiers' },
  ],
  'telecom': [
    { name: 'Mobile Network Operator', badge: 'POPULAR', description: 'Usage-based rewards with plan upgrades and device financing' },
    { name: 'Broadband Provider', badge: 'STREAMLINED', description: 'Tenure-based benefits with service add-ons and referral bonuses' },
    { name: 'Converged Services', badge: 'COMPREHENSIVE', description: 'Multi-service bundles with household-level rewards' },
  ],
  'custom': [
    { name: 'Start from Scratch', badge: 'FLEXIBLE', description: 'Build a completely custom loyalty program tailored to your unique business model' },
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
      className="p-8"
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
              className="p-5 text-center"
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
            className="bg-white rounded-xl border border-gray-200 p-5 mb-5"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-gray-900">
                📚 Available Templates for{' '}
                <span className="text-brand-600">
                  {industries.find((i) => i.id === localIndustry)?.name}
                </span>
              </h2>
              <Button variant="secondary" size="sm" onClick={() => setTemplate(null)}>
                Start from Scratch
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {templates[localIndustry].map((template, index) => (
                <Card
                  key={index}
                  clickable
                  selected={selectedTemplate?.name === template.name}
                  onClick={() => handleTemplateSelect(template)}
                  className="p-5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">{template.name}</h3>
                        <span className="px-2 py-1 bg-secondary text-white rounded text-xs font-semibold">
                          {template.badge}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 Define Your Success Metrics</h2>
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
