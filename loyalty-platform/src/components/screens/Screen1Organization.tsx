import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useOnboardingStore } from '../../store/onboardingStore';
import { Building2, Users, Settings, Code, ChevronUp, ChevronDown } from 'lucide-react';

type Tab = 'org-structure' | 'customer-structure' | 'entity-config' | 'api-config';

export const Screen1Organization: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('org-structure');
  const [showApiTab, setShowApiTab] = useState(false);

  // Modal states
  const [showAddLevelModal, setShowAddLevelModal] = useState(false);
  const [showAddCustomerTypeModal, setShowAddCustomerTypeModal] = useState(false);
  const [showAddAttributeModal, setShowAddAttributeModal] = useState(false);

  // Form states
  const [newLevelName, setNewLevelName] = useState('');
  const [newLevelDescription, setNewLevelDescription] = useState('');
  const [newCustomerTypeName, setNewCustomerTypeName] = useState('');
  const [newCustomerTypeDescription, setNewCustomerTypeDescription] = useState('');
  const [newAttributeName, setNewAttributeName] = useState('');
  const [newAttributeType, setNewAttributeType] = useState('String');

  const {
    organizationHierarchy,
    customerHierarchy,
    selectedEntity,
    entityAttributes,
    kpiCounts,
    updateHierarchyLevel,
    addCustomHierarchyLevel,
    reorderHierarchyLevel,
    updateCustomerHierarchyLevel,
    addCustomerType,
    setSelectedEntity,
    updateEntityAttribute,
    addCustomAttribute,
  } = useOnboardingStore();

  const tabs = [
    { id: 'org-structure', label: 'Organization Structure', icon: Building2 },
    { id: 'customer-structure', label: 'Customer Structure', icon: Users },
    { id: 'entity-config', label: 'Entity Configuration', icon: Settings },
  ];

  if (showApiTab) {
    tabs.push({ id: 'api-config', label: 'API Configuration', icon: Code });
  }

  // Get all enabled entities for dropdown
  const allEnabledEntities = useMemo(() => {
    const orgEntities = organizationHierarchy
      .filter(level => level.enabled)
      .map(level => ({ id: level.id, name: level.displayName, type: 'organization' }));

    const custEntities = customerHierarchy
      .filter(level => level.enabled && level.id !== 'primary') // Exclude primary as it's not an entity
      .map(level => ({ id: level.id, name: level.displayName, type: 'customer' }));

    return [...orgEntities, ...custEntities];
  }, [organizationHierarchy, customerHierarchy]);

  // Calculate enabled KPIs dynamically
  const enabledKPIs = useMemo(() => {
    const kpis: string[] = ['Store Comparison', 'Peak Hour Analysis'];

    if (entityAttributes['Square Footage']?.enabled) {
      kpis.push('Sales per Square Foot');
    }
    if (entityAttributes['Address & Location']?.enabled) {
      kpis.push('Location Clustering');
    }
    if (entityAttributes['Staff Count']?.enabled) {
      kpis.push('Staff Productivity');
    }
    if (entityAttributes['Seating Capacity']?.enabled) {
      kpis.push('Capacity Utilization');
    }

    return kpis;
  }, [entityAttributes]);

  const handleAddLevel = () => {
    if (newLevelName.trim()) {
      addCustomHierarchyLevel(newLevelName, newLevelDescription);
      setNewLevelName('');
      setNewLevelDescription('');
      setShowAddLevelModal(false);
    }
  };

  const handleAddCustomerType = () => {
    if (newCustomerTypeName.trim()) {
      addCustomerType(newCustomerTypeName, newCustomerTypeDescription);
      setNewCustomerTypeName('');
      setNewCustomerTypeDescription('');
      setShowAddCustomerTypeModal(false);
    }
  };

  const handleAddAttribute = () => {
    if (newAttributeName.trim()) {
      addCustomAttribute(selectedEntity, newAttributeName, newAttributeType);
      setNewAttributeName('');
      setNewAttributeType('String');
      setShowAddAttributeModal(false);
    }
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
            Define Your Organization Structure
          </h1>
          <p className="text-gray-600 text-lg">
            Map your entities and their attributes to enable intelligence gathering and analytics
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 px-5 py-3 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary -mb-[1px]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {/* Organization Structure Tab */}
          {activeTab === 'org-structure' && (
            <motion.div
              key="org-structure"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Organization Hierarchy</h3>
                    <p className="text-sm text-gray-600">
                      Based on your Retail Franchise selection. Customize names to match your organization.
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => setShowApiTab(true)}>
                    <Code size={16} className="mr-2" />
                    Developer View
                  </Button>
                </div>

                <div className="space-y-4">
                  {organizationHierarchy.map((level, index) => (
                    <div key={level.id}>
                      <div className={`flex items-center gap-4 p-4 rounded-lg border-2 ${
                        level.enabled ? 'border-primary-light bg-blue-50' : 'border-gray-200 bg-gray-50'
                      }`}>
                        {/* Reorder buttons */}
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => reorderHierarchyLevel(level.id, 'up')}
                            disabled={index === 0}
                            className="p-1 text-gray-400 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ChevronUp size={16} />
                          </button>
                          <button
                            onClick={() => reorderHierarchyLevel(level.id, 'down')}
                            disabled={index === organizationHierarchy.length - 1}
                            className="p-1 text-gray-400 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ChevronDown size={16} />
                          </button>
                        </div>

                        <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0">
                          {level.id === 'corporate' && '🏢'}
                          {level.id === 'master' && '🤝'}
                          {level.id === 'franchisee' && '👔'}
                          {level.id === 'store' && '🏪'}
                          {level.id === 'department' && '👥'}
                          {level.id.startsWith('custom') && '⚙️'}
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={level.displayName}
                            onChange={(e) => updateHierarchyLevel(level.id, { displayName: e.target.value })}
                            className="font-semibold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary focus:outline-none px-2 py-1 -ml-2"
                          />
                          <div className="text-sm text-gray-600">{level.description}</div>
                        </div>
                        <Toggle
                          checked={level.enabled}
                          onChange={(checked) => updateHierarchyLevel(level.id, { enabled: checked })}
                          disabled={level.required}
                        />
                      </div>
                      {index < organizationHierarchy.length - 1 && level.enabled && (
                        <div className="w-0.5 h-4 bg-gray-300 ml-10" />
                      )}
                    </div>
                  ))}
                </div>

                <Button variant="secondary" className="mt-4" onClick={() => setShowAddLevelModal(true)}>
                  + Add Custom Level
                </Button>
              </Card>
            </motion.div>
          )}

          {/* Customer Structure Tab */}
          {activeTab === 'customer-structure' && (
            <motion.div
              key="customer-structure"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-1">Customer Hierarchy</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Define customer relationships for pooling and family features
                </p>

                <div className="space-y-4 mb-6">
                  {customerHierarchy.map((level, index) => (
                    <div key={level.id}>
                      <div className={`flex items-center gap-4 p-4 rounded-lg border-2 ${
                        level.enabled ? 'border-primary-light bg-blue-50' : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center text-white text-xl">
                          {level.id === 'primary' && '👤'}
                          {level.id === 'family' && '👨‍👩‍👧‍👦'}
                          {level.id === 'corporate_account' && '🏢'}
                          {level.id.startsWith('customer') && '👥'}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{level.displayName}</div>
                          <div className="text-sm text-gray-600">{level.description}</div>
                        </div>
                        <Toggle
                          checked={level.enabled}
                          onChange={(checked) => updateCustomerHierarchyLevel(level.id, { enabled: checked })}
                          disabled={level.required}
                        />
                      </div>
                      {index < customerHierarchy.length - 1 && level.enabled && (
                        <div className="w-0.5 h-4 bg-gray-300 ml-10" />
                      )}
                    </div>
                  ))}
                </div>

                <Button variant="secondary" size="sm" onClick={() => setShowAddCustomerTypeModal(true)}>
                  + Add Customer Type
                </Button>

                <Card className="p-5 bg-gray-50 mt-6">
                  <h4 className="font-semibold mb-3">Family Pooling Rules</h4>
                  <div className="space-y-2">
                    {[
                      'Enable value pooling between family members',
                      'Primary member can manage all linked accounts',
                      'Require approval for family link requests',
                    ].map((rule) => (
                      <label key={rule} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-primary rounded" />
                        <span className="text-sm text-gray-700">{rule}</span>
                      </label>
                    ))}
                  </div>
                </Card>
              </Card>
            </motion.div>
          )}

          {/* Entity Configuration Tab */}
          {activeTab === 'entity-config' && (
            <motion.div
              key="entity-config"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <label className="block font-semibold mb-2">Select Entity to Configure:</label>
                <select
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {allEnabledEntities.map((entity) => (
                    <option key={entity.id} value={entity.id}>
                      {entity.name} ({entity.type})
                    </option>
                  ))}
                </select>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <h3 className="text-lg font-semibold">🏪 {allEnabledEntities.find(e => e.id === selectedEntity)?.name || 'Entity'} Attributes</h3>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold border border-purple-300">
                    🤖 Intelligence Ready
                  </span>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-sm">Standard Attributes</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(entityAttributes).map(([key, value]) => (
                      <label
                        key={key}
                        className="flex items-center justify-between gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={value.enabled}
                            onChange={(e) => updateEntityAttribute(key, e.target.checked)}
                            disabled={key === 'Store ID' || key === 'Store Name'}
                            className="w-4 h-4 text-primary rounded"
                          />
                          <span className="text-sm text-gray-700">{key}</span>
                        </div>
                        {(key === 'Store ID' || key === 'Store Name') && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-semibold">
                            Required
                          </span>
                        )}
                        {value.kpiMapping && value.enabled && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">
                            +{value.kpiMapping.kpis} KPIs
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-sm">Custom Attributes</h4>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {Object.entries(entityAttributes)
                      .filter(([key]) => !['Store ID', 'Store Name', 'Address & Location', 'Square Footage', 'Operating Hours', 'Store Format/Type', 'Seating Capacity', 'Staff Count'].includes(key))
                      .map(([key, value]) => (
                        <label
                          key={key}
                          className="flex items-center justify-between gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={value.enabled}
                              onChange={(e) => updateEntityAttribute(key, e.target.checked)}
                              className="w-4 h-4 text-primary rounded"
                            />
                            <span className="text-sm text-gray-700">{key}</span>
                          </div>
                          <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">
                            Custom
                          </span>
                        </label>
                      ))}
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => setShowAddAttributeModal(true)}>
                    + Add Custom Attribute
                  </Button>
                </div>
              </Card>

              {/* KPI Dashboard */}
              <div className="gradient-intelligence border border-purple-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">📊 Available Intelligence & KPIs</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Card className="p-4 text-center">
                    <div className="text-4xl font-bold text-primary mb-1">{kpiCounts.total}</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">Total KPIs</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-4xl font-bold text-primary mb-1">{kpiCounts.analytics}</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">Analytics</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-4xl font-bold text-primary mb-1">{kpiCounts.ai}</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">AI Features</div>
                  </Card>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-sm">Enabled KPIs:</h4>
                  <div className="flex flex-wrap gap-2">
                    {enabledKPIs.map((kpi) => (
                      <span
                        key={kpi}
                        className="px-3 py-1.5 bg-white border border-primary-light text-primary rounded-full text-xs font-medium"
                      >
                        {kpi}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* API Configuration Tab */}
          {activeTab === 'api-config' && (
            <motion.div
              key="api-config"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">API Field Mapping</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Configure how entities are referenced in API calls and integrations
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full">
                    <thead className="border-b-2 border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Display Name</th>
                        <th className="text-left py-3 px-4 font-semibold">API Reference</th>
                        <th className="text-left py-3 px-4 font-semibold">ID Pattern</th>
                        <th className="text-left py-3 px-4 font-semibold">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allEnabledEntities.map((entity) => {
                        const apiRef = entity.id.replace(/_/g, '-');
                        const idPattern = `${entity.id.substring(0, 3).toUpperCase()}_{sequential}`;

                        return (
                          <tr key={entity.id} className="border-b border-gray-200">
                            <td className="py-3 px-4">{entity.name}</td>
                            <td className="py-3 px-4">
                              <input
                                type="text"
                                value={apiRef}
                                className="px-3 py-1 border border-gray-300 rounded w-full"
                                readOnly
                              />
                            </td>
                            <td className="py-3 px-4">
                              <input
                                type="text"
                                value={idPattern}
                                className="px-3 py-1 border border-gray-300 rounded w-full"
                                readOnly
                              />
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                {entity.type}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Example API Payload:</h4>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "transaction": {
    "id": "TXN_20250105_001234",
    "${allEnabledEntities[0]?.id || 'store'}": "${allEnabledEntities[0]?.id.substring(0, 3).toUpperCase()}_045",
    "customer": "CUST_789456",
    "amount": 125.50,
    "points_earned": 125
  }
}`}
                  </pre>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Custom Level Modal */}
      <Modal
        isOpen={showAddLevelModal}
        onClose={() => setShowAddLevelModal(false)}
        title="Add Custom Hierarchy Level"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Level Name</label>
            <input
              type="text"
              value={newLevelName}
              onChange={(e) => setNewLevelName(e.target.value)}
              placeholder="e.g., Regional Manager"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              value={newLevelDescription}
              onChange={(e) => setNewLevelDescription(e.target.value)}
              placeholder="Describe this hierarchy level..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowAddLevelModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLevel} disabled={!newLevelName.trim()}>
              Add Level
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Customer Type Modal */}
      <Modal
        isOpen={showAddCustomerTypeModal}
        onClose={() => setShowAddCustomerTypeModal(false)}
        title="Add Customer Type"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Customer Type Name</label>
            <input
              type="text"
              value={newCustomerTypeName}
              onChange={(e) => setNewCustomerTypeName(e.target.value)}
              placeholder="e.g., VIP Member, Student"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              value={newCustomerTypeDescription}
              onChange={(e) => setNewCustomerTypeDescription(e.target.value)}
              placeholder="Describe this customer type..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowAddCustomerTypeModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCustomerType} disabled={!newCustomerTypeName.trim()}>
              Add Customer Type
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Custom Attribute Modal */}
      <Modal
        isOpen={showAddAttributeModal}
        onClose={() => setShowAddAttributeModal(false)}
        title="Add Custom Attribute"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Attribute Name</label>
            <input
              type="text"
              value={newAttributeName}
              onChange={(e) => setNewAttributeName(e.target.value)}
              placeholder="e.g., Drive-Through Available"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Data Type</label>
            <select
              value={newAttributeType}
              onChange={(e) => setNewAttributeType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="String">String (Text)</option>
              <option value="Number">Number</option>
              <option value="Boolean">Boolean (Yes/No)</option>
              <option value="Date">Date</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowAddAttributeModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAttribute} disabled={!newAttributeName.trim()}>
              Add Attribute
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};
