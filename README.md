# StratOS Loyalty Platform - Interactive React Prototype

An enterprise loyalty platform prototype that positions itself as an **"Operational Intelligence Platform"** rather than just a loyalty system. Built for StratGroup as a distribution-ready platform for partners like Sitecore to white-label for enterprise clients.

## 🎯 Overview

This interactive prototype demonstrates a comprehensive 13-screen onboarding flow that showcases the platform's intelligence-first approach. Every configuration decision immediately shows what analytics, KPIs, and AI capabilities it enables.

### Key Differentiator: Queue-Based Intelligence

The platform uses queue-based operational intelligence to surface insights and automate decisions - moving beyond simple loyalty mechanics to full business intelligence.

## ✨ Features

### Intelligence-First Design
- **Real-time KPI Calculation** - See analytics impact as you configure attributes
- **Progressive Disclosure** - Start simple, reveal complexity as needed
- **Template-Based Setup** - Industry-specific templates accelerate configuration
- **Queue Intelligence** - Automated operational decision-making

### All 13 Screens Implemented

1. **Business Discovery** - Industry and template selection with success metrics
2. **Organization Structure** - 4 tabs including entity configuration with live KPI tracking
3. **Value Mechanisms** - Points, cashback, credits, or hybrid configuration
4. **Customer Segmentation** - Tier-based and AI-driven behavioral segments
5. **Earning Rules** - Base rules, category multipliers, behavioral bonuses
6. **Redemption Rules** - Multiple redemption types with AI optimization
7. **Campaign Framework** - Outcome-based campaigns with progressive automation
8. **Queue Intelligence** ⭐ - 4 operational queues (Customer, Store, Campaign, Fraud)
9. **Data Strategy** - ETL configuration with learning timeline visualization
10. **Integrations** - POS, payment gateways, communication systems
11. **Analytics & KPIs** - Dynamic KPI selection with dashboard designer
12. **Flow Orchestration** - Drag-and-drop visual flow builder (like Zapier/n8n)
13. **Deployment** - Rollout strategy and intelligence activation settings

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Navigate to the project directory
cd loyalty-platform

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server

Once running, open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management
- **Framer Motion** - Smooth animations
- **React Flow** - Flow builder for Screen 11
- **Lucide React** - Icon library

## 📁 Project Structure

```
loyalty-platform/
├── src/
│   ├── components/
│   │   ├── layout/           # Header, Footer, ProgressBar
│   │   ├── screens/          # All 13 screen components
│   │   └── ui/               # Reusable UI components
│   ├── store/
│   │   └── onboardingStore.ts # Zustand state management
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
└── package.json
```

## 🎨 Design Principles

1. **Progressive Disclosure** - Start simple, reveal complexity as needed
2. **Intelligence-First** - Show KPI/analytics impact of every decision in real-time
3. **Template-Based** - Industry templates accelerate setup
4. **Non-Developer Friendly** - Technical details hidden but accessible via "Developer View"
5. **Analytics-Ready by Design** - Every configuration feeds the ML/AI engine

## 🔧 Key Components

### State Management (Zustand)

The app uses Zustand for lightweight, performant state management:

```typescript
const { currentScreen, nextScreen, previousScreen, kpiCounts } = useOnboardingStore();
```

### Real-time KPI Tracking

As users select/deselect entity attributes, the system immediately calculates and displays:
- Total KPIs available
- Analytics features enabled
- AI capabilities unlocked

### Queue Intelligence

Four operational intelligence queues:
- **Customer Intelligence** - Churn detection, LTV changes, behavior anomalies
- **Store Performance** - Comparative analysis, anomaly detection
- **Campaign Intelligence** - Performance optimization, conflict detection
- **Fraud & Risk** - Unusual patterns, velocity checks

## 🎯 For Distribution Partners

This prototype is designed to be:
- **White-labelable** - Easy to rebrand for different partners
- **Industry-Adaptive** - Templates for retail, hospitality, airlines, banking, etc.
- **Intelligence-Focused** - Positions loyalty as an entry point to full BI/automation
- **Demo-Ready** - Impressive flow builder and queue intelligence features

## 📄 License

Proprietary - StratGroup

## 🤝 Contributing

This is a prototype for demonstration purposes. For production implementation or customization, contact StratGroup.

---

Built with ❤️ for StratGroup's enterprise clients
