import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useOnboardingStore } from '../../store/onboardingStore';
import { ChevronDown, ChevronUp, Plus, Trash2, Check } from 'lucide-react';

type FieldType = 'text' | 'number' | 'date' | 'boolean' | 'dropdown' | 'email' | 'phone';
type RelationshipType = 'parent-of' | 'child-of' | 'spouse-of' | 'partner-of' | 'guardian-of' | 'sibling-of';

interface CustomField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[]; // For dropdown
}

export const Screen1Organization: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['business-model', 'customer-profile']);

  // Business Model
  const [businessModel, setBusinessModel] = useState<'individual' | 'household' | 'business'>('household');

  // Customer Profile
  const [coreFields] = useState([
    { id: 'firstName', label: 'First Name', required: true },
    { id: 'lastName', label: 'Last Name', required: true },
    { id: 'email', label: 'Email', required: true },
    { id: 'phone', label: 'Phone', required: false },
    { id: 'dob', label: 'Date of Birth', required: true },
    { id: 'address', label: 'Address', required: false },
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
            Define your customer structure, profile fields, relationships, and system integrations
          </p>
        </div>

        {/* Section 1: Business Model */}
        <Section id="business-model" title="Business Model" icon="🏢">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Select the primary business model for your loyalty program
            </p>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setBusinessModel('individual')}
                className={`p-6 rounded-lg border-2 text-left transition-all ${
                  businessModel === 'individual'
                    ? 'border-primary bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-4xl mb-3">👤</div>
                <h4 className="font-semibold text-lg mb-2">Individual</h4>
                <p className="text-sm text-gray-600">
                  Each customer is independent with their own rewards
                </p>
              </button>

              <button
                onClick={() => setBusinessModel('household')}
                className={`p-6 rounded-lg border-2 text-left transition-all ${
                  businessModel === 'household'
                    ? 'border-primary bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-4xl mb-3">👨‍👩‍👧‍👦</div>
                <h4 className="font-semibold text-lg mb-2">Household</h4>
                <p className="text-sm text-gray-600">
                  Families can link accounts and share benefits
                </p>
              </button>

              <button
                onClick={() => setBusinessModel('business')}
                className={`p-6 rounded-lg border-2 text-left transition-all ${
                  businessModel === 'business'
                    ? 'border-primary bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-4xl mb-3">🏢</div>
                <h4 className="font-semibold text-lg mb-2">Business</h4>
                <p className="text-sm text-gray-600">
                  Corporate accounts with multiple employees
                </p>
              </button>
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
                    <div className="flex items-center justify-between">
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
          </div>
        </Section>

        {/* Section 3: Relationship Management */}
        {businessModel === 'household' && (
          <Section id="relationships" title="Relationship Management" icon="🔗">
            <div className="space-y-6">
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
          </Section>
        )}

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
            <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold mb-4 text-gray-900">Customer Data Structure</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "customerId": "CUST_789456",
  "profile": {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phone": "+1-555-0123",
    "dateOfBirth": "1982-03-15",
    "address": "123 Main St, City, State"${customFields.length > 0 ? `,
    ${customFields.map(f => `"${f.id}": "..."`).join(',\n    ')}` : ''}
  },${businessModel === 'household' && enableRelationships ? `
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
  "membershipType": "${businessModel}",
  "createdAt": "2025-01-15T10:30:00Z"
}`}
              </pre>
            </div>

            {businessModel === 'household' && enableRelationships && (
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
    </motion.div>
  );
};
