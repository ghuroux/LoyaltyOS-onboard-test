import { create } from 'zustand';

export interface KPIMapping {
  kpis: number;
  analytics: number;
  ai: number;
}

export interface AttributeConfig {
  [key: string]: {
    enabled: boolean;
    kpiMapping?: KPIMapping;
  };
}

export interface HierarchyLevel {
  id: string;
  name: string;
  displayName: string;
  description: string;
  enabled: boolean;
  required?: boolean;
}

export interface Template {
  name: string;
  badge: string;
  description: string;
}

export interface Queue {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  patterns: string[];
  actions: string[];
  threshold?: number;
}

export interface Tier {
  id: string;
  name: string;
  description: string;
  threshold: number;
  color: string;
  benefits: string[];
  earningRules: EarningRules;
}

export interface EarningRules {
  // For continuous earning (points/cashback)
  baseRate: { points: number; spend: number };
  categoryMultipliers: { [category: string]: number };

  // For threshold-based earning (credits/vouchers)
  thresholdEarning?: {
    spendThreshold?: { enabled: boolean; spend: number; reward: number };
    purchaseFrequency?: { enabled: boolean; purchases: number; reward: number };
    periodSpend?: { enabled: boolean; spend: number; period: 'monthly' | 'quarterly' | 'annual'; reward: number };
  };

  behavioralBonuses: {
    frequencyBonus?: { enabled: boolean; visits: number; points: number };
    thresholdBonus?: { enabled: boolean; spend: number; points: number };
    birthday?: {
      enabled: boolean;
      rewardType: 'multiplier' | 'points' | 'voucher';
      multiplier?: number;
      points?: number;
      voucherType?: 'sku' | 'value';
      voucherSku?: string;
      voucherValue?: number;
    };
    firstPurchase?: { enabled: boolean; points: number };
  };
}

export interface ValueConfig {
  // Points specific
  pointValue?: number;
  currency?: string;
  expiry?: string;
  minRedemption?: number;
  maxBalance?: number | null;

  // Cashback specific
  cashbackPercentage?: number;
  cashbackCap?: number | null;

  // Credits specific (wallet-based, partial redemption)
  creditMinRedemption?: number;
  creditMaxBalance?: number | null;
  creditExpiry?: string;
  allowPartialRedemption?: boolean;

  // Vouchers specific (one-time use, fixed denominations)
  voucherDenominations?: number[];
  voucherExpiry?: string;
  voucherStackable?: boolean;

  // Common options
  allowFractional?: boolean;
  enablePooling?: boolean;
  allowTransfers?: boolean;
  enablePurchase?: boolean;
  differentBurnRate?: boolean;
}

interface OnboardingState {
  currentScreen: number;
  selectedIndustry: string | null;
  selectedTemplate: Template | null;
  organizationHierarchy: HierarchyLevel[];
  customerHierarchy: HierarchyLevel[];
  selectedEntity: string;
  entityAttributes: AttributeConfig;
  kpiCounts: {
    total: number;
    analytics: number;
    ai: number;
  };
  valueType: string;
  valueConfig: ValueConfig;
  useTiers: boolean;
  segmentationApproach: string;
  tiers: Tier[];
  earningRules: EarningRules;
  redemptionRules: any;
  campaignSettings: any;
  queues: Queue[];
  integrations: any[];
  flowDesigns: any[];
  deploymentStrategy: string;

