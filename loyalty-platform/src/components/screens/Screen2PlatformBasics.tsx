import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Globe, DollarSign, Clock, Calendar, User, Mail, Phone, Building2, Palette, Image } from 'lucide-react';

export const Screen2PlatformBasics: React.FC = () => {
  // Program Scope
  const [programScope, setProgramScope] = useState<'single-country' | 'independent-instances' | 'unified-global'>('single-country');

  // Program Settings
  const [programName, setProgramName] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [timezone, setTimezone] = useState('America/New_York');
  const [language, setLanguage] = useState('en-US');
  const [fiscalYearStart, setFiscalYearStart] = useState('01-01');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');

  // Seed User (Administrator)
  const [seedUser, setSeedUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'System Administrator',
  });

  // Support Contact
  const [supportContact, setSupportContact] = useState({
    email: '',
    phone: '',
    hours: '9:00 AM - 5:00 PM EST',
  });

  // Primary Country/Region (for independent instances)
  const [primaryCountry, setPrimaryCountry] = useState('United States');

  // White-Labeling / Branding
  const [whiteLabelingEnabled, setWhiteLabelingEnabled] = useState(true);
  const [brandLogoUrl, setBrandLogoUrl] = useState('');
  const [primaryBrandColor, setPrimaryBrandColor] = useState('#0ea5e9');
  const [secondaryBrandColor, setSecondaryBrandColor] = useState('#8b5cf6');

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  ];

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'America/Toronto', label: 'Toronto' },
    { value: 'America/Vancouver', label: 'Vancouver' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Asia/Dubai', label: 'Dubai' },
    { value: 'Asia/Singapore', label: 'Singapore' },
    { value: 'Asia/Tokyo', label: 'Tokyo' },
    { value: 'Australia/Sydney', label: 'Sydney' },
  ];

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'en-CA', name: 'English (Canada)' },
    { code: 'en-AU', name: 'English (Australia)' },
    { code: 'es-ES', name: 'Spanish (Spain)' },
    { code: 'es-MX', name: 'Spanish (Mexico)' },
    { code: 'fr-FR', name: 'French (France)' },
    { code: 'fr-CA', name: 'French (Canada)' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'zh-CN', name: 'Chinese (Simplified)' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ar-AE', name: 'Arabic' },
  ];

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
    'Spain', 'Italy', 'Brazil', 'Mexico', 'Japan', 'China', 'India', 'Singapore',
    'United Arab Emirates', 'South Africa', 'Netherlands', 'Belgium', 'Switzerland',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-brand-500 text-white rounded-2xl p-8 shadow-lg">
            <h1 className="text-4xl font-bold mb-3">Platform Basics</h1>
            <p className="text-white text-lg max-w-3xl">
              Configure fundamental platform settings, regional preferences, and create your primary administrator account
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Program Scope */}
          <Card className="shadow-lg">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 bg-brand-500 rounded-lg">
                  <Globe className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Program Scope</h2>
                  <p className="text-gray-600 text-sm">Define the geographic reach of your loyalty program</p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Single Country */}
                <div
                  onClick={() => setProgramScope('single-country')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    programScope === 'single-country'
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      checked={programScope === 'single-country'}
                      onChange={() => setProgramScope('single-country')}
                      className="mt-1 w-4 h-4 text-brand-500 focus:ring-brand-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">Single Country Program</div>
                      <p className="text-sm text-gray-600">
                        One currency, timezone, and primary market. Best for businesses operating in a single country.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Independent Instances */}
                <div
                  onClick={() => setProgramScope('independent-instances')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    programScope === 'independent-instances'
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      checked={programScope === 'independent-instances'}
                      onChange={() => setProgramScope('independent-instances')}
                      className="mt-1 w-4 h-4 text-brand-500 focus:ring-brand-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">Multi-Country - Independent Instances</div>
                      <p className="text-sm text-gray-600">
                        Separate loyalty programs per country/region. Configure one instance, then replicate for other markets.
                        Each country operates independently with its own currency, rules, and member base.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Unified Global - Coming Soon */}
                <div className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50 opacity-60 cursor-not-allowed relative">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      disabled
                      className="mt-1 w-4 h-4 text-gray-400"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">Multi-Country - Unified Global Program</span>
                        <span className="px-2 py-0.5 bg-accent-100 text-accent-700 text-xs font-semibold rounded-full">
                          Coming Q2 2026
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Single program where members earn and redeem globally across all countries. Supports multi-currency,
                        cross-border transactions, and unified member experience. Perfect for global hotel chains, airlines,
                        and international brands.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contextual Help */}
                {programScope === 'independent-instances' && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex gap-3">
                      <div className="text-blue-600 mt-0.5">ℹ️</div>
                      <div className="text-sm text-blue-900">
                        <strong>Note:</strong> You're configuring the primary instance. After completing this setup,
                        you can clone this configuration for other countries and adjust regional settings, currencies,
                        and local compliance requirements as needed.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Program Identity */}
          <Card className="shadow-lg">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 bg-brand-500 rounded-lg">
                  <Building2 className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Program Identity</h2>
                  <p className="text-gray-600 text-sm">Define your loyalty program name and description</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Program Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={programName}
                    onChange={(e) => setProgramName(e.target.value)}
                    placeholder="e.g., Acme Rewards, MyBrand Loyalty, VIP Club"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">This will be displayed to your customers</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Program Description <span className="text-gray-400">(Optional)</span>
                  </label>
                  <textarea
                    value={programDescription}
                    onChange={(e) => setProgramDescription(e.target.value)}
                    placeholder="Brief description of your loyalty program..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Brand & White-Labeling */}
          <Card className="shadow-lg">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 bg-accent-500 rounded-lg">
                  <Palette className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Brand & White-Labeling</h2>
                  <p className="text-gray-600 text-sm">Customize customer-facing platforms with your brand identity</p>
                </div>
              </div>

              {/* Enable Toggle */}
              <div className="mb-5 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={whiteLabelingEnabled}
                        onChange={(e) => setWhiteLabelingEnabled(e.target.checked)}
                        className="w-5 h-5 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
                      />
                      <span className="ml-3 font-semibold text-gray-900">Enable Custom Branding</span>
                    </label>
                    <p className="text-sm text-gray-600 mt-1 ml-8">
                      Apply your brand logo and colors to member portals, mobile apps, and email communications
                    </p>
                  </div>
                </div>
              </div>

              {/* Brand Configuration (shown when enabled) */}
              {whiteLabelingEnabled ? (
                <div className="space-y-5">
                  {/* Logo */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Image className="inline" size={16} /> Brand Logo URL
                    </label>
                    <input
                      type="text"
                      value={brandLogoUrl}
                      onChange={(e) => setBrandLogoUrl(e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended: 200x60px, transparent PNG. Will be displayed on member dashboard and emails.
                    </p>
                  </div>

                  {/* Color Pickers */}
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Primary Brand Color <span className="text-red-600">*</span>
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={primaryBrandColor}
                          onChange={(e) => setPrimaryBrandColor(e.target.value)}
                          className="w-16 h-12 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={primaryBrandColor}
                          onChange={(e) => setPrimaryBrandColor(e.target.value)}
                          placeholder="#0ea5e9"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none font-mono"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Used for buttons, links, and primary elements</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Secondary/Accent Color <span className="text-gray-400">(Optional)</span>
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={secondaryBrandColor}
                          onChange={(e) => setSecondaryBrandColor(e.target.value)}
                          className="w-16 h-12 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={secondaryBrandColor}
                          onChange={(e) => setSecondaryBrandColor(e.target.value)}
                          placeholder="#8b5cf6"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none font-mono"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Used for highlights and secondary actions</p>
                    </div>
                  </div>

                  {/* Brand Preview */}
                  <div className="mt-6 p-5 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg">
                    <div className="text-sm font-semibold text-gray-700 mb-4">Brand Preview</div>

                    {/* Mock Customer Dashboard Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                      {/* Mock Logo */}
                      <div className="mb-4">
                        {brandLogoUrl ? (
                          <img src={brandLogoUrl} alt="Brand Logo" className="h-12 object-contain" />
                        ) : (
                          <div className="h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm font-medium px-4">
                            {programName || 'Your Logo Here'}
                          </div>
                        )}
                      </div>

                      {/* Mock Content */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">Welcome back, John!</h3>
                          <p className="text-sm text-gray-600">You have 2,450 points available</p>
                        </div>

                        {/* Mock Primary Button */}
                        <button
                          style={{ backgroundColor: primaryBrandColor }}
                          className="w-full py-2.5 text-white font-medium rounded-lg shadow-sm transition-opacity hover:opacity-90"
                        >
                          Redeem Points
                        </button>

                        {/* Mock Secondary Button */}
                        <button
                          style={{
                            borderColor: secondaryBrandColor,
                            color: secondaryBrandColor
                          }}
                          className="w-full py-2.5 bg-white border-2 font-medium rounded-lg transition-colors"
                        >
                          View Rewards
                        </button>

                        {/* Mock Stats */}
                        <div className="grid grid-cols-3 gap-3 mt-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold" style={{ color: primaryBrandColor }}>12</div>
                            <div className="text-xs text-gray-600">Visits</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold" style={{ color: primaryBrandColor }}>$342</div>
                            <div className="text-xs text-gray-600">Spent</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold" style={{ color: secondaryBrandColor }}>Gold</div>
                            <div className="text-xs text-gray-600">Tier</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Preview of how your branding will appear on customer-facing platforms
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
                  <div className="text-gray-600 mb-2">
                    <Building2 className="inline mb-1 text-gray-400" size={48} />
                  </div>
                  <p className="text-sm text-gray-600">
                    Customer-facing platforms will use <strong>StratOS default branding</strong>.
                    Enable custom branding to use your own logo and colors.
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Regional Settings */}
          <Card className="shadow-lg">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 bg-brand-500 rounded-lg">
                  <Globe className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {programScope === 'independent-instances' ? 'Primary Region Settings' : 'Regional Settings'}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {programScope === 'independent-instances'
                      ? 'Configure settings for your primary market (can be customized per instance)'
                      : 'Configure currency, timezone, and language preferences'}
                  </p>
                </div>
              </div>

              {/* Primary Country/Region for Independent Instances */}
              {programScope === 'independent-instances' && (
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Primary Country/Region <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={primaryCountry}
                    onChange={(e) => setPrimaryCountry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    This instance will be configured for this country. You can clone and customize for other markets later.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-5">
                {/* Currency */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign className="inline" size={16} /> Primary Currency <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  >
                    {currencies.map((curr) => (
                      <option key={curr.code} value={curr.code}>
                        {curr.symbol} {curr.code} - {curr.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Used for all monetary calculations</p>
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="inline" size={16} /> Default Timezone <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  >
                    {timezones.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Default timezone for reporting and scheduling</p>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Primary Language <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Default language for communications</p>
                </div>

                {/* Date Format */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="inline" size={16} /> Date Format <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY (UK/EU)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                    <option value="DD.MM.YYYY">DD.MM.YYYY (German)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">How dates will be displayed</p>
                </div>

                {/* Fiscal Year Start */}
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fiscal Year Start <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={fiscalYearStart}
                    onChange={(e) => setFiscalYearStart(e.target.value)}
                    placeholder="MM-DD"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    When does your fiscal year begin? (e.g., 01-01 for January 1st, 04-01 for April 1st)
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Seed User / Primary Administrator */}
          <Card className="shadow-lg border-2 border-blue-300">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                  <User className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Primary Administrator</h2>
                  <p className="text-gray-600 text-sm">Create the first system administrator account</p>
                </div>
              </div>

              <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 mb-5">
                <p className="text-sm text-blue-900">
                  <strong>💡 Important:</strong> This user will have full system access and will be responsible for initial
                  configuration and managing other user accounts. They will receive credentials via email.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={seedUser.firstName}
                    onChange={(e) => setSeedUser({ ...seedUser, firstName: e.target.value })}
                    placeholder="John"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={seedUser.lastName}
                    onChange={(e) => setSeedUser({ ...seedUser, lastName: e.target.value })}
                    placeholder="Smith"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="inline" size={16} /> Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={seedUser.email}
                    onChange={(e) => setSeedUser({ ...seedUser, email: e.target.value })}
                    placeholder="john.smith@company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="inline" size={16} /> Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    value={seedUser.phone}
                    onChange={(e) => setSeedUser({ ...seedUser, phone: e.target.value })}
                    placeholder="+1-555-0123"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title / Role <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={seedUser.role}
                    onChange={(e) => setSeedUser({ ...seedUser, role: e.target.value })}
                    placeholder="System Administrator"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Support Contact (Optional) */}
          <Card className="shadow-lg">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Support Contact</h2>
                  <p className="text-gray-600 text-sm">
                    Provide support contact information for member inquiries <span className="text-gray-400">(Optional)</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={supportContact.email}
                    onChange={(e) => setSupportContact({ ...supportContact, email: e.target.value })}
                    placeholder="support@company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Support Phone
                  </label>
                  <input
                    type="tel"
                    value={supportContact.phone}
                    onChange={(e) => setSupportContact({ ...supportContact, phone: e.target.value })}
                    placeholder="+1-800-555-0100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Support Hours
                  </label>
                  <input
                    type="text"
                    value={supportContact.hours}
                    onChange={(e) => setSupportContact({ ...supportContact, hours: e.target.value })}
                    placeholder="9:00 AM - 5:00 PM EST"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Summary Box */}
          <Card className="shadow-lg bg-gray-50 border border-gray-200">
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-3">✓ Configuration Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Program Name:</span>{' '}
                  <span className="text-gray-900">{programName || '(Not set)'}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Currency:</span>{' '}
                  <span className="text-gray-900">
                    {currencies.find((c) => c.code === currency)?.symbol} {currency}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Timezone:</span>{' '}
                  <span className="text-gray-900">{timezones.find((tz) => tz.value === timezone)?.label}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Language:</span>{' '}
                  <span className="text-gray-900">{languages.find((lang) => lang.code === language)?.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Administrator:</span>{' '}
                  <span className="text-gray-900">
                    {seedUser.firstName && seedUser.lastName
                      ? `${seedUser.firstName} ${seedUser.lastName}`
                      : '(Not set)'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Admin Email:</span>{' '}
                  <span className="text-gray-900">{seedUser.email || '(Not set)'}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};
