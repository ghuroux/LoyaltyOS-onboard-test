# Claude Code Starter Prompt - StratOS Loyalty Platform Prototype

## Project Context
I'm building an interactive prototype for StratOS Loyalty - an enterprise loyalty platform that positions itself as an "Operational Intelligence Platform" rather than just a loyalty system. This is for a fintech company (StratGroup) that's creating a distribution-ready platform that partners like Sitecore can implement for their enterprise clients.

The key differentiator is that this is **intelligence-first** - every configuration decision shows what analytics, KPIs, and AI capabilities it enables. The platform uses queue-based operations intelligence to surface insights and automate decisions.

## Current Progress
I have a basic HTML prototype with 3 screens (0, 1, 2) that I'll provide. We need to enhance and extend this into a more sophisticated React-based application that demonstrates the full onboarding flow.

## Key Design Principles
1. **Progressive Disclosure** - Start simple, reveal complexity as needed
2. **Intelligence-First** - Show KPI/analytics impact of every decision in real-time
3. **Template-Based** - Industry templates accelerate setup
4. **Non-Developer Friendly** - Technical details hidden but accessible via "Developer View"
5. **Analytics-Ready by Design** - Every configuration feeds the ML/AI engine

## Technical Requirements
- Build this as a modern React application (or Next.js if you prefer)
- Use Tailwind CSS for styling (keep the purple gradient background theme)
- Make it fully interactive with state management
- Create smooth transitions between screens
- Implement the tab navigation within screens
- Show real-time updates (e.g., KPI counts change as attributes are selected)

## Core Features to Implement

### Screen 0: Business Discovery
- Industry selection (8 options including retail franchise, banking, airlines, etc.)
- Template gallery that appears after industry selection
- Success metrics configuration
- Keep the existing design but enhance interactivity

### Screen 1: Organization Structure (Enhanced)
This screen needs 4 tabs:
1. **Organization Structure** - Template-based hierarchy with editable names
2. **Customer Structure** - Separate hierarchy for customer relationships & family pooling
3. **Entity Configuration** - Configure attributes per entity with KPI impact
4. **API Configuration** - Hidden by default, shown via "Developer View" button

Key feature: **Real-time KPI Dashboard** that updates as attributes are selected/deselected

### Screen 2: Value Mechanisms
- Points, cashback, credits, or hybrid selection
- Configuration forms that adapt based on selection
- Advanced options for pooling, transfers, etc.

### Additional Screens to Build (3-11)
I'll provide specifications for these. Key screens include:
- Screen 3: Customer Segmentation (RFM for retail, miles for airlines, etc.)
- Screen 4: Earning Rules (with SKU-level configuration)
- Screen 5: Redemption Rules
- Screen 6: Campaign Framework (outcome-based campaigns)
- Screen 7: Queue Intelligence Configuration
- Screen 8: Data Strategy & ETL
- Screen 9: Integration Setup
- Screen 10: Analytics & KPI Configuration  
- Screen 11: Flow Orchestration Builder (drag-and-drop canvas)
- Screen 12: Deployment Strategy

## Special Requirements

### Intelligence Features
- When users check/uncheck attributes, show the KPI impact immediately
- Display running totals of available KPIs, Analytics, and AI features
- Show which specific KPIs are enabled (e.g., "Sales per Square Foot" only shows if Square Footage attribute is selected)

### Queue-Based Intelligence (Screen 7)
This is the key differentiator. Implement queues for:
- Customer Intelligence (churn detection, LTV changes)
- Store Performance (anomalies, opportunities)
- Campaign Intelligence (optimization suggestions)
- Fraud & Risk Detection

### Flow Builder (Screen 11)
Create a visual drag-and-drop interface where users can:
- Design custom business processes
- Connect triggers, actions, and decisions
- Generate API endpoints automatically
- This should feel like a simplified version of Zapier/n8n

## Data Structure
Create a proper data model that tracks:
- Selected industry and template
- Organization hierarchy configuration
- Entity attributes and their KPI mappings
- Value mechanism settings
- All configuration choices

## Deliverables
1. Fully interactive React application
2. All 12 screens implemented with smooth navigation
3. Real-time KPI tracking and intelligence features
4. Responsive design (desktop-first, tablet compatible)
5. Clean, maintainable code structure
6. Mock API integration points (show where real APIs would connect)

## Style Guide
- Primary: #1E3A8A (Deep blue)
- Secondary: #10B981 (Green)
- Accent: #F59E0B (Amber)
- Purple gradient background (keep from existing design)
- Modern fintech aesthetic with subtle shadows and smooth transitions

## Next Steps
1. Convert the existing HTML to React components
2. Implement proper state management
3. Add the remaining screens
4. Enhance interactivity and animations
5. Add the flow builder canvas for Screen 11

Please start by setting up the React project structure and converting the existing screens, then we'll iteratively add the remaining functionality. Focus on making the intelligence features really shine - when users configure the platform, they should immediately see the value in terms of analytics and automation capabilities.

The goal is to create a prototype that makes distribution partners (like Sitecore) excited about selling this as an intelligence platform that happens to start with loyalty, not just another loyalty program.