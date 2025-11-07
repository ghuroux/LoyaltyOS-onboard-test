import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { QrCode, Smartphone, CreditCard, Phone, Bell, Store, Monitor, Users } from 'lucide-react';

export const Screen4Earning: React.FC = () => {
  // Mock channel configuration - in real app, this would come from global state/context
  // These values should match what was selected in Platform Basics
  const [channelOnline] = useState(true);
  const [channelInStore] = useState(true);
  const [channelPartner] = useState(false);

  // Member Identification Methods state
  const [identificationMethods, setIdentificationMethods] = useState({
    qrCode: true,
    appleWallet: true,
    googleWallet: true,
    linearBarcode: false,
    phoneLookup: true,
    pushNotifications: false,
  });

  const toggleIdentificationMethod = (method: keyof typeof identificationMethods) => {
    setIdentificationMethods(prev => ({ ...prev, [method]: !prev[method] }));
  };

  // Determine which methods are available based on channels
  const hasPhysicalChannel = channelInStore || channelPartner;
  const hasDigitalChannel = channelOnline;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Earning Rules & Mechanisms</h1>
          <p className="text-gray-600 text-lg">Configure how customers earn value through purchases and behaviors</p>
        </div>

        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Base Earning Rules</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Earn Rate</label>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue="1" className="px-3 py-2 border border-gray-300 rounded-lg w-20" />
                <span className="text-sm">point per</span>
                <input type="number" defaultValue="1" className="px-3 py-2 border border-gray-300 rounded-lg w-20" />
                <span className="text-sm">USD spent</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Calculation Method</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>Round down</option>
                <option>Round up</option>
                <option>Round nearest</option>
                <option>Fractional</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Exclusions</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>Tax & tips excluded</option>
                <option>Include tax</option>
                <option>Include tips</option>
                <option>Include all</option>
              </select>
            </div>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 text-primary rounded" />
              <span className="text-sm font-medium">Enable AI-powered dynamic multipliers</span>
            </label>
            <p className="text-xs text-gray-600 mt-1 ml-6">System will adjust earn rates based on customer value and behavior</p>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Category Multipliers</h3>
          <div className="space-y-3">
            {[
              { cat: 'Food & Beverage', mult: '1x', ai: true },
              { cat: 'Retail Products', mult: '2x', ai: true },
              { cat: 'Gift Cards', mult: '0x', ai: false },
              { cat: 'Promotional Items', mult: '3x', ai: true },
            ].map((item) => (
              <div key={item.cat} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 font-medium">{item.cat}</div>
                <input type="text" defaultValue={item.mult} className="w-20 px-3 py-1 border border-gray-300 rounded" />
                {item.ai && <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">🤖 AI Optimized</span>}
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" className="mt-3">+ Add Category</Button>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Behavioral Bonuses</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Frequency Bonus', desc: 'Extra points for multiple visits per week', points: '+50' },
              { name: 'Threshold Bonus', desc: 'Bonus when spending exceeds $100', points: '+100' },
              { name: 'First Purchase', desc: 'Welcome bonus for new customers', points: '+500' },
              { name: 'Birthday Month', desc: 'Double points during birthday month', points: '2x' },
            ].map((bonus) => (
              <div key={bonus.name} className="p-4 border border-gray-300 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold">{bonus.name}</div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-semibold">{bonus.points}</span>
                </div>
                <p className="text-sm text-gray-600">{bonus.desc}</p>
                <label className="flex items-center gap-2 mt-3">
                  <input type="checkbox" className="w-4 h-4 text-primary rounded" defaultChecked />
                  <span className="text-xs text-gray-600">Enable</span>
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* Member Identification Methods */}
        <Card className="p-6 shadow-lg border-2 border-brand-200">
          <div className="mb-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-brand-500 rounded-lg">
                <QrCode className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Member Identification Methods</h3>
            </div>
            <p className="text-sm text-gray-600">
              Choose how members can identify themselves to earn and redeem rewards. Options are context-aware based on your program channels.
            </p>
          </div>

          {/* Active Channels Display */}
          <div className="mb-5 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="text-sm font-semibold text-gray-700 mb-2">Active Program Channels:</div>
            <div className="flex flex-wrap gap-2">
              {channelOnline && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                  <Monitor size={16} />
                  Online / Digital
                </div>
              )}
              {channelInStore && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                  <Store size={16} />
                  In-Store
                </div>
              )}
              {channelPartner && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium">
                  <Users size={16} />
                  Partner Locations
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Configured in Platform Basics. Identification methods below are filtered based on your channel selection.
            </p>
          </div>

          {/* Identification Methods Grid */}
          <div className="space-y-4">
            {/* QR Code - Available for Physical Channels */}
            {hasPhysicalChannel && (
              <div className={`p-4 border-2 rounded-lg transition-all ${
                identificationMethods.qrCode
                  ? 'border-brand-500 bg-brand-50'
                  : 'border-gray-200 bg-white'
              }`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={identificationMethods.qrCode}
                    onChange={() => toggleIdentificationMethod('qrCode')}
                    className="mt-1 w-5 h-5 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <QrCode size={18} className="text-brand-500" />
                      <span className="font-semibold text-gray-900">QR Code Scanning</span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Recommended for POS
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Members display QR code in mobile app or printed card. Staff scans at POS to identify member and apply rewards.
                      Fast, contactless, works offline.
                    </p>
                    {identificationMethods.qrCode && (
                      <div className="mt-3 p-3 bg-white border border-brand-200 rounded-lg">
                        <div className="text-xs text-gray-700">
                          <strong>Implementation:</strong> QR codes will encode the primary member identifier. Generate via API or in member dashboard.
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            )}

            {/* Apple Wallet - Available for All Channels */}
            <div className={`p-4 border-2 rounded-lg transition-all ${
              identificationMethods.appleWallet
                ? 'border-brand-500 bg-brand-50'
                : 'border-gray-200 bg-white'
            }`}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={identificationMethods.appleWallet}
                  onChange={() => toggleIdentificationMethod('appleWallet')}
                  className="mt-1 w-5 h-5 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone size={18} className="text-brand-500" />
                    <span className="font-semibold text-gray-900">Apple Wallet Pass</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Members add digital membership card to Apple Wallet. Can include barcode/QR code, point balance, tier status.
                    Supports location-based notifications.
                  </p>
                  {identificationMethods.appleWallet && (
                    <div className="mt-3 p-3 bg-white border border-brand-200 rounded-lg">
                      <div className="text-xs text-gray-700">
                        <strong>Requirements:</strong> Apple Developer account, PassKit certificate. Pass includes member ID {hasPhysicalChannel ? 'and scannable barcode' : ''}.
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* Google Wallet - Available for All Channels */}
            <div className={`p-4 border-2 rounded-lg transition-all ${
              identificationMethods.googleWallet
                ? 'border-brand-500 bg-brand-50'
                : 'border-gray-200 bg-white'
            }`}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={identificationMethods.googleWallet}
                  onChange={() => toggleIdentificationMethod('googleWallet')}
                  className="mt-1 w-5 h-5 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone size={18} className="text-brand-500" />
                    <span className="font-semibold text-gray-900">Google Wallet Pass</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Android equivalent of Apple Wallet. Members tap or scan their phone at POS. Supports dynamic updates for point balance and offers.
                  </p>
                  {identificationMethods.googleWallet && (
                    <div className="mt-3 p-3 bg-white border border-brand-200 rounded-lg">
                      <div className="text-xs text-gray-700">
                        <strong>Requirements:</strong> Google Pay API credentials. Pass includes member ID {hasPhysicalChannel ? 'and scannable barcode' : ''}.
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* Linear Barcode - Available for Physical Channels */}
            {hasPhysicalChannel && (
              <div className={`p-4 border-2 rounded-lg transition-all ${
                identificationMethods.linearBarcode
                  ? 'border-brand-500 bg-brand-50'
                  : 'border-gray-200 bg-white'
              }`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={identificationMethods.linearBarcode}
                    onChange={() => toggleIdentificationMethod('linearBarcode')}
                    className="mt-1 w-5 h-5 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard size={18} className="text-brand-500" />
                      <span className="font-semibold text-gray-900">Linear Barcode (Code 128)</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Traditional 1D barcode for physical membership cards. Compatible with older POS scanners. Can be printed on plastic cards or keychains.
                    </p>
                    {identificationMethods.linearBarcode && (
                      <div className="mt-3 p-3 bg-white border border-brand-200 rounded-lg">
                        <div className="text-xs text-gray-700">
                          <strong>Use Case:</strong> Legacy POS systems, plastic card programs, or kiosks without camera-based scanning.
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            )}

            {/* Phone Lookup - Available for Physical Channels */}
            {hasPhysicalChannel && (
              <div className={`p-4 border-2 rounded-lg transition-all ${
                identificationMethods.phoneLookup
                  ? 'border-brand-500 bg-brand-50'
                  : 'border-gray-200 bg-white'
              }`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={identificationMethods.phoneLookup}
                    onChange={() => toggleIdentificationMethod('phoneLookup')}
                    className="mt-1 w-5 h-5 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Phone size={18} className="text-brand-500" />
                      <span className="font-semibold text-gray-900">Phone Number Lookup</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Staff asks for customer's phone number and looks up their account at POS. Common in restaurants and quick-service retail.
                      No app or card required.
                    </p>
                    {identificationMethods.phoneLookup && (
                      <div className="mt-3 p-3 bg-white border border-brand-200 rounded-lg">
                        <div className="text-xs text-gray-700">
                          <strong>Note:</strong> Requires phone number to be a unique, validated field in customer profile. Consider privacy implications.
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            )}

            {/* Push Notifications - Available for Digital Channels */}
            {hasDigitalChannel && (
              <div className={`p-4 border-2 rounded-lg transition-all ${
                identificationMethods.pushNotifications
                  ? 'border-brand-500 bg-brand-50'
                  : 'border-gray-200 bg-white'
              }`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={identificationMethods.pushNotifications}
                    onChange={() => toggleIdentificationMethod('pushNotifications')}
                    className="mt-1 w-5 h-5 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Bell size={18} className="text-brand-500" />
                      <span className="font-semibold text-gray-900">Push Notification Check-In</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Members tap a notification to check-in when near your location (geofence). Automatically identifies member and triggers offers.
                      Requires mobile app with location permissions.
                    </p>
                    {identificationMethods.pushNotifications && (
                      <div className="mt-3 p-3 bg-white border border-brand-200 rounded-lg">
                        <div className="text-xs text-gray-700">
                          <strong>Requirements:</strong> Mobile app with location services enabled. Opt-in for location tracking required.
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* Summary & Context */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex gap-3">
              <div className="text-blue-600 mt-0.5">ℹ️</div>
              <div className="text-sm text-blue-900">
                <strong>Selected Methods Summary:</strong> You have enabled{' '}
                {Object.values(identificationMethods).filter(Boolean).length} identification method(s).
                These methods will be inherited and displayed (read-only) on the Redemption page.
                Members can use any enabled method to earn and redeem rewards.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
