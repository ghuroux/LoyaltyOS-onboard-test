import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useOnboardingStore } from '../../store/onboardingStore';
import { QrCode, Smartphone, CreditCard, Phone, Bell, ExternalLink, Check } from 'lucide-react';

export const Screen4Redemption: React.FC = () => {
  const { valueType, valueConfig, updateValueConfig } = useOnboardingStore();

  // Mock identification methods inherited from Earning Rules (Step 3)
  // In a real app, this would come from global state/context
  const [inheritedIdentificationMethods] = useState({
    qrCode: true,
    appleWallet: true,
    googleWallet: true,
    linearBarcode: false,
    phoneLookup: true,
    pushNotifications: false,
  });

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

  // Count enabled methods
  const enabledMethodsCount = Object.values(inheritedIdentificationMethods).filter(Boolean).length;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Redemption Configuration</h1>
          <p className="text-gray-600 text-lg">Configure how customers can use their {valueLabel}</p>
        </div>

        {/* Inherited Member Identification Methods (Read-Only) */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-blue-200">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-500 rounded-lg">
                  <QrCode className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Member Identification Methods</h3>
                  <p className="text-sm text-gray-600">Configured in Earning Rules - applies to both earning and redemption</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                <ExternalLink size={16} className="mr-2" />
                Modify in Earning Rules
              </Button>
            </div>
          </div>

          {/* Enabled Methods Summary */}
          <div className="mb-4 p-4 bg-white border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Check className="text-green-600" size={18} />
              <span className="font-semibold text-gray-900">{enabledMethodsCount} Identification Method{enabledMethodsCount !== 1 ? 's' : ''} Enabled</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Members can use any of these methods to identify themselves during redemption transactions:
            </p>

            <div className="grid grid-cols-2 gap-3">
              {/* QR Code */}
              {inheritedIdentificationMethods.qrCode && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <QrCode size={18} className="text-brand-500" />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">QR Code Scanning</div>
                    <div className="text-xs text-gray-600">Display & scan at POS</div>
                  </div>
                </div>
              )}

              {/* Apple Wallet */}
              {inheritedIdentificationMethods.appleWallet && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Smartphone size={18} className="text-brand-500" />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">Apple Wallet Pass</div>
                    <div className="text-xs text-gray-600">iOS digital card</div>
                  </div>
                </div>
              )}

              {/* Google Wallet */}
              {inheritedIdentificationMethods.googleWallet && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Smartphone size={18} className="text-brand-500" />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">Google Wallet Pass</div>
                    <div className="text-xs text-gray-600">Android digital card</div>
                  </div>
                </div>
              )}

              {/* Linear Barcode */}
              {inheritedIdentificationMethods.linearBarcode && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <CreditCard size={18} className="text-brand-500" />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">Linear Barcode</div>
                    <div className="text-xs text-gray-600">Physical card barcode</div>
                  </div>
                </div>
              )}

              {/* Phone Lookup */}
              {inheritedIdentificationMethods.phoneLookup && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Phone size={18} className="text-brand-500" />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">Phone Lookup</div>
                    <div className="text-xs text-gray-600">Manual POS lookup</div>
                  </div>
                </div>
              )}

              {/* Push Notifications */}
              {inheritedIdentificationMethods.pushNotifications && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Bell size={18} className="text-brand-500" />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">Push Check-In</div>
                    <div className="text-xs text-gray-600">Location-based</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Banner */}
          <div className="p-3 bg-blue-100 border border-blue-300 rounded-lg">
            <div className="flex gap-2">
              <div className="text-blue-600 mt-0.5">ℹ️</div>
              <div className="text-xs text-blue-900">
                <strong>Note:</strong> These identification methods apply to both earning and redemption transactions.
                To modify, update the settings in the <strong>Earning Rules</strong> page. Changes will automatically apply here.
              </div>
            </div>
          </div>
        </Card>

        {/* Points Redemption */}
        {valueType === 'points' && (
          <>
            <Card className="p-5 mb-5">
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
                      <input type="checkbox" className="w-4 h-4 text-brand-600 rounded" defaultChecked={type.name === 'Instant Discount'} />
                      <span className="text-xs">Enable</span>
                    </label>
                  </Card>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-xl font-semibold mb-4">Redemption Rules</h3>
              <div className="grid grid-cols-2 gap-5">
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
            <Card className="p-5 mb-5">
              <h3 className="text-xl font-semibold mb-4">Cashback Redemption Methods</h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input type="checkbox" className="w-5 h-5 text-brand-600 rounded mt-1" defaultChecked />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Auto-Apply at Checkout</div>
                    <div className="text-sm text-gray-600 mt-1">Automatically deduct cashback balance from purchases</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input type="checkbox" className="w-5 h-5 text-brand-600 rounded mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Manual Withdrawal</div>
                    <div className="text-sm text-gray-600 mt-1">Customer chooses when to withdraw cashback</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input type="checkbox" className="w-5 h-5 text-brand-600 rounded mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Bank Transfer</div>
                    <div className="text-sm text-gray-600 mt-1">Transfer cashback directly to bank account</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input type="checkbox" className="w-5 h-5 text-brand-600 rounded mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Store Credit</div>
                    <div className="text-sm text-gray-600 mt-1">Convert cashback to non-expiring store credit</div>
                  </div>
                </label>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-xl font-semibold mb-4">Cashback Rules</h3>
              <div className="grid grid-cols-2 gap-5">
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
                    <input type="checkbox" className="w-4 h-4 text-brand-600 rounded" defaultChecked />
                    <span className="text-sm text-gray-700">Allow partial cashback redemption</span>
                  </label>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Credits Redemption */}
        {valueType === 'credits' && (
          <Card className="p-5">
            <h3 className="text-xl font-semibold mb-4">Store Credit Redemption</h3>
            <p className="text-gray-600 mb-5">
              Store credits are already in the customer's wallet and can be applied at checkout.
              Configure how credits can be used below.
            </p>
            <div className="grid grid-cols-2 gap-5">
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
                    className="w-4 h-4 text-brand-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Allow partial credit redemption (use any amount)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-brand-600 rounded" defaultChecked />
                  <span className="text-sm text-gray-700">Auto-apply available credits at checkout</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-brand-600 rounded" />
                  <span className="text-sm text-gray-700">Allow combining credits with promotions</span>
                </label>
              </div>
            </div>
          </Card>
        )}

        {/* Vouchers Redemption */}
        {valueType === 'vouchers' && (
          <Card className="p-5">
            <h3 className="text-xl font-semibold mb-4">Voucher Redemption</h3>
            <p className="text-gray-600 mb-5">
              Vouchers are fixed-value rewards earned through the loyalty program.
              Configure how customers can redeem their vouchers.
            </p>
            <div className="grid grid-cols-2 gap-5">
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
                    className="w-4 h-4 text-brand-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Allow stacking multiple vouchers in one transaction</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-brand-600 rounded" />
                  <span className="text-sm text-gray-700">Allow combining vouchers with promotions</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-brand-600 rounded" defaultChecked />
                  <span className="text-sm text-gray-700">Voucher code required at redemption</span>
                </label>
              </div>
            </div>
          </Card>
        )}

        {/* Hybrid Redemption */}
        {valueType === 'hybrid' && (
          <Card className="p-5">
            <h3 className="text-xl font-semibold mb-4">Hybrid Redemption Options</h3>
            <p className="text-gray-600 mb-5">
              With a hybrid model, customers have multiple value types. Configure redemption rules for each type below.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Primary Value Type Redemption</h4>
                <p className="text-sm text-gray-600">Configure redemption for your primary value type (selected in Value configuration).</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Secondary Value Type Redemption</h4>
                <p className="text-sm text-gray-600">Configure redemption for your secondary value type.</p>
              </div>
              <div className="p-4 border border-dashed border-gray-300 rounded-lg text-center">
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
