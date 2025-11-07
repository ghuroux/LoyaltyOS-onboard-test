import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { useOnboardingStore } from '../../store/onboardingStore';
import { CampaignTemplateBuilder } from '../campaign/CampaignTemplateBuilder';
import { Clock, Infinity, Zap, DollarSign, Megaphone, BarChart, CheckCircle, Lightbulb } from 'lucide-react';

type CampaignType = 'time-based' | 'long-living' | 'trigger-based' | 'one-off';

export const Screen10Campaigns: React.FC = () => {
  const [activeType, setActiveType] = useState<CampaignType>('time-based');
  const [builderOpen, setBuilderOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<{ id: string; name: string; type: CampaignType } | null>(null);
  const { campaignSettings, updateCampaignSettings } = useOnboardingStore();

  const campaignTypes = [
    {
      id: 'time-based' as CampaignType,
      icon: Clock,
      name: 'Time-Based Campaigns',
      desc: 'Limited duration promotions',
      examples: ['Seasonal Sales', 'Holiday Campaigns', 'Product Launches', 'Competitions', 'Flash Sales'],
      color: 'bg-blue-500',
    },
    {
      id: 'long-living' as CampaignType,
      icon: Infinity,
      name: 'Long-Living Campaigns',
      desc: 'Always-on, ongoing promotions',
      examples: ['Welcome Series', 'Referral Programs', 'Category Promotions', 'Brand Partnerships'],
      color: 'bg-green-500',
    },
    {
      id: 'trigger-based' as CampaignType,
      icon: Zap,
      name: 'Event-Based Campaigns',
      desc: 'Event-driven, always ready',
      examples: ['Weather Triggers', 'Location Events', 'Inventory Alerts', 'Social Media', 'Cart Abandonment'],
      color: 'bg-amber-500',
    },
    {
      id: 'one-off' as CampaignType,
      icon: DollarSign,
      name: 'One-Off Issue',
      desc: 'Immediate, ad-hoc rewards',
      examples: ['Customer Service Recovery', 'VIP Appreciation', 'Special Recognition', 'Contest Winners'],
      color: 'bg-purple-500',
    },
  ];

  const starterTemplates = {
    'time-based': [
      {
        id: 'seasonal-sale',
        name: 'Seasonal Sale',
        description: 'Limited-time seasonal promotion',
        duration: '30 days',
        typical: 'Summer Sale, Holiday Campaign, Back to School',
      },
      {
        id: 'flash-sale',
        name: 'Flash Sale',
        description: '24-48 hour high-urgency promotion',
        duration: '24-48 hours',
        typical: 'Weekend Flash Sale, Daily Deals, Lightning Offers',
      },
      {
        id: 'competition',
        name: 'Competition/Contest',
        description: 'Customer competition with prizes',
        duration: '7-30 days',
        typical: 'Monthly Contest, Sweepstakes, Prize Draws',
      },
    ],
    'long-living': [
      {
        id: 'welcome-series',
        name: 'Welcome Series',
        description: 'New customer onboarding sequence',
        duration: 'Ongoing',
        typical: 'First Purchase Discount, Welcome Bonus, Member Orientation',
      },
      {
        id: 'referral-program',
        name: 'Referral Program',
        description: 'Member-get-member incentives',
        duration: 'Ongoing',
        typical: 'Refer a Friend, Share & Earn, Brand Ambassador',
      },
      {
        id: 'category-promo',
        name: 'Category Promotion',
        description: 'Ongoing category-specific offers',
        duration: 'Ongoing',
        typical: 'Coffee Loyalty, Breakfast Specials, Premium Product Rewards',
      },
    ],
    'trigger-based': [
      {
        id: 'weather-trigger',
        name: 'Weather-Based Offers',
        description: 'Promotions triggered by weather conditions',
        trigger: 'Weather API',
        typical: 'Hot Day → Ice Cream Discount, Rainy Day → Delivery Offer',
      },
      {
        id: 'location-trigger',
        name: 'Location/Geofence',
        description: 'Triggered when customer near store',
        trigger: 'GPS/Location',
        typical: 'Nearby Alert, Store Visit Prompt, Local Offers',
      },
      {
        id: 'cart-abandon',
        name: 'Cart Abandonment',
        description: 'Re-engage after abandoned cart',
        trigger: '24hr after abandon',
        typical: 'Reminder Email, Small Discount, "Complete Your Order"',
      },
      {
        id: 'inventory-trigger',
        name: 'Inventory Events',
        description: 'Back in stock, low stock alerts',
        trigger: 'Inventory system',
        typical: 'Favorite Item Available, Last Chance Alert, New Arrival',
      },
    ],
    'one-off': [
      {
        id: 'service-recovery',
        name: 'Service Recovery',
        description: 'Compensate for poor experience',
        duration: 'Immediate',
        typical: 'Order Issue, Long Wait Time, Complaint Resolution',
      },
      {
        id: 'vip-appreciation',
        name: 'VIP Appreciation',
        description: 'Special recognition for top customers',
        duration: 'Immediate',
        typical: 'Top Spender Reward, Milestone Celebration, Thank You Gift',
      },
      {
        id: 'contest-winner',
        name: 'Contest/Competition Winner',
        description: 'Award prizes to winners',
        duration: 'Immediate',
        typical: 'Prize Distribution, Sweepstakes Winner, Leaderboard Reward',
      },
    ],
  };

  const currentTemplates = starterTemplates[activeType] || [];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Megaphone className="text-brand-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Campaign Templates & Framework</h1>
          </div>
          <p className="text-gray-600 text-lg">Configure campaign templates for your program (create actual campaigns later)</p>
        </div>

        {/* Campaign Type Selection */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {campaignTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`p-6 rounded-lg border transition-all text-left ${
                  activeType === type.id
                    ? 'border-primary bg-gray-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex justify-center mb-3">
                  <div className={`p-3 ${type.color} rounded-lg`}>
                    <IconComponent className="text-white" size={28} />
                  </div>
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${activeType === type.id ? 'text-brand-600' : 'text-gray-900'}`}>
                  {type.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{type.desc}</p>
                <div className="text-xs text-gray-500">
                  <strong>Examples:</strong> {type.examples.slice(0, 2).join(', ')}
                </div>
              </button>
            );
          })}
        </div>

        {/* Starter Templates */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Starter Templates for {campaignTypes.find((t) => t.id === activeType)?.name}
            </h2>
            <button
              onClick={() => {
                setEditingTemplate(null);
                setBuilderOpen(true);
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              Create New Template
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentTemplates.map((template) => (
              <Card key={template.id} className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={campaignSettings?.enabledTemplates?.includes(template.id) || false}
                          onChange={(e) => {
                            const current = campaignSettings?.enabledTemplates || [];
                            updateCampaignSettings?.({
                              enabledTemplates: e.target.checked
                                ? [...current, template.id]
                                : current.filter((id: string) => id !== template.id),
                            });
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                      </label>
                      <h3 className="text-lg font-semibold">{template.name}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Template</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">
                          {activeType === 'trigger-based' ? 'Trigger:' : activeType === 'one-off' ? 'Timing:' : 'Duration:'}
                        </span>
                        <span className="font-medium">
                          {activeType === 'trigger-based' ? (template as any).trigger : (template as any).duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Typical Use:</span>
                        <span className="text-xs text-gray-600">{(template as any).typical}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setEditingTemplate({ id: template.id, name: template.name, type: activeType });
                      setBuilderOpen(true);
                    }}
                    className="ml-4 px-4 py-2 text-sm text-brand-600 hover:bg-gray-50 rounded-lg font-medium border border-brand-500"
                  >
                    Configure
                  </button>
                </div>

                {campaignSettings?.enabledTemplates?.includes(template.id) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Default Discount Type</label>
                        <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
                          <option>Percentage</option>
                          <option>Fixed Amount</option>
                          <option>Points Multiplier</option>
                          <option>Free Item</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Default Discount Value</label>
                        <input
                          type="text"
                          placeholder="e.g., 10%, $5, 2x"
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Default Target Segment</label>
                        <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
                          <option>All Customers</option>
                          <option>Champions</option>
                          <option>At Risk</option>
                          <option>Lost</option>
                          <option>Custom...</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Program-Wide Campaign Controls */}
        <Card className="p-5 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart size={20} className="text-brand-600" />
            <h3 className="text-lg font-semibold">Program-Wide Campaign Controls</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-semibold mb-2">Maximum Budget per Campaign</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">$</span>
                <input
                  type="number"
                  value={campaignSettings?.maxBudgetPerCampaign || 5000}
                  onChange={(e) => updateCampaignSettings?.({ maxBudgetPerCampaign: parseInt(e.target.value) })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">Maximum spend allowed per individual campaign</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-semibold mb-2">Maximum Concurrent Campaigns</label>
              <input
                type="number"
                value={campaignSettings?.maxConcurrentCampaigns || 10}
                onChange={(e) => updateCampaignSettings?.({ maxConcurrentCampaigns: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-600 mt-2">Number of campaigns that can run simultaneously</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-semibold mb-2">Minimum ROI Target</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={campaignSettings?.minRoiTarget || 3.0}
                  onChange={(e) => updateCampaignSettings?.({ minRoiTarget: parseFloat(e.target.value) })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <span className="text-gray-600">x</span>
              </div>
              <p className="text-xs text-gray-600 mt-2">Required return multiple for campaign approval</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-semibold mb-2">Margin Protection</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={campaignSettings?.marginProtection || 15}
                  onChange={(e) => updateCampaignSettings?.({ marginProtection: parseInt(e.target.value) })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <span className="text-gray-600">%</span>
              </div>
              <p className="text-xs text-gray-600 mt-2">Minimum gross margin to maintain across campaigns</p>
            </div>
          </div>
        </Card>

        {/* Campaign Approval Workflow */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={20} className="text-brand-600" />
            <h3 className="text-lg font-semibold">Campaign Approval Workflow</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Define who can create and approve campaigns</p>

          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={campaignSettings?.requireApproval || false}
                onChange={(e) => updateCampaignSettings?.({ requireApproval: e.target.checked })}
                className="h-4 w-4 text-brand-600 border-gray-300 rounded"
              />
              <div className="flex-1">
                <div className="font-medium text-sm">Require approval for all campaigns</div>
                <div className="text-xs text-gray-500">All campaigns must be approved before going live</div>
              </div>
            </label>

            {campaignSettings?.requireApproval && (
              <div className="ml-7 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Approval Authority</label>
                  <select
                    value={campaignSettings?.approvalAuthority || 'marketing-manager'}
                    onChange={(e) => updateCampaignSettings?.({ approvalAuthority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="store-manager">Store Manager</option>
                    <option value="regional-manager">Regional Manager</option>
                    <option value="marketing-manager">Marketing Manager</option>
                    <option value="director">Marketing Director</option>
                    <option value="admin">System Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Auto-Approval Threshold</label>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Campaigns under</span>
                    <input
                      type="number"
                      value={campaignSettings?.autoApprovalThreshold || 1000}
                      onChange={(e) => updateCampaignSettings?.({ autoApprovalThreshold: parseInt(e.target.value) })}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <span className="text-sm text-gray-600">can be auto-approved</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Info Box */}
        <Card className="p-5 mt-8 bg-gray-50 border border-gray-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="text-amber-500 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Campaign Templates vs. Active Campaigns</h3>
              <p className="text-sm text-gray-700 mb-2">
                During onboarding, you're setting up <strong>templates</strong> - the framework for future campaigns.
              </p>
              <p className="text-sm text-gray-700">
                Once your program is live, you'll use these templates to quickly create actual campaigns with specific dates,
                offers, and targeting. Think of templates as your campaign "starting points."
              </p>
            </div>
          </div>
        </Card>

        {/* Campaign Template Builder Modal */}
        <CampaignTemplateBuilder
          isOpen={builderOpen}
          onClose={() => {
            setBuilderOpen(false);
            setEditingTemplate(null);
          }}
          initialType={editingTemplate?.type}
          templateId={editingTemplate?.id}
          templateName={editingTemplate?.name}
          onSave={(template) => {
            console.log('Template saved:', template);
            // TODO: Save to store with detailed configuration
          }}
        />
      </div>
    </motion.div>
  );
};
