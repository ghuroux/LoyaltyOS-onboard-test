import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { useOnboardingStore } from '../../store/onboardingStore';

export const Screen5Redemption: React.FC = () => {
  const { valueType, valueConfig, updateValueConfig } = useOnboardingStore();

  // Helper to get value label
  const getValueLabel = () => {
    switch (valueType) {
      case 'cashback': return 'cashback';
      case 'credits': return 'credits';
      case 'vouchers': return 'vouchers';
      case 'hybrid': return 'value';
      default: return 'points';
    }
  };

  const valueLabel = getValueLabel();
  const currency = valueConfig.currency || 'USD';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Redemption Configuration</h1>
          <p className="text-gray-600 text-lg">Configure how customers can use their {valueLabel}</p>
        </div>

        {/* Points Redemption */}
        {valueType === 'points' && (
          <>
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Redemption Methods</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: '💳', name: 'Instant Discount', desc: 'Apply points as discount at POS' },
                  { icon: '🎁', name: 'Product Rewards', desc: 'Redeem points for specific items' },
                  { icon: '🎟️', name: 'Vouchers', desc: 'Convert points to vouchers' },
                  { icon: '🌟', name: 'Experiences', desc: 'Special events & perks' },
                  { icon: '🤝', name: 'Partner Rewards', desc: 'External partner catalog' },
                  { icon: '❤️', name: 'Donations', desc: 'Donate points to charities' },
                ].map((type) => (
                  <Card key={type.name} clickable className="p-5 text-center hover:border-primary transition-colors">
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
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Redemption Rules</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2 text-sm">Minimum Redemption</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={valueConfig.minRedemption || 100}
                      onChange={(e) => updateValueConfig({ minRedemption: parseInt(e.target.value) })}
                      className="px-3 py-2 border border-gray-300 rounded-lg flex-1"
                    />
                    <span className="text-sm text-gray-600">points minimum</span>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-sm">Maximum per Transaction</label>
                  <input
                    type="number"
                    placeholder="No limit"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-sm">Redemption Value</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={valueConfig.pointValue ? 1 / valueConfig.pointValue : 100}
                      onChange={(e) => updateValueConfig({ pointValue: 1 / parseFloat(e.target.value) })}
                      className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                    />
                    <span className="text-sm text-gray-600">points =</span>
                    <span className="text-sm text-gray-600">$1 {currency}</span>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-sm">Combinability</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Can combine with promotions</option>
                    <option>Cannot combine with promotions</option>
                    <option>Custom rules</option>
                  </select>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Cashback Redemption */}
        {valueType === 'cashback' && (
          <>
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Cashback Redemption Methods</h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input type="checkbox" className="w-5 h-5 text-primary rounded mt-1" defaultChecked />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Auto-Apply at Checkout</div>
                    <div className="text-sm text-gray-600 mt-1">Automatically deduct cashback balance from purchases</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input type="checkbox" className="w-5 h-5 text-primary rounded mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Manual Withdrawal</div>
                    <div className="text-sm text-gray-600 mt-1">Customer chooses when to withdraw cashback</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input type="checkbox" className="w-5 h-5 text-primary rounded mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Bank Transfer</div>
                    <div className="text-sm text-gray-600 mt-1">Transfer cashback directly to bank account</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input type="checkbox" className="w-5 h-5 text-primary rounded mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Store Credit</div>
                    <div className="text-sm text-gray-600 mt-1">Convert cashback to non-expiring store credit</div>
                  </div>
                </label>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Cashback Rules</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2 text-sm">Minimum Withdrawal</label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">$</span>
                    <input
                      type="number"
                      defaultValue="5"
                      className="px-3 py-2 border border-gray-300 rounded-lg flex-1"
                    />
                    <span className="text-sm text-gray-600">{currency}</span>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-sm">Maximum Balance</label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">$</span>
                    <input
                      type="number"
                      value={valueConfig.cashbackCap || ''}
                      onChange={(e) => updateValueConfig({ cashbackCap: e.target.value ? parseFloat(e.target.value) : null })}
                      placeholder="No limit"
                      className="px-3 py-2 border border-gray-300 rounded-lg flex-1"
                    />
                    <span className="text-sm text-gray-600">{currency}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary rounded" defaultChecked />
                    <span className="text-sm text-gray-700">Allow partial cashback redemption</span>
                  </label>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Credits Redemption */}
        {valueType === 'credits' && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Store Credit Redemption</h3>
            <p className="text-gray-600 mb-6">
              Store credits are already in the customer's wallet and can be applied at checkout.
              Configure how credits can be used below.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2 text-sm">Minimum Redemption per Transaction</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">$</span>
                  <input
                    type="number"
                    value={valueConfig.creditMinRedemption || 5}
                    onChange={(e) => updateValueConfig({ creditMinRedemption: parseFloat(e.target.value) })}
                    className="px-3 py-2 border border-gray-300 rounded-lg flex-1"
                  />
                  <span className="text-sm text-gray-600">{currency}</span>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-sm">Minimum Purchase to Use Credits</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">$</span>
                  <input
                    type="number"
                    defaultValue="10"
                    className="px-3 py-2 border border-gray-300 rounded-lg flex-1"
                  />
                  <span className="text-sm text-gray-600">{currency}</span>
                </div>
              </div>
              <div className="col-span-2 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={valueConfig.allowPartialRedemption !== false}
                    onChange={(e) => updateValueConfig({ allowPartialRedemption: e.target.checked })}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span className="text-sm text-gray-700">Allow partial credit redemption (use any amount)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-primary rounded" defaultChecked />
                  <span className="text-sm text-gray-700">Auto-apply available credits at checkout</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-primary rounded" />
                  <span className="text-sm text-gray-700">Allow combining credits with promotions</span>
                </label>
              </div>
            </div>
          </Card>
        )}

        {/* Vouchers Redemption */}
        {valueType === 'vouchers' && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Voucher Redemption</h3>
            <p className="text-gray-600 mb-6">
              Vouchers are fixed-value rewards earned through the loyalty program.
              Configure how customers can redeem their vouchers.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2 text-sm">Minimum Purchase to Use Voucher</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">$</span>
                  <input
                    type="number"
                    defaultValue="15"
                    className="px-3 py-2 border border-gray-300 rounded-lg flex-1"
                  />
                  <span className="text-sm text-gray-600">{currency}</span>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-sm">Redemption Location</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>All locations</option>
                  <option>Specific stores only</option>
                  <option>Online only</option>
                  <option>In-store only</option>
                </select>
              </div>
              <div className="col-span-2 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={valueConfig.voucherStackable || false}
                    onChange={(e) => updateValueConfig({ voucherStackable: e.target.checked })}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span className="text-sm text-gray-700">Allow stacking multiple vouchers in one transaction</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-primary rounded" />
                  <span className="text-sm text-gray-700">Allow combining vouchers with promotions</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-primary rounded" defaultChecked />
                  <span className="text-sm text-gray-700">Voucher code required at redemption</span>
                </label>
              </div>
            </div>
          </Card>
        )}

        {/* Hybrid Redemption */}
        {valueType === 'hybrid' && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Hybrid Redemption Options</h3>
            <p className="text-gray-600 mb-6">
              With a hybrid model, customers have multiple value types. Configure redemption rules for each type below.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Primary Value Type Redemption</h4>
                <p className="text-sm text-gray-600">Configure redemption for your primary value type (selected in Value configuration).</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Secondary Value Type Redemption</h4>
                <p className="text-sm text-gray-600">Configure redemption for your secondary value type.</p>
              </div>
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <p className="text-gray-600">Detailed hybrid redemption configuration will be based on your Value tab settings.</p>
                <p className="text-sm text-gray-500 mt-2">Return to the Value tab to review your hybrid strategy.</p>
              </div>
            </div>
          </Card>
        )}

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <span className="text-2xl mr-2">💡</span>
          <strong className="text-amber-900">Tip:</strong>
          <span className="text-amber-800 text-sm ml-2">
            Consider your customer psychology: easier redemption drives engagement, but strategic friction can increase perceived value.
          </span>
        </div>
      </div>
    </motion.div>
  );
};
