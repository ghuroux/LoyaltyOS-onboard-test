# Enterprise Loyalty Platform - Interactive Specification

An interactive specification and demonstrator for an enterprise loyalty platform configurator. This tool is designed to act as a **visual specification** for development teams while also serving as a compelling demo for channel partners (like Sitecore) who want to offer white-labeled loyalty solutions to their enterprise clients.

## 🎯 Purpose

This repository serves dual purposes:

1. **Product Specification** - A detailed, interactive spec for our product and development teams to understand the vision and build the actual platform
2. **Partner Demonstration** - A compelling demo for distribution partners to visualize the platform's capabilities and intelligence-first approach

> **Note:** This is an interactive prototype/specification, not a production-ready application. It demonstrates the complete user journey and feature set without requiring backend integration.

## ✨ Key Differentiator: Operational Intelligence

Unlike traditional loyalty platforms, this system positions itself as an **Operational Intelligence Platform** that uses loyalty mechanics as the foundation for comprehensive business intelligence:

- **Queue-Based Intelligence** - Automated decision-making through intelligent queues
- **Real-time KPI Impact** - Every configuration choice shows its analytics impact
- **Attribute-to-Insight Mapping** - Data collection directly tied to business intelligence capabilities

## 📋 Complete Flow (16 Screens)

The configurator implements a comprehensive 16-screen onboarding flow:

### Discovery & Setup (Screens 0-3)
0. **Discovery** - Industry selection and template-based quick-start
1. **Dashboard** - Configuration overview with progress tracking and quick navigation
2. **Platform Basics** - Program name, currency, timezone, and core settings
3. **Integrations** - External system connections (POS, CRM, payment gateways)

### Structure & Value (Screens 4-6)
4. **Organization & Customer Structure** - Multi-level business hierarchy with real-time KPI tracking
5. **Value & Currency** - Points, cashback, credits, vouchers, or hybrid models with tier management
6. **Redemption & Rewards** - Reward catalog configuration and redemption rules

### Intelligence & Automation (Screens 7-11)
7. **Segmentation** - RFM analysis, demographic segments, or custom ML-powered segmentation
8. **Automations** - Trigger-based workflows for segment transitions, milestones, and lifecycle events
9. **Safeguards** - Anti-gaming controls, communication limits, and override management
10. **Campaigns** - Template-based campaign framework with budget and ROI controls
11. **Intelligence Queues** ⭐ - Four operational queues (Customer, Store Performance, Campaign, Fraud & Risk)

### Infrastructure & Deployment (Screens 12-15)
12. **Analytics & KPIs** - Dynamic KPI selection based on configured attributes with 5 specialized dashboards
13. **Data Strategy** - ETL configuration and data governance
14. **Configuration Testing** ⭐ - Interactive test scenarios to validate all configurations before deployment
15. **Deployment** - Rollout strategy (pilot, phased, big bang)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Navigate to the loyalty-platform directory
cd loyalty-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

Once running, open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first styling with custom design system
- **Zustand** - Lightweight state management (811 lines of comprehensive state)
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Consistent icon system

## 📁 Project Structure

```
loyalty-platform/
├── src/
│   ├── components/
│   │   ├── layout/              # Header, Footer, ProgressBar
│   │   ├── screens/             # 16 screen components (Screen0-15)
│   │   │   ├── Screen0Discovery.tsx
│   │   │   ├── Screen1Dashboard.tsx
│   │   │   ├── Screen2PlatformBasics.tsx
│   │   │   └── ... (Screen3-15)
│   │   ├── ui/                  # Card, Button, Modal, Toggle
│   │   └── campaign/            # CampaignTemplateBuilder
│   ├── store/
│   │   └── onboardingStore.ts   # Zustand state (comprehensive data models)
│   ├── App.tsx                  # Main routing and screen management
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles & Tailwind config
└── package.json
```

## 🎨 Design Principles

1. **Intelligence-First** - Every configuration decision shows real-time KPI and analytics impact
2. **Progressive Disclosure** - Start simple, reveal complexity as users need it
3. **Template-Driven** - Industry-specific templates accelerate initial configuration
4. **Operator-Focused** - Built for business analysts and administrators (internal staff and channel partners)
5. **Specification-Grade Detail** - Rich enough to serve as development spec, polished enough for demos

## 🔑 Standout Features

### 1. Real-time KPI Tracking (Screen 4)
As users configure entity attributes, the system dynamically calculates:
- **Total KPIs** available based on selected attributes
- **Analytics features** enabled by the configuration
- **AI capabilities** unlocked by data collection choices

Example: Adding "Square Footage" attribute enables "Sales per Sq Ft", "Space Utilization", and "Heat Mapping" analytics.

### 2. Queue-Based Intelligence (Screen 11)
Four intelligent operational queues that differentiate the platform:

