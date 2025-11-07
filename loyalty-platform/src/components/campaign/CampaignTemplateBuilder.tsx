import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { ClipboardList, Target, Users, Gift, MapPin, Clock, Megaphone, Settings, CheckCircle, Star, DollarSign, Mail, MessageSquare, Bell, Infinity, Zap, ShoppingCart, ShoppingBag, User, Hand, Lightbulb, Percent, Ticket, X, Package } from 'lucide-react';

type CampaignType = 'time-based' | 'long-living' | 'trigger-based' | 'one-off';
type TemplateStep = 'type' | 'trigger' | 'who' | 'what' | 'where' | 'when' | 'how' | 'controls' | 'review';

interface TemplateBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: CampaignType;
  templateId?: string;
  templateName?: string;
  onSave: (template: any) => void;
}

export const CampaignTemplateBuilder: React.FC<TemplateBuilderProps> = ({
  isOpen,
  onClose,
  initialType,
  templateId: _templateId,
  templateName,
  onSave,
}) => {
  const [currentStep, setCurrentStep] = useState<TemplateStep>('type');
  const [templateData, setTemplateData] = useState({
    type: initialType || 'time-based',
    name: templateName || '',
    // TRIGGER - What activates the offer
    triggerCategory: 'purchase',
    purchaseTriggerCondition: 'any',
    purchaseTriggerSku: '',
    purchaseTriggerCategory: '',
    purchaseTriggerQuantity: 1,
    // WHO - Audience
    audienceType: 'segment',
    selectedSegments: [] as string[],
    customCriteria: '',
    specificCustomers: '',
    locationFilter: 'all',
    selectedLocations: [] as string[],
    // WHAT - Offer
    rewardType: 'discount',
    discountType: 'percentage',
    discountValue: 10,
    appliesTo: 'entire-purchase',
    specificCategories: [] as string[],
    specificSkus: '',
    // BOGO specific
    bogoTriggerProduct: '',
    bogoTriggerQuantity: 1,
    bogoFreeProduct: 'same',
    bogoFreeQuantity: 1,
    bogoFreeSkus: '',
    // Bundle specific
    bundleItems: [] as { sku: string; name: string }[],
    bundlePrice: 0,
    bundleOriginalPrice: 0,
    // WHERE - Redemption
    redemptionLocation: 'all-locations',
    redemptionStores: [] as string[],
    redemptionRegion: '',
    redemptionChannel: 'all',
    usageLimit: 1,
    // WHEN - Timing (varies by type)
    startDate: '',
    endDate: '',
    activeHours: 'all-day',
    startTime: '09:00',
    endTime: '21:00',
    daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    // Long-living
    customerAction: 'first-purchase',
    oncePerCustomer: true,
    cooldownDays: 30,
    // Trigger-based
    triggerType: 'weather',
    weatherCondition: 'temp-above',
    weatherValue: 85,
    triggerTimeWindow: 'all-day',
    notificationTiming: 'immediate',
    // One-off
    issueReason: '',
    issueCount: 0,
    expiryDays: 30,
    // HOW - Communication
    sendEmail: true,
    emailService: 'sendgrid',
    emailTemplate: '',
    sendSms: false,
    smsService: 'twilio',
    smsTemplate: '',
    sendPush: false,
    pushTemplate: '',
    // CONTROLS
    requiresApproval: false,
    budgetCap: 0,
    minRoi: 0,
  });

  const steps: { id: TemplateStep; label: string; icon: React.ElementType }[] = [
    { id: 'type', label: 'Type', icon: ClipboardList },
    { id: 'trigger', label: 'Trigger', icon: Target },
    { id: 'who', label: 'Who', icon: Users },
    { id: 'what', label: 'What', icon: Gift },
    { id: 'where', label: 'Where', icon: MapPin },
    { id: 'when', label: 'When', icon: Clock },
    { id: 'how', label: 'How', icon: Megaphone },
    { id: 'controls', label: 'Controls', icon: Settings },
    { id: 'review', label: 'Review', icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const updateTemplate = (updates: any) => {
    setTemplateData({ ...templateData, ...updates });
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const handleSave = () => {
    onSave(templateData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary to-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Campaign Template Builder</h2>
              <p className="text-blue-100 text-sm mt-1">
                {templateName || 'Create a new campaign template'}
              </p>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex flex-col items-center gap-1 flex-1 ${
                    index <= currentStepIndex ? 'text-primary' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      index === currentStepIndex
                        ? 'bg-primary text-white ring-4 ring-blue-100'
                        : index < currentStepIndex
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index < currentStepIndex ? (
                      <CheckCircle size={20} />
                    ) : (
                      <step.icon size={20} />
                    )}
                  </div>
                  <span className="text-xs font-medium">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 ${index < currentStepIndex ? 'bg-green-500' : 'bg-gray-300'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Type Selection */}
          {currentStep === 'type' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4">Choose Campaign Type</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    id: 'time-based',
                    icon: Clock,
                    name: 'Time-Based Campaign',
                    desc: 'Limited duration promotions with specific start and end dates',
                  },
                  {
                    id: 'long-living',
                    icon: Infinity,
                    name: 'Long-Living Campaign',
                    desc: 'Always-on campaigns triggered by customer actions',
                  },
                  {
                    id: 'trigger-based',
                    icon: Zap,
                    name: 'Event-Based Campaign',
                    desc: 'Event-driven campaigns based on external triggers',
                  },
                  {
                    id: 'one-off',
                    icon: DollarSign,
                    name: 'One-Off Issue',
                    desc: 'Immediate, ad-hoc reward issuance to specific customers',
                  },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => updateTemplate({ type: type.id })}
                    className={`p-6 rounded-lg border-2 text-left transition-all ${
                      templateData.type === type.id
                        ? 'border-primary bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="mb-3">
                      <type.icon size={40} className="text-brand-600" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{type.name}</h4>
                    <p className="text-sm text-gray-600">{type.desc}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                <input
                  type="text"
                  value={templateData.name}
                  onChange={(e) => updateTemplate({ name: e.target.value })}
                  placeholder="e.g., Summer Flash Sale, VIP Welcome Series"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Step 2: TRIGGER - What Activates the Offer */}
          {currentStep === 'trigger' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4"><Target size={24} className="text-brand-600" /><h3 className="text-xl font-bold">Campaign Trigger</h3></div>
              <p className="text-sm text-gray-600 mb-4">
                What action or event will activate this campaign for customers?
              </p>

              <Card className="p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Trigger Type</label>
                <div className="space-y-3">
                  {/* Purchase-Based Trigger */}
                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="triggerCategory"
                      value="purchase"
                      checked={templateData.triggerCategory === 'purchase'}
                      onChange={(e) => updateTemplate({ triggerCategory: e.target.value })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium"><div className="flex items-center gap-2"><ShoppingCart size={18} /> Purchase-Based</div></div>
                      <div className="text-sm text-gray-600">Triggered when customer purchases specific item(s)</div>

                      {templateData.triggerCategory === 'purchase' && (
                        <div className="mt-4 space-y-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-2">Trigger Condition</label>
                            <select
                              value={templateData.purchaseTriggerCondition}
                              onChange={(e) => updateTemplate({ purchaseTriggerCondition: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            >
                              <option value="any">Any Purchase</option>
                              <option value="specific-sku">Specific Product (SKU)</option>
                              <option value="category">Product Category</option>
                              <option value="minimum-spend">Minimum Spend Amount</option>
                            </select>
                          </div>

                          {templateData.purchaseTriggerCondition === 'specific-sku' && (
                            <div>
                              <label className="block text-xs text-gray-600 mb-2">Product SKU(s)</label>
                              <input
                                type="text"
                                value={templateData.purchaseTriggerSku}
                                onChange={(e) => updateTemplate({ purchaseTriggerSku: e.target.value })}
                                placeholder="e.g., SKU-123, SKU-456 or 'Any Coffee'"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                              />
                              <div className="mt-2 grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Quantity</label>
                                  <input
                                    type="number"
                                    value={templateData.purchaseTriggerQuantity}
                                    onChange={(e) => updateTemplate({ purchaseTriggerQuantity: parseInt(e.target.value) })}
                                    min="1"
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {templateData.purchaseTriggerCondition === 'category' && (
                            <div>
                              <label className="block text-xs text-gray-600 mb-2">Category</label>
                              <input
                                type="text"
                                value={templateData.purchaseTriggerCategory}
                                onChange={(e) => updateTemplate({ purchaseTriggerCategory: e.target.value })}
                                placeholder="e.g., Coffee, Burgers, Desserts"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                              />
                            </div>
                          )}

                          {templateData.purchaseTriggerCondition === 'minimum-spend' && (
                            <div>
                              <label className="block text-xs text-gray-600 mb-2">Minimum Amount</label>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600">$</span>
                                <input
                                  type="number"
                                  placeholder="e.g., 25.00"
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Cart-Based Trigger */}
                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="triggerCategory"
                      value="cart"
                      checked={templateData.triggerCategory === 'cart'}
                      onChange={(e) => updateTemplate({ triggerCategory: e.target.value })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium"><div className="flex items-center gap-2"><ShoppingBag size={18} /> Cart-Based</div></div>
                      <div className="text-sm text-gray-600">Triggered when item is added to cart (before purchase)</div>
                      {templateData.triggerCategory === 'cart' && (
                        <div className="mt-3">
                          <input
                            type="text"
                            placeholder="SKU or category to trigger offer"
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Customer Action Trigger (primarily for long-living) */}
                  {templateData.type === 'long-living' && (
                    <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="radio"
                        name="triggerCategory"
                        value="customer-action"
                        checked={templateData.triggerCategory === 'customer-action'}
                        onChange={(e) => updateTemplate({ triggerCategory: e.target.value })}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-medium"><div className="flex items-center gap-2"><User size={18} /> Customer Milestone</div></div>
                        <div className="text-sm text-gray-600">Triggered by customer lifecycle events</div>
                        {templateData.triggerCategory === 'customer-action' && (
                          <div className="mt-3">
                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                              <option value="first-purchase">First Purchase</option>
                              <option value="referral">Successful Referral</option>
                              <option value="tier-upgrade">Tier Upgrade</option>
                              <option value="birthday">Birthday Month</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </label>
                  )}

                  {/* External Event Trigger (primarily for event-based) */}
                  {templateData.type === 'trigger-based' && (
                    <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="radio"
                        name="triggerCategory"
                        value="external-event"
                        checked={templateData.triggerCategory === 'external-event'}
                        onChange={(e) => updateTemplate({ triggerCategory: e.target.value })}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-medium"><div className="flex items-center gap-2"><Zap size={18} /> External Event</div></div>
                        <div className="text-sm text-gray-600">Triggered by external systems or conditions</div>
                        {templateData.triggerCategory === 'external-event' && (
                          <div className="mt-3">
                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                              <option value="weather">Weather Condition</option>
                              <option value="location">Location/Geofence</option>
                              <option value="inventory">Inventory Event</option>
                              <option value="cart-abandon">Cart Abandonment</option>
                              <option value="social">Social Media Action</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </label>
                  )}

                  {/* Manual Trigger (for one-off) */}
                  {templateData.type === 'one-off' && (
                    <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="radio"
                        name="triggerCategory"
                        value="manual"
                        checked={templateData.triggerCategory === 'manual'}
                        onChange={(e) => updateTemplate({ triggerCategory: e.target.value })}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-medium"><div className="flex items-center gap-2"><Hand size={18} /> Manual Issue</div></div>
                        <div className="text-sm text-gray-600">Manually triggered by administrator</div>
                      </div>
                    </label>
                  )}
                </div>
              </Card>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong><div className="flex items-center gap-2"><Lightbulb size={18} className="text-amber-600" /> Tip</div>:</strong> The trigger determines <em>what activates</em> the campaign.
                  The campaign type (time-based, long-living, etc.) determines <em>when and how long</em> it's available.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: WHO - Audience */}
          {currentStep === 'who' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4"><Users size={24} className="text-brand-600" /><h3 className="text-xl font-bold">Define Target Audience</h3></div>

              <Card className="p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Targeting Method</label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="audienceType"
                      value="segment"
                      checked={templateData.audienceType === 'segment'}
                      onChange={(e) => updateTemplate({ audienceType: e.target.value })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Segment-Based</div>
                      <div className="text-sm text-gray-600">Target predefined customer segments</div>
                      {templateData.audienceType === 'segment' && (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {['Champions', 'Loyal', 'At Risk', 'Lost', 'Recent', 'Promising'].map((seg) => (
                            <label key={seg} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={templateData.selectedSegments.includes(seg)}
                                onChange={(e) => {
                                  const segments = e.target.checked
                                    ? [...templateData.selectedSegments, seg]
                                    : templateData.selectedSegments.filter((s) => s !== seg);
                                  updateTemplate({ selectedSegments: segments });
                                }}
                                className="rounded"
                              />
                              {seg}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="audienceType"
                      value="custom"
                      checked={templateData.audienceType === 'custom'}
                      onChange={(e) => updateTemplate({ audienceType: e.target.value })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Custom Criteria</div>
                      <div className="text-sm text-gray-600">Define specific rules</div>
                      {templateData.audienceType === 'custom' && (
                        <input
                          type="text"
                          value={templateData.customCriteria}
                          onChange={(e) => updateTemplate({ customCriteria: e.target.value })}
                          placeholder="e.g., Spend > $500 AND Visits > 5"
                          className="mt-3 w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      )}
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="audienceType"
                      value="specific"
                      checked={templateData.audienceType === 'specific'}
                      onChange={(e) => updateTemplate({ audienceType: e.target.value })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Specific Customers</div>
                      <div className="text-sm text-gray-600">Enter email addresses or customer IDs</div>
                      {templateData.audienceType === 'specific' && (
                        <textarea
                          value={templateData.specificCustomers}
                          onChange={(e) => updateTemplate({ specificCustomers: e.target.value })}
                          placeholder="john@email.com, jane@email.com&#10;Or upload CSV..."
                          rows={3}
                          className="mt-3 w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      )}
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="audienceType"
                      value="all"
                      checked={templateData.audienceType === 'all'}
                      onChange={(e) => updateTemplate({ audienceType: e.target.value })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium">All Customers</div>
                      <div className="text-sm text-gray-600">No targeting restrictions</div>
                    </div>
                  </label>
                </div>
              </Card>

              <Card className="p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Geographic Filter (Optional)</label>
                <select
                  value={templateData.locationFilter}
                  onChange={(e) => updateTemplate({ locationFilter: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Locations</option>
                  <option value="specific-stores">Specific Stores</option>
                  <option value="region">Region/Territory</option>
                  <option value="customer-location">Customer's Preferred Store</option>
                </select>

                {templateData.locationFilter === 'specific-stores' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Select stores..."
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* Step 3: WHAT - Offer Configuration */}
          {currentStep === 'what' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4"><Gift size={24} className="text-brand-600" /><h3 className="text-xl font-bold">Configure Offer</h3></div>

              <Card className="p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Reward Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'discount', label: 'Discount', icon: Percent },
                    { id: 'points', label: 'Bonus Points', icon: Star },
                    { id: 'voucher', label: 'Voucher', icon: Ticket },
                    { id: 'free-item', label: 'Free Item', icon: Gift },
                    { id: 'credit', label: 'Store Credit', icon: DollarSign },
                    { id: 'multiplier', label: 'Points Multiplier', icon: X },
                    { id: 'bundle', label: 'Bundle Offer', icon: Package },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => updateTemplate({ rewardType: type.id })}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        templateData.rewardType === type.id ? 'border-primary bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <type.icon size={24} className="text-gray-700" />
                        <span className="font-medium text-sm">{type.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              {templateData.rewardType === 'discount' && (
                <Card className="p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Discount Details</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">Discount Type</label>
                      <select
                        value={templateData.discountType}
                        onChange={(e) => updateTemplate({ discountType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                        <option value="bogo">Buy One Get One (BOGO)</option>
                      </select>
                    </div>
                    {templateData.discountType !== 'bogo' && (
                      <div>
                        <label className="block text-xs text-gray-600 mb-2">Value</label>
                        <div className="flex items-center gap-2">
                          {templateData.discountType === 'percentage' && <span className="text-gray-600">%</span>}
                          {templateData.discountType === 'fixed' && <span className="text-gray-600">$</span>}
                          <input
                            type="number"
                            value={templateData.discountValue}
                            onChange={(e) => updateTemplate({ discountValue: parseInt(e.target.value) })}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* BOGO Configuration */}
                  {templateData.discountType === 'bogo' && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg space-y-4">
                      <h4 className="font-semibold text-sm">BOGO Configuration</h4>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Buy (Trigger Product)</label>
                          <input
                            type="text"
                            value={templateData.bogoTriggerProduct}
                            onChange={(e) => updateTemplate({ bogoTriggerProduct: e.target.value })}
                            placeholder="e.g., Any Coffee, SKU-123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Quantity</label>
                          <input
                            type="number"
                            value={templateData.bogoTriggerQuantity}
                            onChange={(e) => updateTemplate({ bogoTriggerQuantity: parseInt(e.target.value) })}
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Get (Free Product)</label>
                          <select
                            value={templateData.bogoFreeProduct}
                            onChange={(e) => updateTemplate({ bogoFreeProduct: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="same">Same Product (Buy 1 Get 1)</option>
                            <option value="different">Different Product</option>
                            <option value="equal-lesser">Equal or Lesser Value</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Free Quantity</label>
                          <input
                            type="number"
                            value={templateData.bogoFreeQuantity}
                            onChange={(e) => updateTemplate({ bogoFreeQuantity: parseInt(e.target.value) })}
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>

                      {templateData.bogoFreeProduct === 'different' && (
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Specific Free Products (SKUs)</label>
                          <input
                            type="text"
                            value={templateData.bogoFreeSkus}
                            onChange={(e) => updateTemplate({ bogoFreeSkus: e.target.value })}
                            placeholder="SKU-456, SKU-789 (or Category: Sides, Drinks)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                      )}

                      <div className="p-3 bg-white border border-blue-200 rounded text-xs text-gray-700">
                        <strong>Example:</strong> Buy {templateData.bogoTriggerQuantity} {templateData.bogoTriggerProduct || "coffee"},
                        get {templateData.bogoFreeQuantity} {templateData.bogoFreeProduct === 'same' ? 'of the same' :
                        templateData.bogoFreeProduct === 'different' ? 'different item' : 'equal or lesser value item'} free
                      </div>
                    </div>
                  )}
                </Card>
              )}

              {/* Bundle Offer Configuration */}
              {templateData.rewardType === 'bundle' && (
                <Card className="p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Bundle Configuration</label>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">Bundle Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Family Meal Deal, Coffee & Pastry Combo"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-2">Bundle Price</label>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={templateData.bundlePrice}
                            onChange={(e) => updateTemplate({ bundlePrice: parseFloat(e.target.value) })}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-2">Original Price (Optional)</label>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={templateData.bundleOriginalPrice}
                            onChange={(e) => updateTemplate({ bundleOriginalPrice: parseFloat(e.target.value) })}
                            placeholder="To show savings"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-2">Items in Bundle</label>
                      <div className="space-y-2">
                        {templateData.bundleItems.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item.sku}
                              placeholder="SKU or Category"
                              className="w-1/3 px-3 py-2 border border-gray-300 rounded text-sm"
                              onChange={(e) => {
                                const items = [...templateData.bundleItems];
                                items[idx].sku = e.target.value;
                                updateTemplate({ bundleItems: items });
                              }}
                            />
                            <input
                              type="text"
                              value={item.name}
                              placeholder="Item Name"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                              onChange={(e) => {
                                const items = [...templateData.bundleItems];
                                items[idx].name = e.target.value;
                                updateTemplate({ bundleItems: items });
                              }}
                            />
                            <button
                              onClick={() => {
                                const items = templateData.bundleItems.filter((_, i) => i !== idx);
                                updateTemplate({ bundleItems: items });
                              }}
                              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            updateTemplate({
                              bundleItems: [...templateData.bundleItems, { sku: '', name: '' }]
                            });
                          }}
                          className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-600 hover:border-primary hover:text-primary"
                        >
                          + Add Item to Bundle
                        </button>
                      </div>
                    </div>

                    {templateData.bundleOriginalPrice > 0 && templateData.bundlePrice > 0 && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-gray-700">
                        <strong>Savings:</strong> ${(templateData.bundleOriginalPrice - templateData.bundlePrice).toFixed(2)}
                        ({Math.round(((templateData.bundleOriginalPrice - templateData.bundlePrice) / templateData.bundleOriginalPrice) * 100)}% off)
                      </div>
                    )}

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs text-gray-700">
                      <strong>Example:</strong> "Family Meal Deal" - Burger + Fries + 2 Drinks for $15.99 (Save $4.00)
                    </div>
                  </div>
                </Card>
              )}

              {(templateData.rewardType === 'points' || templateData.rewardType === 'credit' || templateData.rewardType === 'multiplier') && (
                <Card className="p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {templateData.rewardType === 'points' && 'Bonus Points Amount'}
                    {templateData.rewardType === 'credit' && 'Credit Amount'}
                    {templateData.rewardType === 'multiplier' && 'Multiplier Value'}
                  </label>
                  <div className="flex items-center gap-2">
                    {templateData.rewardType === 'credit' && <span className="text-gray-600">$</span>}
                    {templateData.rewardType === 'multiplier' && <span className="text-gray-600">×</span>}
                    <input
                      type="number"
                      value={templateData.discountValue}
                      onChange={(e) => updateTemplate({ discountValue: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    {templateData.rewardType === 'points' && <span className="text-gray-600">points</span>}
                  </div>
                </Card>
              )}

              <Card className="p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Applies To</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="appliesTo"
                      value="entire-purchase"
                      checked={templateData.appliesTo === 'entire-purchase'}
                      onChange={(e) => updateTemplate({ appliesTo: e.target.value })}
                    />
                    <span className="text-sm">Entire Purchase</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="appliesTo"
                      value="categories"
                      checked={templateData.appliesTo === 'categories'}
                      onChange={(e) => updateTemplate({ appliesTo: e.target.value })}
                    />
                    <span className="text-sm">Specific Categories</span>
                  </label>
                  {templateData.appliesTo === 'categories' && (
                    <input
                      type="text"
                      placeholder="e.g., Coffee, Breakfast, Desserts"
                      className="ml-6 w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  )}
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="appliesTo"
                      value="skus"
                      checked={templateData.appliesTo === 'skus'}
                      onChange={(e) => updateTemplate({ appliesTo: e.target.value })}
                    />
                    <span className="text-sm">Specific Products/SKUs</span>
                  </label>
                  {templateData.appliesTo === 'skus' && (
                    <input
                      type="text"
                      value={templateData.specificSkus}
                      onChange={(e) => updateTemplate({ specificSkus: e.target.value })}
                      placeholder="SKU-001, SKU-002, SKU-003"
                      className="ml-6 w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* Step 4: WHERE - Redemption Location */}
          {currentStep === 'where' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">📍 Redemption Restrictions</h3>

              <Card className="p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Where Can This Be Redeemed?</label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="redemptionLocation"
                      value="all-locations"
                      checked={templateData.redemptionLocation === 'all-locations'}
                      onChange={(e) => updateTemplate({ redemptionLocation: e.target.value })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium">All Locations</div>
                      <div className="text-sm text-gray-600">Can be used at any store</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="redemptionLocation"
                      value="specific-stores"
                      checked={templateData.redemptionLocation === 'specific-stores'}
                      onChange={(e) => updateTemplate({ redemptionLocation: e.target.value })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Specific Store(s)</div>
                      <div className="text-sm text-gray-600">Limited to selected locations</div>
                      {templateData.redemptionLocation === 'specific-stores' && (
                        <input
                          type="text"
                          placeholder="Select stores..."
                          className="mt-3 w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      )}
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="redemptionLocation"
                      value="region"
                      checked={templateData.redemptionLocation === 'region'}
                      onChange={(e) => updateTemplate({ redemptionLocation: e.target.value })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Region/Territory</div>
                      <div className="text-sm text-gray-600">All stores in a specific region</div>
                      {templateData.redemptionLocation === 'region' && (
                        <select className="mt-3 w-full px-3 py-2 border border-gray-300 rounded text-sm">
                          <option>Northeast</option>
                          <option>Southeast</option>
                          <option>Midwest</option>
                          <option>West Coast</option>
                        </select>
                      )}
                    </div>
                  </label>
                </div>
              </Card>

              <Card className="p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Channel Restrictions</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="redemptionChannel"
                      value="all"
                      checked={templateData.redemptionChannel === 'all'}
                      onChange={(e) => updateTemplate({ redemptionChannel: e.target.value })}
                    />
                    <span className="text-sm">All Channels (In-Store & Online)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="redemptionChannel"
                      value="in-store"
                      checked={templateData.redemptionChannel === 'in-store'}
                      onChange={(e) => updateTemplate({ redemptionChannel: e.target.value })}
                    />
                    <span className="text-sm">In-Store Only</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="redemptionChannel"
                      value="online"
                      checked={templateData.redemptionChannel === 'online'}
                      onChange={(e) => updateTemplate({ redemptionChannel: e.target.value })}
                    />
                    <span className="text-sm">Online Only</span>
                  </label>
                </div>
              </Card>

              <Card className="p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Usage Limits</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">Uses Per Customer</label>
                    <select
                      value={templateData.usageLimit}
                      onChange={(e) => updateTemplate({ usageLimit: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value={1}>One Time Only</option>
                      <option value={3}>Up to 3 Times</option>
                      <option value={5}>Up to 5 Times</option>
                      <option value={-1}>Unlimited</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">Minimum Purchase</label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">$</span>
                      <input
                        type="number"
                        placeholder="0 (no minimum)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Step 5: WHEN - Timing/Triggers */}
          {currentStep === 'when' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">⏰ Campaign Timing</h3>

              {/* Time-Based */}
              {templateData.type === 'time-based' && (
                <>
                  <Card className="p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Campaign Duration</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-2">Start Date</label>
                        <input
                          type="date"
                          value={templateData.startDate}
                          onChange={(e) => updateTemplate({ startDate: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-2">End Date</label>
                        <input
                          type="date"
                          value={templateData.endDate}
                          onChange={(e) => updateTemplate({ endDate: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Active Hours</label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="activeHours"
                          value="all-day"
                          checked={templateData.activeHours === 'all-day'}
                          onChange={(e) => updateTemplate({ activeHours: e.target.value })}
                        />
                        <span className="text-sm">All Day</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="activeHours"
                          value="specific"
                          checked={templateData.activeHours === 'specific'}
                          onChange={(e) => updateTemplate({ activeHours: e.target.value })}
                        />
                        <span className="text-sm">Specific Hours</span>
                      </label>
                      {templateData.activeHours === 'specific' && (
                        <div className="ml-6 grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">From</label>
                            <input
                              type="time"
                              value={templateData.startTime}
                              onChange={(e) => updateTemplate({ startTime: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">To</label>
                            <input
                              type="time"
                              value={templateData.endTime}
                              onChange={(e) => updateTemplate({ endTime: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>

                  <Card className="p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Days of Week</label>
                    <div className="grid grid-cols-7 gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                        const dayCode = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'][idx];
                        return (
                          <label
                            key={day}
                            className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer ${
                              templateData.daysOfWeek.includes(dayCode)
                                ? 'border-primary bg-blue-50 text-primary'
                                : 'border-gray-200'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={templateData.daysOfWeek.includes(dayCode)}
                              onChange={(e) => {
                                const days = e.target.checked
                                  ? [...templateData.daysOfWeek, dayCode]
                                  : templateData.daysOfWeek.filter((d) => d !== dayCode);
                                updateTemplate({ daysOfWeek: days });
                              }}
                              className="sr-only"
                            />
                            <span className="text-sm font-medium">{day}</span>
                          </label>
                        );
                      })}
                    </div>
                  </Card>
                </>
              )}

              {/* Long-Living */}
              {templateData.type === 'long-living' && (
                <>
                  <Card className="p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Customer Action Trigger</label>
                    <select
                      value={templateData.customerAction}
                      onChange={(e) => updateTemplate({ customerAction: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="first-purchase">First Purchase (Welcome)</option>
                      <option value="referral-success">Successful Referral</option>
                      <option value="category-purchase">Category Purchase</option>
                      <option value="tier-upgrade">Tier Upgrade</option>
                      <option value="birthday-month">Birthday Month</option>
                    </select>
                  </Card>

                  <Card className="p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Frequency Controls</label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={templateData.oncePerCustomer}
                          onChange={(e) => updateTemplate({ oncePerCustomer: e.target.checked })}
                          className="rounded"
                        />
                        <span className="text-sm">Once per customer (lifetime)</span>
                      </label>
                      {!templateData.oncePerCustomer && (
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Cooldown Period</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={templateData.cooldownDays}
                              onChange={(e) => updateTemplate({ cooldownDays: parseInt(e.target.value) })}
                              className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            <span className="text-sm text-gray-600">days between rewards</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </>
              )}

              {/* Trigger-Based */}
              {templateData.type === 'trigger-based' && (
                <>
                  <Card className="p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">External Trigger Type</label>
                    <select
                      value={templateData.triggerType}
                      onChange={(e) => updateTemplate({ triggerType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                    >
                      <option value="weather">Weather Conditions</option>
                      <option value="location">Location/Geofence</option>
                      <option value="inventory">Inventory Events</option>
                      <option value="cart-abandon">Cart Abandonment</option>
                      <option value="social">Social Media Action</option>
                    </select>

                    {templateData.triggerType === 'weather' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Condition</label>
                          <div className="flex items-center gap-2">
                            <select
                              value={templateData.weatherCondition}
                              onChange={(e) => updateTemplate({ weatherCondition: e.target.value })}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                            >
                              <option value="temp-above">Temperature Above</option>
                              <option value="temp-below">Temperature Below</option>
                              <option value="rain">Rainy Day</option>
                              <option value="snow">Snowy Day</option>
                            </select>
                            {(templateData.weatherCondition === 'temp-above' || templateData.weatherCondition === 'temp-below') && (
                              <>
                                <input
                                  type="number"
                                  value={templateData.weatherValue}
                                  onChange={(e) => updateTemplate({ weatherValue: parseInt(e.target.value) })}
                                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                                />
                                <span className="text-sm text-gray-600">°F</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>

                  <Card className="p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Notification Timing</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="notificationTiming"
                          value="immediate"
                          checked={templateData.notificationTiming === 'immediate'}
                          onChange={(e) => updateTemplate({ notificationTiming: e.target.value })}
                        />
                        <span className="text-sm">Immediate (when trigger occurs)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="notificationTiming"
                          value="next-visit"
                          checked={templateData.notificationTiming === 'next-visit'}
                          onChange={(e) => updateTemplate({ notificationTiming: e.target.value })}
                        />
                        <span className="text-sm">On Next Visit/Login</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="notificationTiming"
                          value="delayed"
                          checked={templateData.notificationTiming === 'delayed'}
                          onChange={(e) => updateTemplate({ notificationTiming: e.target.value })}
                        />
                        <span className="text-sm">Delayed (wait X hours)</span>
                      </label>
                    </div>
                  </Card>
                </>
              )}

              {/* One-Off */}
              {templateData.type === 'one-off' && (
                <>
                  <Card className="p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Issue Details</label>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-2">Reason/Purpose</label>
                        <input
                          type="text"
                          value={templateData.issueReason}
                          onChange={(e) => updateTemplate({ issueReason: e.target.value })}
                          placeholder="e.g., Customer service recovery, VIP appreciation"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-600 mb-2">Expiry</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={templateData.expiryDays}
                            onChange={(e) => updateTemplate({ expiryDays: parseInt(e.target.value) })}
                            className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                          />
                          <span className="text-sm text-gray-600">days from issue</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-sm">Notify customer via email</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-sm">Add note to customer profile</span>
                        </label>
                      </div>
                    </div>
                  </Card>
                </>
              )}
            </div>
          )}

          {/* Step 6: HOW - Communication */}
          {currentStep === 'how' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">📢 Communication Settings</h3>

              <Card className="p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Notification Channels</label>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={templateData.sendEmail}
                      onChange={(e) => updateTemplate({ sendEmail: e.target.checked })}
                      className="mt-1 rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Mail size={18} className="text-gray-700" />
                        <span className="font-medium">Email</span>
                      </div>
                      {templateData.sendEmail && (
                        <div className="mt-2 space-y-2">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Email Service:</label>
                            <select
                              value={templateData.emailService}
                              onChange={(e) => updateTemplate({ emailService: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white"
                            >
                              <option value="sendgrid">SendGrid</option>
                              <option value="salesforce">Salesforce Marketing Cloud</option>
                              <option value="mailchimp">Mailchimp</option>
                              <option value="custom">Custom Integration</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Template:</label>
                            <select
                              value={templateData.emailTemplate}
                              onChange={(e) => updateTemplate({ emailTemplate: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                            >
                              <option value="">Select email template...</option>
                              <option value="welcome">Welcome Email</option>
                              <option value="promo">Promotional Offer</option>
                              <option value="win-back">Win-Back Campaign</option>
                              <option value="custom">Custom Template</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={templateData.sendSms}
                      onChange={(e) => updateTemplate({ sendSms: e.target.checked })}
                      className="mt-1 rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={18} className="text-gray-700" />
                        <span className="font-medium">SMS</span>
                      </div>
                      {templateData.sendSms && (
                        <div className="mt-2 space-y-2">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">SMS Service:</label>
                            <select
                              value={templateData.smsService}
                              onChange={(e) => updateTemplate({ smsService: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white"
                            >
                              <option value="twilio">Twilio</option>
                              <option value="plivo">Plivo</option>
                              <option value="messagebird">MessageBird</option>
                              <option value="custom">Custom Integration</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Message Template:</label>
                            <textarea
                              value={templateData.smsTemplate}
                              onChange={(e) => updateTemplate({ smsTemplate: e.target.value })}
                              placeholder="Hi {name}, here's a special offer just for you..."
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={templateData.sendPush}
                      onChange={(e) => updateTemplate({ sendPush: e.target.checked })}
                      className="mt-1 rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Bell size={18} className="text-gray-700" />
                        <span className="font-medium">Push Notification</span>
                      </div>
                      {templateData.sendPush && (
                        <input
                          type="text"
                          value={templateData.pushTemplate}
                          onChange={(e) => updateTemplate({ pushTemplate: e.target.value })}
                          placeholder="Special offer waiting for you!"
                          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      )}
                    </div>
                  </label>
                </div>
              </Card>
            </div>
          )}

          {/* Step 7: CONTROLS - Budget & Approval */}
          {currentStep === 'controls' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">⚙️ Campaign Controls</h3>

              <Card className="p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Budget & Performance</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">Budget Cap</label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">$</span>
                      <input
                        type="number"
                        value={templateData.budgetCap}
                        onChange={(e) => updateTemplate({ budgetCap: parseInt(e.target.value) })}
                        placeholder="0 (no limit)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">Minimum ROI Target</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.1"
                        value={templateData.minRoi}
                        onChange={(e) => updateTemplate({ minRoi: parseFloat(e.target.value) })}
                        placeholder="0 (no requirement)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <span className="text-gray-600">x</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Approval Settings</label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={templateData.requiresApproval}
                    onChange={(e) => updateTemplate({ requiresApproval: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Requires approval before going live</span>
                </label>
              </Card>
            </div>
          )}

          {/* Step 8: REVIEW */}
          {currentStep === 'review' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">✅ Review Template</h3>

              <div className="grid grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-semibold text-sm text-gray-700 mb-3">Template Info</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Name:</span> <strong>{templateData.name}</strong></div>
                    <div><span className="text-gray-600">Type:</span> <strong className="capitalize">{templateData.type.replace('-', ' ')}</strong></div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3"><Target size={16} className="text-brand-600" /><h4 className="font-semibold text-sm text-gray-700">Trigger</h4></div>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Activation:</span> <strong className="capitalize">{templateData.triggerCategory.replace('-', ' ')}</strong></div>
                    {templateData.triggerCategory === 'purchase' && templateData.purchaseTriggerCondition === 'specific-sku' && (
                      <div><span className="text-gray-600">SKU:</span> <strong>{templateData.purchaseTriggerSku || 'Any'}</strong></div>
                    )}
                    {templateData.triggerCategory === 'purchase' && templateData.purchaseTriggerCondition === 'category' && (
                      <div><span className="text-gray-600">Category:</span> <strong>{templateData.purchaseTriggerCategory || 'Any'}</strong></div>
                    )}
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3"><Users size={16} className="text-brand-600" /><h4 className="font-semibold text-sm text-gray-700">Audience</h4></div>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Targeting:</span> <strong className="capitalize">{templateData.audienceType}</strong></div>
                    {templateData.audienceType === 'segment' && (
                      <div><span className="text-gray-600">Segments:</span> <strong>{templateData.selectedSegments.join(', ') || 'None'}</strong></div>
                    )}
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3"><Gift size={16} className="text-brand-600" /><h4 className="font-semibold text-sm text-gray-700">Offer</h4></div>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Reward:</span> <strong className="capitalize">{templateData.rewardType.replace('-', ' ')}</strong></div>
                    {templateData.rewardType === 'discount' && (
                      <div><span className="text-gray-600">Value:</span> <strong>{templateData.discountValue}{templateData.discountType === 'percentage' ? '%' : '$'} off</strong></div>
                    )}
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3"><MapPin size={16} className="text-brand-600" /><h4 className="font-semibold text-sm text-gray-700">Redemption</h4></div>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Location:</span> <strong className="capitalize">{templateData.redemptionLocation.replace('-', ' ')}</strong></div>
                    <div><span className="text-gray-600">Channel:</span> <strong className="capitalize">{templateData.redemptionChannel}</strong></div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3"><Megaphone size={16} className="text-brand-600" /><h4 className="font-semibold text-sm text-gray-700">Communication</h4></div>
                  <div className="space-y-2 text-sm">
                    {templateData.sendEmail && (
                      <div>
                        <span className="text-gray-600"><div className="flex items-center gap-2"><Mail size={14} /> Email via</div>:</span> <strong className="capitalize">{templateData.emailService}</strong>
                      </div>
                    )}
                    {templateData.sendSms && (
                      <div>
                        <span className="text-gray-600"><div className="flex items-center gap-2"><MessageSquare size={14} /> SMS via</div>:</span> <strong className="capitalize">{templateData.smsService}</strong>
                      </div>
                    )}
                    {templateData.sendPush && (
                      <div>
                        <span className="text-gray-600"><div className="flex items-center gap-2"><Bell size={14} /> Push Notification</div></span>
                      </div>
                    )}
                    {!templateData.sendEmail && !templateData.sendSms && !templateData.sendPush && (
                      <div className="text-gray-500 italic">No communication channels selected</div>
                    )}
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold text-sm text-gray-700 mb-3">⚙️ Controls</h4>
                  <div className="space-y-2 text-sm">
                    {templateData.budgetCap > 0 && (
                      <div><span className="text-gray-600">Budget:</span> <strong>${templateData.budgetCap}</strong></div>
                    )}
                    <div><span className="text-gray-600">Approval:</span> <strong>{templateData.requiresApproval ? 'Required' : 'Not Required'}</strong></div>
                  </div>
                </Card>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✓ Template is ready to save. You can use this template to create campaigns once your program is live.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          <div className="text-sm text-gray-600">
            Step {currentStepIndex + 1} of {steps.length}
          </div>

          {currentStepIndex < steps.length - 1 ? (
            <button onClick={nextStep} className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-600">
              Next →
            </button>
          ) : (
            <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
              Save Template
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
