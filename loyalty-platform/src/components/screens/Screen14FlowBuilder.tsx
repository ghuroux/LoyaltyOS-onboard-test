import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import {
  Play,
  CheckCircle2,
  XCircle,
  Circle,
  AlertTriangle,
  ChevronRight,
  User,
  ShoppingCart,
  Megaphone,
  Shield,
  TrendingUp,
  Coins,
  Star,
  Gift,
  AlertCircle,
  DollarSign,
  Zap,
  Settings,
  Edit3,
  RotateCcw,
} from 'lucide-react';

type TestStatus = 'pass' | 'fail' | 'not-run' | 'warning';
type StepStatus = 'pending' | 'running' | 'pass' | 'fail';

interface FlowStep {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  configSource: string;
  status: StepStatus;
  details?: string;
  inputValue?: string;
  outputValue?: string;
}

interface TestScenario {
  id: string;
  category: string;
  name: string;
  description: string;
  status: TestStatus;
  payload: {
    customerId?: string;
    transactionAmount?: number;
    transactionDate?: string;
    storeId?: string;
    productCategory?: string;
    pointsToRedeem?: number;
    currentPoints?: number;
    currentTier?: string;
    memberSince?: string;
    lastPurchaseDate?: string;
    purchaseCount?: number;
  };
  expectedOutcome: {
    pointsEarned?: number;
    pointsRedeemed?: number;
    newBalance?: number;
    tierChange?: string;
    campaignsTriggered?: string[];
    safeguardsPassed?: boolean;
    signalsTriggered?: string[];
    success: boolean;
    message: string;
  };
  steps: FlowStep[];
}

