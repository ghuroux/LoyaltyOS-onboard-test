# Quick Start Guide for Claude Code

## What You're Building
A React-based prototype for StratOS Loyalty - an enterprise platform that's actually an "Operational Intelligence System" disguised as loyalty. Think of it as Salesforce meets Segment meets Zapier, starting with loyalty.

## Immediate Setup Tasks
```bash
# Create Next.js app with TypeScript and Tailwind
npx create-next-app@latest stratos-loyalty --typescript --tailwind --app

# Install additional dependencies
npm install framer-motion react-flow-renderer recharts lucide-react
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

## File Structure to Create
```
/app
  /onboarding
    /components
      /Screen0
      /Screen1
      /Screen2
      ...
      /shared
        KPIDashboard.tsx
        IntelligenceAlert.tsx
        TabNavigation.tsx
    page.tsx (main onboarding flow)
  
/components
  /ui (shared UI components)
  
/lib
  /data
    industries.ts
    kpiMappings.ts
    queueDefinitions.ts
  /types
    onboarding.ts
  /utils
    kpiCalculator.ts
```

## Core Features to Implement First

### 1. Convert Existing HTML to React
Take the provided HTML prototype and convert to React components with proper state management.

### 2. Add Real-Time KPI Tracking
```typescript
// Example KPI calculation logic
const calculateKPIs = (selectedAttributes: string[]) => {
  const baseKPIs = 10;
  let total = baseKPIs;
  
  selectedAttributes.forEach(attr => {
    total += kpiMapping[attr]?.count || 0;
  });
  
  return {
    total,
    analytics: Math.floor(total * 0.5),
    aiFeatures: Math.floor(total * 0.3)
  };
};
```

### 3. Key Screen Implementations

**Screen 1 Must-Haves:**
- 4 tabs (Org Structure, Customer Structure, Entity Config, API Config)
- Editable hierarchy with template-based defaults
- Real-time KPI dashboard that updates as checkboxes change
- "Developer View" button that reveals technical tab

**Screen 7 (Queue Intelligence) - THE DIFFERENTIATOR:**
- Visual queue cards showing what each monitors
- Animated pattern detection visualization
- Actionable insights with confidence scores

**Screen 11 (Flow Builder) - THE WOW FACTOR:**
- Drag-and-drop canvas using react-flow-renderer
- Component palette on left
- Visual connections between nodes
- Test mode with animated data flow

### 4. Intelligence Features Throughout
Every configuration should show:
- "+X KPIs" badges on attributes
- Running totals in header/sidebar
- "AI will optimize this" messages
- Queue triggers available

### 5. Make It Feel Smart
- When user selects "Retail Franchise", auto-populate franchise hierarchy
- When they check "Square Footage", immediately show "Sales per Sq Ft" KPI
- When they enable family pooling, show family structure options
- Progressive disclosure everywhere

## Key Differentiators to Emphasize
1. **Queue-Based Intelligence** - Not just dashboards, but active problem detection
2. **Progressive Autonomy** - Shows journey from manual → automated decisions  
3. **Network Effects** - "Every client makes every other client smarter"
4. **Outcome-Based Campaigns** - "I want to increase Tuesday lunch traffic by 20%"

## Visual Design Rules
- Keep purple gradient background from HTML
- Cards should have subtle hover animations
- Show state changes immediately (no loading spinners for UI updates)
- Use color coding: Green = more intelligence, Amber = configuration needed
- Intelligence features get purple badges/borders

## Data to Mock
```typescript
const mockIndustryTemplates = {
  'retail-franchise': {
    hierarchy: ['Franchisor HQ', 'Master Franchisee', 'Franchisee', 'Store', 'Department'],
    requiredAttributes: ['store_id', 'franchisee_id'],
    suggestedKPIs: ['Sales per Sq Ft', 'Franchise Performance Index'],
    queues: ['Store Performance', 'Franchisee Operations']
  }
};
```

## Testing the Intelligence Feel
As you build, constantly ask:
- Does this configuration show its VALUE immediately?
- Can users see what analytics they're enabling?
- Is the progression from simple → powerful smooth?
- Would a Sitecore partner be excited to sell this?

## Start With This Flow
1. User selects "Retail Franchise" → See templates
2. Configures organization → See hierarchy adapt
3. Checks attributes → Watch KPIs count up in real-time
4. Configures queues → See intelligence patterns
5. Builds a flow → Visual wow moment

The goal: Make it impossible to see this as "just another loyalty platform" - it's clearly an intelligence system that happens to start with loyalty.