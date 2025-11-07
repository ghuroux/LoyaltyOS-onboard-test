import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowLeft, AlertCircle, Database, GitBranch, Settings, Users, TrendingUp, ShieldAlert } from 'lucide-react';

interface SpecScreenProps {
  onNavigate: (screenId: number) => void;
}

export const Spec4Organization: React.FC<SpecScreenProps> = ({ onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onNavigate(4)}
          className="mb-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Screen 4: Organization Structure
        </Button>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Screen 4: Organization & Customer Structure
        </h1>
        <p className="text-lg text-gray-600">
          Functional Specification for Product & Development Teams
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-blue-900 mb-3">Quick Navigation</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <a href="#purpose" className="text-blue-700 hover:text-blue-900">• Screen Purpose</a>
          <a href="#dependencies" className="text-blue-700 hover:text-blue-900">• Dependencies</a>
          <a href="#data-model" className="text-blue-700 hover:text-blue-900">• Data Model</a>
          <a href="#api" className="text-blue-700 hover:text-blue-900">• API Operations</a>
          <a href="#business-rules" className="text-blue-700 hover:text-blue-900">• Business Rules</a>
          <a href="#ux-patterns" className="text-blue-700 hover:text-blue-900">• UI/UX Patterns</a>
          <a href="#edge-cases" className="text-blue-700 hover:text-blue-900">• Edge Cases & Questions</a>
        </div>
      </div>

      {/* Screen Purpose */}
      <section id="purpose" className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Users className="text-brand-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Screen Purpose</h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What This Screen Does</h3>
            <p className="text-gray-700">
              Defines the organizational and customer structure that forms the foundation of the entire loyalty platform.
              This screen configures two parallel hierarchies:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 ml-4">
              <li><strong>Business Hierarchy:</strong> Franchisor → Master Franchisee → Franchisee → Store → Department</li>
              <li><strong>Customer Hierarchy:</strong> Primary Member → Family Members → Corporate Accounts</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Who Uses This</h3>
            <p className="text-gray-700">
              <strong>Operators:</strong> Internal business analysts and channel partners (e.g., Sitecore integration teams)
              configuring the platform for enterprise clients during initial onboarding.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Key Differentiator: Real-time KPI Impact</h3>
            <p className="text-gray-700">
              As operators add or enable entity attributes (e.g., "Square Footage", "Operating Hours"), the system
              dynamically calculates and displays what analytics capabilities are unlocked. This creates a direct
              connection between data collection decisions and business intelligence outcomes.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded p-3 mt-2">
              <p className="text-sm text-amber-900">
                <strong>Example:</strong> Enabling "Square Footage" for Store entities immediately shows: +3 KPIs,
                +2 Analytics Features, +1 AI Capability (Sales per Sq Ft, Space Utilization, Heat Mapping)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dependencies */}
      <section id="dependencies" className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <GitBranch className="text-brand-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Input & Output Dependencies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Dependencies */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-green-600">⬇</span> Input Dependencies
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-900">Screen 0: Discovery</p>
                <p className="text-gray-600">
                  • Selected industry (retail/hospitality/airlines/etc.)<br/>
                  • Selected template (determines default entity structure)
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Screen 2: Platform Basics</p>
                <p className="text-gray-600">
                  • Program name (displayed in context)<br/>
                  • Primary currency (affects attribute types)
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-xs text-gray-700">
                  <strong>Note:</strong> This screen can function without Screen 3 (Integrations),
                  but integration choices may affect available attribute types (e.g., CRM fields).
                </p>
              </div>
            </div>
          </div>

          {/* Output Dependencies */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-blue-600">⬆</span> Output Dependencies
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-900">Screens 5-6: Value & Redemption</p>
                <p className="text-gray-600">
                  • Customer hierarchy enables tier eligibility rules<br/>
                  • Business hierarchy determines earning/redemption locations
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Screen 7: Segmentation</p>
                <p className="text-gray-600">
                  • Entity attributes feed RFM calculations<br/>
                  • Customer attributes enable demographic segmentation
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Screen 11: Intelligence Queues</p>
                <p className="text-gray-600">
                  • Store attributes enable comparative performance analysis<br/>
                  • Customer attributes power churn prediction models
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Screen 13: Analytics</p>
                <p className="text-gray-600">
                  • KPI counts calculated here become available analytics<br/>
                  • Attribute-to-insight mappings define dashboard capabilities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Model */}
      <section id="data-model" className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Database className="text-brand-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Data Model</h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Entity Hierarchy Structure</h3>
            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm space-y-1">
              <p className="text-gray-700">EntityLevel &#123;</p>
              <p className="text-gray-700 ml-4">id: string                    <span className="text-gray-500">// Unique identifier</span></p>
              <p className="text-gray-700 ml-4">name: string                  <span className="text-gray-500">// Default name (e.g., "Franchisor")</span></p>
              <p className="text-gray-700 ml-4">customLabel?: string          <span className="text-gray-500">// User-defined display name</span></p>
              <p className="text-gray-700 ml-4">icon: string                  <span className="text-gray-500">// Icon identifier</span></p>
              <p className="text-gray-700 ml-4">level: number                 <span className="text-gray-500">// Position in hierarchy (1-7)</span></p>
              <p className="text-gray-700 ml-4">enabled: boolean              <span className="text-gray-500">// Is this entity active?</span></p>
              <p className="text-gray-700 ml-4">optional: boolean             <span className="text-gray-500">// Can be disabled?</span></p>
              <p className="text-gray-700 ml-4">attributes: EntityAttribute[] <span className="text-gray-500">// Custom fields</span></p>
              <p className="text-gray-700 ml-4">portalAccess: boolean         <span className="text-gray-500">// Can log into portal?</span></p>
              <p className="text-gray-700 ml-4">rbacRoles: string[]           <span className="text-gray-500">// Assigned roles</span></p>
              <p className="text-gray-700 ml-4">createAccounts: boolean       <span className="text-gray-500">// Can create sub-accounts?</span></p>
              <p className="text-gray-700">&#125;</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Entity Attributes</h3>
            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm space-y-1">
              <p className="text-gray-700">EntityAttribute &#123;</p>
              <p className="text-gray-700 ml-4">id: string</p>
              <p className="text-gray-700 ml-4">label: string                 <span className="text-gray-500">// Display name</span></p>
              <p className="text-gray-700 ml-4">type: AttributeType           <span className="text-gray-500">// text|number|address|gps|email|...</span></p>
              <p className="text-gray-700 ml-4">required: boolean             <span className="text-gray-500">// Must be provided?</span></p>
              <p className="text-gray-700 ml-4">insights: string[]            <span className="text-gray-500">// Analytics enabled by this attribute</span></p>
              <p className="text-gray-700">&#125;</p>
            </div>
            <div className="mt-3 bg-blue-50 border border-blue-200 p-3 rounded">
              <p className="text-sm text-blue-900">
                <strong>Key Insight:</strong> The <code>insights</code> array is what drives real-time KPI tracking.
                Each insight maps to a specific analytics capability in the platform.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Supported Attribute Types</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium text-gray-900 mb-2">Basic Types</p>
                <ul className="space-y-1 text-gray-700">
                  <li>• <code>text</code> - Single line input</li>
                  <li>• <code>textarea</code> - Multi-line text</li>
                  <li>• <code>number</code> - Numeric values</li>
                  <li>• <code>date</code> - Date picker</li>
                  <li>• <code>dropdown</code> - Predefined options</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium text-gray-900 mb-2">Specialized Types</p>
                <ul className="space-y-1 text-gray-700">
                  <li>• <code>address</code> - Structured location</li>
                  <li>• <code>gps</code> - Coordinates (lat/long)</li>
                  <li>• <code>email</code> - Email with validation</li>
                  <li>• <code>phone</code> - Phone number</li>
                  <li>• <code>url</code> - Website/link</li>
                  <li>• <code>uuid</code> - Unique identifier</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Operations */}
      <section id="api" className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="text-brand-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">API Operations</h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <p className="text-gray-700">
            The backend needs to support full CRUD operations on entity structures and their attributes.
          </p>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Core Endpoints Required</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-mono text-sm text-green-700 font-semibold">GET /api/v1/config/:configId/entities</p>
                <p className="text-sm text-gray-600 mt-1">Retrieve all entity levels for a configuration</p>
                <p className="text-xs text-gray-500 mt-1">Returns: Array of EntityLevel objects with attributes</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-mono text-sm text-blue-700 font-semibold">PUT /api/v1/config/:configId/entities/:entityId</p>
                <p className="text-sm text-gray-600 mt-1">Update entity configuration (enable/disable, custom label, settings)</p>
                <p className="text-xs text-gray-500 mt-1">Payload: Partial EntityLevel object</p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-mono text-sm text-purple-700 font-semibold">POST /api/v1/config/:configId/entities/:entityId/attributes</p>
                <p className="text-sm text-gray-600 mt-1">Add new attribute to an entity</p>
                <p className="text-xs text-gray-500 mt-1">Payload: EntityAttribute object</p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-mono text-sm text-orange-700 font-semibold">DELETE /api/v1/config/:configId/entities/:entityId/attributes/:attrId</p>
                <p className="text-sm text-gray-600 mt-1">Remove attribute from entity</p>
                <p className="text-xs text-gray-500 mt-1">Should validate no dependencies before deletion</p>
              </div>

              <div className="border-l-4 border-teal-500 pl-4">
                <p className="font-mono text-sm text-teal-700 font-semibold">GET /api/v1/analytics/kpi-mapping</p>
                <p className="text-sm text-gray-600 mt-1">Retrieve attribute-to-KPI mapping rules</p>
                <p className="text-xs text-gray-500 mt-1">Used to calculate real-time KPI counts as attributes are selected</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Important Considerations</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Validation:</strong> Prevent deletion of entities/attributes if referenced in earning rules, segments, or campaigns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Ordering:</strong> Entity hierarchy must be maintained (can't enable child without parent)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Defaults:</strong> Industry templates should provide default entity structures via template IDs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Real-time KPI:</strong> KPI calculation should be fast (cached mapping, not computed on every request)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Business Rules */}
      <section id="business-rules" className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="text-brand-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Business Rules & Logic</h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">1. Entity Hierarchy Rules</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Top-level entities (Franchisor, Primary Member) are always required and cannot be disabled</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Child entities can only be enabled if their parent entity is enabled</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Disabling a parent entity automatically disables all child entities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Entity order must be maintained (Level 1 → Level 2 → Level 3, etc.)</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">2. KPI Calculation Logic</h3>
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <p className="text-sm text-blue-900 mb-3">
                <strong>Real-time KPI tracking is a core differentiator.</strong> Here's how it works:
              </p>
              <ol className="space-y-2 text-sm text-blue-900">
                <li>1. Each attribute has a predefined KPI mapping (stored in <code>kpiMappings</code> object)</li>
                <li>2. When an attribute is selected, its KPI values are added to running totals</li>
                <li>3. Three counters are maintained:
                  <ul className="ml-6 mt-1 space-y-1">
                    <li>• <strong>Total KPIs:</strong> Number of metrics available (e.g., "Sales per Sq Ft")</li>
                    <li>• <strong>Analytics Features:</strong> Analytics capabilities (e.g., "Comparative Analysis")</li>
                    <li>• <strong>AI Capabilities:</strong> ML/AI-powered insights (e.g., "Predictive Modeling")</li>
                  </ul>
                </li>
                <li>4. Counters update immediately when attributes are toggled on/off</li>
              </ol>
            </div>
            <div className="mt-3 bg-amber-50 border border-amber-200 p-3 rounded">
              <p className="text-sm text-amber-900">
                <strong>Example Mapping:</strong><br/>
                "Square Footage" → &#123; kpis: 3, analytics: 2, ai: 1 &#125;<br/>
                This means selecting this attribute enables 3 KPIs, 2 analytics features, and 1 AI capability.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">3. Attribute Requirements</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Required attributes (e.g., "Store ID", "Member ID") cannot be removed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Attribute names must be unique within an entity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Certain attribute types require validation (email format, GPS coordinates, etc.)</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">4. Portal Access & RBAC</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>If <code>portalAccess</code> is enabled, at least one RBAC role must be assigned</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Roles determine what features the entity can access in the member/partner portal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Account creation permission (<code>createAccounts</code>) enables sub-account management</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* UI/UX Patterns */}
      <section id="ux-patterns" className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="text-brand-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">UI/UX Patterns</h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Progressive Disclosure</h3>
            <p className="text-sm text-gray-700 mb-2">
              The screen uses collapsible sections to manage complexity:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Section Level:</strong> Business Hierarchy, Customer Hierarchy collapse/expand independently</li>
              <li>• <strong>Entity Level:</strong> Each entity (Franchisor, Store, etc.) can be expanded to show attributes</li>
              <li>• <strong>Attribute Modal:</strong> Adding attributes opens a modal with type selection and insight preview</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Real-time Feedback</h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded p-4">
              <p className="text-sm text-gray-900 font-semibold mb-2">Live KPI Counter (Top-right corner)</p>
              <div className="flex gap-4 text-xs">
                <div className="bg-white px-3 py-2 rounded shadow-sm">
                  <p className="text-gray-500">Total KPIs</p>
                  <p className="text-2xl font-bold text-brand-600">24</p>
                </div>
                <div className="bg-white px-3 py-2 rounded shadow-sm">
                  <p className="text-gray-500">Analytics</p>
                  <p className="text-2xl font-bold text-purple-600">12</p>
                </div>
                <div className="bg-white px-3 py-2 rounded shadow-sm">
                  <p className="text-gray-500">AI</p>
                  <p className="text-2xl font-bold text-green-600">8</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                These counters update immediately as attributes are selected/deselected, providing instant feedback
                on the analytics impact of configuration choices.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Key Interactions</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900 text-sm">Toggle Entity On/Off</p>
                <p className="text-xs text-gray-600 mt-1">
                  Checkbox at entity level. Disabling cascades to children. Re-enabling shows previous configuration.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-gray-900 text-sm">Add Attribute</p>
                <p className="text-xs text-gray-600 mt-1">
                  Opens modal with: Attribute name, Type selector, Required checkbox, Insights preview (shows KPI impact)
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-semibold text-gray-900 text-sm">Delete Attribute</p>
                <p className="text-xs text-gray-600 mt-1">
                  Trash icon on attribute card. Should show confirmation if attribute is referenced elsewhere.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-semibold text-gray-900 text-sm">Custom Entity Labels</p>
                <p className="text-xs text-gray-600 mt-1">
                  Edit icon on entity name. Allows renaming "Store" to "Restaurant" or "Branch" for client-specific terminology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Edge Cases & Open Questions */}
      <section id="edge-cases" className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className="text-brand-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Edge Cases & Open Questions</h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-red-700">🚨 Edge Cases to Handle</h3>
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="font-semibold text-sm text-red-900">Deleting Attributes Referenced Elsewhere</p>
                <p className="text-xs text-red-800 mt-1">
                  <strong>Scenario:</strong> Operator tries to delete "Store Type" attribute, but it's used in earning rules (category multipliers)<br/>
                  <strong>Question:</strong> Do we block deletion? Show warning and allow? Auto-update references?
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="font-semibold text-sm text-red-900">Disabling Entity with Existing Data</p>
                <p className="text-xs text-red-800 mt-1">
                  <strong>Scenario:</strong> Configuration already live with 500 stores. Operator disables "Department" entity.<br/>
                  <strong>Question:</strong> What happens to existing department records? Archive? Delete? Keep but hide?
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="font-semibold text-sm text-red-900">Changing Attribute Types</p>
                <p className="text-xs text-red-800 mt-1">
                  <strong>Scenario:</strong> Attribute "Employee Count" changes from text to number type<br/>
                  <strong>Question:</strong> How to handle existing non-numeric values? Data migration required? Validation on change?
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="font-semibold text-sm text-red-900">Circular Dependencies</p>
                <p className="text-xs text-red-800 mt-1">
                  <strong>Scenario:</strong> Custom entity hierarchies could create circular references<br/>
                  <strong>Question:</strong> How to prevent/detect? Should we enforce tree structure validation?
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-amber-700">❓ Open Questions for Discussion</h3>
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded p-3">
                <p className="font-semibold text-sm text-amber-900">Entity State Management</p>
                <p className="text-xs text-amber-800 mt-1">
                  Should entities have states (Draft → Active → Migrating → Archived)? If yes, what state transitions are allowed?
                  Does this affect KPI calculations?
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded p-3">
                <p className="font-semibold text-sm text-amber-900">Attribute Ordering</p>
                <p className="text-xs text-amber-800 mt-1">
                  Should operators be able to reorder attributes (affects form display order)? Drag-and-drop?
                  Or auto-sort (required first, then alphabetical)?
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded p-3">
                <p className="font-semibold text-sm text-amber-900">Bulk Operations</p>
                <p className="text-xs text-amber-800 mt-1">
                  Should we support "Copy attributes from another entity"? Import from CSV?
                  What about applying templates to already-configured entities (merge or replace)?
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded p-3">
                <p className="font-semibold text-sm text-amber-900">KPI Mapping Customization</p>
                <p className="text-xs text-amber-800 mt-1">
                  Can partners/clients customize the attribute-to-KPI mappings? Or are they platform-defined?
                  If customizable, how do we maintain data quality?
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded p-3">
                <p className="font-semibold text-sm text-amber-900">Multi-tenant Considerations</p>
                <p className="text-xs text-amber-800 mt-1">
                  If one platform instance serves multiple clients, do entity structures need to be isolated?
                  Can templates be shared across clients? What about attribute definitions?
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded p-3">
                <p className="font-semibold text-sm text-amber-900">Versioning & Rollback</p>
                <p className="text-xs text-amber-800 mt-1">
                  Should configuration changes be versioned? Can operators rollback to previous entity structure?
                  What's the impact on live data if we rollback?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Button
          variant="primary"
          onClick={() => onNavigate(4)}
          className="w-full"
        >
          <ArrowLeft size={16} className="mr-2" />
          Return to Screen 4: Organization Structure
        </Button>
      </div>
    </motion.div>
  );
};
