import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { useOnboardingStore } from '../../store/onboardingStore';

export const Screen7SafeguardsAutomation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'anti-gaming' | 'communication' | 'overrides'>('anti-gaming');
  const { safeguardSettings, updateSafeguardSettings } = useOnboardingStore();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🛡️ Automation Safeguards</h1>
          <p className="text-gray-600 text-lg">Protect your program from gaming and maintain customer experience quality</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('anti-gaming')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'anti-gaming'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🚫 Anti-Gaming Rules
          </button>
          <button
            onClick={() => setActiveTab('communication')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'communication'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            📢 Communication Limits
          </button>
          <button
            onClick={() => setActiveTab('overrides')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'overrides'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🔐 Override Controls
          </button>
        </div>

        {/* Anti-Gaming Tab */}
        {activeTab === 'anti-gaming' && (
          <div className="space-y-6">
            {/* Cooldown Periods */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">⏱️ Cooldown Periods</h3>
                  <p className="text-sm text-gray-600">Prevent customers from repeatedly triggering the same automation</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safeguardSettings?.cooldownEnabled || false}
                    onChange={(e) => updateSafeguardSettings?.({ cooldownEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {safeguardSettings?.cooldownEnabled && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Win-Back Automation Cooldown
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={safeguardSettings?.winbackCooldown || 90}
                        onChange={(e) => updateSafeguardSettings?.({ winbackCooldown: parseInt(e.target.value) })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <span className="text-sm text-gray-600">days</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Time before a customer can receive another win-back offer</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birthday Reward Cooldown
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={safeguardSettings?.birthdayCooldown || 365}
                        onChange={(e) => updateSafeguardSettings?.({ birthdayCooldown: parseInt(e.target.value) })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <span className="text-sm text-gray-600">days</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Prevent gaming by limiting birthday rewards frequency</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency Bonus Cooldown
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={safeguardSettings?.frequencyBonusCooldown || 30}
                        onChange={(e) => updateSafeguardSettings?.({ frequencyBonusCooldown: parseInt(e.target.value) })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <span className="text-sm text-gray-600">days</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Minimum time between frequency bonuses</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Re-targeting Cooldown
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={safeguardSettings?.campaignCooldown || 14}
                        onChange={(e) => updateSafeguardSettings?.({ campaignCooldown: parseInt(e.target.value) })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <span className="text-sm text-gray-600">days</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Time before re-targeting customer with same campaign</p>
                  </div>
                </div>
              )}
            </Card>

            {/* Maximum Benefit Caps */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">🎯 Maximum Benefit Caps</h3>
                  <p className="text-sm text-gray-600">Limit how many times a customer can benefit from automations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safeguardSettings?.benefitCapsEnabled || false}
                    onChange={(e) => updateSafeguardSettings?.({ benefitCapsEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {safeguardSettings?.benefitCapsEnabled && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Win-Back Offers
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={safeguardSettings?.maxWinbackOffers || 3}
                          onChange={(e) => updateSafeguardSettings?.({ maxWinbackOffers: parseInt(e.target.value) })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <span className="text-xs text-gray-600">per year</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Behavioral Bonuses
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={safeguardSettings?.maxBehavioralBonuses || 12}
                          onChange={(e) => updateSafeguardSettings?.({ maxBehavioralBonuses: parseInt(e.target.value) })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <span className="text-xs text-gray-600">per year</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Automated Rewards
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={safeguardSettings?.maxAutomatedRewards || 24}
                          onChange={(e) => updateSafeguardSettings?.({ maxAutomatedRewards: parseInt(e.target.value) })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <span className="text-xs text-gray-600">per year</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-600">⚠️</span>
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Cap Period Behavior</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          When a customer reaches their cap, they won't be excluded from the automation entirely—they just won't receive additional rewards until the period resets.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Pattern Detection */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">🔍 Behavioral Pattern Detection</h3>
                  <p className="text-sm text-gray-600">Identify customers who repeatedly cycle through gaming patterns</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safeguardSettings?.patternDetectionEnabled || false}
                    onChange={(e) => updateSafeguardSettings?.({ patternDetectionEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {safeguardSettings?.patternDetectionEnabled && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Detection Sensitivity
                      </label>
                      <select
                        value={safeguardSettings?.patternSensitivity || 'moderate'}
                        onChange={(e) => updateSafeguardSettings?.({ patternSensitivity: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="low">Low - Flag after 5+ pattern repetitions</option>
                        <option value="moderate">Moderate - Flag after 3+ pattern repetitions</option>
                        <option value="high">High - Flag after 2+ pattern repetitions</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Action When Pattern Detected
                      </label>
                      <select
                        value={safeguardSettings?.patternAction || 'flag'}
                        onChange={(e) => updateSafeguardSettings?.({ patternAction: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="flag">Flag for Manual Review</option>
                        <option value="reduce">Reduce Reward Value by 50%</option>
                        <option value="exclude">Exclude from Automation</option>
                        <option value="notify">Notify Customer + Flag</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Patterns to Monitor</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'inactive-active', label: 'Inactive → Reward → Inactive Cycle', desc: 'Customer goes inactive, receives win-back, then becomes inactive again' },
                        { id: 'threshold-gaming', label: 'Threshold Gaming', desc: 'Customer consistently purchases just above threshold amounts' },
                        { id: 'timing-patterns', label: 'Suspicious Timing Patterns', desc: 'Purchases timed suspiciously around bonus periods' },
                        { id: 'split-transactions', label: 'Split Transactions', desc: 'Multiple small transactions instead of one larger transaction' },
                      ].map((pattern) => (
                        <div key={pattern.id} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                          <input
                            type="checkbox"
                            id={pattern.id}
                            checked={safeguardSettings?.monitoredPatterns?.includes(pattern.id) || false}
                            onChange={(e) => {
                              const current = safeguardSettings?.monitoredPatterns || [];
                              updateSafeguardSettings?.({
                                monitoredPatterns: e.target.checked
                                  ? [...current, pattern.id]
                                  : current.filter((p) => p !== pattern.id)
                              });
                            }}
                            className="mt-1 h-4 w-4 text-primary border-gray-300 rounded"
                          />
                          <label htmlFor={pattern.id} className="flex-1 cursor-pointer">
                            <div className="text-sm font-medium">{pattern.label}</div>
                            <div className="text-xs text-gray-500">{pattern.desc}</div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Diminishing Returns */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">📉 Diminishing Returns</h3>
                  <p className="text-sm text-gray-600">Progressive reduction in rewards for repeated automation triggers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safeguardSettings?.diminishingReturnsEnabled || false}
                    onChange={(e) => updateSafeguardSettings?.({ diminishingReturnsEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {safeguardSettings?.diminishingReturnsEnabled && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Window for Calculation
                      </label>
                      <select
                        value={safeguardSettings?.diminishingWindow || 'quarterly'}
                        onChange={(e) => updateSafeguardSettings?.({ diminishingWindow: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="annual">Annual</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reduction Rate
                      </label>
                      <select
                        value={safeguardSettings?.diminishingRate || 'moderate'}
                        onChange={(e) => updateSafeguardSettings?.({ diminishingRate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="gentle">Gentle - 10% per trigger</option>
                        <option value="moderate">Moderate - 20% per trigger</option>
                        <option value="aggressive">Aggressive - 30% per trigger</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Example:</strong> If a customer triggers a win-back automation 3 times in a quarter with "Moderate" setting:
                    </p>
                    <ul className="text-sm text-blue-700 mt-2 ml-4 list-disc">
                      <li>1st trigger: 100% reward value</li>
                      <li>2nd trigger: 80% reward value</li>
                      <li>3rd trigger: 60% reward value</li>
                    </ul>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Communication Limits Tab */}
        {activeTab === 'communication' && (
          <div className="space-y-6">
            {/* Global Frequency Limits */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">🌐 Global Communication Limits</h3>
                  <p className="text-sm text-gray-600">Set maximum communication frequency across all channels</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safeguardSettings?.globalLimitsEnabled || false}
                    onChange={(e) => updateSafeguardSettings?.({ globalLimitsEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {safeguardSettings?.globalLimitsEnabled && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Communications Per Day
                    </label>
                    <input
                      type="number"
                      value={safeguardSettings?.maxCommunicationsPerDay || 2}
                      onChange={(e) => updateSafeguardSettings?.({ maxCommunicationsPerDay: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Communications Per Week
                    </label>
                    <input
                      type="number"
                      value={safeguardSettings?.maxCommunicationsPerWeek || 5}
                      onChange={(e) => updateSafeguardSettings?.({ maxCommunicationsPerWeek: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Communications Per Month
                    </label>
                    <input
                      type="number"
                      value={safeguardSettings?.maxCommunicationsPerMonth || 15}
                      onChange={(e) => updateSafeguardSettings?.({ maxCommunicationsPerMonth: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              )}
            </Card>

            {/* Channel-Specific Limits */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">📱 Channel-Specific Limits</h3>
                  <p className="text-sm text-gray-600">Set different frequency caps for each communication channel</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safeguardSettings?.channelLimitsEnabled || false}
                    onChange={(e) => updateSafeguardSettings?.({ channelLimitsEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {safeguardSettings?.channelLimitsEnabled && (
                <div className="space-y-4 mt-4">
                  {[
                    { channel: 'email', icon: '📧', label: 'Email', defaultDaily: 1, defaultWeekly: 3, defaultMonthly: 10 },
                    { channel: 'sms', icon: '💬', label: 'SMS', defaultDaily: 1, defaultWeekly: 2, defaultMonthly: 6 },
                    { channel: 'push', icon: '🔔', label: 'Push Notification', defaultDaily: 2, defaultWeekly: 5, defaultMonthly: 15 },
                    { channel: 'in-app', icon: '📱', label: 'In-App Message', defaultDaily: 3, defaultWeekly: 10, defaultMonthly: 30 },
                  ].map((ch) => (
                    <div key={ch.channel} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{ch.icon}</span>
                        <h4 className="font-semibold">{ch.label}</h4>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Per Day</label>
                          <input
                            type="number"
                            value={safeguardSettings?.channelLimits?.[ch.channel]?.daily || ch.defaultDaily}
                            onChange={(e) => updateSafeguardSettings?.({
                              channelLimits: {
                                ...safeguardSettings?.channelLimits,
                                [ch.channel]: {
                                  ...safeguardSettings?.channelLimits?.[ch.channel],
                                  daily: parseInt(e.target.value)
                                }
                              }
                            })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Per Week</label>
                          <input
                            type="number"
                            value={safeguardSettings?.channelLimits?.[ch.channel]?.weekly || ch.defaultWeekly}
                            onChange={(e) => updateSafeguardSettings?.({
                              channelLimits: {
                                ...safeguardSettings?.channelLimits,
                                [ch.channel]: {
                                  ...safeguardSettings?.channelLimits?.[ch.channel],
                                  weekly: parseInt(e.target.value)
                                }
                              }
                            })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Per Month</label>
                          <input
                            type="number"
                            value={safeguardSettings?.channelLimits?.[ch.channel]?.monthly || ch.defaultMonthly}
                            onChange={(e) => updateSafeguardSettings?.({
                              channelLimits: {
                                ...safeguardSettings?.channelLimits,
                                [ch.channel]: {
                                  ...safeguardSettings?.channelLimits?.[ch.channel],
                                  monthly: parseInt(e.target.value)
                                }
                              }
                            })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Priority System */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">🎯 Communication Priority System</h3>
                  <p className="text-sm text-gray-600">When limits are reached, prioritize the most important communications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safeguardSettings?.prioritySystemEnabled || false}
                    onChange={(e) => updateSafeguardSettings?.({ prioritySystemEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {safeguardSettings?.prioritySystemEnabled && (
                <div className="space-y-3 mt-4">
                  <p className="text-sm text-gray-600 mb-3">Drag to reorder (highest priority at top):</p>
                  {[
                    { id: 'transactional', label: 'Transactional', desc: 'Order confirmations, receipts, account updates', priority: 1 },
                    { id: 'tier-changes', label: 'Tier Changes', desc: 'Upgrades/downgrades in loyalty tier', priority: 2 },
                    { id: 'expiring-points', label: 'Expiring Points', desc: 'Warnings about expiring rewards', priority: 3 },
                    { id: 'personalized-offers', label: 'Personalized Offers', desc: 'Targeted campaigns and promotions', priority: 4 },
                    { id: 'win-back', label: 'Win-Back', desc: 'Re-engagement for inactive customers', priority: 5 },
                    { id: 'general-marketing', label: 'General Marketing', desc: 'Broad promotional campaigns', priority: 6 },
                  ].map((comm, index) => (
                    <div key={comm.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-center w-8 h-8 bg-white border border-gray-300 rounded font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{comm.label}</div>
                        <div className="text-xs text-gray-500">{comm.desc}</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-4">
                    <p className="text-sm text-blue-800">
                      When a customer reaches their communication limit, lower priority messages will be queued or skipped to make room for higher priority communications.
                    </p>
                  </div>
                </div>
              )}
            </Card>

            {/* Quiet Hours */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">🌙 Quiet Hours</h3>
                  <p className="text-sm text-gray-600">Respect customer time by limiting communications during specific hours</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safeguardSettings?.quietHoursEnabled || false}
                    onChange={(e) => updateSafeguardSettings?.({ quietHoursEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {safeguardSettings?.quietHoursEnabled && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quiet Hours Start
                      </label>
                      <input
                        type="time"
                        value={safeguardSettings?.quietHoursStart || '22:00'}
                        onChange={(e) => updateSafeguardSettings?.({ quietHoursStart: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quiet Hours End
                      </label>
                      <input
                        type="time"
                        value={safeguardSettings?.quietHoursEnd || '08:00'}
                        onChange={(e) => updateSafeguardSettings?.({ quietHoursEnd: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone Handling
                    </label>
                    <select
                      value={safeguardSettings?.quietHoursTimezone || 'customer'}
                      onChange={(e) => updateSafeguardSettings?.({ quietHoursTimezone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="customer">Customer's Local Timezone</option>
                      <option value="store">Store Timezone</option>
                      <option value="corporate">Corporate HQ Timezone</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exceptions (Always Allow During Quiet Hours)
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: 'transactional', label: 'Transactional messages (receipts, confirmations)' },
                        { id: 'urgent', label: 'Urgent account notifications' },
                        { id: 'security', label: 'Security alerts' },
                      ].map((exception) => (
                        <label key={exception.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <input
                            type="checkbox"
                            checked={safeguardSettings?.quietHoursExceptions?.includes(exception.id) || false}
                            onChange={(e) => {
                              const current = safeguardSettings?.quietHoursExceptions || [];
                              updateSafeguardSettings?.({
                                quietHoursExceptions: e.target.checked
                                  ? [...current, exception.id]
                                  : current.filter((ex) => ex !== exception.id)
                              });
                            }}
                            className="h-4 w-4 text-primary border-gray-300 rounded"
                          />
                          <span className="text-sm">{exception.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Override Controls Tab */}
        {activeTab === 'overrides' && (
          <div className="space-y-6">
            {/* Manual Approval Thresholds */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">✋ Manual Approval Thresholds</h3>
                  <p className="text-sm text-gray-600">Require human review for high-value or unusual automated actions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safeguardSettings?.manualApprovalEnabled || false}
                    onChange={(e) => updateSafeguardSettings?.({ manualApprovalEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {safeguardSettings?.manualApprovalEnabled && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reward Value Threshold
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">$</span>
                        <input
                          type="number"
                          value={safeguardSettings?.approvalValueThreshold || 50}
                          onChange={(e) => updateSafeguardSettings?.({ approvalValueThreshold: parseInt(e.target.value) })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Automated rewards above this value require approval</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Campaign Budget Threshold
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">$</span>
                        <input
                          type="number"
                          value={safeguardSettings?.approvalBudgetThreshold || 1000}
                          onChange={(e) => updateSafeguardSettings?.({ approvalBudgetThreshold: parseInt(e.target.value) })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Automated campaigns above this budget require approval</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Automation Types Requiring Approval
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'win-back', label: 'Win-Back Campaigns', desc: 'Re-engagement offers for inactive customers' },
                        { id: 'tier-upgrades', label: 'Automatic Tier Upgrades', desc: 'Customer tier promotions' },
                        { id: 'bonus-multipliers', label: 'Bonus Point Multipliers', desc: 'Temporary earning rate increases' },
                        { id: 'voucher-generation', label: 'Voucher Generation', desc: 'Creating discount vouchers' },
                        { id: 'segment-changes', label: 'Segment-Based Actions', desc: 'Actions triggered by segment transitions' },
                        { id: 'mass-communications', label: 'Mass Communications', desc: 'Messages to 100+ customers' },
                      ].map((type) => (
                        <label key={type.id} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                          <input
                            type="checkbox"
                            checked={safeguardSettings?.approvalTypes?.includes(type.id) || false}
                            onChange={(e) => {
                              const current = safeguardSettings?.approvalTypes || [];
                              updateSafeguardSettings?.({
                                approvalTypes: e.target.checked
                                  ? [...current, type.id]
                                  : current.filter((t) => t !== type.id)
                              });
                            }}
                            className="mt-1 h-4 w-4 text-primary border-gray-300 rounded"
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{type.label}</div>
                            <div className="text-xs text-gray-500">{type.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Approval Workflow */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">👥 Approval Workflow</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Approver Role
                  </label>
                  <select
                    value={safeguardSettings?.approverRole || 'manager'}
                    onChange={(e) => updateSafeguardSettings?.({ approverRole: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="manager">Store Manager</option>
                    <option value="regional">Regional Manager</option>
                    <option value="marketing">Marketing Director</option>
                    <option value="admin">System Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Approval Timeout
                  </label>
                  <select
                    value={safeguardSettings?.approvalTimeout || '24'}
                    onChange={(e) => updateSafeguardSettings?.({ approvalTimeout: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="4">4 hours - Auto-approve if not reviewed</option>
                    <option value="24">24 hours - Auto-approve if not reviewed</option>
                    <option value="48">48 hours - Auto-approve if not reviewed</option>
                    <option value="never">Never auto-approve (requires manual action)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">What happens when approval is not provided within this time</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Escalation Path
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs font-bold">1</div>
                      <div className="flex-1 text-sm">Store Manager (Primary Approver)</div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs font-bold">2</div>
                      <div className="flex-1 text-sm">Regional Manager (If timeout reached)</div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs font-bold">3</div>
                      <div className="flex-1 text-sm">Marketing Director (Final escalation)</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Emergency Override */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">🚨 Emergency Override Controls</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Who Can Execute Emergency Overrides
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'admin', label: 'System Administrators', desc: 'Full system access' },
                      { id: 'executive', label: 'Executive Team', desc: 'C-level and VPs' },
                      { id: 'marketing-director', label: 'Marketing Directors', desc: 'Department heads' },
                    ].map((role) => (
                      <label key={role.id} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                        <input
                          type="checkbox"
                          checked={safeguardSettings?.overrideRoles?.includes(role.id) || false}
                          onChange={(e) => {
                            const current = safeguardSettings?.overrideRoles || [];
                            updateSafeguardSettings?.({
                              overrideRoles: e.target.checked
                                ? [...current, role.id]
                                : current.filter((r) => r !== role.id)
                            });
                          }}
                          className="mt-1 h-4 w-4 text-primary border-gray-300 rounded"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{role.label}</div>
                          <div className="text-xs text-gray-500">{role.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 text-lg">⚠️</span>
                    <div>
                      <p className="text-sm font-medium text-red-800">Override Audit Trail</p>
                      <p className="text-xs text-red-700 mt-1">
                        All emergency overrides are logged with timestamp, user, reason, and affected automations for compliance and review purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pause All Automations */}
            <Card className="p-6 border-2 border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-red-700 mb-1">⏸️ Pause All Automations</h3>
                  <p className="text-sm text-gray-600">Emergency stop for all automated processes</p>
                </div>
                <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Pause All
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                This will immediately halt all automated campaigns, communications, and rewards until manually re-enabled. Use in case of system issues or unexpected behavior.
              </p>
            </Card>
          </div>
        )}

        {/* Summary Card */}
        <Card className="p-6 mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
          <h3 className="text-lg font-semibold mb-3">📊 Safeguards Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {Object.values(safeguardSettings || {}).filter((v) => v === true).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Active Safeguards</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {safeguardSettings?.maxCommunicationsPerDay || 2}
              </div>
              <div className="text-sm text-gray-600 mt-1">Max Daily Communications</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                ${safeguardSettings?.approvalValueThreshold || 50}
              </div>
              <div className="text-sm text-gray-600 mt-1">Approval Threshold</div>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
