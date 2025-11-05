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
  implementations: number;
  timeline: string;
  patterns: number;
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
  valueConfig: any;
  segmentationApproach: string;
  tiers: any[];
  earningRules: any;
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
  setSelectedEntity: (entity: string) => void;
  updateEntityAttribute: (attribute: string, enabled: boolean) => void;
  recalculateKPIs: () => void;
  setValueType: (type: string) => void;
  updateValueConfig: (config: any) => void;
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
  'Square Footage': { kpis: 3, analytics: 2, ai: 1 },
  'Operating Hours': { kpis: 2, analytics: 1, ai: 1 },
  'Store Format/Type': { kpis: 1, analytics: 1, ai: 0 },
  'Seating Capacity': { kpis: 2, analytics: 1, ai: 1 },
  'Staff Count': { kpis: 3, analytics: 2, ai: 1 },
  'Address & Location': { kpis: 2, analytics: 1, ai: 1 },
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  currentScreen: 0,
  selectedIndustry: null,
  selectedTemplate: null,
  organizationHierarchy: initialOrgHierarchy,
  customerHierarchy: initialCustomerHierarchy,
  selectedEntity: 'store',
  entityAttributes: {
    'Store ID': { enabled: true },
    'Store Name': { enabled: true },
    'Address & Location': { enabled: true, kpiMapping: kpiMappings['Address & Location'] },
    'Square Footage': { enabled: true, kpiMapping: kpiMappings['Square Footage'] },
    'Operating Hours': { enabled: true, kpiMapping: kpiMappings['Operating Hours'] },
    'Store Format/Type': { enabled: false, kpiMapping: kpiMappings['Store Format/Type'] },
    'Seating Capacity': { enabled: false, kpiMapping: kpiMappings['Seating Capacity'] },
    'Staff Count': { enabled: false, kpiMapping: kpiMappings['Staff Count'] },
  },
  kpiCounts: { total: 17, analytics: 9, ai: 6 },
  valueType: 'points',
  valueConfig: {},
  segmentationApproach: 'hybrid',
  tiers: [],
  earningRules: {},
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

  setSelectedEntity: (entity) => set({ selectedEntity: entity }),

  updateEntityAttribute: (attribute, enabled) => {
    set((state) => ({
      entityAttributes: {
        ...state.entityAttributes,
        [attribute]: { ...state.entityAttributes[attribute], enabled },
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
