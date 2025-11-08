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
  AlertCircle,
  Settings,
  X,
  Plus,
  ChevronUp,
  ChevronDown,
  Trash2,
  Edit,
  Sliders
} from 'lucide-react';

type DashboardTemplate = 'executive' | 'operations' | 'marketing' | 'finance' | 'risk' | 'queue_intelligence';
type WidgetType = 'kpi' | 'chart' | 'queue' | 'comparative' | 'heatmap' | 'feed';

interface WidgetConfig {
  metric?: string;
  timeRange?: '7d' | '30d' | '90d' | 'ytd';
  refreshInterval?: number;
  queueId?: string;
  comparisonType?: 'yoy' | 'mom' | 'peer';
}

interface WidgetInstance {
  id: string;
  type: WidgetType;
  title: string;
  icon: React.ElementType;
  description: string;
  enabled: boolean;
  config: WidgetConfig;
}

export const Screen12Analytics: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<DashboardTemplate>('executive');
  const [customizeMode, setCustomizeMode] = useState(false);
  const [configuring, setConfiguring] = useState<string | null>(null);
  const [widgets, setWidgets] = useState<WidgetInstance[]>([]);

  // Initialize widgets when template changes
  React.useEffect(() => {
    setWidgets(getDefaultWidgets(selectedTemplate));
  }, [selectedTemplate]);

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

  function getDefaultWidgets(template: DashboardTemplate): WidgetInstance[] {
    const widgetSets: Record<DashboardTemplate, WidgetInstance[]> = {
      executive: [
        { id: '1', type: 'kpi', title: 'Total Revenue', icon: DollarSign, description: 'YoY growth: +12.3%', enabled: true, config: { metric: 'revenue', timeRange: '30d' } },
        { id: '2', type: 'kpi', title: 'Active Members', icon: Users, description: '245K members (+8.5%)', enabled: true, config: { metric: 'active_members', timeRange: '30d' } },
        { id: '3', type: 'kpi', title: 'Program ROI', icon: TrendingUp, description: '4.2x return', enabled: true, config: { metric: 'program_roi', timeRange: 'ytd' } },
        { id: '4', type: 'chart', title: 'Revenue Trend', icon: BarChart3, description: '12-month trend comparison', enabled: true, config: { metric: 'revenue', timeRange: '90d', comparisonType: 'yoy' } },
        { id: '5', type: 'queue', title: 'Critical Alerts', icon: AlertCircle, description: '3 items require attention', enabled: true, config: { queueId: 'all' } },
        { id: '6', type: 'chart', title: 'Member Growth', icon: Users, description: 'Quarterly cohort analysis', enabled: true, config: { metric: 'member_growth', timeRange: '90d' } },
      ],
      operations: [
        { id: '1', type: 'kpi', title: 'Avg Transaction Count', icon: ShoppingCart, description: '1,245 daily avg', enabled: true, config: { metric: 'transaction_count', timeRange: '7d' } },
        { id: '2', type: 'kpi', title: 'Store Performance Score', icon: Star, description: '87/100 average', enabled: true, config: { metric: 'store_performance', timeRange: '30d' } },
        { id: '3', type: 'comparative', title: 'Store Comparison', icon: BarChart3, description: 'Top/bottom performers', enabled: true, config: { metric: 'store_revenue', timeRange: '30d', comparisonType: 'peer' } },
        { id: '4', type: 'heatmap', title: 'Regional Heatmap', icon: Activity, description: 'Performance by region', enabled: true, config: { metric: 'store_revenue', timeRange: '30d' } },
        { id: '5', type: 'queue', title: 'Store Alerts', icon: AlertCircle, description: '5 stores need attention', enabled: true, config: { queueId: 'store_performance' } },
        { id: '6', type: 'chart', title: 'Peak Hour Analysis', icon: TrendingUp, description: 'Traffic patterns', enabled: true, config: { metric: 'peak_traffic', timeRange: '7d' } },
      ],
      marketing: [
        { id: '1', type: 'kpi', title: 'Campaign ROI', icon: DollarSign, description: 'Avg 3.8x return', enabled: true, config: { metric: 'campaign_roi', timeRange: '30d' } },
        { id: '2', type: 'kpi', title: 'Engagement Rate', icon: Users, description: '42% avg engagement', enabled: true, config: { metric: 'engagement_rate', timeRange: '30d' } },
        { id: '3', type: 'chart', title: 'Campaign Performance', icon: BarChart3, description: 'Active campaign trends', enabled: true, config: { metric: 'campaign_performance', timeRange: '30d' } },
        { id: '4', type: 'chart', title: 'Segment Health', icon: Users, description: 'RFM distribution', enabled: true, config: { metric: 'segment_health', timeRange: '30d' } },
        { id: '5', type: 'queue', title: 'Campaign Alerts', icon: AlertCircle, description: '2 underperforming campaigns', enabled: true, config: { queueId: 'campaign_intelligence' } },
        { id: '6', type: 'comparative', title: 'A/B Test Results', icon: TrendingUp, description: 'Test performance comparison', enabled: true, config: { metric: 'ab_test', timeRange: '7d' } },
      ],
      finance: [
        { id: '1', type: 'kpi', title: 'Points Liability', icon: DollarSign, description: '$2.4M outstanding', enabled: true, config: { metric: 'points_liability', timeRange: '30d' } },
        { id: '2', type: 'kpi', title: 'Program Cost', icon: Wallet, description: '$180K monthly', enabled: true, config: { metric: 'program_cost', timeRange: '30d' } },
        { id: '3', type: 'kpi', title: 'Redemption Rate', icon: TrendingUp, description: '18% monthly avg', enabled: true, config: { metric: 'redemption_rate', timeRange: '30d' } },
        { id: '4', type: 'chart', title: 'Liability Forecast', icon: BarChart3, description: '6-month projection', enabled: true, config: { metric: 'liability_forecast', timeRange: '90d' } },
        { id: '5', type: 'chart', title: 'Cost Breakdown', icon: DollarSign, description: 'By category', enabled: true, config: { metric: 'cost_breakdown', timeRange: '30d' } },
        { id: '6', type: 'queue', title: 'Budget Alerts', icon: AlertCircle, description: '1 campaign over budget', enabled: true, config: { queueId: 'campaign_intelligence' } },
      ],
      risk: [
        { id: '1', type: 'kpi', title: 'Fraud Incidents', icon: Shield, description: '12 flagged this month', enabled: true, config: { metric: 'fraud_incidents', timeRange: '30d' } },
        { id: '2', type: 'kpi', title: 'Risk Score', icon: AlertCircle, description: 'Low (2.3/10)', enabled: true, config: { metric: 'risk_score', timeRange: '30d' } },
        { id: '3', type: 'chart', title: 'Fraud Patterns', icon: BarChart3, description: 'Detection over time', enabled: true, config: { metric: 'fraud_patterns', timeRange: '90d' } },
        { id: '4', type: 'chart', title: 'Velocity Checks', icon: Activity, description: 'Transaction patterns', enabled: true, config: { metric: 'velocity_checks', timeRange: '30d' } },
        { id: '5', type: 'queue', title: 'Fraud Queue', icon: Shield, description: '8 items for review', enabled: true, config: { queueId: 'fraud_risk' } },
        { id: '6', type: 'heatmap', title: 'Geographic Anomalies', icon: Activity, description: 'Location-based risks', enabled: true, config: { metric: 'geographic_anomalies', timeRange: '30d' } },
      ],
      queue_intelligence: [
        { id: '1', type: 'kpi', title: 'Active Signals', icon: Star, description: '23 signals monitoring', enabled: true, config: { metric: 'active_signals', timeRange: '30d' } },
        { id: '2', type: 'kpi', title: 'In Validation', icon: Users, description: '7 items in review', enabled: true, config: { metric: 'validation_queue', timeRange: '7d' } },
        { id: '3', type: 'kpi', title: 'Automated', icon: TrendingUp, description: '5 fully automated', enabled: true, config: { metric: 'automated_signals', timeRange: '30d' } },
        { id: '4', type: 'chart', title: 'Signal Performance', icon: BarChart3, description: 'Trigger accuracy', enabled: true, config: { metric: 'signal_accuracy', timeRange: '30d' } },
        { id: '5', type: 'chart', title: 'Automation Progress', icon: Activity, description: 'Phase 1→4 progression', enabled: true, config: { metric: 'automation_progress', timeRange: '90d' } },
        { id: '6', type: 'feed', title: 'Live Signal Feed', icon: AlertCircle, description: 'Real-time trigger stream', enabled: true, config: { refreshInterval: 30 } },
      ],
    };
    return widgetSets[template] || [];
  }

  const toggleWidget = (id: string) => {
    setWidgets(widgets.map(w => w.id === id ? { ...w, enabled: !w.enabled } : w));
  };

  const moveWidget = (id: string, direction: 'up' | 'down') => {
    const index = widgets.findIndex(w => w.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === widgets.length - 1)) return;

    const newWidgets = [...widgets];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newWidgets[index], newWidgets[targetIndex]] = [newWidgets[targetIndex], newWidgets[index]];
    setWidgets(newWidgets);
  };

  const updateWidgetConfig = (id: string, config: WidgetConfig) => {
    setWidgets(widgets.map(w => w.id === id ? { ...w, config: { ...w.config, ...config } } : w));
  };

  const selectedTemplateData = dashboardTemplates.find(t => t.id === selectedTemplate)!;
  const enabledWidgets = widgets.filter(w => w.enabled);

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

        {/* Dashboard Preview / Customize */}
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
            <div className="flex items-center gap-3">
              {customizeMode && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full font-medium">
                  Customize Mode
                </span>
              )}
              <button
                onClick={() => setCustomizeMode(!customizeMode)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  customizeMode
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-brand-500 text-white hover:bg-brand-600'
                }`}
              >
                {customizeMode ? (
                  <>
                    <X size={16} />
                    Exit Customize
                  </>
                ) : (
                  <>
                    <Sliders size={16} />
                    Customize Dashboard
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Widget Grid */}
          <div className="grid grid-cols-3 gap-4">
            {enabledWidgets.map((widget, idx) => {
              const WidgetIcon = widget.icon;
              return (
                <div
                  key={widget.id}
                  className={`p-4 bg-gray-50 border-2 rounded-lg transition-all ${
                    customizeMode ? 'border-brand-200 hover:shadow-lg' : 'border-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <WidgetIcon size={16} className="text-brand-600" />
                      <span className="text-xs font-semibold text-gray-500 uppercase">{widget.type}</span>
                    </div>
                    {customizeMode && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setConfiguring(widget.id)}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                          title="Configure"
                        >
                          <Settings size={14} />
                        </button>
                        <button
                          onClick={() => moveWidget(widget.id, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded transition-colors disabled:opacity-30"
                          title="Move up"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <button
                          onClick={() => moveWidget(widget.id, 'down')}
                          disabled={idx === enabledWidgets.length - 1}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded transition-colors disabled:opacity-30"
                          title="Move down"
                        >
                          <ChevronDown size={14} />
                        </button>
                        <button
                          onClick={() => toggleWidget(widget.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Remove"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{widget.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{widget.description}</p>

                  {/* Configuration Display */}
                  {customizeMode && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <div className="text-xs text-gray-600 space-y-1">
                        {widget.config.metric && (
                          <div>Metric: <span className="font-medium">{widget.config.metric}</span></div>
                        )}
                        {widget.config.timeRange && (
                          <div>Range: <span className="font-medium">{widget.config.timeRange}</span></div>
                        )}
                        {widget.config.refreshInterval && (
                          <div>Refresh: <span className="font-medium">{widget.config.refreshInterval}s</span></div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Mock visualization */}
                  {!customizeMode && (
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
                  )}
                </div>
              );
            })}
          </div>

          {/* Disabled Widgets (Customize Mode Only) */}
          {customizeMode && widgets.filter(w => !w.enabled).length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Available Widgets (click to add)</h3>
              <div className="grid grid-cols-4 gap-3">
                {widgets.filter(w => !w.enabled).map((widget) => {
                  const WidgetIcon = widget.icon;
                  return (
                    <button
                      key={widget.id}
                      onClick={() => toggleWidget(widget.id)}
                      className="p-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-brand-500 hover:bg-brand-50 transition-all text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <WidgetIcon size={14} className="text-gray-500" />
                        <span className="text-xs font-semibold text-gray-700">{widget.title}</span>
                      </div>
                      <div className="text-xs text-gray-500">{widget.type}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </Card>

        {/* Widget Configuration Modal */}
        {configuring && (
          <WidgetConfigModal
            widget={widgets.find(w => w.id === configuring)!}
            onClose={() => setConfiguring(null)}
            onSave={(config) => {
              updateWidgetConfig(configuring, config);
              setConfiguring(null);
            }}
          />
        )}

        {/* Info Boxes */}
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
                <div className="text-xs text-blue-700">Shows active signals per queue, items in review</div>
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

// Widget Configuration Modal Component
interface WidgetConfigModalProps {
  widget: WidgetInstance;
  onClose: () => void;
  onSave: (config: WidgetConfig) => void;
}

const WidgetConfigModal: React.FC<WidgetConfigModalProps> = ({ widget, onClose, onSave }) => {
  const [config, setConfig] = useState<WidgetConfig>(widget.config);

  const metricOptions = [
    'revenue', 'active_members', 'program_roi', 'member_growth', 'transaction_count',
    'store_performance', 'store_revenue', 'campaign_roi', 'engagement_rate', 'campaign_performance',
    'segment_health', 'points_liability', 'program_cost', 'redemption_rate', 'fraud_incidents',
    'risk_score', 'active_signals', 'validation_queue', 'automated_signals'
  ];

  const queueOptions = [
    { id: 'all', name: 'All Queues' },
    { id: 'customer_intelligence', name: 'Customer Intelligence' },
    { id: 'store_performance', name: 'Store Performance' },
    { id: 'campaign_intelligence', name: 'Campaign Intelligence' },
    { id: 'fraud_risk', name: 'Fraud & Risk' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Configure Widget</h3>
            <p className="text-sm text-gray-600 mt-1">{widget.title}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Metric Selection (for non-queue widgets) */}
          {widget.type !== 'queue' && widget.type !== 'feed' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Metric</label>
              <select
                value={config.metric || ''}
                onChange={(e) => setConfig({ ...config, metric: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
              >
                {metricOptions.map((metric) => (
                  <option key={metric} value={metric}>{metric.replace('_', ' ').toUpperCase()}</option>
                ))}
              </select>
            </div>
          )}

          {/* Queue Selection (for queue widgets) */}
          {widget.type === 'queue' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Queue</label>
              <select
                value={config.queueId || ''}
                onChange={(e) => setConfig({ ...config, queueId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
              >
                {queueOptions.map((queue) => (
                  <option key={queue.id} value={queue.id}>{queue.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Time Range */}
          {widget.type !== 'feed' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Time Range</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: '7d', label: '7 Days' },
                  { value: '30d', label: '30 Days' },
                  { value: '90d', label: '90 Days' },
                  { value: 'ytd', label: 'Year to Date' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setConfig({ ...config, timeRange: option.value as any })}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      config.timeRange === option.value
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Comparison Type (for comparative/chart widgets) */}
          {(widget.type === 'comparative' || widget.type === 'chart') && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Comparison Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'yoy', label: 'Year over Year' },
                  { value: 'mom', label: 'Month over Month' },
                  { value: 'peer', label: 'Peer Comparison' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setConfig({ ...config, comparisonType: option.value as any })}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      config.comparisonType === option.value
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Refresh Interval (for feed/queue widgets) */}
          {(widget.type === 'feed' || widget.type === 'queue') && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Refresh Interval</label>
              <select
                value={config.refreshInterval || 60}
                onChange={(e) => setConfig({ ...config, refreshInterval: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
              >
                <option value="30">Every 30 seconds</option>
                <option value="60">Every 1 minute</option>
                <option value="300">Every 5 minutes</option>
                <option value="3600">Every 1 hour</option>
              </select>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(config)}
            className="px-6 py-2 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