export const Screen14FlowBuilder: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<string>('test-1');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [editMode, setEditMode] = useState(false);
  const [testPayload, setTestPayload] = useState<any>(null);

  const testScenarios: TestScenario[] = [
    {
      id: 'test-1',
      category: 'Member Lifecycle',
      name: 'New Member Signup Flow',
      description: 'Validate new member registration, welcome bonus, and initial tier assignment',
      status: 'not-run',
      payload: {
        customerId: 'NEW-12345',
        transactionAmount: 0,
        transactionDate: '2025-01-15',
        memberSince: '2025-01-15',
      },
      expectedOutcome: {
        pointsEarned: 500,
        newBalance: 500,
        tierChange: 'Bronze',
        campaignsTriggered: ['Welcome Series'],
        safeguardsPassed: true,
        success: true,
        message: 'New member successfully onboarded with 500 welcome bonus points',
      },
      steps: [
        {
          id: 's1',
          name: 'Input Validation',
          icon: CheckCircle2,
          description: 'Validate customer data and eligibility',
          configSource: 'Screen 2: Platform Basics',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Welcome Bonus',
          icon: Gift,
          description: 'Award signup bonus points',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '0 points',
          outputValue: '500 points',
        },
        {
          id: 's3',
          name: 'Tier Assignment',
          icon: Star,
          description: 'Assign initial tier (Bronze)',
          configSource: 'Screen 6: Redemption & Rewards',
          status: 'pending',
          outputValue: 'Bronze Tier',
        },
        {
          id: 's4',
          name: 'Campaign Trigger',
          icon: Megaphone,
          description: 'Trigger welcome campaign',
          configSource: 'Screen 10: Campaign Templates',
          status: 'pending',
          outputValue: 'Welcome Series activated',
        },
        {
          id: 's5',
          name: 'Safeguard Check',
          icon: Shield,
          description: 'Verify no fraud flags',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
        },
      ],
    },
    {
      id: 'test-2',
      category: 'Member Lifecycle',
      name: 'First Purchase Bonus',
      description: 'Test first purchase bonus points and milestone tracking',
      status: 'not-run',
      payload: {
        customerId: 'CUST-67890',
        transactionAmount: 75.00,
        transactionDate: '2025-01-16',
        storeId: 'STORE-001',
        productCategory: 'Electronics',
        currentPoints: 500,
        purchaseCount: 0,
        memberSince: '2025-01-15',
      },
      expectedOutcome: {
        pointsEarned: 175,
        newBalance: 675,
        campaignsTriggered: ['First Purchase Celebration'],
        safeguardsPassed: true,
        success: true,
        message: 'First purchase bonus awarded: 75 base + 100 first purchase bonus',
      },
      steps: [
        {
          id: 's1',
          name: 'Transaction Validation',
          icon: ShoppingCart,
          description: 'Validate transaction details',
          configSource: 'Screen 2: Platform Basics',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Base Points Calculation',
          icon: Coins,
          description: 'Calculate standard points (1:1 ratio)',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '$75.00',
          outputValue: '75 points',
        },
        {
          id: 's3',
          name: 'First Purchase Bonus',
          icon: Gift,
          description: 'Add 100 point first purchase bonus',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '75 points',
          outputValue: '175 points',
        },
        {
          id: 's4',
          name: 'Campaign Check',
          icon: Megaphone,
          description: 'Trigger first purchase campaign',
          configSource: 'Screen 10: Campaign Templates',
          status: 'pending',
        },
        {
          id: 's5',
          name: 'Velocity Check',
          icon: Shield,
          description: 'Check transaction velocity limits',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
        },
      ],
    },
    {
      id: 'test-3',
      category: 'Transaction Processing',
      name: 'Standard Purchase (Points Earn)',
      description: 'Process typical transaction with points earning',
      status: 'not-run',
      payload: {
        customerId: 'CUST-11111',
        transactionAmount: 150.00,
        transactionDate: '2025-01-20',
        storeId: 'STORE-002',
        productCategory: 'Apparel',
        currentPoints: 1200,
        currentTier: 'Silver',
        purchaseCount: 12,
      },
      expectedOutcome: {
        pointsEarned: 225,
        newBalance: 1425,
        safeguardsPassed: true,
        success: true,
        message: 'Transaction processed: 150 base points + 75 Silver tier bonus (50%)',
      },
      steps: [
        {
          id: 's1',
          name: 'Input Validation',
          icon: CheckCircle2,
          description: 'Validate transaction',
          configSource: 'Screen 2: Platform Basics',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Points Calculation',
          icon: Coins,
          description: 'Calculate base points',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '$150.00',
          outputValue: '150 points',
        },
        {
          id: 's3',
          name: 'Tier Bonus',
          icon: Star,
          description: 'Apply Silver tier 50% bonus',
          configSource: 'Screen 6: Redemption & Rewards',
          status: 'pending',
          inputValue: '150 points',
          outputValue: '225 points (150 + 75 bonus)',
        },
        {
          id: 's4',
          name: 'Safeguards',
          icon: Shield,
          description: 'Verify spending patterns',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
        },
        {
          id: 's5',
          name: 'Queue Signals',
          icon: AlertCircle,
          description: 'Check for anomalies',
          configSource: 'Screen 11: Queue Intelligence',
          status: 'pending',
        },
      ],
    },
    {
      id: 'test-4',
      category: 'Transaction Processing',
      name: 'Points Redemption Flow',
      description: 'Test points redemption with balance validation',
      status: 'not-run',
      payload: {
        customerId: 'CUST-22222',
        pointsToRedeem: 500,
        transactionAmount: 50.00,
        currentPoints: 1500,
        currentTier: 'Gold',
      },
      expectedOutcome: {
        pointsRedeemed: 500,
        newBalance: 1000,
        safeguardsPassed: true,
        success: true,
        message: 'Successfully redeemed 500 points ($5 discount). New balance: 1000 points',
      },
      steps: [
        {
          id: 's1',
          name: 'Balance Check',
          icon: DollarSign,
          description: 'Verify sufficient points',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '1500 available',
          outputValue: 'Sufficient balance',
        },
        {
          id: 's2',
          name: 'Redemption Rules',
          icon: Gift,
          description: 'Apply redemption conversion (100:1)',
          configSource: 'Screen 6: Redemption & Rewards',
          status: 'pending',
          inputValue: '500 points',
          outputValue: '$5.00 discount',
        },
        {
          id: 's3',
          name: 'Points Deduction',
          icon: Coins,
          description: 'Deduct points from balance',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '1500 points',
          outputValue: '1000 points',
        },
        {
          id: 's4',
          name: 'Fraud Check',
          icon: Shield,
          description: 'Verify redemption patterns',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
        },
      ],
    },
    {
      id: 'test-5',
      category: 'Campaign Execution',
      name: 'Segment-Targeted Promotion',
      description: 'Validate segment-based campaign targeting and activation',
      status: 'not-run',
      payload: {
        customerId: 'CUST-33333',
        currentTier: 'Gold',
        lastPurchaseDate: '2024-11-01',
        purchaseCount: 25,
        currentPoints: 3500,
      },
      expectedOutcome: {
        campaignsTriggered: ['Win-Back Gold Members'],
        signalsTriggered: ['Dormant Gold Customer'],
        success: true,
        message: 'Win-back campaign triggered for dormant Gold member',
      },
      steps: [
        {
          id: 's1',
          name: 'Segment Evaluation',
          icon: TrendingUp,
          description: 'Identify customer segment',
          configSource: 'Screen 7: Customer Segmentation',
          status: 'pending',
          outputValue: 'At-Risk Gold Segment',
        },
        {
          id: 's2',
          name: 'Campaign Match',
          icon: Megaphone,
          description: 'Match to win-back campaign',
          configSource: 'Screen 10: Campaign Templates',
          status: 'pending',
          outputValue: 'Win-Back Gold Members',
        },
        {
          id: 's3',
          name: 'Signal Detection',
          icon: AlertCircle,
          description: 'Trigger dormancy signal',
          configSource: 'Screen 11: Queue Intelligence',
          status: 'pending',
          outputValue: 'Dormant Gold Customer signal',
        },
        {
          id: 's4',
          name: 'Campaign Activation',
          icon: Zap,
          description: 'Activate campaign automation',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
        },
      ],
    },
    {
      id: 'test-6',
      category: 'Safeguards & Fraud',
      name: 'Velocity Limit Check',
      description: 'Test transaction velocity safeguards and fraud detection',
      status: 'not-run',
      payload: {
        customerId: 'CUST-44444',
        transactionAmount: 500.00,
        transactionDate: '2025-01-20 14:35:00',
        currentPoints: 800,
        purchaseCount: 45,
      },
      expectedOutcome: {
        safeguardsPassed: false,
        signalsTriggered: ['High Velocity Transaction'],
        success: false,
        message: 'Transaction flagged: 4 transactions in 10 minutes exceeds velocity limit (3/10min)',
      },
      steps: [
        {
          id: 's1',
          name: 'Transaction Analysis',
          icon: ShoppingCart,
          description: 'Analyze transaction pattern',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Velocity Check',
          icon: Shield,
          description: 'Check transaction frequency',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          inputValue: '4 transactions/10min',
          outputValue: 'LIMIT EXCEEDED (max: 3)',
        },
        {
          id: 's3',
          name: 'Fraud Signal',
          icon: AlertCircle,
          description: 'Trigger high velocity signal',
          configSource: 'Screen 11: Queue Intelligence',
          status: 'pending',
          outputValue: 'High Velocity Transaction',
        },
        {
          id: 's4',
          name: 'Transaction Block',
          icon: XCircle,
          description: 'Block transaction for review',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          outputValue: 'BLOCKED - Manual review required',
        },
      ],
    },
    {
      id: 'test-7',
      category: 'Tier & Status',
      name: 'Tier Upgrade Scenario',
      description: 'Test automatic tier upgrade based on points threshold',
      status: 'not-run',
      payload: {
        customerId: 'CUST-55555',
        transactionAmount: 200.00,
        currentPoints: 4850,
        currentTier: 'Silver',
        purchaseCount: 20,
      },
      expectedOutcome: {
        pointsEarned: 200,
        newBalance: 5050,
        tierChange: 'Gold',
        campaignsTriggered: ['Gold Tier Welcome'],
        success: true,
        message: 'Tier upgraded from Silver to Gold. Welcome package activated.',
      },
      steps: [
        {
          id: 's1',
          name: 'Points Award',
          icon: Coins,
          description: 'Award transaction points',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '4850 points',
          outputValue: '5050 points',
        },
        {
          id: 's2',
          name: 'Tier Evaluation',
          icon: Star,
          description: 'Check tier thresholds',
          configSource: 'Screen 6: Redemption & Rewards',
          status: 'pending',
          inputValue: '5050 points (>5000)',
          outputValue: 'Gold tier qualified',
        },
        {
          id: 's3',
          name: 'Tier Upgrade',
          icon: TrendingUp,
          description: 'Upgrade to Gold tier',
          configSource: 'Screen 6: Redemption & Rewards',
          status: 'pending',
          outputValue: 'Silver → Gold',
        },
        {
          id: 's4',
          name: 'Upgrade Campaign',
          icon: Megaphone,
          description: 'Trigger tier upgrade campaign',
          configSource: 'Screen 10: Campaign Templates',
          status: 'pending',
          outputValue: 'Gold Tier Welcome',
        },
        {
          id: 's5',
          name: 'Notification',
          icon: Zap,
          description: 'Send upgrade notification',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
        },
      ],
    },
    {
      id: 'test-8',
      category: 'Transaction Processing',
      name: 'Mixed Payment (Points + Cash)',
      description: 'Process transaction with partial points redemption',
      status: 'not-run',
      payload: {
        customerId: 'CUST-66666',
        transactionAmount: 100.00,
        pointsToRedeem: 2000,
        currentPoints: 3500,
        currentTier: 'Gold',
      },
      expectedOutcome: {
        pointsRedeemed: 2000,
        pointsEarned: 60,
        newBalance: 1560,
        safeguardsPassed: true,
        success: true,
        message: 'Mixed payment: $20 points discount + $80 cash. Earned 60 points on cash portion.',
      },
      steps: [
        {
          id: 's1',
          name: 'Payment Split',
          icon: DollarSign,
          description: 'Calculate payment split',
          configSource: 'Screen 6: Redemption & Rewards',
          status: 'pending',
          inputValue: '$100 total',
          outputValue: '$20 points + $80 cash',
        },
        {
          id: 's2',
          name: 'Points Redemption',
          icon: Gift,
          description: 'Redeem 2000 points',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '2000 points',
          outputValue: '$20 discount',
        },
        {
          id: 's3',
          name: 'Points Earning',
          icon: Coins,
          description: 'Earn points on cash portion only',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '$80 cash',
          outputValue: '60 points (with Gold bonus)',
        },
        {
          id: 's4',
          name: 'Balance Update',
          icon: TrendingUp,
          description: 'Calculate new balance',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '3500 - 2000 + 60',
          outputValue: '1560 points',
        },
      ],
    },
  ];

  const selectedScenario = testScenarios.find((t) => t.id === selectedTest);

  const runTest = async () => {
    if (!selectedScenario) return;

    setIsRunning(true);
    setCurrentStepIndex(-1);

    // Simulate step-by-step execution
    for (let i = 0; i < selectedScenario.steps.length; i++) {
      setCurrentStepIndex(i);

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // For demonstration, all steps pass except in the velocity check test
      if (selectedScenario.id === 'test-6' && i === 3) {
        // Velocity check fails at the final step
        selectedScenario.steps[i].status = 'fail';
      } else {
        selectedScenario.steps[i].status = 'pass';
      }
    }

    setCurrentStepIndex(selectedScenario.steps.length);
    setIsRunning(false);
  };

  const resetTest = () => {
    if (!selectedScenario) return;
    selectedScenario.steps.forEach((step) => {
      step.status = 'pending';
    });
    setCurrentStepIndex(-1);
    setIsRunning(false);
  };

  const getStatusIcon = (status: TestStatus) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 size={16} className="text-green-600" />;
      case 'fail':
        return <XCircle size={16} className="text-red-600" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-600" />;
      default:
        return <Circle size={16} className="text-gray-400" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Member Lifecycle':
        return User;
      case 'Transaction Processing':
        return ShoppingCart;
      case 'Campaign Execution':
        return Megaphone;
      case 'Safeguards & Fraud':
        return Shield;
      case 'Tier & Status':
        return TrendingUp;
      default:
        return Settings;
    }
  };

  const categories = Array.from(new Set(testScenarios.map((t) => t.category)));

  const getStepStatusColor = (status: StepStatus) => {
    switch (status) {
      case 'pass':
        return 'bg-green-50 border-green-500 text-green-700';
      case 'fail':
        return 'bg-red-50 border-red-500 text-red-700';
      case 'running':
        return 'bg-blue-50 border-blue-500 text-blue-700 animate-pulse';
      default:
        return 'bg-gray-50 border-gray-300 text-gray-600';
    }
  };

  const getStepIcon = (step: FlowStep, index: number) => {
    if (index === currentStepIndex) {
      return <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>;
    }
    if (step.status === 'pass') {
      return <CheckCircle2 size={16} className="text-green-600" />;
    }
    if (step.status === 'fail') {
      return <XCircle size={16} className="text-red-600" />;
    }
    return <Circle size={16} className="text-gray-400" />;
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Settings size={32} className="text-brand-600" />
            Configuration Testing & Validation
          </h1>
          <p className="text-gray-600 text-lg">
            Test and validate your loyalty program configuration with interactive test scenarios. Run simulations to ensure everything works before deployment.
          </p>
        </div>

        {/* Info Banner */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">How Testing Works</h3>
              <p className="text-sm text-blue-800">
                Each test scenario validates specific configurations from previous screens. Click a test, optionally edit the payload, then click "Run Test" to simulate the flow.
                Watch as each step executes and validates your configuration settings.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Test Scenarios */}
          <div className="col-span-4">
            <Card className="p-5">
              <h2 className="font-bold text-gray-900 mb-4">Test Scenarios</h2>

              <div className="space-y-4">
                {categories.map((category) => {
                  const CategoryIcon = getCategoryIcon(category);
                  const categoryTests = testScenarios.filter((t) => t.category === category);

                  return (
                    <div key={category}>
                      <div className="flex items-center gap-2 mb-2">
                        <CategoryIcon size={16} className="text-gray-600" />
                        <h3 className="text-xs font-semibold text-gray-600 uppercase">{category}</h3>
                      </div>

                      <div className="space-y-1 ml-1">
                        {categoryTests.map((test) => (
                          <button
                            key={test.id}
                            onClick={() => {
                              setSelectedTest(test.id);
                              resetTest();
                            }}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${
                              selectedTest === test.id
                                ? 'bg-brand-50 border-brand-500'
                                : 'bg-white border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm text-gray-900 mb-1">{test.name}</div>
                                <div className="text-xs text-gray-600">{test.description}</div>
                              </div>
                              {getStatusIcon(test.status)}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Panel - Test Details */}
          <div className="col-span-8 space-y-5">
            {selectedScenario && (
              <>
                {/* Test Header */}
                <Card className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedScenario.name}</h2>
                      <p className="text-gray-600 text-sm">{selectedScenario.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={resetTest}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
                        disabled={isRunning}
                      >
                        <RotateCcw size={16} />
                        Reset
                      </button>
                      <button
                        onClick={runTest}
                        className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium text-sm flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isRunning}
                      >
                        <Play size={16} />
                        {isRunning ? 'Running Test...' : 'Run Test'}
                      </button>
                    </div>
                  </div>

                  {/* Payload Preview */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-700">Test Payload</h3>
                      <button
                        onClick={() => setEditMode(!editMode)}
                        className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
                      >
                        <Edit3 size={12} />
                        {editMode ? 'View Mode' : 'Edit Values'}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(selectedScenario.payload).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <span className="text-gray-600 font-mono">{key}:</span>
                          <span className="text-gray-900 font-semibold font-mono">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Flow Visualization */}
                <Card className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">Configuration Flow</h3>

                  <div className="space-y-3">
                    {selectedScenario.steps.map((step, index) => {
                      const StepIcon = step.icon;
                      const isActive = index === currentStepIndex;
                      const stepStatus = isActive ? 'running' : step.status;

                      return (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className={`p-4 border-2 rounded-lg transition-all ${getStepStatusColor(stepStatus)}`}>
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 flex-shrink-0">
                                <StepIcon size={20} className="text-gray-700" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-sm">{step.name}</h4>
                                  {getStepIcon(step, index)}
                                </div>
                                <p className="text-xs text-gray-600 mb-2">{step.description}</p>
                                <div className="text-xs text-gray-500 italic">
                                  Config from: {step.configSource}
                                </div>

                                {/* Input/Output Values */}
                                {(step.inputValue || step.outputValue) && step.status !== 'pending' && (
                                  <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-4 text-xs">
                                    {step.inputValue && (
                                      <div>
                                        <span className="text-gray-500">Input:</span>
                                        <span className="ml-1 font-semibold text-gray-700">{step.inputValue}</span>
                                      </div>
                                    )}
                                    {step.outputValue && (
                                      <div>
                                        <span className="text-gray-500">Output:</span>
                                        <span className="ml-1 font-semibold text-gray-900">{step.outputValue}</span>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {step.status === 'fail' && (
                                  <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-xs text-red-800">
                                    <strong>Failed:</strong> {selectedScenario.expectedOutcome.message}
                                  </div>
                                )}
                              </div>

                              {index < selectedScenario.steps.length - 1 && (
                                <div className="absolute left-8 top-full h-3 w-0.5 bg-gray-300" style={{ marginTop: '-0.75rem' }} />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </Card>

                {/* Test Results */}
                {currentStepIndex >= selectedScenario.steps.length && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className={`p-5 border-2 ${
                      selectedScenario.expectedOutcome.success
                        ? 'bg-green-50 border-green-500'
                        : 'bg-red-50 border-red-500'
                    }`}>
                      <div className="flex items-start gap-3">
                        {selectedScenario.expectedOutcome.success ? (
                          <CheckCircle2 size={24} className="text-green-600 flex-shrink-0" />
                        ) : (
                          <XCircle size={24} className="text-red-600 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <h3 className={`font-bold text-lg mb-2 ${
                            selectedScenario.expectedOutcome.success ? 'text-green-900' : 'text-red-900'
                          }`}>
                            {selectedScenario.expectedOutcome.success ? 'Test Passed ✓' : 'Test Failed ✗'}
                          </h3>
                          <p className={`text-sm mb-4 ${
                            selectedScenario.expectedOutcome.success ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {selectedScenario.expectedOutcome.message}
                          </p>

                          {/* Expected Outcome Details */}
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            {selectedScenario.expectedOutcome.pointsEarned !== undefined && (
                              <div className="p-2 bg-white rounded border border-gray-200">
                                <div className="text-gray-600">Points Earned</div>
                                <div className="font-bold text-gray-900">{selectedScenario.expectedOutcome.pointsEarned}</div>
                              </div>
                            )}
                            {selectedScenario.expectedOutcome.pointsRedeemed !== undefined && (
                              <div className="p-2 bg-white rounded border border-gray-200">
                                <div className="text-gray-600">Points Redeemed</div>
                                <div className="font-bold text-gray-900">{selectedScenario.expectedOutcome.pointsRedeemed}</div>
                              </div>
                            )}
                            {selectedScenario.expectedOutcome.newBalance !== undefined && (
                              <div className="p-2 bg-white rounded border border-gray-200">
                                <div className="text-gray-600">New Balance</div>
                                <div className="font-bold text-gray-900">{selectedScenario.expectedOutcome.newBalance}</div>
                              </div>
                            )}
                            {selectedScenario.expectedOutcome.tierChange && (
                              <div className="p-2 bg-white rounded border border-gray-200">
                                <div className="text-gray-600">Tier Status</div>
                                <div className="font-bold text-gray-900">{selectedScenario.expectedOutcome.tierChange}</div>
                              </div>
                            )}
                            {selectedScenario.expectedOutcome.campaignsTriggered && selectedScenario.expectedOutcome.campaignsTriggered.length > 0 && (
                              <div className="p-2 bg-white rounded border border-gray-200 col-span-2">
                                <div className="text-gray-600 mb-1">Campaigns Triggered</div>
                                <div className="flex flex-wrap gap-1">
                                  {selectedScenario.expectedOutcome.campaignsTriggered.map((campaign) => (
                                    <span key={campaign} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                      {campaign}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {selectedScenario.expectedOutcome.signalsTriggered && selectedScenario.expectedOutcome.signalsTriggered.length > 0 && (
                              <div className="p-2 bg-white rounded border border-gray-200 col-span-2">
                                <div className="text-gray-600 mb-1">Signals Triggered</div>
                                <div className="flex flex-wrap gap-1">
                                  {selectedScenario.expectedOutcome.signalsTriggered.map((signal) => (
                                    <span key={signal} className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                                      {signal}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
