import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useOnboardingStore, type Tier, type EarningRules } from '../../store/onboardingStore';
import { Star, DollarSign, Ticket, RefreshCw, Plus, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const valueTypes = [
  { id: 'points', icon: Star, name: 'Points-Based', desc: 'Traditional points accumulation with flexible redemption options' },
  { id: 'cashback', icon: DollarSign, name: 'Cashback Wallet', desc: 'Direct monetary value stored in customer wallets' },
  { id: 'credits', icon: Ticket, name: 'Store Credits', desc: 'Wallet-based store credit with partial redemption allowed' },
  { id: 'vouchers', icon: Ticket, name: 'Vouchers', desc: 'Fixed-value coupons for one-time use redemption' },
  { id: 'hybrid', icon: RefreshCw, name: 'Hybrid Model', desc: 'Combine multiple value types for maximum flexibility' },
];

const tierColors = [
  { value: 'gray', label: 'Gray', class: 'bg-gray-500' },
  { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
  { value: 'green', label: 'Green', class: 'bg-green-500' },
  { value: 'yellow', label: 'Yellow', class: 'bg-yellow-500' },
  { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
  { value: 'red', label: 'Red', class: 'bg-red-500' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
  { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
];

const categoryOptions = [
  'Groceries', 'Electronics', 'Clothing', 'Dining', 'Entertainment', 'Travel', 'Health & Beauty', 'Home & Garden'
];

const getDefaultEarningRules = (): EarningRules => ({
  baseRate: { points: 1, spend: 1 },
  categoryMultipliers: {},
  thresholdEarning: {
    spendThreshold: { enabled: false, spend: 100, reward: 10 },
    purchaseFrequency: { enabled: false, purchases: 5, reward: 25 },
    periodSpend: { enabled: false, spend: 500, period: 'monthly', reward: 50 },
  },
  behavioralBonuses: {
    frequencyBonus: { enabled: false, visits: 3, points: 50 },
    thresholdBonus: { enabled: false, spend: 100, points: 100 },
    birthday: { enabled: false, rewardType: 'multiplier', multiplier: 2, points: 500, voucherType: 'value', voucherValue: 10 },
    firstPurchase: { enabled: false, points: 500 },
  },
});

interface EarningRulesEditorProps {
  rules: EarningRules;
  onUpdate: (rules: Partial<EarningRules>) => void;
  currency: string;
  valueType: string;
}

const EarningRulesEditor: React.FC<EarningRulesEditorProps> = ({ rules, onUpdate, currency, valueType }) => {
  // Get value type label
  const getValueLabel = () => {
    switch (valueType) {
      case 'cashback': return 'cashback';
      case 'credits': return 'credits';
      case 'vouchers': return 'vouchers';
      default: return 'points';
    }
  };

  const valueLabel = getValueLabel();

  // Check if value type uses threshold-based earning (vs continuous)
  const isThresholdBased = valueType === 'credits' || valueType === 'vouchers';
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryMultiplier, setCategoryMultiplier] = useState(1);

  const handleAddCategory = () => {
    if (selectedCategory && categoryMultiplier) {
      onUpdate({
        categoryMultipliers: {
          ...rules.categoryMultipliers,
          [selectedCategory]: categoryMultiplier,
        },
      });
      setSelectedCategory('');
      setCategoryMultiplier(1);
      setShowCategoryModal(false);
    }
  };

  const handleRemoveCategory = (category: string) => {
    const newMultipliers = { ...rules.categoryMultipliers };
    delete newMultipliers[category];
    onUpdate({ categoryMultipliers: newMultipliers });
  };

  return (
    <div className="space-y-6">
      {/* Continuous Earning (Points/Cashback) */}
      {!isThresholdBased && (
        <div>
          <label className="block font-semibold mb-3 text-sm">Base Earning Rate</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={rules.baseRate.points}
              onChange={(e) => onUpdate({
                baseRate: { ...rules.baseRate, points: parseInt(e.target.value) }
              })}
              className="px-3 py-2 border border-gray-300 rounded-lg w-24"
            />
            <span className="text-gray-600">{valueLabel} per</span>
            <input
              type="number"
              value={rules.baseRate.spend}
              onChange={(e) => onUpdate({
                baseRate: { ...rules.baseRate, spend: parseInt(e.target.value) }
              })}
              className="px-3 py-2 border border-gray-300 rounded-lg w-24"
            />
            <span className="text-gray-600">{currency} spent</span>
          </div>
        </div>
      )}

      {/* Threshold-Based Earning (Credits/Vouchers) */}
      {isThresholdBased && (
        <div>
          <label className="block font-semibold mb-3 text-sm">Earning Thresholds</label>
          <div className="space-y-4">
            {/* Spend Threshold */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={rules.thresholdEarning?.spendThreshold?.enabled || false}
                  onChange={(e) => onUpdate({
                    thresholdEarning: {
                      ...rules.thresholdEarning,
                      spendThreshold: {
                        enabled: e.target.checked,
                        spend: rules.thresholdEarning?.spendThreshold?.spend || 100,
                        reward: rules.thresholdEarning?.spendThreshold?.reward || 10,
                      },
                    },
                  })}
                  className="w-4 h-4 text-primary rounded"
                />
                <span className="font-medium text-gray-900">Spending Threshold</span>
              </label>
              {rules.thresholdEarning?.spendThreshold?.enabled && (
                <div className="flex items-center gap-3 ml-6">
                  <span className="text-sm text-gray-600">Earn</span>
                  <input
                    type="number"
                    value={rules.thresholdEarning.spendThreshold.reward}
                    onChange={(e) => onUpdate({
                      thresholdEarning: {
                        ...(rules.thresholdEarning || {}),
                        spendThreshold: {
                          ...(rules.thresholdEarning?.spendThreshold || { enabled: true, spend: 100, reward: 10 }),
                          reward: parseFloat(e.target.value),
                        },
                      },
                    })}
                    className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                  />
                  <span className="text-sm text-gray-600">{currency} in {valueLabel} when spending</span>
                  <input
                    type="number"
                    value={rules.thresholdEarning.spendThreshold.spend}
                    onChange={(e) => onUpdate({
                      thresholdEarning: {
                        ...(rules.thresholdEarning || {}),
                        spendThreshold: {
                          ...(rules.thresholdEarning?.spendThreshold || { enabled: true, spend: 100, reward: 10 }),
                          spend: parseFloat(e.target.value),
                        },
                      },
                    })}
                    className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                  />
                  <span className="text-sm text-gray-600">{currency}</span>
                </div>
              )}
            </div>

            {/* Purchase Frequency */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={rules.thresholdEarning?.purchaseFrequency?.enabled || false}
                  onChange={(e) => onUpdate({
                    thresholdEarning: {
                      ...rules.thresholdEarning,
                      purchaseFrequency: {
                        enabled: e.target.checked,
                        purchases: rules.thresholdEarning?.purchaseFrequency?.purchases || 5,
                        reward: rules.thresholdEarning?.purchaseFrequency?.reward || 25,
                      },
                    },
                  })}
                  className="w-4 h-4 text-primary rounded"
                />
                <span className="font-medium text-gray-900">Purchase Frequency</span>
              </label>
              {rules.thresholdEarning?.purchaseFrequency?.enabled && (
                <div className="flex items-center gap-3 ml-6">
                  <span className="text-sm text-gray-600">Earn</span>
                  <input
                    type="number"
                    value={rules.thresholdEarning.purchaseFrequency.reward}
                    onChange={(e) => onUpdate({
                      thresholdEarning: {
                        ...(rules.thresholdEarning || {}),
                        purchaseFrequency: {
                          ...(rules.thresholdEarning?.purchaseFrequency || { enabled: true, purchases: 5, reward: 25 }),
                          reward: parseFloat(e.target.value),
                        },
                      },
                    })}
                    className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                  />
                  <span className="text-sm text-gray-600">{currency} in {valueLabel} after</span>
                  <input
                    type="number"
                    value={rules.thresholdEarning.purchaseFrequency.purchases}
                    onChange={(e) => onUpdate({
                      thresholdEarning: {
                        ...(rules.thresholdEarning || {}),
                        purchaseFrequency: {
                          ...(rules.thresholdEarning?.purchaseFrequency || { enabled: true, purchases: 5, reward: 25 }),
                          purchases: parseInt(e.target.value),
                        },
                      },
                    })}
                    className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                  />
                  <span className="text-sm text-gray-600">purchases</span>
                </div>
              )}
            </div>

            {/* Period-Based Spending */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={rules.thresholdEarning?.periodSpend?.enabled || false}
                  onChange={(e) => onUpdate({
                    thresholdEarning: {
                      ...rules.thresholdEarning,
                      periodSpend: {
                        enabled: e.target.checked,
                        spend: rules.thresholdEarning?.periodSpend?.spend || 500,
                        period: rules.thresholdEarning?.periodSpend?.period || 'monthly',
                        reward: rules.thresholdEarning?.periodSpend?.reward || 50,
                      },
                    },
                  })}
                  className="w-4 h-4 text-primary rounded"
                />
                <span className="font-medium text-gray-900">Period-Based Spending</span>
              </label>
              {rules.thresholdEarning?.periodSpend?.enabled && (
                <div className="space-y-2 ml-6">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Earn</span>
                    <input
                      type="number"
                      value={rules.thresholdEarning.periodSpend.reward}
                      onChange={(e) => onUpdate({
                        thresholdEarning: {
                          ...(rules.thresholdEarning || {}),
                          periodSpend: {
                            ...(rules.thresholdEarning?.periodSpend || { enabled: true, spend: 500, period: 'monthly' as const, reward: 50 }),
                            reward: parseFloat(e.target.value),
                          },
                        },
                      })}
                      className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                    />
                    <span className="text-sm text-gray-600">{currency} in {valueLabel}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 min-w-[60px]">When spending</span>
                    <input
                      type="number"
                      value={rules.thresholdEarning.periodSpend.spend}
                      onChange={(e) => onUpdate({
                        thresholdEarning: {
                          ...(rules.thresholdEarning || {}),
                          periodSpend: {
                            ...(rules.thresholdEarning?.periodSpend || { enabled: true, spend: 500, period: 'monthly' as const, reward: 50 }),
                            spend: parseFloat(e.target.value),
                          },
                        },
                      })}
                      className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                    />
                    <span className="text-sm text-gray-600">{currency} per</span>
                    <select
                      value={rules.thresholdEarning.periodSpend.period}
                      onChange={(e) => onUpdate({
                        thresholdEarning: {
                          ...(rules.thresholdEarning || {}),
                          periodSpend: {
                            ...(rules.thresholdEarning?.periodSpend || { enabled: true, spend: 500, period: 'monthly' as const, reward: 50 }),
                            period: e.target.value as 'monthly' | 'quarterly' | 'annual',
                          },
                        },
                      })}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="monthly">Month</option>
                      <option value="quarterly">Quarter</option>
                      <option value="annual">Year</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Category Multipliers (Only for continuous earning) */}
      {!isThresholdBased && (
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block font-semibold text-sm">Category Multipliers</label>
          <Button onClick={() => setShowCategoryModal(true)} size="sm" variant="secondary">
            <Plus size={16} className="mr-1" />
            Add Category
          </Button>
        </div>

        {Object.keys(rules.categoryMultipliers).length > 0 ? (
          <div className="space-y-2">
            {Object.entries(rules.categoryMultipliers).map(([category, multiplier]) => (
              <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">{category}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">{multiplier}x multiplier</span>
                  <button
                    onClick={() => handleRemoveCategory(category)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600 text-center">
            No category multipliers configured
          </div>
        )}
      </div>
      )}

      {/* Behavioral Bonuses */}
      <div>
        <label className="block font-semibold mb-3 text-sm">Behavioral Bonuses</label>
        <div className="space-y-4">
          {/* Frequency Bonus */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={rules.behavioralBonuses.frequencyBonus?.enabled || false}
                onChange={(e) => onUpdate({
                  behavioralBonuses: {
                    ...rules.behavioralBonuses,
                    frequencyBonus: {
                      ...rules.behavioralBonuses.frequencyBonus,
                      enabled: e.target.checked,
                      visits: rules.behavioralBonuses.frequencyBonus?.visits || 3,
                      points: rules.behavioralBonuses.frequencyBonus?.points || 50,
                    },
                  },
                })}
                className="w-4 h-4 text-primary rounded"
              />
              <span className="font-medium text-gray-900">Frequency Bonus</span>
            </label>
            {rules.behavioralBonuses.frequencyBonus?.enabled && (
              <div className="flex items-center gap-3 ml-6">
                <span className="text-sm text-gray-600">Reward</span>
                <input
                  type="number"
                  value={rules.behavioralBonuses.frequencyBonus.points}
                  onChange={(e) => onUpdate({
                    behavioralBonuses: {
                      ...rules.behavioralBonuses,
                      frequencyBonus: {
                        ...rules.behavioralBonuses.frequencyBonus!,
                        points: parseInt(e.target.value),
                      },
                    },
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                />
                <span className="text-sm text-gray-600">points after</span>
                <input
                  type="number"
                  value={rules.behavioralBonuses.frequencyBonus.visits}
                  onChange={(e) => onUpdate({
                    behavioralBonuses: {
                      ...rules.behavioralBonuses,
                      frequencyBonus: {
                        ...rules.behavioralBonuses.frequencyBonus!,
                        visits: parseInt(e.target.value),
                      },
                    },
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                />
                <span className="text-sm text-gray-600">visits</span>
              </div>
            )}
          </div>

          {/* Threshold Bonus */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={rules.behavioralBonuses.thresholdBonus?.enabled || false}
                onChange={(e) => onUpdate({
                  behavioralBonuses: {
                    ...rules.behavioralBonuses,
                    thresholdBonus: {
                      ...rules.behavioralBonuses.thresholdBonus,
                      enabled: e.target.checked,
                      spend: rules.behavioralBonuses.thresholdBonus?.spend || 100,
                      points: rules.behavioralBonuses.thresholdBonus?.points || 100,
                    },
                  },
                })}
                className="w-4 h-4 text-primary rounded"
              />
              <span className="font-medium text-gray-900">Spending Threshold Bonus</span>
            </label>
            {rules.behavioralBonuses.thresholdBonus?.enabled && (
              <div className="flex items-center gap-3 ml-6">
                <span className="text-sm text-gray-600">Reward</span>
                <input
                  type="number"
                  value={rules.behavioralBonuses.thresholdBonus.points}
                  onChange={(e) => onUpdate({
                    behavioralBonuses: {
                      ...rules.behavioralBonuses,
                      thresholdBonus: {
                        ...rules.behavioralBonuses.thresholdBonus!,
                        points: parseInt(e.target.value),
                      },
                    },
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                />
                <span className="text-sm text-gray-600">points when spending over</span>
                <input
                  type="number"
                  value={rules.behavioralBonuses.thresholdBonus.spend}
                  onChange={(e) => onUpdate({
                    behavioralBonuses: {
                      ...rules.behavioralBonuses,
                      thresholdBonus: {
                        ...rules.behavioralBonuses.thresholdBonus!,
                        spend: parseInt(e.target.value),
                      },
                    },
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                />
                <span className="text-sm text-gray-600">{currency}</span>
              </div>
            )}
          </div>

          {/* Birthday Reward */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={rules.behavioralBonuses.birthday?.enabled || false}
                onChange={(e) => onUpdate({
                  behavioralBonuses: {
                    ...rules.behavioralBonuses,
                    birthday: {
                      ...rules.behavioralBonuses.birthday,
                      enabled: e.target.checked,
                      rewardType: rules.behavioralBonuses.birthday?.rewardType || 'multiplier',
                      multiplier: rules.behavioralBonuses.birthday?.multiplier || 2,
                      points: rules.behavioralBonuses.birthday?.points || 500,
                      voucherType: rules.behavioralBonuses.birthday?.voucherType || 'value',
                      voucherValue: rules.behavioralBonuses.birthday?.voucherValue || 10,
                    },
                  },
                })}
                className="w-4 h-4 text-primary rounded"
              />
              <span className="font-medium text-gray-900">Birthday Reward</span>
            </label>
            {rules.behavioralBonuses.birthday?.enabled && (
              <div className="ml-6 space-y-3">
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600 min-w-[80px]">Reward Type:</label>
                  <select
                    value={rules.behavioralBonuses.birthday.rewardType}
                    onChange={(e) => onUpdate({
                      behavioralBonuses: {
                        ...rules.behavioralBonuses,
                        birthday: {
                          ...rules.behavioralBonuses.birthday!,
                          rewardType: e.target.value as 'multiplier' | 'points' | 'voucher',
                        },
                      },
                    })}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="multiplier">Multiplier</option>
                    <option value="points">{valueLabel.charAt(0).toUpperCase() + valueLabel.slice(1)} Issue</option>
                    <option value="voucher">Voucher Issue</option>
                  </select>
                </div>

                {rules.behavioralBonuses.birthday.rewardType === 'multiplier' && (
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="0.5"
                      value={rules.behavioralBonuses.birthday.multiplier || 2}
                      onChange={(e) => onUpdate({
                        behavioralBonuses: {
                          ...rules.behavioralBonuses,
                          birthday: {
                            ...rules.behavioralBonuses.birthday!,
                            multiplier: parseFloat(e.target.value),
                          },
                        },
                      })}
                      className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                    />
                    <span className="text-sm text-gray-600">x multiplier during birthday month</span>
                  </div>
                )}

                {rules.behavioralBonuses.birthday.rewardType === 'points' && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Reward</span>
                    <input
                      type="number"
                      value={rules.behavioralBonuses.birthday.points || 500}
                      onChange={(e) => onUpdate({
                        behavioralBonuses: {
                          ...rules.behavioralBonuses,
                          birthday: {
                            ...rules.behavioralBonuses.birthday!,
                            points: parseInt(e.target.value),
                          },
                        },
                      })}
                      className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                    />
                    <span className="text-sm text-gray-600">{valueLabel} on birthday</span>
                  </div>
                )}

                {rules.behavioralBonuses.birthday.rewardType === 'voucher' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-gray-600 min-w-[80px]">Voucher Type:</label>
                      <select
                        value={rules.behavioralBonuses.birthday.voucherType || 'value'}
                        onChange={(e) => onUpdate({
                          behavioralBonuses: {
                            ...rules.behavioralBonuses,
                            birthday: {
                              ...rules.behavioralBonuses.birthday!,
                              voucherType: e.target.value as 'sku' | 'value',
                            },
                          },
                        })}
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="value">Value-based</option>
                        <option value="sku">SKU/PLU-based</option>
                      </select>
                    </div>

                    {rules.behavioralBonuses.birthday.voucherType === 'sku' && (
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 min-w-[80px]">SKU/PLU:</span>
                        <input
                          type="text"
                          value={rules.behavioralBonuses.birthday.voucherSku || ''}
                          onChange={(e) => onUpdate({
                            behavioralBonuses: {
                              ...rules.behavioralBonuses,
                              birthday: {
                                ...rules.behavioralBonuses.birthday!,
                                voucherSku: e.target.value,
                              },
                            },
                          })}
                          placeholder="e.g., BDAY-FREE-001"
                          className="px-3 py-2 border border-gray-300 rounded-lg flex-1"
                        />
                      </div>
                    )}

                    {rules.behavioralBonuses.birthday.voucherType === 'value' && (
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 min-w-[80px]">Value:</span>
                        <input
                          type="number"
                          value={rules.behavioralBonuses.birthday.voucherValue || 10}
                          onChange={(e) => onUpdate({
                            behavioralBonuses: {
                              ...rules.behavioralBonuses,
                              birthday: {
                                ...rules.behavioralBonuses.birthday!,
                                voucherValue: parseFloat(e.target.value),
                              },
                            },
                          })}
                          className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                        />
                        <span className="text-sm text-gray-600">{currency}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* First Purchase */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={rules.behavioralBonuses.firstPurchase?.enabled || false}
                onChange={(e) => onUpdate({
                  behavioralBonuses: {
                    ...rules.behavioralBonuses,
                    firstPurchase: {
                      ...rules.behavioralBonuses.firstPurchase,
                      enabled: e.target.checked,
                      points: rules.behavioralBonuses.firstPurchase?.points || 500,
                    },
                  },
                })}
                className="w-4 h-4 text-primary rounded"
              />
              <span className="font-medium text-gray-900">First Purchase Bonus</span>
            </label>
            {rules.behavioralBonuses.firstPurchase?.enabled && (
              <div className="flex items-center gap-3 ml-6">
                <span className="text-sm text-gray-600">Reward</span>
                <input
                  type="number"
                  value={rules.behavioralBonuses.firstPurchase.points}
                  onChange={(e) => onUpdate({
                    behavioralBonuses: {
                      ...rules.behavioralBonuses,
                      firstPurchase: {
                        ...rules.behavioralBonuses.firstPurchase!,
                        points: parseInt(e.target.value),
                      },
                    },
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                />
                <span className="text-sm text-gray-600">bonus points on first purchase</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Modal */}
      <Modal isOpen={showCategoryModal} onClose={() => setShowCategoryModal(false)} title="Add Category Multiplier">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select a category</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Multiplier</label>
            <input
              type="number"
              step="0.1"
              value={categoryMultiplier}
              onChange={(e) => setCategoryMultiplier(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowCategoryModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleAddCategory} className="flex-1">
              Add Category
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const Screen2Value: React.FC = () => {
  const {
    valueType,
    valueConfig,
    useTiers,
    tiers,
    earningRules,
    setValueType,
    updateValueConfig,
    setUseTiers,
    addTier,
    updateTier,
    removeTier,
    updateEarningRules,
  } = useOnboardingStore();

  // Get value type label
  const getValueLabel = () => {
    switch (valueType) {
      case 'cashback': return 'cashback';
      case 'credits': return 'credits';
      case 'vouchers': return 'vouchers';
      default: return 'points';
    }
  };

  const valueLabel = getValueLabel();

  // Modal states
  const [showTierModal, setShowTierModal] = useState(false);
  const [editingTier, setEditingTier] = useState<Tier | null>(null);
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  // Tier form state
  const [tierForm, setTierForm] = useState({
    name: '',
    description: '',
    threshold: 0,
    color: 'blue',
    benefits: [''],
  });

  const handleAddTier = () => {
    setEditingTier(null);
    setTierForm({
      name: '',
      description: '',
      threshold: 0,
      color: 'blue',
      benefits: [''],
    });
    setShowTierModal(true);
  };

  const handleEditTier = (tier: Tier) => {
    setEditingTier(tier);
    setTierForm({
      name: tier.name,
      description: tier.description,
      threshold: tier.threshold,
      color: tier.color,
      benefits: tier.benefits.length > 0 ? tier.benefits : [''],
    });
    setShowTierModal(true);
  };

  const handleSaveTier = () => {
    const tierData = {
      name: tierForm.name,
      description: tierForm.description,
      threshold: tierForm.threshold,
      color: tierForm.color,
      benefits: tierForm.benefits.filter(b => b.trim() !== ''),
    };

    if (editingTier) {
      updateTier(editingTier.id, tierData);
    } else {
      const newTier: Tier = {
        id: `tier_${Date.now()}`,
        ...tierData,
        earningRules: getDefaultEarningRules(),
      };
      addTier(newTier);
    }
    setShowTierModal(false);
  };

  const handleDeleteTier = (tierId: string) => {
    if (confirm('Are you sure you want to delete this tier?')) {
      removeTier(tierId);
    }
  };

  const handleUpdateTierEarningRules = (tierId: string, rulesUpdate: Partial<EarningRules>) => {
    const tier = tiers.find(t => t.id === tierId);
    if (tier) {
      updateTier(tierId, {
        earningRules: {
          ...tier.earningRules,
          ...rulesUpdate,
          behavioralBonuses: {
            ...tier.earningRules.behavioralBonuses,
            ...rulesUpdate.behavioralBonuses,
          },
        },
      });
    }
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...tierForm.benefits];
    newBenefits[index] = value;
    setTierForm({ ...tierForm, benefits: newBenefits });
  };

  const addBenefit = () => {
    setTierForm({ ...tierForm, benefits: [...tierForm.benefits, ''] });
  };

  const removeBenefit = (index: number) => {
    const newBenefits = tierForm.benefits.filter((_, i) => i !== index);
    setTierForm({ ...tierForm, benefits: newBenefits });
  };

  const renderValueConfigForm = () => {
    switch (valueType) {
      case 'points':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2 text-sm">Point Value</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">1 point =</span>
                  <input
                    type="number"
                    step="0.001"
                    value={valueConfig.pointValue || 0.01}
                    onChange={(e) => updateValueConfig({ pointValue: parseFloat(e.target.value) })}
                    className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                  />
                  <select
                    value={valueConfig.currency || 'USD'}
                    onChange={(e) => updateValueConfig({ currency: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>CAD</option>
                    <option>AUD</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-sm">Point Expiry</label>
                <select
                  value={valueConfig.expiry || 'never'}
                  onChange={(e) => updateValueConfig({ expiry: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="never">Never expire</option>
                  <option value="12months">After 12 months</option>
                  <option value="24months">After 24 months</option>
                  <option value="annual">Annual reset</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-sm">Minimum Redemption</label>
                <input
                  type="number"
                  value={valueConfig.minRedemption || 100}
                  onChange={(e) => updateValueConfig({ minRedemption: parseInt(e.target.value) })}
                  placeholder="Minimum points to redeem"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-sm">Maximum Balance</label>
                <input
                  type="number"
                  value={valueConfig.maxBalance || ''}
                  onChange={(e) => updateValueConfig({ maxBalance: e.target.value ? parseInt(e.target.value) : null })}
                  placeholder="No limit"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-3 text-sm">Advanced Options</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-2">
                  <input
                    type="checkbox"
                    checked={valueConfig.allowFractional || false}
                    onChange={(e) => updateValueConfig({ allowFractional: e.target.checked })}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span className="text-sm text-gray-700">Allow fractional points</span>
                </label>
                <label className="flex items-center gap-2 p-2">
                  <input
                    type="checkbox"
                    checked={valueConfig.enablePooling || false}
                    onChange={(e) => updateValueConfig({ enablePooling: e.target.checked })}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span className="text-sm text-gray-700">Enable family pooling</span>
                </label>
                <label className="flex items-center gap-2 p-2">
                  <input
                    type="checkbox"
                    checked={valueConfig.allowTransfers || false}
                    onChange={(e) => updateValueConfig({ allowTransfers: e.target.checked })}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span className="text-sm text-gray-700">Allow point transfers between members</span>
                </label>
                <label className="flex items-center gap-2 p-2">
                  <input
                    type="checkbox"
                    checked={valueConfig.enablePurchase || false}
                    onChange={(e) => updateValueConfig({ enablePurchase: e.target.checked })}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span className="text-sm text-gray-700">Enable point purchase</span>
                </label>
                <label className="flex items-center gap-2 p-2">
                  <input
                    type="checkbox"
                    checked={valueConfig.differentBurnRate || false}
                    onChange={(e) => updateValueConfig({ differentBurnRate: e.target.checked })}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span className="text-sm text-gray-700">Different earn vs burn rates</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'cashback':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2 text-sm">Cashback Percentage</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    value={valueConfig.cashbackPercentage || 1}
                    onChange={(e) => updateValueConfig({ cashbackPercentage: parseFloat(e.target.value) })}
                    className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                  />
                  <span className="text-sm text-gray-600">% of purchase</span>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-sm">Cashback Cap</label>
                <input
                  type="number"
                  value={valueConfig.cashbackCap || ''}
                  onChange={(e) => updateValueConfig({ cashbackCap: e.target.value ? parseFloat(e.target.value) : null })}
                  placeholder="No limit"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-sm">Currency</label>
                <select
                  value={valueConfig.currency || 'USD'}
                  onChange={(e) => updateValueConfig({ currency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>CAD</option>
                  <option>AUD</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-sm">Minimum Redemption</label>
                <input
                  type="number"
                  value={valueConfig.minRedemption || 10}
                  onChange={(e) => updateValueConfig({ minRedemption: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        );

      case 'credits':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
              <p className="text-sm text-blue-900">
                <strong>Store Credits:</strong> Wallet-based rewards that accumulate and allow partial redemption. Customers can spend credits incrementally like cash.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2 text-sm">Currency</label>
                <select
                  value={valueConfig.currency || 'USD'}
                  onChange={(e) => updateValueConfig({ currency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>CAD</option>
                  <option>AUD</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-sm">Minimum Redemption</label>
                <input
                  type="number"
                  value={valueConfig.creditMinRedemption || 5}
                  onChange={(e) => updateValueConfig({ creditMinRedemption: parseFloat(e.target.value) })}
                  placeholder="Minimum credit to redeem"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-sm">Maximum Balance</label>
                <input
                  type="number"
                  value={valueConfig.creditMaxBalance || ''}
                  onChange={(e) => updateValueConfig({ creditMaxBalance: e.target.value ? parseFloat(e.target.value) : null })}
                  placeholder="No limit"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-sm">Credit Expiry</label>
                <select
                  value={valueConfig.creditExpiry || '12months'}
                  onChange={(e) => updateValueConfig({ creditExpiry: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="never">Never expire</option>
                  <option value="6months">After 6 months</option>
                  <option value="12months">After 12 months</option>
                  <option value="24months">After 24 months</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-3 text-sm">Credit Options</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-2">
                  <input
                    type="checkbox"
                    checked={valueConfig.allowPartialRedemption !== false}
                    onChange={(e) => updateValueConfig({ allowPartialRedemption: e.target.checked })}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span className="text-sm text-gray-700">Allow partial redemption (use any amount)</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'vouchers':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
              <p className="text-sm text-blue-900">
                <strong>Vouchers:</strong> Fixed-denomination coupons for one-time use. Unlike credits, vouchers are redeemed entirely and don't hold a balance after use.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2 text-sm">Currency</label>
                <select
                  value={valueConfig.currency || 'USD'}
                  onChange={(e) => updateValueConfig({ currency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>CAD</option>
                  <option>AUD</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-sm">Voucher Expiry</label>
                <select
                  value={valueConfig.voucherExpiry || '6months'}
                  onChange={(e) => updateValueConfig({ voucherExpiry: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="never">Never expire</option>
                  <option value="3months">After 3 months</option>
                  <option value="6months">After 6 months</option>
                  <option value="12months">After 12 months</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-3 text-sm">Voucher Denominations</label>
              <p className="text-sm text-gray-600 mb-3">Select the fixed values for vouchers that customers can earn</p>
              <div className="flex flex-wrap gap-3">
                {[5, 10, 25, 50, 100].map(amount => {
                  const currentDenominations = valueConfig.voucherDenominations || [5, 10, 25];
                  const isChecked = currentDenominations.includes(amount);
                  return (
                    <label
                      key={amount}
                      className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        isChecked ? 'bg-primary-50 border-primary' : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary rounded"
                        checked={isChecked}
                        onChange={(e) => {
                          const newDenominations = e.target.checked
                            ? [...currentDenominations, amount]
                            : currentDenominations.filter(d => d !== amount);
                          updateValueConfig({ voucherDenominations: newDenominations.sort((a, b) => a - b) });
                        }}
                      />
                      <span className="text-sm font-medium">${amount}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-3 text-sm">Voucher Options</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-2">
                  <input
                    type="checkbox"
                    checked={valueConfig.voucherStackable || false}
                    onChange={(e) => updateValueConfig({ voucherStackable: e.target.checked })}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span className="text-sm text-gray-700">Allow multiple vouchers per transaction</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'hybrid':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Hybrid Mode:</strong> Combine multiple value types for maximum flexibility. Choose a strategy below.
              </p>
            </div>

            {/* Strategy Selection */}
            <div>
              <label className="block font-semibold mb-3 text-sm">Hybrid Strategy</label>
              <div className="grid grid-cols-3 gap-3">
                <label
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    valueConfig.hybridStrategy === 'dual' ? 'border-primary bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="hybridStrategy"
                    value="dual"
                    checked={valueConfig.hybridStrategy === 'dual'}
                    onChange={(e) => updateValueConfig({ hybridStrategy: e.target.value as any })}
                    className="sr-only"
                  />
                  <div className="font-semibold text-gray-900 mb-1">Dual Earning</div>
                  <div className="text-xs text-gray-600">Earn two value types simultaneously</div>
                </label>
                <label
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    valueConfig.hybridStrategy === 'conversion' ? 'border-primary bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="hybridStrategy"
                    value="conversion"
                    checked={valueConfig.hybridStrategy === 'conversion'}
                    onChange={(e) => updateValueConfig({ hybridStrategy: e.target.value as any })}
                    className="sr-only"
                  />
                  <div className="font-semibold text-gray-900 mb-1">Threshold Conversion</div>
                  <div className="text-xs text-gray-600">Convert points to credits at milestones</div>
                </label>
                <label
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    valueConfig.hybridStrategy === 'both' ? 'border-primary bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="hybridStrategy"
                    value="both"
                    checked={valueConfig.hybridStrategy === 'both'}
                    onChange={(e) => updateValueConfig({ hybridStrategy: e.target.value as any })}
                    className="sr-only"
                  />
                  <div className="font-semibold text-gray-900 mb-1">Both Strategies</div>
                  <div className="text-xs text-gray-600">Dual earning + conversions</div>
                </label>
              </div>
            </div>

            {/* Dual Earning Configuration */}
            {(valueConfig.hybridStrategy === 'dual' || valueConfig.hybridStrategy === 'both') && (
              <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                <h4 className="font-semibold text-gray-900">Dual Earning Configuration</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Value Type</label>
                    <select
                      value={valueConfig.dualEarning?.primaryType || 'points'}
                      onChange={(e) => updateValueConfig({
                        dualEarning: {
                          ...(valueConfig.dualEarning || { primaryRate: 1, secondaryType: 'cashback', secondaryRate: 0.5 }),
                          primaryType: e.target.value as any,
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="points">Points</option>
                      <option value="cashback">Cashback</option>
                      <option value="credits">Credits</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Earn Rate</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.1"
                        value={valueConfig.dualEarning?.primaryRate || 1}
                        onChange={(e) => updateValueConfig({
                          dualEarning: {
                            ...(valueConfig.dualEarning || { primaryType: 'points', secondaryType: 'cashback', secondaryRate: 0.5 }),
                            primaryRate: parseFloat(e.target.value),
                          },
                        })}
                        className="px-3 py-2 border border-gray-300 rounded-lg flex-1"
                      />
                      <span className="text-sm text-gray-600">per $1</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Secondary Value Type</label>
                    <select
                      value={valueConfig.dualEarning?.secondaryType || 'cashback'}
                      onChange={(e) => updateValueConfig({
                        dualEarning: {
                          ...(valueConfig.dualEarning || { primaryType: 'points', primaryRate: 1, secondaryRate: 0.5 }),
                          secondaryType: e.target.value as any,
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="points">Points</option>
                      <option value="cashback">Cashback</option>
                      <option value="credits">Credits</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Secondary Earn Rate</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.1"
                        value={valueConfig.dualEarning?.secondaryRate || 0.5}
                        onChange={(e) => updateValueConfig({
                          dualEarning: {
                            ...(valueConfig.dualEarning || { primaryType: 'points', primaryRate: 1, secondaryType: 'cashback' }),
                            secondaryRate: parseFloat(e.target.value),
                          },
                        })}
                        className="px-3 py-2 border border-gray-300 rounded-lg flex-1"
                      />
                      <span className="text-sm text-gray-600">per $1</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 italic">
                  Example: Customer earns {valueConfig.dualEarning?.primaryRate || 1} {valueConfig.dualEarning?.primaryType || 'points'} + {valueConfig.dualEarning?.secondaryRate || 0.5} {valueConfig.dualEarning?.secondaryType || 'cashback'} per $1 spent
                </p>
              </div>
            )}

            {/* Threshold Conversion Configuration */}
            {(valueConfig.hybridStrategy === 'conversion' || valueConfig.hybridStrategy === 'both') && (
              <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                <h4 className="font-semibold text-gray-900">Threshold Conversion Configuration</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Convert From</label>
                    <select
                      value={valueConfig.conversionThreshold?.fromType || 'points'}
                      onChange={(e) => updateValueConfig({
                        conversionThreshold: {
                          ...(valueConfig.conversionThreshold || { fromAmount: 1000, toType: 'credits', toAmount: 10, autoConvert: false }),
                          fromType: e.target.value as any,
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="points">Points</option>
                      <option value="cashback">Cashback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount Threshold</label>
                    <input
                      type="number"
                      value={valueConfig.conversionThreshold?.fromAmount || 1000}
                      onChange={(e) => updateValueConfig({
                        conversionThreshold: {
                          ...(valueConfig.conversionThreshold || { fromType: 'points', toType: 'credits', toAmount: 10, autoConvert: false }),
                          fromAmount: parseFloat(e.target.value),
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Convert To</label>
                    <select
                      value={valueConfig.conversionThreshold?.toType || 'credits'}
                      onChange={(e) => updateValueConfig({
                        conversionThreshold: {
                          ...(valueConfig.conversionThreshold || { fromType: 'points', fromAmount: 1000, toAmount: 10, autoConvert: false }),
                          toType: e.target.value as any,
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="credits">Store Credits</option>
                      <option value="vouchers">Vouchers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Converted Amount</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">$</span>
                      <input
                        type="number"
                        value={valueConfig.conversionThreshold?.toAmount || 10}
                        onChange={(e) => updateValueConfig({
                          conversionThreshold: {
                            ...(valueConfig.conversionThreshold || { fromType: 'points', fromAmount: 1000, toType: 'credits', autoConvert: false }),
                            toAmount: parseFloat(e.target.value),
                          },
                        })}
                        className="px-3 py-2 border border-gray-300 rounded-lg flex-1"
                      />
                    </div>
                  </div>
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={valueConfig.conversionThreshold?.autoConvert || false}
                    onChange={(e) => updateValueConfig({
                      conversionThreshold: {
                        ...(valueConfig.conversionThreshold || { fromType: 'points', fromAmount: 1000, toType: 'credits', toAmount: 10 }),
                        autoConvert: e.target.checked,
                      },
                    })}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span className="text-sm text-gray-700">Automatically convert when threshold is reached</span>
                </label>
                <p className="text-xs text-gray-600 italic">
                  Example: Every {valueConfig.conversionThreshold?.fromAmount || 1000} {valueConfig.conversionThreshold?.fromType || 'points'} → ${valueConfig.conversionThreshold?.toAmount || 10} in {valueConfig.conversionThreshold?.toType || 'credits'}
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configure Your Value Mechanisms</h1>
          <p className="text-gray-600 text-lg">Define how value is earned, stored, and redeemed in your loyalty program</p>
        </div>

        {/* Value Type Selection */}
        <div className="grid grid-cols-5 gap-4 mb-8">
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

        {/* Value Configuration */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6">
            {valueTypes.find(t => t.id === valueType)?.name} Configuration
          </h3>
          {renderValueConfigForm()}

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-2xl mr-2">🤖</span>
            <strong className="text-amber-900">AI Optimization:</strong>
            <span className="text-amber-800 text-sm ml-2">
              The system will analyze redemption patterns and automatically suggest optimal configurations to maximize engagement while managing liability.
            </span>
          </div>
        </Card>

        {/* Earning Calculation Settings */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6">Earning Calculation Settings</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2 text-sm">Calculation Method</label>
              <p className="text-xs text-gray-600 mb-2">How to handle fractional values when calculating rewards</p>
              <select
                value={valueConfig.calculationMethod || 'round-down'}
                onChange={(e) => updateValueConfig({ calculationMethod: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="round-down">Round Down (e.g., 1.9 → 1)</option>
                <option value="round-up">Round Up (e.g., 1.1 → 2)</option>
                <option value="round-nearest">Round to Nearest (e.g., 1.5 → 2)</option>
                <option value="fractional">Allow Fractional Values (e.g., 1.75)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2 text-sm">Transaction Value Inclusion</label>
              <p className="text-xs text-gray-600 mb-2">What should be included in the earning calculation</p>
              <select
                value={valueConfig.inclusionPolicy || 'exclude-all'}
                onChange={(e) => updateValueConfig({ inclusionPolicy: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="exclude-all">Base Amount Only (Exclude Tax & Tips)</option>
                <option value="include-tax">Include Tax</option>
                <option value="include-tips">Include Tips</option>
                <option value="include-all">Include Everything (Tax + Tips)</option>
              </select>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
            <strong>Note:</strong> These settings apply to all earning calculations across your loyalty program.
          </div>
        </Card>

        {/* Tier Configuration */}
        <Card className="p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold">Customer Segmentation</h3>
              <p className="text-sm text-gray-600 mt-1">
                {useTiers
                  ? 'Configure earning rules for each tier separately'
                  : 'Program-wide earning rules apply to all members'
                }
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Program-Wide</span>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={useTiers}
                  onChange={(e) => setUseTiers(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-primary transition-colors cursor-pointer"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
              </label>
              <span className="text-sm text-gray-600">Tier-Based</span>
            </div>
          </div>

          {useTiers && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Define membership tiers with different thresholds and earning rules</p>
                <Button onClick={handleAddTier} size="sm">
                  <Plus size={16} className="mr-1" />
                  Add Tier
                </Button>
              </div>

              {tiers.length > 0 && (
                <div className="space-y-3">
                  {tiers.map((tier) => (
                    <div key={tier.id} className="border border-gray-200 rounded-lg">
                      {/* Tier Header */}
                      <div className="flex items-center gap-4 p-4 bg-gray-50">
                        <div className={`w-3 h-3 rounded-full ${tierColors.find(c => c.value === tier.color)?.class || 'bg-gray-500'}`}></div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{tier.name}</div>
                          <div className="text-sm text-gray-600">
                            {tier.threshold.toLocaleString()} {valueLabel} threshold • {tier.earningRules.baseRate.points} {valueLabel} per ${tier.earningRules.baseRate.spend}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setExpandedTier(expandedTier === tier.id ? null : tier.id)}
                            className="p-2 text-gray-600 hover:text-primary transition-colors"
                          >
                            {expandedTier === tier.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          <button
                            onClick={() => handleEditTier(tier)}
                            className="p-2 text-gray-600 hover:text-primary transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteTier(tier.id)}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Tier Earning Rules (Expanded) */}
                      {expandedTier === tier.id && (
                        <div className="p-6 border-t border-gray-200 bg-white">
                          <h4 className="font-semibold text-gray-900 mb-4">Earning Rules for {tier.name}</h4>
                          <EarningRulesEditor
                            rules={tier.earningRules}
                            onUpdate={(rulesUpdate) => handleUpdateTierEarningRules(tier.id, rulesUpdate)}
                            currency={valueConfig.currency || 'USD'}
                            valueType={valueType}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {tiers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No tiers configured. Click "Add Tier" to get started.
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Global Earning Rules (Only when tiers are disabled) */}
        {!useTiers && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Program-Wide Earning Rules</h3>
            <EarningRulesEditor
              rules={earningRules}
              onUpdate={updateEarningRules}
              currency={valueConfig.currency || 'USD'}
              valueType={valueType}
            />
          </Card>
        )}
      </div>

      {/* Tier Modal */}
      <Modal isOpen={showTierModal} onClose={() => setShowTierModal(false)} title={editingTier ? 'Edit Tier' : 'Add New Tier'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tier Name</label>
            <input
              type="text"
              value={tierForm.name}
              onChange={(e) => setTierForm({ ...tierForm, name: e.target.value })}
              placeholder="e.g., Gold, Platinum"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={tierForm.description}
              onChange={(e) => setTierForm({ ...tierForm, description: e.target.value })}
              placeholder="Brief description of this tier"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Points Threshold</label>
            <input
              type="number"
              value={tierForm.threshold}
              onChange={(e) => setTierForm({ ...tierForm, threshold: parseInt(e.target.value) })}
              placeholder="Points required to reach this tier"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <div className="grid grid-cols-4 gap-2">
              {tierColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setTierForm({ ...tierForm, color: color.value })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    tierForm.color === color.value ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <div className={`w-full h-4 rounded ${color.class}`}></div>
                  <div className="text-xs mt-1 text-center">{color.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Benefits</label>
              <button onClick={addBenefit} className="text-sm text-primary hover:underline">
                + Add Benefit
              </button>
            </div>
            <div className="space-y-2">
              {tierForm.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    placeholder="e.g., Free shipping, Priority support"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  {tierForm.benefits.length > 1 && (
                    <button
                      onClick={() => removeBenefit(index)}
                      className="p-2 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
            After creating the tier, expand it to configure its specific earning rules.
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowTierModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSaveTier} className="flex-1">
              {editingTier ? 'Update Tier' : 'Add Tier'}
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};
