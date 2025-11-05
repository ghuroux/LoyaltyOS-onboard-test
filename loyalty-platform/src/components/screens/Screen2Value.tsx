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
  { id: 'credits', icon: Ticket, name: 'Credits/Vouchers', desc: 'Fixed-value credits or voucher-based rewards' },
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
  behavioralBonuses: {
    frequencyBonus: { enabled: false, visits: 3, points: 50 },
    thresholdBonus: { enabled: false, spend: 100, points: 100 },
    birthdayMultiplier: { enabled: false, multiplier: 2 },
    firstPurchase: { enabled: false, points: 500 },
  },
});

interface EarningRulesEditorProps {
  rules: EarningRules;
  onUpdate: (rules: Partial<EarningRules>) => void;
  currency: string;
}

const EarningRulesEditor: React.FC<EarningRulesEditorProps> = ({ rules, onUpdate, currency }) => {
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
      {/* Base Rate */}
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
          <span className="text-gray-600">points per</span>
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

      {/* Category Multipliers */}
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

          {/* Birthday Multiplier */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={rules.behavioralBonuses.birthdayMultiplier?.enabled || false}
                onChange={(e) => onUpdate({
                  behavioralBonuses: {
                    ...rules.behavioralBonuses,
                    birthdayMultiplier: {
                      ...rules.behavioralBonuses.birthdayMultiplier,
                      enabled: e.target.checked,
                      multiplier: rules.behavioralBonuses.birthdayMultiplier?.multiplier || 2,
                    },
                  },
                })}
                className="w-4 h-4 text-primary rounded"
              />
              <span className="font-medium text-gray-900">Birthday Month Multiplier</span>
            </label>
            {rules.behavioralBonuses.birthdayMultiplier?.enabled && (
              <div className="flex items-center gap-3 ml-6">
                <input
                  type="number"
                  step="0.5"
                  value={rules.behavioralBonuses.birthdayMultiplier.multiplier}
                  onChange={(e) => onUpdate({
                    behavioralBonuses: {
                      ...rules.behavioralBonuses,
                      birthdayMultiplier: {
                        ...rules.behavioralBonuses.birthdayMultiplier!,
                        multiplier: parseFloat(e.target.value),
                      },
                    },
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                />
                <span className="text-sm text-gray-600">x multiplier during birthday month</span>
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
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2 text-sm">Credit Denominations</label>
                <div className="flex flex-wrap gap-2">
                  {[5, 10, 25, 50, 100].map(amount => (
                    <label key={amount} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <input type="checkbox" className="w-4 h-4 text-primary rounded" defaultChecked />
                      <span className="text-sm">${amount}</span>
                    </label>
                  ))}
                </div>
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
          </div>
        );

      case 'hybrid':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Hybrid Mode:</strong> Configure multiple value types. Customers can earn and redeem across all enabled mechanisms.
              </p>
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-primary cursor-pointer">
                <input type="checkbox" className="w-5 h-5 text-primary rounded" defaultChecked />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Enable Points</div>
                  <div className="text-sm text-gray-600">Allow earning and spending points</div>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-primary cursor-pointer">
                <input type="checkbox" className="w-5 h-5 text-primary rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Enable Cashback</div>
                  <div className="text-sm text-gray-600">Direct monetary rewards</div>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-primary cursor-pointer">
                <input type="checkbox" className="w-5 h-5 text-primary rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Enable Credits</div>
                  <div className="text-sm text-gray-600">Voucher-based rewards</div>
                </div>
              </label>
            </div>
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
                            {tier.threshold.toLocaleString()} points threshold • {tier.earningRules.baseRate.points} point{tier.earningRules.baseRate.points !== 1 ? 's' : ''} per ${tier.earningRules.baseRate.spend}
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