  // Actions
  setCurrentScreen: (screen: number) => void;
  setIndustry: (industry: string) => void;
  setTemplate: (template: Template | null) => void;
  updateHierarchyLevel: (id: string, updates: Partial<HierarchyLevel>) => void;
  addCustomHierarchyLevel: (name: string, description: string) => void;
  reorderHierarchyLevel: (id: string, direction: 'up' | 'down') => void;
  updateCustomerHierarchyLevel: (id: string, updates: Partial<HierarchyLevel>) => void;
  addCustomerType: (name: string, description: string) => void;
  setSelectedEntity: (entity: string) => void;
  updateEntityAttribute: (attribute: string, enabled: boolean) => void;
  addCustomAttribute: (entity: string, name: string, type: string) => void;
  recalculateKPIs: () => void;
  setValueType: (type: string) => void;
  updateValueConfig: (config: Partial<ValueConfig>) => void;
  setUseTiers: (useTiers: boolean) => void;
  addTier: (tier: Tier) => void;
  updateTier: (id: string, updates: Partial<Tier>) => void;
  removeTier: (id: string) => void;
  updateEarningRules: (rules: Partial<EarningRules>) => void;
  setSegmentationApproach: (approach: string) => void;
  updateQueue: (id: string, updates: Partial<Queue>) => void;
  nextScreen: () => void;
  previousScreen: () => void;
}

const initialOrgHierarchy: HierarchyLevel[] = [
  { id: 'corporate', name: 'Franchisor HQ', displayName: 'Franchisor HQ', description: 'Top-level organization entity', enabled: true, required: true },
  { id: 'master', name: 'Master Franchisee', displayName: 'Master Franchisee', description: 'Multi-unit franchise operators', enabled: false },
  { id: 'franchisee', name: 'Franchisee', displayName: 'Franchisee', description: 'Individual franchise owners', enabled: true },
  { id: 'store', name: 'Store Location', displayName: 'Store Location', description: 'Physical store locations', enabled: true },
  { id: 'department', name: 'Department', displayName: 'Department', description: 'Store departments or teams', enabled: false },
];

const initialCustomerHierarchy: HierarchyLevel[] = [
  { id: 'primary', name: 'Primary Member', displayName: 'Primary Member', description: 'Account holder', enabled: true, required: true },
  { id: 'family', name: 'Family Members', displayName: 'Family Members', description: 'Linked family accounts', enabled: false },
  { id: 'corporate_account', name: 'Corporate Account', displayName: 'Corporate Account', description: 'B2B parent account', enabled: false },
];

const initialQueues: Queue[] = [
  {
    id: 'customer_intelligence',
    name: 'Customer Intelligence Queue',
    description: 'Monitors customer behavior, churn risk, and LTV changes',
    enabled: true,
    patterns: ['Churn risk signals', 'LTV changes', 'Behavior anomalies', 'Segment transitions'],
    actions: ['Send targeted campaigns', 'Alert account manager', 'Adjust rewards'],
  },
  {
    id: 'store_performance',
    name: 'Store Performance Queue',
    description: 'Tracks store comparisons and identifies opportunities',
    enabled: true,
    patterns: ['Comparative analysis', 'Anomaly detection', 'Opportunity identification'],
    actions: ['Generate reports', 'Notify managers', 'Suggest optimizations'],
  },
  {
    id: 'campaign_intelligence',
    name: 'Campaign Intelligence Queue',
    description: 'Optimizes campaign performance in real-time',
    enabled: true,
    patterns: ['Performance monitoring', 'Optimization opportunities', 'Conflict detection'],
    actions: ['Auto-adjust budgets', 'Pause underperforming', 'A/B test variants'],
  },
  {
    id: 'fraud_risk',
    name: 'Fraud & Risk Queue',
    description: 'Detects unusual patterns and potential fraud',
    enabled: true,
    patterns: ['Unusual patterns', 'Velocity checks', 'Geographic anomalies'],
    actions: ['Flag for review', 'Temporary suspend', 'Request verification'],
  },
];

