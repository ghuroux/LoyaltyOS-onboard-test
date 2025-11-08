import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  Shield,
  Activity,
  Star,
  Briefcase,
  Megaphone,
  Wallet,
  AlertCircle
} from 'lucide-react';

type DashboardTemplate = 'executive' | 'operations' | 'marketing' | 'finance' | 'risk' | 'queue_intelligence';

export const Screen12Analytics: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<DashboardTemplate>('executive');

  const dashboardTemplates = [
    {
      id: 'executive' as DashboardTemplate,
      name: 'Executive Dashboard',
      icon: Briefcase,
      audience: 'C-Suite, Senior Leadership',
      description: 'High-level performance metrics and strategic insights',
      color: 'bg-purple-500',
    },
    {
      id: 'operations' as DashboardTemplate,
      name: 'Operations Dashboard',
      icon: Activity,
      audience: 'Store/Regional Managers',
      description: 'Store performance, staffing, and daily operations',
      color: 'bg-blue-500',
    },
    {
      id: 'marketing' as DashboardTemplate,
      name: 'Marketing Dashboard',
      icon: Megaphone,
      audience: 'Campaign Managers, Marketing Team',
      description: 'Campaign ROI, engagement, segment health',
      color: 'bg-orange-500',
    },
    {
      id: 'finance' as DashboardTemplate,
      name: 'Finance Dashboard',
      icon: Wallet,
      audience: 'CFO, Finance Team',
      description: 'Program costs, liability, margin protection',
      color: 'bg-green-500',
    },
    {
      id: 'risk' as DashboardTemplate,
      name: 'Risk & Compliance',
      icon: Shield,
      audience: 'Risk Officers, Compliance Team',
      description: 'Fraud patterns, velocity checks, compliance metrics',
      color: 'bg-red-500',
    },
    {
      id: 'queue_intelligence' as DashboardTemplate,
      name: 'Queue Intelligence',
      icon: Star,
      audience: 'Ops Intelligence Team',
      description: 'Signal status, validation backlog, automation readiness',
      color: 'bg-amber-500',
    },
  ];

  const widgetExamples: Record<DashboardTemplate, Array<{ type: string; title: string; icon: React.ElementType; description: string }>> = {
    executive: [
      { type: 'kpi', title: 'Total Revenue', icon: DollarSign, description: 'YoY growth: +12.3%' },
      { type: 'kpi', title: 'Active Members', icon: Users, description: '245K members (+8.5%)' },
      { type: 'kpi', title: 'Program ROI', icon: TrendingUp, description: '4.2x return' },
      { type: 'chart', title: 'Revenue Trend', icon: BarChart3, description: '12-month trend comparison' },
      { type: 'queue', title: 'Critical Alerts', icon: AlertCircle, description: '3 items require attention' },
      { type: 'chart', title: 'Member Growth', icon: Users, description: 'Quarterly cohort analysis' },
    ],
    operations: [
      { type: 'kpi', title: 'Avg Transaction Count', icon: ShoppingCart, description: '1,245 daily avg' },
      { type: 'kpi', title: 'Store Performance Score', icon: Star, description: '87/100 average' },
      { type: 'comparative', title: 'Store Comparison', icon: BarChart3, description: 'Top/bottom performers' },
      { type: 'heatmap', title: 'Regional Heatmap', icon: Activity, description: 'Performance by region' },
      { type: 'queue', title: 'Store Alerts', icon: AlertCircle, description: '5 stores need attention' },
      { type: 'chart', title: 'Peak Hour Analysis', icon: TrendingUp, description: 'Traffic patterns' },
    ],
    marketing: [
      { type: 'kpi', title: 'Campaign ROI', icon: DollarSign, description: 'Avg 3.8x return' },
      { type: 'kpi', title: 'Engagement Rate', icon: Users, description: '42% avg engagement' },
      { type: 'chart', title: 'Campaign Performance', icon: BarChart3, description: 'Active campaign trends' },
      { type: 'chart', title: 'Segment Health', icon: Users, description: 'RFM distribution' },
      { type: 'queue', title: 'Campaign Alerts', icon: AlertCircle, description: '2 underperforming campaigns' },
      { type: 'comparative', title: 'A/B Test Results', icon: TrendingUp, description: 'Test performance comparison' },
    ],
    finance: [
      { type: 'kpi', title: 'Points Liability', icon: DollarSign, description: '$2.4M outstanding' },
      { type: 'kpi', title: 'Program Cost', icon: Wallet, description: '$180K monthly' },
      { type: 'kpi', title: 'Redemption Rate', icon: TrendingUp, description: '18% monthly avg' },
      { type: 'chart', title: 'Liability Forecast', icon: BarChart3, description: '6-month projection' },
      { type: 'chart', title: 'Cost Breakdown', icon: DollarSign, description: 'By category' },
      { type: 'queue', title: 'Budget Alerts', icon: AlertCircle, description: '1 campaign over budget' },
    ],
    risk: [
      { type: 'kpi', title: 'Fraud Incidents', icon: Shield, description: '12 flagged this month' },
      { type: 'kpi', title: 'Risk Score', icon: AlertCircle, description: 'Low (2.3/10)' },
      { type: 'chart', title: 'Fraud Patterns', icon: BarChart3, description: 'Detection over time' },
      { type: 'chart', title: 'Velocity Checks', icon: Activity, description: 'Transaction patterns' },
      { type: 'queue', title: 'Fraud Queue', icon: Shield, description: '8 items for review' },
      { type: 'heatmap', title: 'Geographic Anomalies', icon: Activity, description: 'Location-based risks' },
    ],
    queue_intelligence: [
      { type: 'kpi', title: 'Active Signals', icon: Star, description: '23 signals monitoring' },
      { type: 'kpi', title: 'In Validation', icon: Users, description: '7 items in review' },
      { type: 'kpi', title: 'Automated', icon: TrendingUp, description: '5 fully automated' },
      { type: 'chart', title: 'Signal Performance', icon: BarChart3, description: 'Trigger accuracy' },
      { type: 'chart', title: 'Automation Progress', icon: Activity, description: 'Phase 1→4 progression' },
      { type: 'feed', title: 'Live Signal Feed', icon: AlertCircle, description: 'Real-time trigger stream' },
    ],
  };

  const selectedTemplateData = dashboardTemplates.find(t => t.id === selectedTemplate)!;
  const widgets = widgetExamples[selectedTemplate];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="text-brand-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Analytics & KPI Dashboards</h1>
          </div>
          <p className="text-gray-600 text-lg">Configure audience-based dashboards for different user roles</p>
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Dashboard Builder:</strong> Create role-specific dashboards that pull KPIs from your data sources and queue signals.
              Operational alerts are handled by Queue Intelligence (Screen 11).
            </p>
          </div>
        </div>

        {/* Dashboard Template Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Dashboard Template</h2>
          <div className="grid grid-cols-3 gap-4">
            {dashboardTemplates.map((template) => {
              const TemplateIcon = template.icon;
              return (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-5 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                    selectedTemplate === template.id
                      ? 'border-brand-500 bg-brand-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 ${template.color} rounded-lg`}>
                      <TemplateIcon className="text-white" size={20} />
                    </div>
                    <h3 className={`font-semibold ${selectedTemplate === template.id ? 'text-brand-600' : 'text-gray-900'}`}>
                      {template.name}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    <strong>Audience:</strong> {template.audience}
                  </p>
                  <p className="text-xs text-gray-600">{template.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dashboard Preview */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className={`p-3 ${selectedTemplateData.color} rounded-lg`}>
                <selectedTemplateData.icon className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedTemplateData.name}</h2>
                <p className="text-sm text-gray-600">{selectedTemplateData.description}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
              Preview Mode
            </span>
          </div>

          {/* Widget Grid */}
          <div className="grid grid-cols-3 gap-4">
            {widgets.map((widget, idx) => {
              const WidgetIcon = widget.icon;
              return (
                <div
                  key={idx}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <WidgetIcon size={16} className="text-brand-600" />
                    <span className="text-xs font-semibold text-gray-500 uppercase">{widget.type}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{widget.title}</h4>
                  <p className="text-xs text-gray-600">{widget.description}</p>

                  {/* Mock visualization based on type */}
                  <div className="mt-3">
                    {widget.type === 'kpi' && (
                      <div className="text-2xl font-bold text-brand-600">--</div>
                    )}
                    {widget.type === 'chart' && (
                      <div className="h-12 bg-gray-200 rounded flex items-end gap-1 p-1">
                        {[40, 60, 45, 70, 55, 80, 65].map((h, i) => (
                          <div key={i} className="flex-1 bg-brand-400 rounded" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                    )}
                    {widget.type === 'queue' && (
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium text-gray-700">Items:</span>
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">--</span>
                      </div>
                    )}
                    {widget.type === 'comparative' && (
                      <div className="space-y-1 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-green-500 rounded" style={{ width: '80%' }}></div>
                          <span className="text-xs text-gray-600">80%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-blue-500 rounded" style={{ width: '60%' }}></div>
                          <span className="text-xs text-gray-600">60%</span>
                        </div>
                      </div>
                    )}
                    {widget.type === 'heatmap' && (
                      <div className="grid grid-cols-5 gap-1 mt-2">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className={`h-4 rounded ${i % 3 === 0 ? 'bg-brand-600' : i % 2 === 0 ? 'bg-brand-400' : 'bg-brand-200'}`}></div>
                        ))}
                      </div>
                    )}
                    {widget.type === 'feed' && (
                      <div className="space-y-1 mt-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-gray-600">Signal triggered</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-gray-600">Validation complete</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Dashboard Configuration */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-5">
            <h3 className="text-lg font-semibold mb-4">Widget Library</h3>
            <div className="space-y-2">
              {[
                { type: 'KPI Tiles', desc: 'Single metric with trend indicator' },
                { type: 'Line/Bar Charts', desc: 'Trends over time' },
                { type: 'Comparative Widgets', desc: 'Peer comparison, benchmarking' },
                { type: 'Queue Status', desc: 'Signal triggers and validation backlog' },
                { type: 'Heatmaps', desc: 'Geographic or entity-based analysis' },
                { type: 'Leaderboards', desc: 'Top/bottom performers' },
                { type: 'Alert Feeds', desc: 'Real-time signal trigger stream' },
              ].map((widget) => (
                <div key={widget.type} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900">{widget.type}</div>
                    <div className="text-xs text-gray-600">{widget.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-lg font-semibold mb-4">Queue Integration</h3>
            <p className="text-sm text-gray-600 mb-4">
              Dashboards can display queue status and signal triggers from Queue Intelligence (Screen 11).
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-sm text-blue-900 mb-1">Signal Status Widget</div>
                <div className="text-xs text-blue-700">Shows active signals per queue, items in review queue</div>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <div className="font-medium text-sm text-amber-900 mb-1">Alert Stream Widget</div>
                <div className="text-xs text-amber-700">Real-time feed of signal triggers across all queues</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-medium text-sm text-purple-900 mb-1">Automation Progress Widget</div>
                <div className="text-xs text-purple-700">Phase 1→2→3→4 progression visualization</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-700">
                <strong>Separation of Concerns:</strong> This screen configures <em>what to visualize</em>.
                Queue Intelligence configures <em>when to alert and what actions to take</em>.
              </p>
            </div>
          </Card>
        </div>

        {/* Info Box */}
        <Card className="p-5 mt-6 bg-gray-50 border border-gray-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Dashboard vs Queue Intelligence</h3>
              <p className="text-sm text-blue-800 mb-2">
                <strong>Dashboards (this screen):</strong> Configure what metrics to measure and visualize for each role. Focus on reporting and insights.
              </p>
              <p className="text-sm text-blue-800">
                <strong>Queue Intelligence (Screen 11):</strong> Configure when to alert (signals) and what automated actions to take. Focus on operational alerts and automation.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
