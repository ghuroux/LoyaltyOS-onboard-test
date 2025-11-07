import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Activity, TrendingUp, AlertTriangle, Target, Zap, Bell, CheckCircle, X, GitCompare } from 'lucide-react';
import type { SignalTemplate } from '../../store/onboardingStore';

type BuilderStep = 'metric' | 'operator' | 'conditions' | 'actions' | 'review';

interface SignalBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  queueId: string;
  queueName: string;
  existingSignal?: SignalTemplate;
  onSave: (signal: SignalTemplate) => void;
}

export const SignalTemplateBuilder: React.FC<SignalBuilderProps> = ({
  isOpen,
  onClose,
  queueId: _queueId,
  queueName,
  existingSignal,
  onSave,
}) => {
  const [currentStep, setCurrentStep] = useState<BuilderStep>('metric');
  const [signalData, setSignalData] = useState<Partial<SignalTemplate>>({
    id: existingSignal?.id || `signal_${Date.now()}`,
    name: existingSignal?.name || '',
    description: existingSignal?.description || '',
    enabled: existingSignal?.enabled ?? true,
    metric: existingSignal?.metric || 'revenue',
    operator: existingSignal?.operator || 'trend',
    period: existingSignal?.period || '7d',
    customPeriodDays: existingSignal?.customPeriodDays,
    condition: existingSignal?.condition || 'less_than',
    threshold: existingSignal?.threshold || 0,
    thresholdMax: existingSignal?.thresholdMax,
    unit: existingSignal?.unit || 'percentage',
    priority: existingSignal?.priority || 'medium',
    actions: existingSignal?.actions || [],
    cooldownHours: existingSignal?.cooldownHours || 24,
  });

  const steps: { id: BuilderStep; label: string; icon: React.ElementType }[] = [
    { id: 'metric', label: 'Metric', icon: Activity },
    { id: 'operator', label: 'Operator', icon: TrendingUp },
    { id: 'conditions', label: 'Conditions', icon: Target },
    { id: 'actions', label: 'Actions', icon: Bell },
    { id: 'review', label: 'Review', icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const metricOptions = [
    // Revenue & Financial
    { value: 'revenue', label: 'Revenue', category: 'Financial', description: 'Total revenue amount' },
    { value: 'avg_basket_size', label: 'Average Basket Size', category: 'Financial', description: 'Average transaction value' },
    { value: 'profit_margin', label: 'Profit Margin', category: 'Financial', description: 'Gross profit percentage' },
    // Customer Behavior
    { value: 'churn_risk_percentage', label: 'Churn Risk %', category: 'Customer', description: 'Percentage of customers at risk of churning' },
    { value: 'customer_ltv', label: 'Customer LTV', category: 'Customer', description: 'Lifetime value per customer' },
    { value: 'segment_transition', label: 'Segment Transition', category: 'Customer', description: 'Movement between customer segments' },
    { value: 'active_customers', label: 'Active Customers', category: 'Customer', description: 'Number of active customers' },
    // Transactions
    { value: 'transaction_count', label: 'Transaction Count', category: 'Operations', description: 'Number of transactions' },
    { value: 'transaction_velocity', label: 'Transaction Velocity', category: 'Operations', description: 'Rate of transactions per hour' },
    // Campaign Performance
    { value: 'campaign_roi', label: 'Campaign ROI', category: 'Campaign', description: 'Return on investment' },
    { value: 'budget_burn_rate', label: 'Budget Burn Rate', category: 'Campaign', description: 'Rate of budget consumption' },
    { value: 'engagement_rate', label: 'Engagement Rate', category: 'Campaign', description: 'Customer engagement percentage' },
    // Fraud & Risk
    { value: 'redemptions_per_hour', label: 'Redemptions/Hour', category: 'Risk', description: 'Redemption velocity' },
    { value: 'points_balance_change', label: 'Points Balance Change', category: 'Risk', description: 'Sudden points balance changes' },
    { value: 'geographic_distance', label: 'Geographic Distance', category: 'Risk', description: 'Distance between transactions' },
  ];

  const operatorOptions = [
    { value: 'trend', label: 'Trend Analysis', description: 'Detect upward or downward trends over time', icon: TrendingUp },
    { value: 'percentage_change', label: 'Percentage Change', description: 'Measure relative change from baseline', icon: Activity },
    { value: 'threshold_breach', label: 'Threshold Breach', description: 'Alert when value crosses a threshold', icon: AlertTriangle },
    { value: 'comparative', label: 'Peer Comparison', description: 'Compare against similar entities (stores, regions, segments)', icon: GitCompare },
    { value: 'anomaly', label: 'Anomaly Detection', description: 'Detect unusual patterns using ML', icon: Zap },
    { value: 'absolute', label: 'Absolute Value', description: 'Compare exact value', icon: Target },
  ];

  const conditionOptions = [
    { value: 'greater_than', label: 'Greater Than (>)', description: 'Trigger when value exceeds threshold' },
    { value: 'less_than', label: 'Less Than (<)', description: 'Trigger when value falls below threshold' },
    { value: 'equals', label: 'Equals (=)', description: 'Trigger when value matches exactly' },
    { value: 'between', label: 'Between', description: 'Trigger when value is within range' },
  ];

  const periodOptions = [
    { value: '24h', label: 'Last 24 Hours', description: 'Very recent activity' },
    { value: '7d', label: 'Last 7 Days', description: 'Weekly trends' },
    { value: '30d', label: 'Last 30 Days', description: 'Monthly patterns' },
    { value: '90d', label: 'Last 90 Days', description: 'Quarterly trends' },
    { value: 'custom', label: 'Custom Period', description: 'Define your own timeframe' },
  ];

  const unitOptions = [
    { value: 'percentage', label: '%', description: 'Percentage' },
    { value: 'currency', label: '$', description: 'Currency amount' },
    { value: 'count', label: '#', description: 'Count/number' },
    { value: 'absolute', label: 'x', description: 'Absolute value' },
  ];

  const priorityOptions = [
    { value: 'critical', label: 'Critical', color: 'bg-red-500', description: 'Immediate attention required' },
    { value: 'high', label: 'High', color: 'bg-orange-500', description: 'Action needed soon' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500', description: 'Monitor and plan' },
    { value: 'low', label: 'Low', color: 'bg-blue-500', description: 'Informational' },
  ];

  const availableActions = [
    'Send email alert',
    'Send SMS notification',
    'Create task in queue',
    'Alert account manager',
    'Trigger automation',
    'Pause related campaigns',
    'Adjust budget allocation',
    'Generate detailed report',
    'Flag for manual review',
    'Update customer segment',
    'Send to external webhook',
    'Log to analytics platform',
  ];

  const handleNext = () => {
    const stepOrder: BuilderStep[] = ['metric', 'operator', 'conditions', 'actions', 'review'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: BuilderStep[] = ['metric', 'operator', 'conditions', 'actions', 'review'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleSave = () => {
    const signal: SignalTemplate = {
      id: signalData.id!,
      name: signalData.name!,
      description: signalData.description!,
      enabled: signalData.enabled!,
      metric: signalData.metric!,
      operator: signalData.operator!,
      period: signalData.period!,
      customPeriodDays: signalData.customPeriodDays,
      condition: signalData.condition!,
      threshold: signalData.threshold!,
      thresholdMax: signalData.thresholdMax,
      unit: signalData.unit!,
      priority: signalData.priority!,
      actions: signalData.actions!,
      cooldownHours: signalData.cooldownHours,
    };
    onSave(signal);
    onClose();
  };

  const toggleAction = (action: string) => {
    const currentActions = signalData.actions || [];
    if (currentActions.includes(action)) {
      setSignalData({ ...signalData, actions: currentActions.filter((a) => a !== action) });
    } else {
      setSignalData({ ...signalData, actions: [...currentActions, action] });
    }
  };

  if (!isOpen) return null;

  const selectedMetric = metricOptions.find((m) => m.value === signalData.metric);
  const selectedOperator = operatorOptions.find((o) => o.value === signalData.operator);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {existingSignal ? 'Edit Signal Template' : 'Build New Signal Template'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">Queue: {queueName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = index < currentStepIndex;

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex flex-col items-center ${
                      isActive || isCompleted ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                    }`}
                    disabled={!isActive && !isCompleted}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-brand-500 text-white shadow-lg scale-110'
                          : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isCompleted ? <CheckCircle size={20} /> : <StepIcon size={20} />}
                    </div>
                    <span
                      className={`text-xs mt-1 font-medium ${
                        isActive ? 'text-brand-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-1 mx-2 rounded ${
                        index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: Metric Selection */}
          {currentStep === 'metric' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Select Metric to Monitor</h3>
              <p className="text-gray-600 mb-6">
                Choose what business metric you want to track. This is the core signal that will be monitored.
              </p>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Signal Name</label>
                <input
                  type="text"
                  value={signalData.name}
                  onChange={(e) => setSignalData({ ...signalData, name: e.target.value })}
                  placeholder="e.g., Revenue Drop Alert"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={signalData.description}
                  onChange={(e) => setSignalData({ ...signalData, description: e.target.value })}
                  placeholder="Brief description of what this signal detects..."
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Choose Metric</label>
                {['Financial', 'Customer', 'Operations', 'Campaign', 'Risk'].map((category) => (
                  <div key={category}>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 mt-4">{category}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {metricOptions
                        .filter((m) => m.category === category)
                        .map((metric) => (
                          <button
                            key={metric.value}
                            onClick={() => setSignalData({ ...signalData, metric: metric.value })}
                            className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                              signalData.metric === metric.value
                                ? 'border-brand-500 bg-brand-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="font-semibold text-sm text-gray-900">{metric.label}</div>
                            <div className="text-xs text-gray-600 mt-1">{metric.description}</div>
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Operator & Period */}
          {currentStep === 'operator' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">How to Measure: {selectedMetric?.label}</h3>
              <p className="text-gray-600 mb-6">
                Choose how you want to analyze this metric and over what time period.
              </p>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Analysis Method (Operator)</label>
                <div className="space-y-3">
                  {operatorOptions.map((operator) => {
                    const OperatorIcon = operator.icon;
                    return (
                      <button
                        key={operator.value}
                        onClick={() => setSignalData({ ...signalData, operator: operator.value as any })}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:shadow-md flex items-start gap-3 ${
                          signalData.operator === operator.value
                            ? 'border-brand-500 bg-brand-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <OperatorIcon
                          size={24}
                          className={signalData.operator === operator.value ? 'text-brand-600' : 'text-gray-400'}
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{operator.label}</div>
                          <div className="text-sm text-gray-600 mt-1">{operator.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Time Period</label>
                <div className="grid grid-cols-2 gap-3">
                  {periodOptions.map((period) => (
                    <button
                      key={period.value}
                      onClick={() => setSignalData({ ...signalData, period: period.value as any })}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        signalData.period === period.value
                          ? 'border-brand-500 bg-brand-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-sm text-gray-900">{period.label}</div>
                      <div className="text-xs text-gray-600 mt-1">{period.description}</div>
                    </button>
                  ))}
                </div>

                {signalData.period === 'custom' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Custom Period (Days)</label>
                    <input
                      type="number"
                      value={signalData.customPeriodDays || ''}
                      onChange={(e) => setSignalData({ ...signalData, customPeriodDays: parseInt(e.target.value) })}
                      placeholder="Enter number of days"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Conditions & Threshold */}
          {currentStep === 'conditions' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Set Trigger Conditions</h3>
              <p className="text-gray-600 mb-6">
                Define when the signal should trigger based on {selectedMetric?.label} using {selectedOperator?.label}.
              </p>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Condition</label>
                <div className="grid grid-cols-2 gap-3">
                  {conditionOptions.map((condition) => (
                    <button
                      key={condition.value}
                      onClick={() => setSignalData({ ...signalData, condition: condition.value as any })}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        signalData.condition === condition.value
                          ? 'border-brand-500 bg-brand-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-sm text-gray-900">{condition.label}</div>
                      <div className="text-xs text-gray-600 mt-1">{condition.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Unit</label>
                <div className="grid grid-cols-4 gap-2">
                  {unitOptions.map((unit) => (
                    <button
                      key={unit.value}
                      onClick={() => setSignalData({ ...signalData, unit: unit.value as any })}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        signalData.unit === unit.value
                          ? 'border-brand-500 bg-brand-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-lg text-gray-900">{unit.label}</div>
                      <div className="text-xs text-gray-600 mt-1">{unit.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Threshold Value {signalData.unit === 'currency' && '($)'}
                </label>
                <input
                  type="number"
                  step={signalData.unit === 'percentage' ? '0.1' : '1'}
                  value={signalData.threshold}
                  onChange={(e) => setSignalData({ ...signalData, threshold: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg font-semibold"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Signal will trigger when {selectedMetric?.label} {signalData.condition === 'greater_than' ? 'exceeds' : 'falls below'} this value
                </p>
              </div>

              {signalData.condition === 'between' && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Maximum Threshold {signalData.unit === 'currency' && '($)'}
                  </label>
                  <input
                    type="number"
                    step={signalData.unit === 'percentage' ? '0.1' : '1'}
                    value={signalData.thresholdMax || ''}
                    onChange={(e) => setSignalData({ ...signalData, thresholdMax: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg font-semibold"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cooldown Period (hours)
                </label>
                <input
                  type="number"
                  value={signalData.cooldownHours}
                  onChange={(e) => setSignalData({ ...signalData, cooldownHours: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum time between signal triggers to avoid alert fatigue
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Actions & Priority */}
          {currentStep === 'actions' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Actions & Priority</h3>
              <p className="text-gray-600 mb-6">
                Choose what happens when this signal triggers and set its priority level.
              </p>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Priority Level</label>
                <div className="grid grid-cols-4 gap-3">
                  {priorityOptions.map((priority) => (
                    <button
                      key={priority.value}
                      onClick={() => setSignalData({ ...signalData, priority: priority.value as any })}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        signalData.priority === priority.value
                          ? 'border-gray-900 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 ${priority.color} rounded-full mx-auto mb-2`}></div>
                      <div className="font-semibold text-sm text-gray-900">{priority.label}</div>
                      <div className="text-xs text-gray-600 mt-1">{priority.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Automated Actions (select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => toggleAction(action)}
                      className={`p-3 rounded-lg border text-left text-sm transition-all ${
                        signalData.actions?.includes(action)
                          ? 'border-brand-500 bg-brand-50 font-medium'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={signalData.actions?.includes(action)}
                          onChange={() => {}}
                          className="h-4 w-4 text-brand-600 rounded"
                        />
                        <span>{action}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Review */}
          {currentStep === 'review' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Review Signal Template</h3>
              <p className="text-gray-600 mb-6">
                Review your signal configuration before saving.
              </p>

              <Card className="p-5 mb-4 bg-gray-50">
                <h4 className="font-semibold text-gray-900 mb-3">Signal Summary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{signalData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Description:</span>
                    <span className="font-medium">{signalData.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Metric:</span>
                    <span className="font-medium">{selectedMetric?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Operator:</span>
                    <span className="font-medium">{selectedOperator?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Period:</span>
                    <span className="font-medium">
                      {signalData.period === 'custom' ? `${signalData.customPeriodDays} days` : signalData.period}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Condition:</span>
                    <span className="font-medium">
                      {conditionOptions.find((c) => c.value === signalData.condition)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Threshold:</span>
                    <span className="font-medium">
                      {signalData.threshold}
                      {signalData.unit === 'percentage' && '%'}
                      {signalData.unit === 'currency' && ' $'}
                      {signalData.condition === 'between' && ` - ${signalData.thresholdMax}${signalData.unit === 'percentage' ? '%' : ''}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Priority:</span>
                    <span className="font-medium capitalize">{signalData.priority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cooldown:</span>
                    <span className="font-medium">{signalData.cooldownHours} hours</span>
                  </div>
                </div>
              </Card>

              <Card className="p-5 bg-gray-50">
                <h4 className="font-semibold text-gray-900 mb-3">Actions ({signalData.actions?.length || 0})</h4>
                <div className="space-y-2">
                  {signalData.actions?.map((action) => (
                    <div key={action} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-green-600" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 'metric'}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 'metric'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Back
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            {currentStep === 'review' ? (
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 transition-colors"
              >
                Save Signal Template
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