const kpiMappings: { [key: string]: KPIMapping } = {
  // Store-specific
  'Square Footage': { kpis: 3, analytics: 2, ai: 1 },
  'Operating Hours': { kpis: 2, analytics: 1, ai: 1 },
  'Store Format/Type': { kpis: 1, analytics: 1, ai: 0 },
  'Seating Capacity': { kpis: 2, analytics: 1, ai: 1 },
  'Staff Count': { kpis: 3, analytics: 2, ai: 1 },
  'Address & Location': { kpis: 2, analytics: 1, ai: 1 },
  'Drive-Thru': { kpis: 2, analytics: 1, ai: 1 },
  'Parking Spaces': { kpis: 1, analytics: 1, ai: 0 },

  // Corporate/Organization specific
  'Region': { kpis: 3, analytics: 2, ai: 1 },
  'Number of Locations': { kpis: 3, analytics: 2, ai: 2 },
  'Territory Size': { kpis: 2, analytics: 1, ai: 1 },
  'Support Center': { kpis: 1, analytics: 1, ai: 0 },
  'Years in Operation': { kpis: 2, analytics: 1, ai: 1 },

  // Customer specific
  'Age Group': { kpis: 2, analytics: 2, ai: 1 },
  'Income Bracket': { kpis: 2, analytics: 2, ai: 1 },
  'Household Size': { kpis: 1, analytics: 1, ai: 1 },
  'Communication Preferences': { kpis: 1, analytics: 1, ai: 0 },
  'Device Type': { kpis: 1, analytics: 1, ai: 1 },
  'Social Media Presence': { kpis: 1, analytics: 1, ai: 1 },
};

