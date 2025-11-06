import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ChevronDown, ChevronUp, Plus, Trash2, Check } from 'lucide-react';

type FieldType = 'text' | 'number' | 'date' | 'boolean' | 'dropdown' | 'email' | 'phone';
type RelationshipType = 'parent-of' | 'child-of' | 'spouse-of' | 'partner-of' | 'guardian-of' | 'sibling-of';
type AttributeType = 'text' | 'number' | 'address' | 'gps' | 'phone' | 'email' | 'date' | 'dropdown' | 'area';

interface CustomField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[]; // For dropdown
}

interface EntityAttribute {
  id: string;
  label: string;
  type: AttributeType;
  required: boolean;
  insights: string[]; // Array of insights this attribute enables
}

interface EntityLevel {
  id: string;
  name: string;
  icon: string;
  level: number;
  enabled: boolean;
  optional: boolean;
  attributes: EntityAttribute[];
  portalAccess: boolean;
  rbacRoles: string[];
  createAccounts: boolean;
}

interface SeedUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

export const Screen1Organization: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['business-hierarchy', 'client-categories']);

  // Business Organizational Hierarchy
  const [entityLevels, setEntityLevels] = useState<EntityLevel[]>([
    {
      id: 'franchisor',
      name: 'Franchisor',
      icon: '🏢',
      level: 1,
      enabled: true,
      optional: false,
      attributes: [],
      portalAccess: true,
      rbacRoles: ['Admin', 'Manager'],
      createAccounts: true,
    },
    {
      id: 'brand',
      name: 'Brand',
      icon: '🏷️',
      level: 2,
      enabled: false,
      optional: true,
      attributes: [],
      portalAccess: true,
      rbacRoles: ['Brand Manager'],
      createAccounts: false,
    },
    {
      id: 'master-franchise',
      name: 'Master Franchise',
      icon: '🌍',
      level: 3,
      enabled: false,
      optional: true,
      attributes: [],
      portalAccess: true,
      rbacRoles: ['Franchise Owner'],
      createAccounts: true,
    },
    {
      id: 'franchisee',
      name: 'Franchisee',
      icon: '🤝',
      level: 4,
      enabled: true,
      optional: false,
      attributes: [],
      portalAccess: true,
      rbacRoles: ['Franchisee Admin'],
      createAccounts: true,
    },
    {
      id: 'corporate-store',
      name: 'Corporate Store',
      icon: '🏬',
      level: 5,
      enabled: false,
      optional: true,
      attributes: [],
      portalAccess: true,
      rbacRoles: ['Store Manager'],
      createAccounts: false,
    },
    {
      id: 'store',
      name: 'Store / Restaurant',
      icon: '🏪',
      level: 6,
      enabled: true,
      optional: false,
      attributes: [],
      portalAccess: true,
      rbacRoles: ['Store Manager', 'Assistant Manager'],
      createAccounts: false,
    },
    {
      id: 'department',
      name: 'Department',
      icon: '📦',
      level: 7,
      enabled: false,
      optional: true,
      attributes: [],
      portalAccess: false,
      rbacRoles: ['Department Lead'],
      createAccounts: false,
    },
  ]);

  const [seedUser, setSeedUser] = useState<SeedUser>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'System Administrator',
  });

  const [showAddAttributeModal, setShowAddAttributeModal] = useState(false);
  const [editingEntityId, setEditingEntityId] = useState<string | null>(null);
  const [newAttribute, setNewAttribute] = useState<EntityAttribute>({
    id: '',
    label: '',
    type: 'text',
    required: false,
    insights: [],
  });

  // Insight mapping based on attribute type and label
  const getInsightsForAttribute = (label: string, type: AttributeType): string[] => {
    const insights: { [key: string]: string[] } = {
      'Square Footage': ['Revenue per Square Foot', 'Capacity Utilization', 'Space Efficiency', 'Occupancy Analysis'],
      'Address': ['Geographic Performance Analysis', 'Regional Trends', 'Delivery Zone Optimization', 'Market Penetration'],
      'GPS Coordinates': ['Heat Mapping', 'Distance Analysis', 'Location-based Targeting', 'Proximity Analytics'],
      'Operating Hours': ['Peak Hour Analysis', 'Staff Scheduling Optimization', 'Sales by Time of Day'],
      'Staff Count': ['Revenue per Employee', 'Productivity Metrics', 'Labor Cost Analysis'],
      'Seating Capacity': ['Table Turnover Rate', 'Revenue per Seat', 'Capacity Planning'],
      'Opening Date': ['Store Maturity Analysis', 'Lifecycle Performance', 'New Store Ramp-up'],
    };

    // Check for exact match
    if (insights[label]) return insights[label];

    // Type-based insights
    if (type === 'area' || label.toLowerCase().includes('sq ft') || label.toLowerCase().includes('square')) {
      return ['Revenue per Unit Area', 'Space Utilization Analysis'];
    }
    if (type === 'address' || type === 'gps') {
      return ['Geographic Performance', 'Location Analytics'];
    }
    if (type === 'number') {
      return ['Comparative Analysis', 'Performance Benchmarking'];
    }

    return ['Custom Analytics', 'Trend Analysis'];
  };

  // Customer & Partner Categories
  interface ClientType {
    id: string;
    name: string;
    icon: string;
    description: string;
    type: 'B2C' | 'B2B';
    enabled: boolean;
    needsRBAC: boolean;
    rbacRoles: string[];
    portalAccess: boolean;
  }

  const [clientTypes, setClientTypes] = useState<ClientType[]>([
    {
      id: 'individual',
      name: 'Individual Customers',
      icon: '👤',
      description: 'Regular loyalty members earning and redeeming rewards',
      type: 'B2C',
      enabled: true,
      needsRBAC: false,
      rbacRoles: [],
      portalAccess: true,
    },
    {
      id: 'household',
      name: 'Household Accounts',
      icon: '👨‍👩‍👧‍👦',
      description: 'Family memberships with shared or pooled benefits',
      type: 'B2C',
      enabled: true,
      needsRBAC: false,
      rbacRoles: [],
      portalAccess: true,
    },
    {
      id: 'corporate',
      name: 'Corporate Clients',
      icon: '🏢',
      description: 'Employee rewards programs and bulk memberships',
      type: 'B2B',
      enabled: false,
      needsRBAC: true,
      rbacRoles: ['HR Admin', 'Employee', 'Manager'],
      portalAccess: true,
    },
    {
      id: 'sponsors',
      name: 'Sponsors',
      icon: '🤝',
      description: 'Brands funding campaigns, rewards, and co-marketing partners',
      type: 'B2B',
      enabled: false,
      needsRBAC: true,
      rbacRoles: ['Sponsor Admin', 'Campaign Manager', 'Analyst'],
      portalAccess: true,
    },
    {
      id: 'retail-media',
      name: 'Retail Media Clients',
      icon: '📺',
      description: 'Advertisers using loyalty platform for promotions',
      type: 'B2B',
      enabled: false,
      needsRBAC: true,
      rbacRoles: ['Media Buyer', 'Creative Manager', 'Analyst'],
      portalAccess: true,
    },
    {
      id: 'coalition',
      name: 'Coalition Partners',
      icon: '🔗',
      description: 'Other businesses in loyalty network for cross-brand earning/redemption',
      type: 'B2B',
      enabled: false,
      needsRBAC: true,
      rbacRoles: ['Partner Admin', 'Operations'],
      portalAccess: true,
    },
  ]);

  const toggleClientType = (clientId: string) => {
    setClientTypes(prev =>
      prev.map(client =>
        client.id === clientId ? { ...client, enabled: !client.enabled } : client
      )
    );
  };

  const updateClientType = (clientId: string, updates: Partial<ClientType>) => {
    setClientTypes(prev =>
      prev.map(client =>
        client.id === clientId ? { ...client, ...updates } : client
      )
    );
  };

  // Check if household is enabled for relationship logic
  const householdEnabled = clientTypes.find(c => c.id === 'household')?.enabled || false;

  // Customer Profile
  const [coreFields] = useState([
    { id: 'firstName', label: 'First Name', required: true, insight: '' },
    { id: 'lastName', label: 'Last Name', required: true, insight: '' },
    { id: 'email', label: 'Email', required: true, insight: '' },
    { id: 'phone', label: 'Phone', required: false, insight: '' },
    { id: 'dob', label: 'Date of Birth', required: true, insight: 'Age-based targeting, lifecycle campaigns' },
    {
      id: 'address',
      label: 'Detailed Address (Street, City, State, ZIP)',
      required: false,
      insight: 'Geographic analysis, location-based campaigns, delivery optimization'
    },
  ]);

  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [newField, setNewField] = useState<CustomField>({
    id: '',
    label: '',
    type: 'text',
    required: false,
    placeholder: '',
  });

  // Relationships
  const [enableRelationships, setEnableRelationships] = useState(true);
  const [relationshipTypes] = useState<RelationshipType[]>([
    'parent-of', 'child-of', 'spouse-of', 'partner-of', 'guardian-of', 'sibling-of'
  ]);
  const [ageThreshold, setAgeThreshold] = useState(18);
  const [autoPromoteMinors, setAutoPromoteMinors] = useState(true);
  const [benefitSharing, setBenefitSharing] = useState<'individual' | 'pooled'>('pooled');

  // External System Mapping (mock integrations from previous step)
  const [connectedIntegrations] = useState([
    { id: 'salesforce', name: 'Salesforce', type: 'CRM', connected: true },
    { id: 'stripe', name: 'Stripe', type: 'Payment', connected: true },
    { id: 'square', name: 'Square', type: 'POS', connected: false },
  ]);

  const [mappings, setMappings] = useState({
    salesforce: {
      customerId: 'Contact.Id',
      email: 'Contact.Email',
      phone: 'Contact.Phone',
    },
    stripe: {
      customerId: 'cus_xxxxx',
      cardToken: 'tok_xxxxx',
    },
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const toggleEntityLevel = (entityId: string) => {
    setEntityLevels(prev =>
      prev.map(entity =>
        entity.id === entityId ? { ...entity, enabled: !entity.enabled } : entity
      )
    );
  };

  const updateEntityLevel = (entityId: string, updates: Partial<EntityLevel>) => {
    setEntityLevels(prev =>
      prev.map(entity =>
        entity.id === entityId ? { ...entity, ...updates } : entity
      )
    );
  };

  const addAttributeToEntity = () => {
    if (newAttribute.label.trim() && editingEntityId) {
      const insights = getInsightsForAttribute(newAttribute.label, newAttribute.type);
      const attribute: EntityAttribute = {
        ...newAttribute,
        id: `attr_${Date.now()}`,
        insights,
      };

      setEntityLevels(prev =>
        prev.map(entity =>
          entity.id === editingEntityId
            ? { ...entity, attributes: [...entity.attributes, attribute] }
            : entity
        )
      );

      setNewAttribute({
        id: '',
        label: '',
        type: 'text',
        required: false,
        insights: [],
      });
      setShowAddAttributeModal(false);
      setEditingEntityId(null);
    }
  };

  const removeAttributeFromEntity = (entityId: string, attributeId: string) => {
    setEntityLevels(prev =>
      prev.map(entity =>
        entity.id === entityId
          ? { ...entity, attributes: entity.attributes.filter(a => a.id !== attributeId) }
          : entity
      )
    );
  };

  const addCustomField = () => {
    if (newField.label.trim()) {
      const field: CustomField = {
        ...newField,
        id: `custom_${Date.now()}`,
      };
      setCustomFields([...customFields, field]);
      setNewField({
        id: '',
        label: '',
        type: 'text',
        required: false,
        placeholder: '',
      });
      setShowAddFieldModal(false);
    }
  };

  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter(f => f.id !== id));
  };

  const Section = ({ id, title, icon, children }: { id: string; title: string; icon: string; children: React.ReactNode }) => {
    const isExpanded = expandedSections.includes(id);

    return (
      <Card className="mb-4">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6 border-t border-gray-200"
          >
            <div className="pt-6">
              {children}
            </div>
          </motion.div>
        )}
      </Card>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Organization & Customer Model
          </h1>
          <p className="text-gray-600 text-lg">
            Define your business hierarchy, customer structure, profile fields, relationships, and system integrations
          </p>
        </div>

        {/* Section 0: Business Organizational Hierarchy */}
        <Section id="business-hierarchy" title="Business Organizational Hierarchy" icon="🌳">
          <div className="space-y-6">
            <p className="text-sm text-gray-600">
              Define your organizational structure from franchisor to store level. Each level can have custom attributes
              that enable powerful analytics insights.
            </p>

            {/* Seed User for Franchisor */}
            <div className="p-5 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <h4 className="font-semibold mb-3 text-blue-900 flex items-center gap-2">
                <span>👤</span> Seed User (Franchisor Level)
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={seedUser.firstName}
                    onChange={(e) => setSeedUser({ ...seedUser, firstName: e.target.value })}
                    placeholder="John"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={seedUser.lastName}
                    onChange={(e) => setSeedUser({ ...seedUser, lastName: e.target.value })}
                    placeholder="Smith"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={seedUser.email}
                    onChange={(e) => setSeedUser({ ...seedUser, email: e.target.value })}
                    placeholder="john.smith@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={seedUser.phone}
                    onChange={(e) => setSeedUser({ ...seedUser, phone: e.target.value })}
                    placeholder="+1-555-0123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    value={seedUser.role}
                    onChange={(e) => setSeedUser({ ...seedUser, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Entity Levels */}
            <div className="space-y-4">
              <h4 className="font-semibold">Entity Levels</h4>
              {entityLevels.map((entity) => (
                <Card key={entity.id} className={`${entity.enabled ? 'border-2 border-primary' : 'opacity-60'}`}>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={entity.enabled}
                          onChange={() => toggleEntityLevel(entity.id)}
                          disabled={!entity.optional}
                          className="h-5 w-5 text-primary rounded"
                        />
                        <span className="text-2xl">{entity.icon}</span>
                        <div>
                          <h5 className="font-semibold text-gray-900">{entity.name}</h5>
                          <p className="text-xs text-gray-600">
                            Level {entity.level} {entity.optional && '(Optional)'}
                          </p>
                        </div>
                      </div>
                      {entity.enabled && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setEditingEntityId(entity.id);
                            setShowAddAttributeModal(true);
                          }}
                        >
                          <Plus size={14} className="mr-1" />
                          Add Attribute
                        </Button>
                      )}
                    </div>

                    {entity.enabled && (
                      <>
                        {/* Attributes */}
                        {entity.attributes.length > 0 && (
                          <div className="mb-4 space-y-2">
                            <p className="text-xs font-semibold text-gray-700 mb-2">Attributes:</p>
                            {entity.attributes.map((attr) => (
                              <div key={attr.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-sm font-medium text-gray-900">{attr.label}</span>
                                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                        {attr.type}
                                      </span>
                                      {attr.required && (
                                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                                          Required
                                        </span>
                                      )}
                                    </div>
                                    {attr.insights.length > 0 && (
                                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                                        <p className="text-xs font-semibold text-green-900 mb-1">
                                          📊 Analytics Insights:
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                          {attr.insights.map((insight, idx) => (
                                            <span
                                              key={idx}
                                              className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs"
                                            >
                                              {insight}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => removeAttributeFromEntity(entity.id, attr.id)}
                                    className="text-red-600 hover:text-red-700 ml-2"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Configuration */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                          <div>
                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={entity.portalAccess}
                                onChange={(e) =>
                                  updateEntityLevel(entity.id, { portalAccess: e.target.checked })
                                }
                                className="h-4 w-4 text-primary rounded"
                              />
                              <span className="text-gray-700">Portal Access</span>
                            </label>
                          </div>
                          <div>
                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={entity.createAccounts}
                                onChange={(e) =>
                                  updateEntityLevel(entity.id, { createAccounts: e.target.checked })
                                }
                                className="h-4 w-4 text-primary rounded"
                              />
                              <span className="text-gray-700">Create Accounts</span>
                            </label>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">RBAC Roles:</label>
                            <input
                              type="text"
                              value={entity.rbacRoles.join(', ')}
                              onChange={(e) =>
                                updateEntityLevel(entity.id, {
                                  rbacRoles: e.target.value.split(',').map((r) => r.trim()),
                                })
                              }
                              placeholder="Admin, Manager"
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Visual Hierarchy Preview */}
            <div className="p-5 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold mb-4 text-gray-900">Hierarchy Visualization</h4>
              <div className="flex flex-col items-center space-y-3">
                {entityLevels
                  .filter((e) => e.enabled)
                  .map((entity, idx) => (
                    <div key={entity.id} className="w-full max-w-md">
                      <div className="flex items-center gap-2">
                        {idx > 0 && (
                          <div className="w-8 flex justify-center">
                            <div className="h-8 w-0.5 bg-gray-300"></div>
                          </div>
                        )}
                        <div className="flex-1 p-3 bg-white border-2 border-gray-300 rounded-lg shadow-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{entity.icon}</span>
                            <div className="flex-1">
                              <div className="font-semibold text-sm text-gray-900">{entity.name}</div>
                              <div className="text-xs text-gray-600">
                                {entity.attributes.length} attribute{entity.attributes.length !== 1 ? 's' : ''}
                                {entity.portalAccess && ' • Portal'}
                                {entity.createAccounts && ' • Accounts'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Section 1: Customer & Partner Categories */}
        <Section id="client-categories" title="Customer & Partner Categories" icon="🎯">
          <div className="space-y-6">
            <p className="text-sm text-gray-600">
              Enable customer types and business partners that will interact with your loyalty program
            </p>

            {/* B2C Types */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-700">Consumer Accounts (B2C)</h4>
              <div className="grid grid-cols-2 gap-4">
                {clientTypes.filter(c => c.type === 'B2C').map(client => (
                  <Card key={client.id} className={`${client.enabled ? 'border-2 border-primary' : 'opacity-60'}`}>
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <input
                          type="checkbox"
                          checked={client.enabled}
                          onChange={() => toggleClientType(client.id)}
                          className="h-5 w-5 text-primary rounded"
                        />
                        <span className="text-3xl">{client.icon}</span>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{client.name}</h5>
                          <p className="text-xs text-gray-600">{client.description}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* B2B Types */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-700">Business Clients & Partners (B2B)</h4>
              <div className="space-y-3">
                {clientTypes.filter(c => c.type === 'B2B').map(client => (
                  <Card key={client.id} className={`${client.enabled ? 'border-2 border-primary' : 'opacity-60'}`}>
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <input
                          type="checkbox"
                          checked={client.enabled}
                          onChange={() => toggleClientType(client.id)}
                          className="h-5 w-5 text-primary rounded"
                        />
                        <span className="text-2xl">{client.icon}</span>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{client.name}</h5>
                          <p className="text-xs text-gray-600">{client.description}</p>
                        </div>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold">
                          B2B
                        </span>
                      </div>

                      {client.enabled && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={client.portalAccess}
                                  onChange={(e) =>
                                    updateClientType(client.id, { portalAccess: e.target.checked })
                                  }
                                  className="h-4 w-4 text-primary rounded"
                                />
                                <span className="text-gray-700">Portal Access</span>
                              </label>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">RBAC Roles:</label>
                              <input
                                type="text"
                                value={client.rbacRoles.join(', ')}
                                onChange={(e) =>
                                  updateClientType(client.id, {
                                    rbacRoles: e.target.value.split(',').map((r) => r.trim()).filter(r => r),
                                  })
                                }
                                placeholder="Admin, Manager, User"
                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Enabled:</strong>{' '}
                {clientTypes.filter(c => c.enabled).map(c => c.name).join(', ') || 'None'}
              </p>
            </div>
          </div>
        </Section>

        {/* Section 2: Primary Customer Profile Builder */}
        <Section id="customer-profile" title="Primary Customer Profile" icon="👤">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Check className="text-green-600" size={18} />
                Core Fields
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {coreFields.map(field => (
                  <div key={field.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={field.required}
                          disabled
                          className="h-4 w-4 text-primary rounded"
                        />
                        <span className="text-sm font-medium text-gray-900">{field.label}</span>
                      </div>
                      {field.required && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-semibold">
                          Required
                        </span>
                      )}
                    </div>
                    {field.insight && (
                      <div className="ml-6 mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-xs text-blue-900">
                          <strong>📊 Insights:</strong> {field.insight}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Custom Fields</h4>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowAddFieldModal(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Add Custom Field
                </Button>
              </div>

              {customFields.length === 0 ? (
                <div className="p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
                  <p className="text-gray-600 text-sm mb-2">No custom fields yet</p>
                  <p className="text-gray-500 text-xs">
                    Add custom fields to capture business-specific customer data
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {customFields.map(field => (
                    <div key={field.id} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{field.label}</span>
                        <button
                          onClick={() => removeCustomField(field.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                          {field.type}
                        </span>
                        {field.required && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">
                            Required
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {connectedIntegrations.find(i => i.id === 'salesforce' && i.connected) && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>💡 Tip:</strong> Salesforce is connected. You can import custom fields from your Salesforce schema.
                </p>
                <Button variant="secondary" size="sm">
                  Import Salesforce Fields
                </Button>
              </div>
            )}

            {/* Relationship Management (for Household accounts) */}
            {householdEnabled && (
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  🔗 Relationship Management
                </h4>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={enableRelationships}
                      onChange={(e) => setEnableRelationships(e.target.checked)}
                      className="h-4 w-4 text-primary rounded"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Enable Family Relationships</div>
                      <div className="text-sm text-gray-600">
                        Allow customers to link accounts and establish family connections
                      </div>
                    </div>
                  </label>

                  {enableRelationships && (
                    <>
                      <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Relationship Types
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {relationshipTypes.map(type => (
                              <div key={type} className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200">
                                <input
                                  type="checkbox"
                                  checked
                                  className="h-4 w-4 text-primary rounded"
                                />
                                <span className="text-sm text-gray-900 capitalize">
                                  {type.replace('-', ' ')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Age of Independence
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              value={ageThreshold}
                              onChange={(e) => setAgeThreshold(parseInt(e.target.value))}
                              min="13"
                              max="21"
                              className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            <span className="text-sm text-gray-600">
                              years old - family members become eligible for primary membership
                            </span>
                          </div>
                        </div>

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={autoPromoteMinors}
                            onChange={(e) => setAutoPromoteMinors(e.target.checked)}
                            className="h-4 w-4 text-primary rounded"
                          />
                          <div>
                            <div className="font-medium text-sm text-gray-900">
                              Auto-promote minors to primary members
                            </div>
                            <div className="text-xs text-gray-600">
                              When a minor reaches {ageThreshold}, system prompts to convert to primary membership
                            </div>
                          </div>
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Benefit Sharing Strategy
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => setBenefitSharing('individual')}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${
                              benefitSharing === 'individual'
                                ? 'border-primary bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <h5 className="font-semibold mb-1">Individual Tracking</h5>
                            <p className="text-sm text-gray-600">
                              Each family member has their own points and rewards
                            </p>
                          </button>

                          <button
                            onClick={() => setBenefitSharing('pooled')}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${
                              benefitSharing === 'pooled'
                                ? 'border-primary bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <h5 className="font-semibold mb-1">Family Points Pool</h5>
                            <p className="text-sm text-gray-600">
                              All family members contribute to and share from a common pool
                            </p>
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h5 className="font-semibold text-sm mb-2 text-green-900">Example Relationship Flow:</h5>
                        <div className="text-sm text-green-800 space-y-1">
                          <p>• <strong>Jane (Age 42)</strong> - Primary Member</p>
                          <p className="ml-4">└─ Spouse-of: <strong>John (Age 45)</strong> [Also Primary Member]</p>
                          <p className="ml-4">└─ Parent-of: <strong>Emma (Age 16)</strong> [Minor - Dependent]</p>
                          <p className="ml-4">└─ Parent-of: <strong>Lucas (Age 19)</strong> [Adult - Can be Primary]</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </Section>

        {/* Section 4: External System Mapping */}
        <Section id="system-mapping" title="External System Mapping" icon="🔌">
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>⚡ Auto-Detected</strong> from your connected integrations in Step 2. Edit or clear mappings as needed.
              </p>
            </div>

            {connectedIntegrations.filter(i => i.connected).map(integration => (
              <Card key={integration.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                    <p className="text-sm text-gray-600">{integration.type}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Check size={14} />
                    Connected
                  </span>
                </div>

                <div className="space-y-3">
                  {Object.entries(mappings[integration.id as keyof typeof mappings] || {}).map(([field, value]) => (
                    <div key={field} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 w-32 capitalize">
                        {field.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <input
                        type="text"
                        value={value as string}
                        onChange={(e) => {
                          setMappings({
                            ...mappings,
                            [integration.id]: {
                              ...mappings[integration.id as keyof typeof mappings],
                              [field]: e.target.value,
                            },
                          });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                      <span className="text-sm text-gray-600">→</span>
                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        {field}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            <div className="flex gap-3">
              <Button variant="secondary" size="sm">
                Clear All Mappings
              </Button>
              <Button variant="secondary" size="sm">
                <Plus size={16} className="mr-2" />
                Add Custom Mapping
              </Button>
            </div>
          </div>
        </Section>

        {/* Section 5: Data Model Preview */}
        <Section id="data-preview" title="Data Model Preview" icon="📊">
          <div className="space-y-6">
            {/* Business Hierarchy Data Structure */}
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold mb-4 text-gray-900">Business Organizational Hierarchy</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "organizationId": "ORG_123456",
  "seedUser": {
    "firstName": "${seedUser.firstName || 'John'}",
    "lastName": "${seedUser.lastName || 'Smith'}",
    "email": "${seedUser.email || 'john.smith@company.com'}",
    "phone": "${seedUser.phone || '+1-555-0123'}",
    "role": "${seedUser.role}"
  },
  "hierarchy": {${entityLevels.filter(e => e.enabled).map((entity, idx) => `
    "${entity.id}": {
      "name": "${entity.name}",
      "level": ${entity.level},
      "portalAccess": ${entity.portalAccess},
      "createAccounts": ${entity.createAccounts},
      "rbacRoles": [${entity.rbacRoles.map(r => `"${r}"`).join(', ')}],${entity.attributes.length > 0 ? `
      "attributes": {${entity.attributes.map(attr => `
        "${attr.id}": {
          "label": "${attr.label}",
          "type": "${attr.type}",
          "required": ${attr.required},
          "analyticsInsights": [${attr.insights.map(i => `"${i}"`).join(', ')}]
        }`).join(',')}
      },` : ''}
      "exampleData": {
        "id": "ENTITY_${idx + 1}",
        "name": "Example ${entity.name}"${entity.attributes.map(attr => `,
        "${attr.id}": "..."`).join('')}
      }
    }`).join(',')}
  }
}`}
              </pre>
            </div>

            {/* Client Types Configuration */}
            <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
              <h4 className="font-semibold mb-4 text-gray-900">Customer & Partner Categories</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "clientTypes": {${clientTypes.filter(c => c.enabled).map(client => `
    "${client.id}": {
      "name": "${client.name}",
      "type": "${client.type}",
      "portalAccess": ${client.portalAccess},${client.needsRBAC ? `
      "rbacRoles": [${client.rbacRoles.map(r => `"${r}"`).join(', ')}],` : ''}
      "enabled": true
    }`).join(',')}
  }
}`}
              </pre>
            </div>

            <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold mb-4 text-gray-900">Customer Data Structure</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "customerId": "CUST_789456",
  "accountType": "${clientTypes.find(c => c.enabled && c.type === 'B2C')?.id || 'individual'}",
  "profile": {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phone": "+1-555-0123",
    "dateOfBirth": "1982-03-15",
    "address": "123 Main St, City, State"${customFields.length > 0 ? `,
    ${customFields.map(f => `"${f.id}": "..."`).join(',\n    ')}` : ''}
  },${householdEnabled && enableRelationships ? `
  "relationships": [
    {
      "type": "spouse-of",
      "relatedCustomerId": "CUST_789457",
      "status": "active"
    },
    {
      "type": "parent-of",
      "relatedCustomerId": "CUST_789458",
      "isMinor": true,
      "dateOfBirth": "2008-07-22"
    }
  ],` : ''}
  "integrations": {${connectedIntegrations.filter(i => i.connected).map(i => `
    "${i.id}": {
      "customerId": "${mappings[i.id as keyof typeof mappings]?.customerId || 'N/A'}"
    }`).join(',')}
  },
  "createdAt": "2025-01-15T10:30:00Z"
}`}
              </pre>
            </div>

            {householdEnabled && enableRelationships && (
              <div className="p-6 bg-gray-50 border border-gray-300 rounded-lg">
                <h4 className="font-semibold mb-4 text-gray-900">Relationship Flow Diagram</h4>
                <div className="flex items-center justify-center p-8 bg-white rounded border border-gray-200">
                  <div className="text-center space-y-4">
                    <div className="inline-block p-4 bg-primary text-white rounded-lg font-semibold">
                      Primary Member (Jane, 42)
                    </div>
                    <div className="flex gap-8 justify-center">
                      <div className="text-center">
                        <div className="h-12 w-0.5 bg-gray-300 mx-auto"></div>
                        <div className="inline-block p-3 bg-blue-100 text-blue-900 rounded-lg text-sm">
                          Spouse: John (45)<br/>
                          <span className="text-xs">Also Primary</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="h-12 w-0.5 bg-gray-300 mx-auto"></div>
                        <div className="inline-block p-3 bg-orange-100 text-orange-900 rounded-lg text-sm">
                          Child: Emma (16)<br/>
                          <span className="text-xs">Minor - Dependent</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="h-12 w-0.5 bg-gray-300 mx-auto"></div>
                        <div className="inline-block p-3 bg-green-100 text-green-900 rounded-lg text-sm">
                          Child: Lucas (19)<br/>
                          <span className="text-xs">Can be Primary</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Section>
      </div>

      {/* Add Custom Field Modal */}
      {showAddFieldModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6">
            <h3 className="text-xl font-bold mb-4">Add Custom Field</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Field Label *
                </label>
                <input
                  type="text"
                  value={newField.label}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                  placeholder="e.g., Dietary Preferences, Company Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Field Type
                  </label>
                  <select
                    value={newField.type}
                    onChange={(e) => setNewField({ ...newField, type: e.target.value as FieldType })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="text">Text (Short)</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="boolean">Yes/No (Boolean)</option>
                    <option value="dropdown">Dropdown (Select)</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Placeholder (Optional)
                  </label>
                  <input
                    type="text"
                    value={newField.placeholder}
                    onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                    placeholder="e.g., Enter your company name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newField.required}
                  onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                  className="h-4 w-4 text-primary rounded"
                />
                <span className="text-sm text-gray-700">Make this field required</span>
              </label>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowAddFieldModal(false);
                  setNewField({
                    id: '',
                    label: '',
                    type: 'text',
                    required: false,
                    placeholder: '',
                  });
                }}
              >
                Cancel
              </Button>
              <Button onClick={addCustomField} disabled={!newField.label.trim()}>
                Add Field
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Attribute to Entity Modal */}
      {showAddAttributeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6">
            <h3 className="text-xl font-bold mb-4">
              Add Attribute to {entityLevels.find((e) => e.id === editingEntityId)?.name}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Attribute Name *
                </label>
                <input
                  type="text"
                  value={newAttribute.label}
                  onChange={(e) => {
                    const label = e.target.value;
                    setNewAttribute({ ...newAttribute, label });
                  }}
                  placeholder="e.g., Square Footage, Address, GPS Coordinates"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Attribute Type
                  </label>
                  <select
                    value={newAttribute.type}
                    onChange={(e) =>
                      setNewAttribute({ ...newAttribute, type: e.target.value as AttributeType })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="area">Area (sq ft)</option>
                    <option value="address">Full Address</option>
                    <option value="gps">GPS Coordinates</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="date">Date</option>
                    <option value="dropdown">Dropdown</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newAttribute.required}
                      onChange={(e) => setNewAttribute({ ...newAttribute, required: e.target.checked })}
                      className="h-4 w-4 text-primary rounded"
                    />
                    <span className="text-sm text-gray-700">Required field</span>
                  </label>
                </div>
              </div>

              {/* Live Insight Preview */}
              {newAttribute.label && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-semibold text-green-900 mb-2">
                    📊 Analytics Insights This Attribute Enables:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {getInsightsForAttribute(newAttribute.label, newAttribute.type).map((insight, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        ✓ {insight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Attribute Suggestions */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-semibold text-gray-700 mb-2">Common Attributes:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Square Footage',
                    'Address',
                    'GPS Coordinates',
                    'Operating Hours',
                    'Staff Count',
                    'Seating Capacity',
                    'Opening Date',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        const type: AttributeType =
                          suggestion === 'Square Footage'
                            ? 'area'
                            : suggestion === 'Address'
                            ? 'address'
                            : suggestion === 'GPS Coordinates'
                            ? 'gps'
                            : suggestion.includes('Date')
                            ? 'date'
                            : suggestion.includes('Count') || suggestion.includes('Capacity')
                            ? 'number'
                            : 'text';
                        setNewAttribute({ ...newAttribute, label: suggestion, type });
                      }}
                      className="px-2 py-1 bg-white border border-gray-300 rounded text-xs hover:bg-gray-100 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowAddAttributeModal(false);
                  setEditingEntityId(null);
                  setNewAttribute({
                    id: '',
                    label: '',
                    type: 'text',
                    required: false,
                    insights: [],
                  });
                }}
              >
                Cancel
              </Button>
              <Button onClick={addAttributeToEntity} disabled={!newAttribute.label.trim()}>
                Add Attribute
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
