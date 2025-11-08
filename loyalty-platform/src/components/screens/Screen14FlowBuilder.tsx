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
  Clock,
  BarChart3,
  Mail,
  Globe,
  Package,
  Coffee,
  Cake,
  Percent,
  Ticket,
  MessageSquare,
  Moon,
  Award,
  Target,
  Users,
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

interface EditableField {
  key: string;
  label: string;
  type: 'number' | 'text';
  passingValue: any;
  failingValue: any;
  helpText?: string;
}

interface TestScenario {
  id: string;
  category: string;
  name: string;
  description: string;
  status: TestStatus;
  payload: any;
  editableFields?: EditableField[];
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
  const [editedPayload, setEditedPayload] = useState<Record<string, any>>({});

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
        velocityCount: 4,
      },
      editableFields: [
        {
          key: 'velocityCount',
          label: 'Transactions in 10min',
          type: 'number',
          passingValue: 3,
          failingValue: 4,
          helpText: 'Limit is 3 transactions per 10 minutes. 4+ will fail.',
        },
      ],
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
    {
      id: 'test-9',
      category: 'Safeguards & Fraud',
      name: 'Cooldown Period Enforcement',
      description: 'Test win-back automation cooldown prevents repeated triggering',
      status: 'not-run',
      payload: {
        customerId: 'CUST-77777',
        lastWinBackDate: '2024-12-01',
        currentDate: '2025-01-15',
        inactiveDays: 35,
        daysSinceLastWinBack: 45,
      },
      editableFields: [
        {
          key: 'daysSinceLastWinBack',
          label: 'Days Since Last Win-Back',
          type: 'number',
          passingValue: 95,
          failingValue: 45,
          helpText: 'Cooldown is 90 days. 90+ days will pass, <90 will fail.',
        },
      ],
      expectedOutcome: {
        campaignsTriggered: [],
        safeguardsPassed: false,
        success: false,
        message: 'Win-back campaign blocked: Customer received win-back 45 days ago (90-day cooldown not met)',
      },
      steps: [
        {
          id: 's1',
          name: 'Inactivity Detection',
          icon: Clock,
          description: 'Customer inactive for 35 days',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: 'Inactive threshold met',
        },
        {
          id: 's2',
          name: 'Automation Match',
          icon: Megaphone,
          description: 'Match to win-back campaign',
          configSource: 'Screen 10: Campaign Templates',
          status: 'pending',
          outputValue: 'Win-Back Campaign matched',
        },
        {
          id: 's3',
          name: 'Cooldown Check',
          icon: Shield,
          description: 'Verify 90-day cooldown period',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          inputValue: 'Last: 45 days ago',
          outputValue: 'FAILED (requires 90 days)',
        },
        {
          id: 's4',
          name: 'Campaign Block',
          icon: XCircle,
          description: 'Block campaign due to cooldown',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          outputValue: 'BLOCKED - Cooldown not met',
        },
      ],
    },
    {
      id: 'test-10',
      category: 'Safeguards & Fraud',
      name: 'Benefit Cap Reached',
      description: 'Test maximum win-back offers per year limit',
      status: 'not-run',
      payload: {
        customerId: 'CUST-88888',
        winBackOffersThisYear: 3,
        yearlyLimit: 3,
        inactiveDays: 40,
      },
      editableFields: [
        {
          key: 'winBackOffersThisYear',
          label: 'Win-Back Offers Received',
          type: 'number',
          passingValue: 2,
          failingValue: 3,
          helpText: 'Yearly limit is 3 offers. 3+ will fail, <3 will pass.',
        },
      ],
      expectedOutcome: {
        campaignsTriggered: [],
        safeguardsPassed: false,
        success: false,
        message: 'Campaign blocked: Customer has reached maximum win-back offers (3/3) for this year',
      },
      steps: [
        {
          id: 's1',
          name: 'Automation Trigger',
          icon: Zap,
          description: 'Win-back automation triggered',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Benefit History Check',
          icon: BarChart3,
          description: 'Check win-back offer history',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          inputValue: '3 offers received',
          outputValue: 'Limit reached (3/3)',
        },
        {
          id: 's3',
          name: 'Benefit Cap Enforcement',
          icon: Shield,
          description: 'Enforce yearly benefit cap',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          outputValue: 'CAP EXCEEDED',
        },
        {
          id: 's4',
          name: 'Reward Denial',
          icon: XCircle,
          description: 'Block reward issuance',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          outputValue: 'BLOCKED - Annual cap reached',
        },
      ],
    },
    {
      id: 'test-11',
      category: 'Safeguards & Fraud',
      name: 'Pattern Detection (Gaming Behavior)',
      description: 'Detect and flag inactive-active-inactive cycling pattern',
      status: 'not-run',
      payload: {
        customerId: 'CUST-99999',
        behaviorPattern: 'Inactive → Win-back → Active → Inactive (3x in 6 months)',
        patternSensitivity: 'moderate',
      },
      expectedOutcome: {
        signalsTriggered: ['Gaming Pattern Detected'],
        safeguardsPassed: false,
        success: false,
        message: 'Customer flagged: Repetitive inactive-active-inactive pattern detected (3 cycles). Manual review required.',
      },
      steps: [
        {
          id: 's1',
          name: 'Behavior Analysis',
          icon: TrendingUp,
          description: 'Analyze customer behavior history',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Pattern Recognition',
          icon: AlertCircle,
          description: 'Detect repetitive pattern',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          inputValue: '3 cycle repetitions',
          outputValue: 'PATTERN DETECTED',
        },
        {
          id: 's3',
          name: 'Sensitivity Check',
          icon: Shield,
          description: 'Moderate sensitivity (3+ cycles)',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          outputValue: 'Threshold met',
        },
        {
          id: 's4',
          name: 'Customer Flagging',
          icon: AlertTriangle,
          description: 'Flag for manual review',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          outputValue: 'FLAGGED - Manual review queue',
        },
      ],
    },
    {
      id: 'test-12',
      category: 'Safeguards & Fraud',
      name: 'Communication Frequency Limit',
      description: 'Block email when customer exceeds communication frequency cap',
      status: 'not-run',
      payload: {
        customerId: 'CUST-10101',
        emailsSent7Days: 3,
        communicationLimit: 3,
        automationTriggered: 'Birthday Campaign',
      },
      expectedOutcome: {
        campaignsTriggered: [],
        safeguardsPassed: false,
        success: false,
        message: 'Communication blocked: Customer has received 3 emails in past 7 days (limit: 3)',
      },
      steps: [
        {
          id: 's1',
          name: 'Campaign Trigger',
          icon: Megaphone,
          description: 'Birthday campaign triggered',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Communication History',
          icon: Mail,
          description: 'Check email history (7 days)',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          inputValue: '3 emails sent',
          outputValue: 'Limit reached (3/3)',
        },
        {
          id: 's3',
          name: 'Frequency Limit Check',
          icon: Shield,
          description: 'Enforce 3 emails per 7 days limit',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          outputValue: 'LIMIT EXCEEDED',
        },
        {
          id: 's4',
          name: 'Email Suppression',
          icon: XCircle,
          description: 'Suppress email to prevent over-communication',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          outputValue: 'SUPPRESSED - Frequency cap',
        },
      ],
    },
    {
      id: 'test-13',
      category: 'Safeguards & Fraud',
      name: 'Duplicate Transaction Detection',
      description: 'Detect and block duplicate transaction submission',
      status: 'not-run',
      payload: {
        customerId: 'CUST-11111',
        transactionAmount: 75.00,
        transactionTime: '2025-01-20 14:30:15',
        storeId: 'STORE-003',
        previousTransaction: 'Same amount/time/store 30 seconds ago',
      },
      expectedOutcome: {
        pointsEarned: 0,
        safeguardsPassed: false,
        success: false,
        message: 'Transaction blocked: Duplicate detected (same amount, location, and time within 60 seconds)',
      },
      steps: [
        {
          id: 's1',
          name: 'Transaction Submission',
          icon: ShoppingCart,
          description: 'Process transaction request',
          configSource: 'Screen 2: Platform Basics',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Duplicate Detection',
          icon: Shield,
          description: 'Check recent transaction history',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          inputValue: '$75.00 at STORE-003',
          outputValue: 'DUPLICATE FOUND (30s ago)',
        },
        {
          id: 's3',
          name: 'Fraud Analysis',
          icon: AlertCircle,
          description: 'Analyze duplicate pattern',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          outputValue: 'High confidence duplicate',
        },
        {
          id: 's4',
          name: 'Transaction Block',
          icon: XCircle,
          description: 'Block duplicate transaction',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          outputValue: 'BLOCKED - Duplicate submission',
        },
      ],
    },
    {
      id: 'test-14',
      category: 'Safeguards & Fraud',
      name: 'Geographic Anomaly Detection',
      description: 'Flag transaction from unusual location for review',
      status: 'not-run',
      payload: {
        customerId: 'CUST-12121',
        transactionAmount: 200.00,
        transactionLocation: 'Tokyo, Japan',
        usualLocations: 'New York, USA (90% of transactions)',
        lastTransactionTime: '2 hours ago in New York',
      },
      expectedOutcome: {
        pointsEarned: 200,
        signalsTriggered: ['Geographic Anomaly'],
        safeguardsPassed: false,
        success: true,
        message: 'Transaction processed but flagged: Unusual location detected (Tokyo vs typical New York). Points awarded pending manual review.',
      },
      steps: [
        {
          id: 's1',
          name: 'Transaction Processing',
          icon: ShoppingCart,
          description: 'Process transaction from Tokyo',
          configSource: 'Screen 2: Platform Basics',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Location Analysis',
          icon: Globe,
          description: 'Analyze transaction geography',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          inputValue: 'Tokyo, Japan',
          outputValue: 'ANOMALY (6,700 miles from usual)',
        },
        {
          id: 's3',
          name: 'Fraud Signal',
          icon: AlertCircle,
          description: 'Trigger geographic anomaly signal',
          configSource: 'Screen 11: Queue Intelligence',
          status: 'pending',
          outputValue: 'Geographic Anomaly Signal',
        },
        {
          id: 's4',
          name: 'Conditional Processing',
          icon: CheckCircle2,
          description: 'Award points, flag for review',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          outputValue: 'PROCESSED + FLAGGED for review',
        },
      ],
    },
    {
      id: 'test-15',
      category: 'Points & Earning Rules',
      name: 'Category Multiplier (2x Electronics)',
      description: 'Validate category-based earning with 2x multiplier for Electronics',
      status: 'not-run',
      payload: {
        customerId: 'CUST-13131',
        transactionAmount: 100.00,
        productCategory: 'Electronics',
        categoryMultiplier: 2,
        currentPoints: 500,
        currentTier: 'Bronze',
      },
      expectedOutcome: {
        pointsEarned: 200,
        newBalance: 700,
        safeguardsPassed: true,
        success: true,
        message: 'Category multiplier applied: 100 base points × 2 (Electronics) = 200 points earned',
      },
      steps: [
        {
          id: 's1',
          name: 'Transaction Processing',
          icon: ShoppingCart,
          description: 'Process $100 Electronics purchase',
          configSource: 'Screen 2: Platform Basics',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Base Points Calculation',
          icon: Coins,
          description: 'Calculate standard points (1:1)',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '$100.00',
          outputValue: '100 base points',
        },
        {
          id: 's3',
          name: 'Category Detection',
          icon: Package,
          description: 'Identify Electronics category',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          outputValue: 'Electronics (2x multiplier)',
        },
        {
          id: 's4',
          name: 'Multiplier Application',
          icon: Zap,
          description: 'Apply 2x category multiplier',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '100 points',
          outputValue: '200 points (100 × 2)',
        },
        {
          id: 's5',
          name: 'Balance Update',
          icon: TrendingUp,
          description: 'Update customer balance',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '500 + 200',
          outputValue: '700 points',
        },
      ],
    },
    {
      id: 'test-16',
      category: 'Points & Earning Rules',
      name: 'SKU Tracker (Buy 10 Get 1 Free)',
      description: 'Test SKU-level tracking for loyalty rewards (10th coffee free)',
      status: 'not-run',
      payload: {
        customerId: 'CUST-14141',
        targetSku: 'COFFEE-LATTE',
        purchaseCount: 9,
        currentPurchase: 10,
        rewardType: 'same',
      },
      expectedOutcome: {
        pointsEarned: 0,
        signalsTriggered: ['SKU Milestone Reached'],
        success: true,
        message: 'SKU milestone reached: 10th Latte purchased. Free Latte reward issued!',
      },
      steps: [
        {
          id: 's1',
          name: 'SKU Detection',
          icon: Coffee,
          description: 'Identify COFFEE-LATTE purchase',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          outputValue: 'SKU: COFFEE-LATTE',
        },
        {
          id: 's2',
          name: 'Purchase History Check',
          icon: BarChart3,
          description: 'Check SKU purchase count',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '9 previous purchases',
          outputValue: '10th purchase detected',
        },
        {
          id: 's3',
          name: 'Milestone Validation',
          icon: Star,
          description: 'Validate milestone threshold (10)',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          outputValue: 'MILESTONE REACHED',
        },
        {
          id: 's4',
          name: 'Reward Issuance',
          icon: Gift,
          description: 'Issue free Latte reward',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          outputValue: 'Free COFFEE-LATTE voucher',
        },
        {
          id: 's5',
          name: 'Counter Reset',
          icon: RotateCcw,
          description: 'Reset SKU counter to 0',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          outputValue: 'Counter reset (0/10)',
        },
      ],
    },
    {
      id: 'test-17',
      category: 'Points & Earning Rules',
      name: 'Behavioral Frequency Bonus',
      description: 'Award bonus for 3 visits within 7 days',
      status: 'not-run',
      payload: {
        customerId: 'CUST-15151',
        visitsLast7Days: 2,
        currentVisit: 3,
        frequencyBonusThreshold: 3,
        bonusPoints: 50,
        currentPoints: 300,
      },
      expectedOutcome: {
        pointsEarned: 50,
        newBalance: 350,
        campaignsTriggered: ['Frequency Bonus Notification'],
        success: true,
        message: 'Frequency bonus awarded: 3 visits in 7 days earns 50 bonus points',
      },
      steps: [
        {
          id: 's1',
          name: 'Visit Tracking',
          icon: Clock,
          description: 'Track visit frequency (7 days)',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '2 previous visits',
          outputValue: '3rd visit detected',
        },
        {
          id: 's2',
          name: 'Frequency Evaluation',
          icon: TrendingUp,
          description: 'Evaluate against threshold',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          outputValue: 'Threshold met (3/3)',
        },
        {
          id: 's3',
          name: 'Cooldown Check',
          icon: Shield,
          description: 'Verify 30-day bonus cooldown',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          outputValue: 'Cooldown OK',
        },
        {
          id: 's4',
          name: 'Bonus Award',
          icon: Gift,
          description: 'Award 50 frequency bonus points',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '300 points',
          outputValue: '350 points (+50 bonus)',
        },
      ],
    },
    {
      id: 'test-18',
      category: 'Points & Earning Rules',
      name: 'Birthday Multiplier (2x Points)',
      description: 'Validate birthday bonus with 2x points multiplier',
      status: 'not-run',
      payload: {
        customerId: 'CUST-16161',
        transactionAmount: 50.00,
        transactionDate: '2025-06-15',
        customerBirthday: '2025-06-15',
        birthdayMultiplier: 2,
        currentPoints: 200,
      },
      expectedOutcome: {
        pointsEarned: 100,
        newBalance: 300,
        campaignsTriggered: ['Birthday Celebration'],
        success: true,
        message: 'Birthday bonus applied: 50 base points × 2 (birthday multiplier) = 100 points earned',
      },
      steps: [
        {
          id: 's1',
          name: 'Date Validation',
          icon: Cake,
          description: 'Verify transaction on birthday',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: 'June 15, 2025',
          outputValue: 'BIRTHDAY MATCH',
        },
        {
          id: 's2',
          name: 'Base Points',
          icon: Coins,
          description: 'Calculate base points',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '$50.00',
          outputValue: '50 points',
        },
        {
          id: 's3',
          name: 'Birthday Multiplier',
          icon: Star,
          description: 'Apply 2x birthday multiplier',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '50 points',
          outputValue: '100 points (50 × 2)',
        },
        {
          id: 's4',
          name: 'Campaign Trigger',
          icon: Megaphone,
          description: 'Trigger birthday celebration',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: 'Birthday Celebration campaign',
        },
      ],
    },
    {
      id: 'test-19',
      category: 'Points & Earning Rules',
      name: 'Threshold Bonus ($100+ Purchase)',
      description: 'Award bonus points for purchases over $100 threshold',
      status: 'not-run',
      payload: {
        customerId: 'CUST-17171',
        transactionAmount: 125.00,
        thresholdAmount: 100,
        bonusPoints: 100,
        currentPoints: 400,
      },
      expectedOutcome: {
        pointsEarned: 225,
        newBalance: 625,
        success: true,
        message: 'Threshold bonus awarded: 125 base points + 100 bonus (purchase > $100) = 225 total points',
      },
      steps: [
        {
          id: 's1',
          name: 'Transaction Processing',
          icon: DollarSign,
          description: 'Process $125 transaction',
          configSource: 'Screen 2: Platform Basics',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Base Points',
          icon: Coins,
          description: 'Calculate base points (1:1)',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '$125.00',
          outputValue: '125 points',
        },
        {
          id: 's3',
          name: 'Threshold Check',
          icon: TrendingUp,
          description: 'Check against $100 threshold',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '$125 > $100',
          outputValue: 'THRESHOLD EXCEEDED',
        },
        {
          id: 's4',
          name: 'Bonus Award',
          icon: Gift,
          description: 'Award 100 threshold bonus',
          configSource: 'Screen 5: Points & Currency',
          status: 'pending',
          inputValue: '125 + 100',
          outputValue: '225 total points',
        },
      ],
    },
    {
      id: 'test-20',
      category: 'Redemption & Rewards',
      name: 'Minimum Redemption Validation',
      description: 'Block redemption below minimum threshold (100 points)',
      status: 'not-run',
      payload: {
        customerId: 'CUST-18181',
        pointsToRedeem: 50,
        minimumRedemption: 100,
        currentPoints: 500,
      },
      editableFields: [
        {
          key: 'pointsToRedeem',
          label: 'Points to Redeem',
          type: 'number',
          passingValue: 100,
          failingValue: 50,
          helpText: 'Minimum redemption is 100 points. 100+ will pass, <100 will fail.',
        },
      ],
      expectedOutcome: {
        pointsRedeemed: 0,
        safeguardsPassed: false,
        success: false,
        message: 'Redemption blocked: 50 points below minimum threshold (100 points required)',
      },
      steps: [
        {
          id: 's1',
          name: 'Redemption Request',
          icon: Gift,
          description: 'Customer requests to redeem 50 points',
          configSource: 'Screen 6: Redemption & Rewards',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Balance Check',
          icon: DollarSign,
          description: 'Verify sufficient balance',
          configSource: 'Screen 6: Redemption & Rewards',
          status: 'pending',
          inputValue: '500 available',
          outputValue: 'Balance sufficient',
        },
        {
          id: 's3',
          name: 'Minimum Threshold Check',
          icon: Shield,
          description: 'Validate minimum redemption (100)',
          configSource: 'Screen 6: Redemption & Rewards',
          status: 'pending',
          inputValue: '50 points requested',
          outputValue: 'BELOW MINIMUM (requires 100)',
        },
        {
          id: 's4',
          name: 'Redemption Block',
          icon: XCircle,
          description: 'Block redemption request',
          configSource: 'Screen 6: Redemption & Rewards',
          status: 'pending',
          outputValue: 'BLOCKED - Minimum not met',
        },
      ],
    },
    {
      id: 'test-21',
      category: 'Redemption & Rewards',
      name: 'Points Expiration Warning',
      description: 'Trigger notification for points expiring in 14 days',
      status: 'not-run',
      payload: {
        customerId: 'CUST-19191',
        pointsExpiring: 500,
        expiryDate: '2025-02-03',
        currentDate: '2025-01-20',
        daysUntilExpiry: 14,
        warningThreshold: 14,
      },
      expectedOutcome: {
        campaignsTriggered: ['Points Expiry Warning'],
        signalsTriggered: ['Points About to Expire'],
        success: true,
        message: 'Expiry warning sent: 500 points expiring in 14 days. Customer notified.',
      },
      steps: [
        {
          id: 's1',
          name: 'Expiry Scan',
          icon: Clock,
          description: 'Daily scan for expiring points',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Threshold Check',
          icon: AlertCircle,
          description: 'Check 14-day warning threshold',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          inputValue: '14 days until expiry',
          outputValue: 'WARNING THRESHOLD MET',
        },
        {
          id: 's3',
          name: 'Minimum Points Check',
          icon: Coins,
          description: 'Verify minimum points to warn (100)',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          inputValue: '500 points expiring',
          outputValue: 'Above minimum (100)',
        },
        {
          id: 's4',
          name: 'Notification Trigger',
          icon: Mail,
          description: 'Send expiry warning email',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: 'Email sent: 500 points expiring',
        },
      ],
    },
    {
      id: 'test-22',
      category: 'Redemption & Rewards',
      name: 'Combinability Rules (Points + Promo)',
      description: 'Test points redemption combined with promotional discount',
      status: 'not-run',
      payload: {
        customerId: 'CUST-20202',
        transactionAmount: 100.00,
        pointsToRedeem: 500,
        promoCode: 'SAVE20',
        promoDiscount: 20.00,
        combinabilityAllowed: true,
      },
      expectedOutcome: {
        pointsRedeemed: 500,
        newBalance: 500,
        totalDiscount: 25.00,
        finalAmount: 55.00,
        success: true,
        message: 'Combined discount applied: $5 points + $20 promo = $25 total discount. Final: $55',
      },
      steps: [
        {
          id: 's1',
          name: 'Transaction Initiation',
          icon: ShoppingCart,
          description: 'Process $100 transaction',
          configSource: 'Screen 2: Platform Basics',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Promo Code Validation',
          icon: Ticket,
          description: 'Validate SAVE20 promo code',
          configSource: 'Screen 10: Campaign Templates',
          status: 'pending',
          outputValue: '$20 discount (SAVE20)',
        },
        {
          id: 's3',
          name: 'Points Redemption',
          icon: Coins,
          description: 'Redeem 500 points ($5)',
          configSource: 'Screen 6: Redemption & Rewards',
          status: 'pending',
          inputValue: '500 points',
          outputValue: '$5 discount',
        },
        {
          id: 's4',
          name: 'Combinability Check',
          icon: CheckCircle2,
          description: 'Verify combinability allowed',
          configSource: 'Screen 6: Redemption & Rewards',
          status: 'pending',
          outputValue: 'COMBINABLE (allowed)',
        },
        {
          id: 's5',
          name: 'Final Calculation',
          icon: DollarSign,
          description: 'Calculate final amount',
          configSource: 'Screen 6: Redemption & Rewards',
          status: 'pending',
          inputValue: '$100 - $5 - $20',
          outputValue: '$55 final',
        },
      ],
    },
    {
      id: 'test-23',
      category: 'Automations & Triggers',
      name: 'Milestone Automation (10th Purchase)',
      description: 'Trigger reward automation when customer reaches 10th purchase milestone',
      status: 'not-run',
      payload: {
        customerId: 'CUST-21212',
        purchaseCount: 9,
        currentPurchase: 10,
        milestoneThreshold: 10,
        rewardAmount: 500,
        currentPoints: 1200,
      },
      expectedOutcome: {
        pointsEarned: 500,
        newBalance: 1700,
        campaignsTriggered: ['10th Purchase Celebration'],
        signalsTriggered: ['Milestone Reached'],
        success: true,
        message: 'Milestone reached: 10th purchase! 500 bonus points awarded + celebration email sent',
      },
      steps: [
        {
          id: 's1',
          name: 'Purchase Tracking',
          icon: BarChart3,
          description: 'Track purchase count',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          inputValue: '9 previous purchases',
          outputValue: '10th purchase detected',
        },
        {
          id: 's2',
          name: 'Milestone Validation',
          icon: Target,
          description: 'Validate milestone threshold',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: 'MILESTONE REACHED (10/10)',
        },
        {
          id: 's3',
          name: 'Points Reward',
          icon: Gift,
          description: 'Award 500 milestone bonus',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          inputValue: '1200 points',
          outputValue: '1700 points (+500 bonus)',
        },
        {
          id: 's4',
          name: 'Campaign Trigger',
          icon: Megaphone,
          description: 'Trigger celebration campaign',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: '10th Purchase Celebration',
        },
        {
          id: 's5',
          name: 'Email Notification',
          icon: Mail,
          description: 'Send milestone achievement email',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: 'Email sent',
        },
      ],
    },
    {
      id: 'test-24',
      category: 'Automations & Triggers',
      name: 'Inactivity Automation (30 Days)',
      description: 'Trigger win-back campaign after 30 days of customer inactivity',
      status: 'not-run',
      payload: {
        customerId: 'CUST-22222',
        lastPurchaseDate: '2024-12-15',
        currentDate: '2025-01-20',
        inactiveDays: 36,
        inactivityThreshold: 30,
        winBackOffer: 'COMEBACK20',
      },
      expectedOutcome: {
        campaignsTriggered: ['Win-Back 30-Day Inactive'],
        safeguardsPassed: true,
        success: true,
        message: 'Inactivity detected: 36 days inactive. Win-back campaign triggered with COMEBACK20 offer',
      },
      steps: [
        {
          id: 's1',
          name: 'Inactivity Scan',
          icon: Moon,
          description: 'Daily scan for inactive customers',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Threshold Check',
          icon: Clock,
          description: 'Verify 30-day inactivity threshold',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          inputValue: '36 days inactive',
          outputValue: 'THRESHOLD EXCEEDED (>30 days)',
        },
        {
          id: 's3',
          name: 'Cooldown Verification',
          icon: Shield,
          description: 'Check 90-day win-back cooldown',
          configSource: 'Screen 9: Safeguards & Controls',
          status: 'pending',
          outputValue: 'No recent win-back (OK)',
        },
        {
          id: 's4',
          name: 'Campaign Activation',
          icon: Megaphone,
          description: 'Activate win-back campaign',
          configSource: 'Screen 10: Campaign Templates',
          status: 'pending',
          outputValue: 'Win-Back 30-Day Inactive',
        },
        {
          id: 's5',
          name: 'Offer Generation',
          icon: Ticket,
          description: 'Generate COMEBACK20 promo code',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: 'COMEBACK20 (20% off)',
        },
      ],
    },
    {
      id: 'test-25',
      category: 'Automations & Triggers',
      name: 'Birthday Timing (3 Days Before)',
      description: 'Trigger birthday campaign 3 days before customer birthday',
      status: 'not-run',
      payload: {
        customerId: 'CUST-23232',
        customerBirthday: '2025-06-18',
        currentDate: '2025-06-15',
        daysUntilBirthday: 3,
        birthdayTiming: '3-days-before',
        birthdayReward: 500,
      },
      expectedOutcome: {
        campaignsTriggered: ['Birthday Pre-Celebration'],
        pointsEarned: 500,
        newBalance: 500,
        success: true,
        message: 'Birthday campaign sent 3 days early: 500 bonus points + birthday wishes',
      },
      steps: [
        {
          id: 's1',
          name: 'Birthday Scan',
          icon: Cake,
          description: 'Daily birthday calendar scan',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
        },
        {
          id: 's2',
          name: 'Timing Validation',
          icon: Clock,
          description: 'Check 3-day-before timing',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          inputValue: 'Birthday: June 18',
          outputValue: '3 days before (June 15)',
        },
        {
          id: 's3',
          name: 'Opt-In Check',
          icon: CheckCircle2,
          description: 'Verify birthday communication opt-in',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: 'Customer opted in',
        },
        {
          id: 's4',
          name: 'Bonus Points',
          icon: Gift,
          description: 'Award 500 birthday bonus points',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: '500 birthday points',
        },
        {
          id: 's5',
          name: 'Campaign Send',
          icon: Mail,
          description: 'Send birthday pre-celebration email',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: 'Birthday email sent',
        },
      ],
    },
    {
      id: 'test-26',
      category: 'Automations & Triggers',
      name: 'Tier Downgrade Automation',
      description: 'Trigger notification when customer is downgraded from Gold to Silver',
      status: 'not-run',
      payload: {
        customerId: 'CUST-24242',
        currentTier: 'Gold',
        newTier: 'Silver',
        pointsBalance: 3500,
        tierThreshold: 5000,
        tierChangeType: 'downgrade',
      },
      expectedOutcome: {
        tierChange: 'Silver',
        campaignsTriggered: ['Tier Downgrade Retention'],
        signalsTriggered: ['Tier Downgrade Alert'],
        success: true,
        message: 'Tier downgraded: Gold → Silver. Retention campaign triggered to re-engage customer',
      },
      steps: [
        {
          id: 's1',
          name: 'Tier Evaluation',
          icon: Star,
          description: 'Evaluate tier status',
          configSource: 'Screen 6: Redemption & Rewards',
          status: 'pending',
          inputValue: '3500 points (Gold requires 5000)',
          outputValue: 'Below Gold threshold',
        },
        {
          id: 's2',
          name: 'Tier Adjustment',
          icon: TrendingUp,
          description: 'Downgrade to Silver tier',
          configSource: 'Screen 6: Redemption & Rewards',
          status: 'pending',
          outputValue: 'Gold → Silver',
        },
        {
          id: 's3',
          name: 'Automation Trigger',
          icon: Zap,
          description: 'Trigger downgrade automation',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: 'Downgrade automation activated',
        },
        {
          id: 's4',
          name: 'Retention Campaign',
          icon: Megaphone,
          description: 'Activate retention campaign',
          configSource: 'Screen 10: Campaign Templates',
          status: 'pending',
          outputValue: 'Tier Downgrade Retention',
        },
        {
          id: 's5',
          name: 'Alert Notification',
          icon: AlertCircle,
          description: 'Send tier change notification',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: 'Email + App notification sent',
        },
      ],
    },
    {
      id: 'test-27',
      category: 'Automations & Triggers',
      name: 'Multi-Action Workflow (Email + SMS + Points)',
      description: 'Execute complex automation with multiple sequential actions',
      status: 'not-run',
      payload: {
        customerId: 'CUST-25252',
        triggerEvent: 'Segment transition to VIP',
        fromSegment: 'Champions',
        toSegment: 'VIP High Value',
        actions: ['email', 'sms', 'points', 'tag'],
      },
      expectedOutcome: {
        campaignsTriggered: ['VIP Welcome Package'],
        pointsEarned: 1000,
        newBalance: 6500,
        success: true,
        message: 'VIP upgrade complete: Welcome email sent, SMS sent, 1000 bonus points, VIP tag added',
      },
      steps: [
        {
          id: 's1',
          name: 'Segment Transition',
          icon: Users,
          description: 'Detect segment change',
          configSource: 'Screen 7: Customer Segmentation',
          status: 'pending',
          outputValue: 'Champions → VIP High Value',
        },
        {
          id: 's2',
          name: 'Action 1: Email',
          icon: Mail,
          description: 'Send VIP welcome email',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: 'VIP Welcome email sent',
        },
        {
          id: 's3',
          name: 'Action 2: SMS',
          icon: MessageSquare,
          description: 'Send VIP welcome SMS',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: 'SMS sent to mobile',
        },
        {
          id: 's4',
          name: 'Action 3: Points',
          icon: Gift,
          description: 'Award 1000 VIP bonus points',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          inputValue: '5500 points',
          outputValue: '6500 points (+1000)',
        },
        {
          id: 's5',
          name: 'Action 4: Tag',
          icon: Award,
          description: 'Add VIP customer tag',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: 'Tag added: VIP',
        },
      ],
    },
    {
      id: 'test-28',
      category: 'Advanced Features',
      name: 'RFM Segmentation Scoring',
      description: 'Calculate RFM scores and assign customer to appropriate segment',
      status: 'not-run',
      payload: {
        customerId: 'CUST-26262',
        recencyDays: 5,
        frequencyCount: 18,
        monetaryValue: 2500,
        evaluationPeriod: '90 days',
      },
      expectedOutcome: {
        signalsTriggered: ['High-Value Customer Identified'],
        success: true,
        message: 'RFM Analysis: R=5, F=5, M=4 → Assigned to "Champions" segment (high engagement + high value)',
      },
      steps: [
        {
          id: 's1',
          name: 'Data Collection',
          icon: BarChart3,
          description: 'Collect customer transaction data (90 days)',
          configSource: 'Screen 7: Customer Segmentation',
          status: 'pending',
          outputValue: 'Last purchase: 5 days ago, 18 purchases, $2,500 spent',
        },
        {
          id: 's2',
          name: 'Recency Score',
          icon: Clock,
          description: 'Calculate recency score (1-5)',
          configSource: 'Screen 7: Customer Segmentation',
          status: 'pending',
          inputValue: '5 days since purchase',
          outputValue: 'R=5 (Very Recent)',
        },
        {
          id: 's3',
          name: 'Frequency Score',
          icon: TrendingUp,
          description: 'Calculate frequency score (1-5)',
          configSource: 'Screen 7: Customer Segmentation',
          status: 'pending',
          inputValue: '18 purchases in 90 days',
          outputValue: 'F=5 (Very Frequent)',
        },
        {
          id: 's4',
          name: 'Monetary Score',
          icon: DollarSign,
          description: 'Calculate monetary value score (1-5)',
          configSource: 'Screen 7: Customer Segmentation',
          status: 'pending',
          inputValue: '$2,500 total value',
          outputValue: 'M=4 (High Value)',
        },
        {
          id: 's5',
          name: 'Segment Assignment',
          icon: Users,
          description: 'Assign to RFM segment',
          configSource: 'Screen 7: Customer Segmentation',
          status: 'pending',
          inputValue: 'RFM: 554',
          outputValue: 'CHAMPIONS segment',
        },
        {
          id: 's6',
          name: 'Signal Generation',
          icon: AlertCircle,
          description: 'Generate high-value customer signal',
          configSource: 'Screen 11: Queue Intelligence',
          status: 'pending',
          outputValue: 'High-Value Customer Identified',
        },
      ],
    },
    {
      id: 'test-29',
      category: 'Advanced Features',
      name: 'Campaign Budget Limit Enforcement',
      description: 'Block campaign activation when monthly budget is exhausted',
      status: 'not-run',
      payload: {
        customerId: 'CUST-27272',
        campaignId: 'PROMO-FALL-2025',
        campaignBudget: 10000,
        budgetSpent: 9950,
        discountAmount: 100,
        budgetPeriod: 'monthly',
      },
      editableFields: [
        {
          key: 'budgetSpent',
          label: 'Budget Already Spent ($)',
          type: 'number',
          passingValue: 9000,
          failingValue: 9950,
          helpText: 'Budget is $10,000. Spent + discount ($100) must be ≤ $10,000.',
        },
      ],
      expectedOutcome: {
        campaignsTriggered: [],
        safeguardsPassed: false,
        success: false,
        message: 'Campaign blocked: Monthly budget exhausted ($9,950/$10,000). Remaining budget ($50) insufficient for $100 discount.',
      },
      steps: [
        {
          id: 's1',
          name: 'Campaign Eligibility',
          icon: Megaphone,
          description: 'Customer qualifies for Fall promo',
          configSource: 'Screen 10: Campaign Templates',
          status: 'pending',
          outputValue: 'PROMO-FALL-2025 eligible',
        },
        {
          id: 's2',
          name: 'Budget Check',
          icon: DollarSign,
          description: 'Check campaign budget status',
          configSource: 'Screen 10: Campaign Templates',
          status: 'pending',
          inputValue: 'Budget: $9,950 / $10,000',
          outputValue: 'Remaining: $50',
        },
        {
          id: 's3',
          name: 'Discount Validation',
          icon: Shield,
          description: 'Verify budget sufficient for discount',
          configSource: 'Screen 10: Campaign Templates',
          status: 'pending',
          inputValue: 'Discount: $100',
          outputValue: 'INSUFFICIENT ($50 < $100)',
        },
        {
          id: 's4',
          name: 'Budget Limit Enforcement',
          icon: XCircle,
          description: 'Block campaign due to budget limit',
          configSource: 'Screen 10: Campaign Templates',
          status: 'pending',
          outputValue: 'BLOCKED - Budget exhausted',
        },
        {
          id: 's5',
          name: 'Ops Alert',
          icon: AlertCircle,
          description: 'Alert operations team',
          configSource: 'Screen 11: Queue Intelligence',
          status: 'pending',
          outputValue: 'Budget alert sent to ops team',
        },
      ],
    },
    {
      id: 'test-30',
      category: 'Advanced Features',
      name: 'Comparative Queue Signal (Store Underperformance)',
      description: 'Detect store underperformance vs peer average and trigger alert',
      status: 'not-run',
      payload: {
        storeId: 'STORE-042',
        storeRevenue: 12000,
        peerAverageRevenue: 18000,
        comparisonPeriod: '30 days',
        thresholdVariance: '-20%',
        actualVariance: '-33%',
      },
      expectedOutcome: {
        signalsTriggered: ['Store Underperformance Alert'],
        success: true,
        message: 'Store #042 underperforming: $12K vs peer avg $18K (-33%). Alert sent to regional manager.',
      },
      steps: [
        {
          id: 's1',
          name: 'Performance Analysis',
          icon: BarChart3,
          description: 'Analyze store performance (30 days)',
          configSource: 'Screen 11: Queue Intelligence',
          status: 'pending',
          outputValue: 'Store #042: $12,000 revenue',
        },
        {
          id: 's2',
          name: 'Peer Comparison',
          icon: TrendingUp,
          description: 'Compare to peer store average',
          configSource: 'Screen 11: Queue Intelligence',
          status: 'pending',
          inputValue: 'Peer avg: $18,000',
          outputValue: 'Variance: -$6,000 (-33%)',
        },
        {
          id: 's3',
          name: 'Threshold Evaluation',
          icon: Target,
          description: 'Check against -20% threshold',
          configSource: 'Screen 11: Queue Intelligence',
          status: 'pending',
          inputValue: 'Actual: -33%',
          outputValue: 'THRESHOLD EXCEEDED (-33% < -20%)',
        },
        {
          id: 's4',
          name: 'Signal Generation',
          icon: AlertCircle,
          description: 'Generate underperformance signal',
          configSource: 'Screen 11: Queue Intelligence',
          status: 'pending',
          outputValue: 'Store Underperformance Alert',
        },
        {
          id: 's5',
          name: 'Alert Routing',
          icon: Mail,
          description: 'Route to regional manager queue',
          configSource: 'Screen 11: Queue Intelligence',
          status: 'pending',
          outputValue: 'Alert → Regional Manager (Priority: High)',
        },
      ],
    },
    {
      id: 'test-31',
      category: 'Advanced Features',
      name: 'Queue Priority Escalation (VIP Churn Risk)',
      description: 'Escalate high-value customer churn risk to priority queue',
      status: 'not-run',
      payload: {
        customerId: 'CUST-28282',
        currentSegment: 'Champions',
        lifetimeValue: 15000,
        inactiveDays: 45,
        churnRiskScore: 0.82,
        churnThreshold: 0.70,
        queuePriority: 'critical',
      },
      expectedOutcome: {
        signalsTriggered: ['VIP Churn Risk - Critical'],
        campaignsTriggered: ['Executive Concierge Outreach'],
        success: true,
        message: 'High-value customer at risk: $15K LTV, 45 days inactive, 82% churn probability. Escalated to VIP retention team.',
      },
      steps: [
        {
          id: 's1',
          name: 'Churn Prediction',
          icon: BarChart3,
          description: 'Calculate churn risk score',
          configSource: 'Screen 7: Customer Segmentation',
          status: 'pending',
          inputValue: 'LTV: $15K, Inactive: 45d',
          outputValue: 'Churn risk: 82%',
        },
        {
          id: 's2',
          name: 'Risk Assessment',
          icon: AlertTriangle,
          description: 'Evaluate against 70% threshold',
          configSource: 'Screen 11: Queue Intelligence',
          status: 'pending',
          inputValue: 'Risk: 82%',
          outputValue: 'CRITICAL (82% > 70%)',
        },
        {
          id: 's3',
          name: 'Customer Value Check',
          icon: DollarSign,
          description: 'Verify high-value status ($10K+ LTV)',
          configSource: 'Screen 7: Customer Segmentation',
          status: 'pending',
          inputValue: '$15,000 LTV',
          outputValue: 'VIP tier ($15K > $10K)',
        },
        {
          id: 's4',
          name: 'Priority Escalation',
          icon: Target,
          description: 'Escalate to critical priority queue',
          configSource: 'Screen 11: Queue Intelligence',
          status: 'pending',
          outputValue: 'ESCALATED → VIP Retention Team',
        },
        {
          id: 's5',
          name: 'Concierge Automation',
          icon: Megaphone,
          description: 'Trigger executive outreach campaign',
          configSource: 'Screen 8: Automations & Triggers',
          status: 'pending',
          outputValue: 'Executive Concierge Outreach',
        },
        {
          id: 's6',
          name: 'Team Notification',
          icon: Mail,
          description: 'Notify VIP retention specialist',
          configSource: 'Screen 11: Queue Intelligence',
          status: 'pending',
          outputValue: 'Alert sent to VIP team + CRM',
        },
      ],
    },
  ];

  const selectedScenario = testScenarios.find((t) => t.id === selectedTest);

  // Helper function to determine if test should fail based on edited or default values
  const shouldTestFail = (scenario: TestScenario): boolean => {
    if (!scenario.editableFields || scenario.editableFields.length === 0) {
      // No editable fields, use original fail logic
      return ['test-6', 'test-9', 'test-10', 'test-11', 'test-12', 'test-13', 'test-20', 'test-29'].includes(scenario.id);
    }

    // Check editable fields to determine pass/fail
    for (const field of scenario.editableFields) {
      const currentValue = editedPayload[scenario.id]?.[field.key] ?? scenario.payload[field.key];

      // Test-specific logic
      if (scenario.id === 'test-6' && field.key === 'velocityCount') {
        return currentValue > 3; // Fails if > 3 transactions
      }
      if (scenario.id === 'test-9' && field.key === 'daysSinceLastWinBack') {
        return currentValue < 90; // Fails if < 90 days
      }
      if (scenario.id === 'test-10' && field.key === 'winBackOffersThisYear') {
        return currentValue >= 3; // Fails if >= 3 offers
      }
      if (scenario.id === 'test-20' && field.key === 'pointsToRedeem') {
        return currentValue < 100; // Fails if < 100 points
      }
      if (scenario.id === 'test-29' && field.key === 'budgetSpent') {
        return (currentValue + 100) > 10000; // Fails if spent + discount > budget
      }
    }

    return false;
  };

  const runTest = async () => {
    if (!selectedScenario) return;

    setIsRunning(true);
    setCurrentStepIndex(-1);

    const testShouldFail = shouldTestFail(selectedScenario);

    // Simulate step-by-step execution
    for (let i = 0; i < selectedScenario.steps.length; i++) {
      setCurrentStepIndex(i);

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Determine which step should fail (usually the validation step)
      let shouldFailAtThisStep = false;

      if (testShouldFail) {
        if (selectedScenario.id === 'test-6' && i === 3) shouldFailAtThisStep = true;
        else if (selectedScenario.id === 'test-9' && i === 2) shouldFailAtThisStep = true;
        else if (selectedScenario.id === 'test-10' && i === 2) shouldFailAtThisStep = true;
        else if (selectedScenario.id === 'test-11' && i === 3) shouldFailAtThisStep = true;
        else if (selectedScenario.id === 'test-12' && i === 2) shouldFailAtThisStep = true;
        else if (selectedScenario.id === 'test-13' && i === 3) shouldFailAtThisStep = true;
        else if (selectedScenario.id === 'test-20' && i === 2) shouldFailAtThisStep = true;
        else if (selectedScenario.id === 'test-29' && i === 2) shouldFailAtThisStep = true;
      }

      selectedScenario.steps[i].status = shouldFailAtThisStep ? 'fail' : 'pass';
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
      case 'Points & Earning Rules':
        return Coins;
      case 'Redemption & Rewards':
        return Gift;
      case 'Automations & Triggers':
        return Zap;
      case 'Advanced Features':
        return BarChart3;
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
            <Card className="p-5 h-[calc(100vh-280px)] flex flex-col">
              <h2 className="font-bold text-gray-900 mb-4 flex-shrink-0">Test Scenarios</h2>

              <div className="space-y-4 flex-1 overflow-y-auto pr-2">
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
          <div className="col-span-8 h-[calc(100vh-280px)] overflow-y-auto space-y-5 pr-2">
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
                      {selectedScenario.editableFields && selectedScenario.editableFields.length > 0 && (
                        <button
                          onClick={() => setEditMode(!editMode)}
                          className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
                          disabled={isRunning}
                        >
                          <Edit3 size={12} />
                          {editMode ? 'View Mode' : 'Edit Values'}
                        </button>
                      )}
                    </div>

                    {/* Editable Fields Section */}
                    {editMode && selectedScenario.editableFields && selectedScenario.editableFields.length > 0 && (
                      <div className="mb-4 space-y-3">
                        <div className="text-xs text-gray-700 font-medium mb-2">Editable Parameters:</div>
                        {selectedScenario.editableFields.map((field) => {
                          const currentValue = editedPayload[selectedScenario.id]?.[field.key] ?? selectedScenario.payload[field.key];
                          return (
                            <div key={field.key} className="space-y-1">
                              <label className="text-xs font-medium text-gray-700 flex items-center gap-2">
                                {field.label}
                                <span className="text-gray-500 font-normal italic">({field.helpText})</span>
                              </label>
                              <input
                                type={field.type}
                                value={currentValue}
                                onChange={(e) => {
                                  let newValue;
                                  if (field.type === 'number') {
                                    const parsed = parseFloat(e.target.value);
                                    newValue = isNaN(parsed) ? 0 : parsed;
                                  } else {
                                    newValue = e.target.value;
                                  }
                                  setEditedPayload({
                                    ...editedPayload,
                                    [selectedScenario.id]: {
                                      ...editedPayload[selectedScenario.id],
                                      [field.key]: newValue,
                                    },
                                  });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                              />
                              <div className="flex gap-2 text-xs">
                                <button
                                  onClick={() => {
                                    setEditedPayload({
                                      ...editedPayload,
                                      [selectedScenario.id]: {
                                        ...editedPayload[selectedScenario.id],
                                        [field.key]: field.passingValue,
                                      },
                                    });
                                  }}
                                  className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                                >
                                  Set to Pass ({field.passingValue})
                                </button>
                                <button
                                  onClick={() => {
                                    setEditedPayload({
                                      ...editedPayload,
                                      [selectedScenario.id]: {
                                        ...editedPayload[selectedScenario.id],
                                        [field.key]: field.failingValue,
                                      },
                                    });
                                  }}
                                  className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                >
                                  Set to Fail ({field.failingValue})
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        <div className="h-px bg-gray-300 my-3"></div>
                      </div>
                    )}

                    {/* All Payload Fields */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(selectedScenario.payload).map(([key, value]) => {
                        const displayValue = editedPayload[selectedScenario.id]?.[key] ?? value;
                        const isEditable = selectedScenario.editableFields?.some(f => f.key === key);
                        return (
                          <div key={key} className="flex items-center gap-2">
                            <span className="text-gray-600 font-mono">{key}:</span>
                            <span className={`font-semibold font-mono ${isEditable && editedPayload[selectedScenario.id]?.[key] !== undefined ? 'text-brand-600' : 'text-gray-900'}`}>
                              {String(displayValue)}
                            </span>
                          </div>
                        );
                      })}
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