// Entity-specific attribute sets
const entityAttributeSets: { [key: string]: AttributeConfig } = {
  'corporate': {
    'Corporate ID': { enabled: true },
    'Corporate Name': { enabled: true },
    'Address & Location': { enabled: true, kpiMapping: kpiMappings['Address & Location'] },
    'Region': { enabled: true, kpiMapping: kpiMappings['Region'] },
    'Number of Locations': { enabled: true, kpiMapping: kpiMappings['Number of Locations'] },
    'Support Center': { enabled: false, kpiMapping: kpiMappings['Support Center'] },
    'Years in Operation': { enabled: false, kpiMapping: kpiMappings['Years in Operation'] },
  },
  'master': {
    'Master Franchisee ID': { enabled: true },
    'Master Franchisee Name': { enabled: true },
    'Address & Location': { enabled: true, kpiMapping: kpiMappings['Address & Location'] },
    'Territory Size': { enabled: true, kpiMapping: kpiMappings['Territory Size'] },
    'Number of Locations': { enabled: true, kpiMapping: kpiMappings['Number of Locations'] },
    'Years in Operation': { enabled: false, kpiMapping: kpiMappings['Years in Operation'] },
  },
  'franchisee': {
    'Franchisee ID': { enabled: true },
    'Franchisee Name': { enabled: true },
    'Address & Location': { enabled: true, kpiMapping: kpiMappings['Address & Location'] },
    'Number of Locations': { enabled: true, kpiMapping: kpiMappings['Number of Locations'] },
    'Years in Operation': { enabled: false, kpiMapping: kpiMappings['Years in Operation'] },
  },
  'store': {
    'Store ID': { enabled: true },
    'Store Name': { enabled: true },
    'Address & Location': { enabled: true, kpiMapping: kpiMappings['Address & Location'] },
    'Square Footage': { enabled: true, kpiMapping: kpiMappings['Square Footage'] },
    'Operating Hours': { enabled: true, kpiMapping: kpiMappings['Operating Hours'] },
    'Store Format/Type': { enabled: false, kpiMapping: kpiMappings['Store Format/Type'] },
    'Seating Capacity': { enabled: false, kpiMapping: kpiMappings['Seating Capacity'] },
    'Staff Count': { enabled: false, kpiMapping: kpiMappings['Staff Count'] },
    'Drive-Thru': { enabled: false, kpiMapping: kpiMappings['Drive-Thru'] },
    'Parking Spaces': { enabled: false, kpiMapping: kpiMappings['Parking Spaces'] },
  },
  'department': {
    'Department ID': { enabled: true },
    'Department Name': { enabled: true },
    'Staff Count': { enabled: true, kpiMapping: kpiMappings['Staff Count'] },
    'Square Footage': { enabled: false, kpiMapping: kpiMappings['Square Footage'] },
    'Operating Hours': { enabled: false, kpiMapping: kpiMappings['Operating Hours'] },
  },
  'primary': {
    'Member ID': { enabled: true },
    'First Name': { enabled: true },
    'Last Name': { enabled: true },
    'Email': { enabled: true },
    'Phone Number': { enabled: true },
    'Date of Birth': { enabled: true },
    'Address & Location': { enabled: true, kpiMapping: kpiMappings['Address & Location'] },
    'Age Group': { enabled: false, kpiMapping: kpiMappings['Age Group'] },
    'Income Bracket': { enabled: false, kpiMapping: kpiMappings['Income Bracket'] },
    'Household Size': { enabled: false, kpiMapping: kpiMappings['Household Size'] },
    'Communication Preferences': { enabled: false, kpiMapping: kpiMappings['Communication Preferences'] },
    'Device Type': { enabled: false, kpiMapping: kpiMappings['Device Type'] },
    'Social Media Presence': { enabled: false, kpiMapping: kpiMappings['Social Media Presence'] },
  },
  'family': {
    'Family Member ID': { enabled: true },
    'First Name': { enabled: true },
    'Last Name': { enabled: true },
    'Relationship': { enabled: true },
    'Date of Birth': { enabled: false },
    'Age Group': { enabled: false, kpiMapping: kpiMappings['Age Group'] },
  },
  'corporate_account': {
    'Corporate Account ID': { enabled: true },
    'Company Name': { enabled: true },
    'Address & Location': { enabled: true, kpiMapping: kpiMappings['Address & Location'] },
    'Industry': { enabled: true },
    'Number of Employees': { enabled: true, kpiMapping: kpiMappings['Number of Locations'] },
    'Annual Spend': { enabled: false },
  },
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  currentScreen: 0,
  selectedIndustry: null,
  selectedTemplate: null,
  organizationHierarchy: initialOrgHierarchy,
  customerHierarchy: initialCustomerHierarchy,
  selectedEntity: 'store',
  entityAttributes: entityAttributeSets['store'],
  kpiCounts: { total: 17, analytics: 9, ai: 6 },
  valueType: 'points',
  valueConfig: {
    pointValue: 0.01,
    currency: 'USD',
    expiry: 'never',
    minRedemption: 100,
    maxBalance: null,
    allowFractional: true,
    enablePooling: false,
    allowTransfers: false,
    enablePurchase: false,
    differentBurnRate: false,
  },
  useTiers: false,
  segmentationApproach: 'hybrid',
  tiers: [],
  earningRules: {
    baseRate: { points: 1, spend: 1 },
    categoryMultipliers: {},
    thresholdEarning: {
      spendThreshold: { enabled: false, spend: 100, reward: 10 },
      purchaseFrequency: { enabled: false, purchases: 5, reward: 25 },
      periodSpend: { enabled: false, spend: 500, period: 'monthly', reward: 50 },
    },
    behavioralBonuses: {
      frequencyBonus: { enabled: false, visits: 3, points: 50 },
      thresholdBonus: { enabled: false, spend: 100, points: 100 },
      birthday: { enabled: false, rewardType: 'multiplier', multiplier: 2, points: 500, voucherType: 'value', voucherValue: 10 },
      firstPurchase: { enabled: false, points: 500 },
    },
  },
  redemptionRules: {},
  campaignSettings: {},
  queues: initialQueues,
  integrations: [],
  flowDesigns: [],
  deploymentStrategy: 'phased',

  setCurrentScreen: (screen) => set({ currentScreen: screen }),

  setIndustry: (industry) => set({ selectedIndustry: industry }),

  setTemplate: (template) => set({ selectedTemplate: template }),

  updateHierarchyLevel: (id, updates) => set((state) => ({
    organizationHierarchy: state.organizationHierarchy.map((level) =>
      level.id === id ? { ...level, ...updates } : level
    ),
  })),

  addCustomHierarchyLevel: (name, description) => set((state) => {
    const newLevel: HierarchyLevel = {
      id: `custom_${Date.now()}`,
      name,
      displayName: name,
      description,
      enabled: true,
    };
    return { organizationHierarchy: [...state.organizationHierarchy, newLevel] };
  }),

  reorderHierarchyLevel: (id, direction) => set((state) => {
    const index = state.organizationHierarchy.findIndex((level) => level.id === id);
    if (index === -1) return state;

    const newHierarchy = [...state.organizationHierarchy];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newHierarchy.length) return state;

    [newHierarchy[index], newHierarchy[targetIndex]] = [newHierarchy[targetIndex], newHierarchy[index]];

    return { organizationHierarchy: newHierarchy };
  }),

  updateCustomerHierarchyLevel: (id, updates) => set((state) => ({
    customerHierarchy: state.customerHierarchy.map((level) =>
      level.id === id ? { ...level, ...updates } : level
    ),
  })),

  addCustomerType: (name, description) => set((state) => {
    const newType: HierarchyLevel = {
      id: `customer_${Date.now()}`,
      name,
      displayName: name,
      description,
      enabled: true,
    };
    return { customerHierarchy: [...state.customerHierarchy, newType] };
  }),

  setSelectedEntity: (entity) => {
    set({
      selectedEntity: entity,
      entityAttributes: entityAttributeSets[entity] || entityAttributeSets['store']
    });
    get().recalculateKPIs();
  },

  updateEntityAttribute: (attribute, enabled) => {
    set((state) => ({
      entityAttributes: {
        ...state.entityAttributes,
        [attribute]: { ...state.entityAttributes[attribute], enabled },
      },
    }));
    get().recalculateKPIs();
  },

  addCustomAttribute: (_entity, name, _type) => {
    set((state) => ({
      entityAttributes: {
        ...state.entityAttributes,
        [name]: { enabled: true },
      },
    }));
    get().recalculateKPIs();
  },

  recalculateKPIs: () => {
    const state = get();
    let total = 10; // Base KPIs
    let analytics = 5;
    let ai = 3;

    Object.entries(state.entityAttributes).forEach(([, value]) => {
      if (value.enabled && value.kpiMapping) {
        total += value.kpiMapping.kpis;
        analytics += value.kpiMapping.analytics;
        ai += value.kpiMapping.ai;
      }
    });

    set({ kpiCounts: { total, analytics, ai } });
  },

  setValueType: (type) => set({ valueType: type }),

  updateValueConfig: (config) => set((state) => ({
    valueConfig: { ...state.valueConfig, ...config },
  })),

  setUseTiers: (useTiers) => set({ useTiers }),

  addTier: (tier) => set((state) => ({
    tiers: [...state.tiers, tier],
  })),

  updateTier: (id, updates) => set((state) => ({
    tiers: state.tiers.map((tier) =>
      tier.id === id ? { ...tier, ...updates } : tier
    ),
  })),

  removeTier: (id) => set((state) => ({
    tiers: state.tiers.filter((tier) => tier.id !== id),
  })),

  updateEarningRules: (rules) => set((state) => ({
    earningRules: {
      ...state.earningRules,
      ...rules,
      behavioralBonuses: {
        ...state.earningRules.behavioralBonuses,
        ...rules.behavioralBonuses,
      },
    },
  })),

  setSegmentationApproach: (approach) => set({ segmentationApproach: approach }),

  updateQueue: (id, updates) => set((state) => ({
    queues: state.queues.map((queue) =>
      queue.id === id ? { ...queue, ...updates } : queue
    ),
  })),

  nextScreen: () => set((state) => ({
    currentScreen: Math.min(state.currentScreen + 1, 12),
  })),

  previousScreen: () => set((state) => ({
    currentScreen: Math.max(state.currentScreen - 1, 0),
  })),
}));