- **Customer Intelligence Queue** - Churn risk, LTV changes, behavior anomalies, segment transitions
- **Store Performance Queue** - Comparative analysis, anomaly detection, opportunity identification
- **Campaign Intelligence Queue** - Performance monitoring, auto-optimization, conflict detection
- **Fraud & Risk Queue** - Pattern detection, velocity checks, geographic anomalies

### 3. Comprehensive Earning Rules (Screen 5)
Sophisticated multi-dimensional earning configurations:
- Base rates with category multipliers
- Threshold-based earning (for credits/vouchers)
- SKU-level tracking (punch card mechanics)
- Behavioral bonuses (frequency, thresholds, birthdays, first purchase)
- Tier-specific overrides

### 4. Configuration Testing & Validation (Screen 14)
Interactive testing system with 31 comprehensive test scenarios across 9 categories:
- **Editable Test Parameters** - Modify values to experiment with pass/fail conditions (5 tests have interactive parameters)
- **Real-time Flow Visualization** - Watch each configuration step execute with input/output values
- **Dynamic Test Results** - Results update based on edited parameter values (tests flip from red to green)
- **Comprehensive Coverage** - Tests validate all configurations from screens 2-13
- **9 Test Categories**: Member Lifecycle, Transaction Processing, Campaign Execution, Safeguards & Fraud, Tier & Status, Points & Earning Rules, Redemption & Rewards, Automations & Triggers, Advanced Features

Example: Edit "Transactions in 10min" from 4 to 3 on the Velocity Limit test, and watch it flip from FAIL (red) to PASS (green).

## 💾 State Management

The application uses Zustand with a comprehensive 811-line state store including:

```typescript
interface OnboardingState {
  // Navigation
  currentScreen: number;

  // Business Context
  selectedIndustry: string;
  selectedTemplate: Template;

  // Organization (Screen 4)
  organizationHierarchy: HierarchyLevel[];
  customerHierarchy: HierarchyLevel[];
  entityAttributes: AttributeConfig;
  kpiCounts: { total, analytics, ai };

  // Value & Rewards (Screens 5-6)
  valueType: 'points' | 'cashback' | 'credits' | 'vouchers' | 'hybrid';
  valueConfig: ValueConfig;
  tiers: Tier[];
  earningRules: EarningRules;
  redemptionRules: any;

  // Intelligence (Screens 7-11)
  segmentationMethod: 'rfm' | 'demographic' | 'custom';
  segments: Segment[];
  automations: Automation[];
  safeguardSettings: SafeguardSettings;
  campaignSettings: CampaignSettings;
  queues: Queue[];

  // Infrastructure (Screens 12-15)
  integrations: Integration[];
  flowDesigns: FlowDesign[];
  deploymentStrategy: string;
}
```

All state is local (no backend) - perfect for demonstration and specification purposes.

## 🎯 For Distribution Partners

This configurator is designed to be:

- **White-labelable** - Easy to rebrand for different channel partners
- **Industry-Adaptive** - Templates for retail, hospitality, airlines, banking, telecom, and more
- **Intelligence-Focused** - Positions loyalty as an entry point to comprehensive BI/automation
- **Demo-Ready** - Polished UI with impressive features (interactive configuration testing, queue intelligence, real-time KPI tracking)
- **Specification-Complete** - Detailed enough for partners to understand implementation requirements

### Target Distribution Partners
- **CMS/DXP Platforms** - Sitecore, Adobe, etc.
- **E-commerce Platforms** - Shopify Plus, commercetools, etc.
- **System Integrators** - Accenture, Deloitte Digital, etc.
- **POS Vendors** - Toast, Square, Lightspeed, etc.

## 🛠️ For Development Teams

### Using This as a Specification

This repository demonstrates:

1. **Complete data models** - See `src/store/onboardingStore.ts` for comprehensive TypeScript interfaces
2. **User flows** - 16 screens show the complete configuration journey
3. **Feature interactions** - How different configurations affect each other (e.g., value type affects earning rules)
4. **UI/UX patterns** - Progressive disclosure, modal interactions, form validation approaches
5. **Business logic** - Tier systems, earning calculations, segment definitions, queue configurations

### What's Intentionally Missing

Since this is a specification/demo tool, it intentionally does not include:

- Backend API integration (all state is local)
- Authentication/authorization
- Data persistence beyond browser session
- Production-grade error handling
- Complete CRUD operations on all entities
- ETL mapping tools
- Real-time collaboration features
- Version control and rollback

These features are documented in the UX specifications but not implemented in this prototype.

## 📄 License

Proprietary - StratGroup

## 🤝 Contact

This is a specification and demonstration tool. For production implementation, white-label partnership opportunities, or customization inquiries, contact StratGroup.

---

**Built for enterprise loyalty at scale** | StratGroup © 2025
