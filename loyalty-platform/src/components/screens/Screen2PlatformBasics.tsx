import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Globe, DollarSign, Clock, Calendar, User, Mail, Phone, Building2 } from 'lucide-react';

export const Screen2PlatformBasics: React.FC = () => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-lg">
            <h1 className="text-4xl font-bold mb-3">Platform Basics</h1>
            <p className="text-blue-50 text-lg max-w-3xl">
              Configure fundamental platform settings, regional preferences, and create your primary administrator account
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Program Identity */}
          <Card className="shadow-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Regional Settings */}
          <Card className="shadow-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg">
                  <Globe className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Regional Settings</h2>
                  <p className="text-gray-600 text-sm">Configure currency, timezone, and language preferences</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Currency */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign className="inline" size={16} /> Primary Currency <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    When does your fiscal year begin? (e.g., 01-01 for January 1st, 04-01 for April 1st)
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Seed User / Primary Administrator */}
          <Card className="shadow-md border-2 border-blue-300">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                  <User className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Primary Administrator</h2>
                  <p className="text-gray-600 text-sm">Create the first system administrator account</p>
                </div>
              </div>

              <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 mb-6">
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Support Contact (Optional) */}
          <Card className="shadow-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Summary Box */}
          <Card className="shadow-md bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
            <div className="p-6">
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
