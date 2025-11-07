import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { useOnboardingStore } from '../../store/onboardingStore';
import {
  RefreshCw,
  Target,
  Moon,
  Cake,
  Clock,
  Star,
  Mail,
  MessageSquare,
  Ticket,
  Bell,
  Megaphone,
  Award,
  Tag
} from 'lucide-react';

type TriggerType = 'segment' | 'milestone' | 'inactivity' | 'birthday' | 'expiry' | 'threshold';

export const Screen8Automations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TriggerType>('segment');
  const { segments, automations, addAutomation, updateAutomation, removeAutomation } = useOnboardingStore();
  const [expandedAutomation, setExpandedAutomation] = useState<string | null>(null);

  const triggerTabs = [
    { id: 'segment' as TriggerType, icon: RefreshCw, label: 'Segment Transitions', desc: 'When customer moves between segments' },
    { id: 'milestone' as TriggerType, icon: Target, label: 'Milestones', desc: 'Purchase count, spend thresholds' },
    { id: 'inactivity' as TriggerType, icon: Moon, label: 'Inactivity', desc: 'No visits for X days' },
    { id: 'birthday' as TriggerType, icon: Cake, label: 'Birthday', desc: 'Customer birthday rewards' },
    { id: 'expiry' as TriggerType, icon: Clock, label: 'Points Expiry', desc: 'Points about to expire' },
    { id: 'threshold' as TriggerType, icon: Star, label: 'Tier Changes', desc: 'Tier upgrades/downgrades' },
  ];

  const actionOptions = [
    { id: 'email', icon: Mail, label: 'Send Email', hasTemplate: true },
    { id: 'sms', icon: MessageSquare, label: 'Send SMS', hasTemplate: true },
    { id: 'voucher', icon: Ticket, label: 'Issue Voucher', hasAmount: true },
    { id: 'points', icon: Star, label: 'Award Bonus Points', hasAmount: true },
    { id: 'alert', icon: Bell, label: 'Alert Account Manager', hasRecipient: true },
    { id: 'campaign', icon: Megaphone, label: 'Add to Campaign', hasCampaign: true },
    { id: 'tier-adjust', icon: Award, label: 'Adjust Tier Status', hasTier: true },
    { id: 'tag', icon: Tag, label: 'Add Customer Tag', hasTag: true },
  ];

  const currentAutomations = automations?.filter((a) => a.triggerType === activeTab) || [];

  const renderAutomationCard = (automation: any) => {
    const isExpanded = expandedAutomation === automation.id;

    return (
      <Card key={automation.id} className="p-5 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={automation.enabled}
                  onChange={(e) => updateAutomation?.(automation.id, { enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
              </label>
              <h3 className="text-lg font-semibold">{automation.name || 'Untitled Automation'}</h3>
            </div>
            {!isExpanded && (
              <p className="text-sm text-gray-600">
                {automation.actions?.length || 0} action(s) configured
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpandedAutomation(isExpanded ? null : automation.id)}
              className="px-3 py-1 text-sm text-brand-600 hover:bg-gray-50 rounded"
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
            <button
              onClick={() => removeAutomation?.(automation.id)}
              className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
            >
              Delete
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
            {/* Render trigger-specific configuration */}
            {activeTab === 'segment' && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">WHEN Segment Changes FROM:</label>
                  <select
                    value={automation.fromSegment || ''}
                    onChange={(e) => updateAutomation?.(automation.id, { fromSegment: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="">Any Segment</option>
                    {segments.filter((s) => s.enabled).map((segment) => (
                      <option key={segment.id} value={segment.id}>
                        {segment.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">TO:</label>
                  <select
                    value={automation.toSegment || ''}
                    onChange={(e) => updateAutomation?.(automation.id, { toSegment: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="">Select Segment...</option>
                    {segments.filter((s) => s.enabled).map((segment) => (
                      <option key={segment.id} value={segment.id}>
                        {segment.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'milestone' && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-semibold text-gray-700 mb-2">WHEN Customer Reaches:</label>
                <div className="grid grid-cols-3 gap-3">
                  <select
                    value={automation.milestoneType || 'purchase-count'}
                    onChange={(e) => updateAutomation?.(automation.id, { milestoneType: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="purchase-count">Purchase Count</option>
                    <option value="lifetime-spend">Lifetime Spend</option>
                    <option value="points-earned">Points Earned</option>
                    <option value="referrals">Referrals Made</option>
                  </select>
                  <input
                    type="number"
                    value={automation.milestoneValue || 100}
                    onChange={(e) => updateAutomation?.(automation.id, { milestoneValue: parseInt(e.target.value) })}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Value"
                  />
                  <span className="flex items-center text-sm text-gray-600">
                    {automation.milestoneType === 'purchase-count' && 'purchases'}
                    {automation.milestoneType === 'lifetime-spend' && 'dollars'}
                    {automation.milestoneType === 'points-earned' && 'points'}
                    {automation.milestoneType === 'referrals' && 'referrals'}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'inactivity' && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-semibold text-gray-700 mb-2">WHEN Customer Inactive For:</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={automation.inactivityDays || 30}
                    onChange={(e) => updateAutomation?.(automation.id, { inactivityDays: parseInt(e.target.value) })}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Days"
                  />
                  <span className="text-sm text-gray-600">days without a visit or purchase</span>
                </div>
                <div className="mt-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={automation.excludeRecentContacts || false}
                      onChange={(e) => updateAutomation?.(automation.id, { excludeRecentContacts: e.target.checked })}
                      className="h-4 w-4 text-brand-600 border-gray-300 rounded"
                    />
                    Exclude customers contacted in the last 14 days
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'birthday' && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-semibold text-gray-700 mb-2">WHEN Customer Birthday:</label>
                <div className="space-y-3">
                  <select
                    value={automation.birthdayTiming || 'on-day'}
                    onChange={(e) => updateAutomation?.(automation.id, { birthdayTiming: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="7-days-before">7 Days Before Birthday</option>
                    <option value="3-days-before">3 Days Before Birthday</option>
                    <option value="on-day">On Birthday</option>
                    <option value="birthday-week">Any Day During Birthday Week</option>
                    <option value="birthday-month">Any Day During Birthday Month</option>
                  </select>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={automation.requireOptIn || false}
                      onChange={(e) => updateAutomation?.(automation.id, { requireOptIn: e.target.checked })}
                      className="h-4 w-4 text-brand-600 border-gray-300 rounded"
                    />
                    Only send if customer opted in to birthday communications
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'expiry' && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-semibold text-gray-700 mb-2">WHEN Points About to Expire:</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={automation.expiryWarningDays || 14}
                      onChange={(e) => updateAutomation?.(automation.id, { expiryWarningDays: parseInt(e.target.value) })}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <span className="text-sm text-gray-600">days before expiry</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-600">Minimum points to trigger warning:</label>
                    <input
                      type="number"
                      value={automation.minPointsToWarn || 100}
                      onChange={(e) => updateAutomation?.(automation.id, { minPointsToWarn: parseInt(e.target.value) })}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <span className="text-sm text-gray-600">points</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'threshold' && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-semibold text-gray-700 mb-2">WHEN Tier Status Changes:</label>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={automation.tierChangeType || 'any'}
                    onChange={(e) => updateAutomation?.(automation.id, { tierChangeType: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="any">Any Tier Change</option>
                    <option value="upgrade">Upgrade Only</option>
                    <option value="downgrade">Downgrade Only</option>
                    <option value="specific">Specific Tier Reached</option>
                  </select>
                  {automation.tierChangeType === 'specific' && (
                    <select
                      value={automation.specificTier || ''}
                      onChange={(e) => updateAutomation?.(automation.id, { specificTier: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
                    >
                      <option value="">Select Tier...</option>
                      <option value="bronze">Bronze</option>
                      <option value="silver">Silver</option>
                      <option value="gold">Gold</option>
                      <option value="platinum">Platinum</option>
                    </select>
                  )}
                </div>
              </div>
            )}

            {/* THEN Actions */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-bold text-gray-700 mb-3">THEN Execute Actions:</h4>

              <div className="space-y-3">
                {actionOptions.map((actionOption) => {
                  const isEnabled = automation.actions?.some((a: any) => a.type === actionOption.id) || false;
                  const action = automation.actions?.find((a: any) => a.type === actionOption.id);

                  return (
                    <div key={actionOption.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isEnabled}
                          onChange={(e) => {
                            const currentActions = automation.actions || [];
                            if (e.target.checked) {
                              updateAutomation?.(automation.id, {
                                actions: [...currentActions, { type: actionOption.id, config: {} }]
                              });
                            } else {
                              updateAutomation?.(automation.id, {
                                actions: currentActions.filter((a: any) => a.type !== actionOption.id)
                              });
                            }
                          }}
                          className="mt-1 h-4 w-4 text-brand-600 border-gray-300 rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <actionOption.icon size={18} className="text-gray-700" />
                            <span className="font-medium text-sm">{actionOption.label}</span>
                          </div>

                          {isEnabled && (
                            <div className="mt-2 space-y-2">
                              {actionOption.hasTemplate && (
                                <>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Service:</label>
                                    <select
                                      value={action?.config?.service || 'default'}
                                      onChange={(e) => {
                                        const currentActions = automation.actions || [];
                                        updateAutomation?.(automation.id, {
                                          actions: currentActions.map((a: any) =>
                                            a.type === actionOption.id
                                              ? { ...a, config: { ...a.config, service: e.target.value } }
                                              : a
                                          )
                                        });
                                      }}
                                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                                    >
                                      {actionOption.id === 'email' && (
                                        <>
                                          <option value="sendgrid">SendGrid</option>
                                          <option value="salesforce">Salesforce Marketing Cloud</option>
                                          <option value="mailchimp">Mailchimp</option>
                                          <option value="custom">Custom Integration</option>
                                        </>
                                      )}
                                      {actionOption.id === 'sms' && (
                                        <>
                                          <option value="twilio">Twilio</option>
                                          <option value="plivo">Plivo</option>
                                          <option value="messagebird">MessageBird</option>
                                          <option value="custom">Custom Integration</option>
                                        </>
                                      )}
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Template:</label>
                                    <input
                                      type="text"
                                      value={action?.config?.template || ''}
                                      onChange={(e) => {
                                        const currentActions = automation.actions || [];
                                        updateAutomation?.(automation.id, {
                                          actions: currentActions.map((a: any) =>
                                            a.type === actionOption.id
                                              ? { ...a, config: { ...a.config, template: e.target.value } }
                                              : a
                                          )
                                        });
                                      }}
                                      placeholder={`e.g., ${actionOption.id === 'email' ? 'Win-back Offer' : 'Welcome Message'}`}
                                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                    />
                                  </div>
                                </>
                              )}

                              {actionOption.hasAmount && (
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">
                                      {actionOption.id === 'voucher' ? 'Type:' : 'Amount:'}
                                    </label>
                                    {actionOption.id === 'voucher' ? (
                                      <select
                                        value={action?.config?.voucherType || 'value'}
                                        onChange={(e) => {
                                          const currentActions = automation.actions || [];
                                          updateAutomation?.(automation.id, {
                                            actions: currentActions.map((a: any) =>
                                              a.type === actionOption.id
                                                ? { ...a, config: { ...a.config, voucherType: e.target.value } }
                                                : a
                                            )
                                          });
                                        }}
                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                      >
                                        <option value="value">$ Value</option>
                                        <option value="sku">Specific SKU</option>
                                      </select>
                                    ) : (
                                      <input
                                        type="number"
                                        value={action?.config?.amount || ''}
                                        onChange={(e) => {
                                          const currentActions = automation.actions || [];
                                          updateAutomation?.(automation.id, {
                                            actions: currentActions.map((a: any) =>
                                              a.type === actionOption.id
                                                ? { ...a, config: { ...a.config, amount: parseInt(e.target.value) } }
                                                : a
                                            )
                                          });
                                        }}
                                        placeholder="Amount"
                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                      />
                                    )}
                                  </div>
                                  {actionOption.id === 'voucher' && (
                                    <div>
                                      <label className="block text-xs text-gray-600 mb-1">
                                        {action?.config?.voucherType === 'sku' ? 'SKU:' : 'Amount:'}
                                      </label>
                                      <input
                                        type="text"
                                        value={action?.config?.value || ''}
                                        onChange={(e) => {
                                          const currentActions = automation.actions || [];
                                          updateAutomation?.(automation.id, {
                                            actions: currentActions.map((a: any) =>
                                              a.type === actionOption.id
                                                ? { ...a, config: { ...a.config, value: e.target.value } }
                                                : a
                                            )
                                          });
                                        }}
                                        placeholder={action?.config?.voucherType === 'sku' ? 'SKU-12345' : '$25'}
                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                      />
                                    </div>
                                  )}
                                </div>
                              )}

                              {actionOption.hasRecipient && (
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Recipient:</label>
                                  <select
                                    value={action?.config?.recipient || 'account-manager'}
                                    onChange={(e) => {
                                      const currentActions = automation.actions || [];
                                      updateAutomation?.(automation.id, {
                                        actions: currentActions.map((a: any) =>
                                          a.type === actionOption.id
                                            ? { ...a, config: { ...a.config, recipient: e.target.value } }
                                            : a
                                        )
                                      });
                                    }}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                  >
                                    <option value="account-manager">Account Manager</option>
                                    <option value="store-manager">Store Manager</option>
                                    <option value="regional-manager">Regional Manager</option>
                                    <option value="custom">Custom Email</option>
                                  </select>
                                </div>
                              )}

                              {actionOption.hasCampaign && (
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Campaign:</label>
                                  <input
                                    type="text"
                                    value={action?.config?.campaignName || ''}
                                    onChange={(e) => {
                                      const currentActions = automation.actions || [];
                                      updateAutomation?.(automation.id, {
                                        actions: currentActions.map((a: any) =>
                                          a.type === actionOption.id
                                            ? { ...a, config: { ...a.config, campaignName: e.target.value } }
                                            : a
                                        )
                                      });
                                    }}
                                    placeholder="Campaign name or ID"
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                  />
                                </div>
                              )}

                              {actionOption.hasTier && (
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Action:</label>
                                  <select
                                    value={action?.config?.tierAction || 'upgrade'}
                                    onChange={(e) => {
                                      const currentActions = automation.actions || [];
                                      updateAutomation?.(automation.id, {
                                        actions: currentActions.map((a: any) =>
                                          a.type === actionOption.id
                                            ? { ...a, config: { ...a.config, tierAction: e.target.value } }
                                            : a
                                        )
                                      });
                                    }}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                  >
                                    <option value="upgrade">Upgrade One Tier</option>
                                    <option value="downgrade">Downgrade One Tier</option>
                                    <option value="maintain">Maintain Current Tier</option>
                                    <option value="reset">Reset to Base Tier</option>
                                  </select>
                                </div>
                              )}

                              {actionOption.hasTag && (
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Tag Name:</label>
                                  <input
                                    type="text"
                                    value={action?.config?.tagName || ''}
                                    onChange={(e) => {
                                      const currentActions = automation.actions || [];
                                      updateAutomation?.(automation.id, {
                                        actions: currentActions.map((a: any) =>
                                          a.type === actionOption.id
                                            ? { ...a, config: { ...a.config, tagName: e.target.value } }
                                            : a
                                        )
                                      });
                                    }}
                                    placeholder="e.g., high-value, at-risk"
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Card>
    );
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">⚡ Automations & Triggers</h1>
          <p className="text-gray-600 text-lg">Define automated actions based on customer behavior and lifecycle events</p>
        </div>

        {/* Trigger Type Tabs */}
        <div className="grid grid-cols-6 gap-3 mb-8">
          {triggerTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-lg border transition-all ${
                activeTab === tab.id
                  ? 'border-primary bg-gray-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="mb-2">
                <tab.icon size={32} className={activeTab === tab.id ? 'text-brand-600' : 'text-gray-700'} />
              </div>
              <div className={`text-sm font-semibold mb-1 ${activeTab === tab.id ? 'text-brand-600' : 'text-gray-900'}`}>
                {tab.label}
              </div>
              <div className="text-xs text-gray-500">{tab.desc}</div>
              <div className="mt-2 text-xs font-bold text-brand-600">
                {automations?.filter((a) => a.triggerType === tab.id).length || 0} active
              </div>
            </button>
          ))}
        </div>

        {/* Current Tab Content */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              {triggerTabs.find((t) => t.id === activeTab)?.label} Automations
            </h2>
            <button
              onClick={() => {
                const newAutomation = {
                  id: `automation_${Date.now()}`,
                  triggerType: activeTab,
                  name: `New ${triggerTabs.find((t) => t.id === activeTab)?.label} Automation`,
                  enabled: true,
                  actions: [],
                };
                addAutomation?.(newAutomation);
                setExpandedAutomation(newAutomation.id);
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              + Add Automation
            </button>
          </div>

          {currentAutomations.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="mb-4 flex justify-center">
                {(() => {
                  const ActiveIcon = triggerTabs.find((t) => t.id === activeTab)?.icon;
                  return ActiveIcon ? <ActiveIcon size={64} className="text-gray-400" /> : null;
                })()}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Automations Yet</h3>
              <p className="text-gray-600 mb-5">
                Create your first {triggerTabs.find((t) => t.id === activeTab)?.label.toLowerCase()} automation to get started
              </p>
              <button
                onClick={() => {
                  const newAutomation = {
                    id: `automation_${Date.now()}`,
                    triggerType: activeTab,
                    name: `New ${triggerTabs.find((t) => t.id === activeTab)?.label} Automation`,
                    enabled: true,
                    actions: [],
                  };
                  addAutomation?.(newAutomation);
                  setExpandedAutomation(newAutomation.id);
                }}
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Create Automation
              </button>
            </Card>
          ) : (
            <div>
              {currentAutomations.map((automation) => renderAutomationCard(automation))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <Card className="p-5 mt-8 bg-gray-50 border border-gray-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Automation Best Practices</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Start with one or two key automations and expand gradually</li>
                <li>• Use the Safeguards screen to prevent over-communication and gaming</li>
                <li>• Test automations with a small segment before rolling out broadly</li>
                <li>• Monitor performance in the Analytics screen to optimize over time</li>
                <li>• Combine multiple actions per trigger for maximum impact (e.g., email + voucher)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
