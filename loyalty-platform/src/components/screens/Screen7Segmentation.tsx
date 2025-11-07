import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useOnboardingStore, type Segment } from '../../store/onboardingStore';
import { Users, Zap, Sliders, Plus } from 'lucide-react';

const segmentationMethods = [
  { id: 'rfm', name: 'RFM Segmentation', desc: 'Recency, Frequency, Monetary analysis (Recommended)', icon: Users },
  { id: 'demographic', name: 'Demographic', desc: 'Based on customer attributes like age, location', icon: Sliders },
  { id: 'custom', name: 'Custom Rules', desc: 'Build your own segmentation logic', icon: Zap },
];

const colorOptions = [
  { value: 'green', class: 'bg-green-500' },
  { value: 'blue', class: 'bg-gray-500' },
  { value: 'cyan', class: 'bg-cyan-500' },
  { value: 'purple', class: 'bg-purple-500' },
  { value: 'indigo', class: 'bg-indigo-500' },
  { value: 'yellow', class: 'bg-yellow-500' },
  { value: 'orange', class: 'bg-orange-500' },
  { value: 'red', class: 'bg-red-500' },
  { value: 'rose', class: 'bg-rose-500' },
  { value: 'gray', class: 'bg-gray-500' },
  { value: 'slate', class: 'bg-slate-500' },
];

export const Screen7Segmentation: React.FC = () => {
  const {
    segmentationMethod,
    rfmThresholds,
    segments,
    enableMLSubsegments,
    setSegmentationMethod,
    updateRFMThresholds,
    updateSegment,
    setEnableMLSubsegments,
  } = useOnboardingStore();

  const [showSegmentModal, setShowSegmentModal] = useState(false);
  const [editingSegment, setEditingSegment] = useState<Segment | null>(null);
  const [segmentForm, setSegmentForm] = useState<Partial<Segment>>({
    name: '',
    description: '',
    color: 'blue',
    enabled: true,
  });

  const handleEditSegment = (segment: Segment) => {
    setEditingSegment(segment);
    setSegmentForm({
      name: segment.name,
      description: segment.description,
      color: segment.color,
      enabled: segment.enabled,
    });
    setShowSegmentModal(true);
  };

  const handleSaveSegment = () => {
    if (editingSegment && segmentForm.name) {
      updateSegment(editingSegment.id, segmentForm);
      setShowSegmentModal(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Segmentation Strategy</h1>
          <p className="text-gray-600 text-lg">Define how you'll segment customers for personalization and targeting</p>
        </div>

        {/* Segmentation Method Selection */}
        <Card className="p-5 mb-8">
          <h3 className="text-xl font-semibold mb-4">Segmentation Method</h3>
          <div className="grid grid-cols-3 gap-4">
            {segmentationMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.id}
                  onClick={() => setSegmentationMethod(method.id as any)}
                  className={`p-6 border rounded-lg cursor-pointer transition-all ${
                    segmentationMethod === method.id
                      ? 'border-primary bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon size={32} className="text-brand-600 mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-1">{method.name}</h4>
                  <p className="text-sm text-gray-600">{method.desc}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* RFM Configuration */}
        {segmentationMethod === 'rfm' && (
          <Card className="p-5 mb-8">
            <h3 className="text-xl font-semibold mb-4">RFM Threshold Configuration</h3>
            <p className="text-sm text-gray-600 mb-5">
              Configure the thresholds that determine how customers are scored on Recency, Frequency, and Monetary dimensions.
              Scores range from 1 (low) to 5 (high).
            </p>

            <div className="grid grid-cols-3 gap-5">
              {/* Recency */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Recency (Days)</h4>
                <p className="text-xs text-gray-600 mb-3">Days since last purchase</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">High Score (&lt;)</label>
                    <input
                      type="number"
                      value={rfmThresholds.recency.high}
                      onChange={(e) => updateRFMThresholds({
                        recency: { ...rfmThresholds.recency, high: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Score 5: Purchased within {rfmThresholds.recency.high} days</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Low Score (&gt;)</label>
                    <input
                      type="number"
                      value={rfmThresholds.recency.low}
                      onChange={(e) => updateRFMThresholds({
                        recency: { ...rfmThresholds.recency, low: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Score 1: Purchased &gt; {rfmThresholds.recency.low} days ago</p>
                  </div>
                </div>
              </div>

              {/* Frequency */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Frequency (Count)</h4>
                <p className="text-xs text-gray-600 mb-3">Number of purchases</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">High Score (&gt;)</label>
                    <input
                      type="number"
                      value={rfmThresholds.frequency.high}
                      onChange={(e) => updateRFMThresholds({
                        frequency: { ...rfmThresholds.frequency, high: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Score 5: More than {rfmThresholds.frequency.high} purchases</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Low Score (&lt;)</label>
                    <input
                      type="number"
                      value={rfmThresholds.frequency.low}
                      onChange={(e) => updateRFMThresholds({
                        frequency: { ...rfmThresholds.frequency, low: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Score 1: Less than {rfmThresholds.frequency.low} purchases</p>
                  </div>
                </div>
              </div>

              {/* Monetary */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Monetary (Value)</h4>
                <p className="text-xs text-gray-600 mb-3">Total spend amount</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">High Score (&gt;)</label>
                    <input
                      type="number"
                      value={rfmThresholds.monetary.high}
                      onChange={(e) => updateRFMThresholds({
                        monetary: { ...rfmThresholds.monetary, high: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Score 5: Spent &gt; ${rfmThresholds.monetary.high}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Low Score (&lt;)</label>
                    <input
                      type="number"
                      value={rfmThresholds.monetary.low}
                      onChange={(e) => updateRFMThresholds({
                        monetary: { ...rfmThresholds.monetary, low: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Score 1: Spent &lt; ${rfmThresholds.monetary.low}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 border border-blue-200 rounded-lg text-sm text-blue-900">
              <strong>Note:</strong> RFM scores are automatically calculated based on these thresholds. Scores 2-4 are distributed between the high and low values.
            </div>
          </Card>
        )}

        {/* Demographic Configuration */}
        {segmentationMethod === 'demographic' && (
          <Card className="p-5 mb-8">
            <h3 className="text-xl font-semibold mb-4">Demographic Segmentation Configuration</h3>
            <p className="text-sm text-gray-600 mb-5">
              Demographic segments are based on customer attributes configured in the Organization screen.
              Select which demographic dimensions to use for segmentation.
            </p>

            <div className="grid grid-cols-3 gap-5">
              {/* Age Groups */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="flex items-center gap-2 mb-3">
                  <input type="checkbox" className="w-4 h-4 text-brand-600 rounded" defaultChecked />
                  <span className="font-semibold text-gray-900">Age Groups</span>
                </label>
                <p className="text-xs text-gray-600 mb-3">Segment by customer age ranges</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div>• Gen Z (18-27)</div>
                  <div>• Millennials (28-43)</div>
                  <div>• Gen X (44-59)</div>
                  <div>• Boomers (60+)</div>
                </div>
              </div>

              {/* Income Brackets */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="flex items-center gap-2 mb-3">
                  <input type="checkbox" className="w-4 h-4 text-brand-600 rounded" defaultChecked />
                  <span className="font-semibold text-gray-900">Income Brackets</span>
                </label>
                <p className="text-xs text-gray-600 mb-3">Segment by income levels</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div>• High Income</div>
                  <div>• Middle Income</div>
                  <div>• Budget-Conscious</div>
                </div>
              </div>

              {/* Location Type */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="flex items-center gap-2 mb-3">
                  <input type="checkbox" className="w-4 h-4 text-brand-600 rounded" defaultChecked />
                  <span className="font-semibold text-gray-900">Location Type</span>
                </label>
                <p className="text-xs text-gray-600 mb-3">Segment by geographic area</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div>• Urban Dwellers</div>
                  <div>• Suburban Families</div>
                  <div>• Rural Customers</div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 border border-blue-200 rounded-lg text-sm text-blue-900">
              <strong>Note:</strong> Demographic data will be collected during customer registration and enriched through third-party data providers.
            </div>
          </Card>
        )}

        {/* Custom Rules Configuration */}
        {segmentationMethod === 'custom' && (
          <Card className="p-5 mb-8">
            <h3 className="text-xl font-semibold mb-4">Custom Rule Builder</h3>
            <p className="text-sm text-gray-600 mb-5">
              Build custom segments by combining multiple criteria with AND/OR logic.
              Create sophisticated segments tailored to your specific business needs.
            </p>

            <div className="space-y-4">
              {/* Example Rule Builder UI */}
              <div className="p-4 border border-dashed border-gray-300 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-semibold text-gray-700">IF</span>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>Total Spend</option>
                    <option>Purchase Frequency</option>
                    <option>Days Since Last Purchase</option>
                    <option>Average Order Value</option>
                    <option>Product Category</option>
                    <option>Age Group</option>
                    <option>Location</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>is greater than</option>
                    <option>is less than</option>
                    <option>equals</option>
                    <option>is between</option>
                    <option>contains</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Value"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-32"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="secondary" size="sm" className="text-xs">
                    + AND Condition
                  </Button>
                  <Button variant="secondary" size="sm" className="text-xs">
                    + OR Condition
                  </Button>
                </div>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="text-sm text-purple-900">
                  <strong>Example Custom Segment:</strong>
                  <div className="mt-2 text-xs space-y-1">
                    <div>• High-Value Weekend Shoppers: Total Spend &gt; $1000 AND Last Purchase on Weekend</div>
                    <div>• Lapsed VIPs: Total Spend &gt; $5000 AND Days Since Last Purchase &gt; 90</div>
                    <div>• Young Professionals: Age 25-35 AND Income &gt; $75k AND Urban Location</div>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <Plus size={16} className="mr-2" />
                Create New Custom Segment
              </Button>
            </div>
          </Card>
        )}

        {/* Segment List */}
        <Card className="p-5 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Customer Segments</h3>
            {segments.length > 0 && (
              <span className="text-sm text-gray-600">{segments.filter(s => s.enabled).length} of {segments.length} enabled</span>
            )}
          </div>

          {segments.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {segments.map((segment) => (
                <div
                  key={segment.id}
                  onClick={() => handleEditSegment(segment)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    segment.enabled
                      ? 'border-gray-200 hover:border-primary bg-white'
                      : 'border-gray-100 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${colorOptions.find(c => c.value === segment.color)?.class || 'bg-gray-400'}`}></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{segment.name}</div>
                      <div className="text-xs text-gray-600">{segment.description}</div>
                      {segment.rfmScore && (
                        <div className="text-xs text-gray-500 mt-1">RFM Score: {segment.rfmScore}</div>
                      )}
                      {segment.criteria && Object.keys(segment.criteria).length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {Object.entries(segment.criteria).map(([key, value]) => (
                            <span key={key} className="mr-2">{key}: {String(value)}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={segment.enabled}
                      onChange={(e) => {
                        e.stopPropagation();
                        updateSegment(segment.id, { enabled: e.target.checked });
                      }}
                      className="w-4 h-4 text-brand-600 rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600">No segments configured yet.</p>
              <p className="text-sm text-gray-500 mt-2">
                {segmentationMethod === 'custom'
                  ? 'Use the Custom Rule Builder above to create your first segment.'
                  : 'Select a segmentation method to see available segments.'}
              </p>
            </div>
          )}
        </Card>

        {/* ML Subsegments */}
        <Card className="p-5">
          <div className="flex items-start gap-4">
            <input
              type="checkbox"
              checked={enableMLSubsegments}
              onChange={(e) => setEnableMLSubsegments(e.target.checked)}
              className="w-5 h-5 text-brand-600 rounded mt-1"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Enable ML-Powered Micro-Segmentation</h3>
              <p className="text-sm text-gray-600 mb-3">
                AI will automatically create dynamic sub-segments within each main segment based on behavioral patterns,
                allowing for even more precise targeting and personalization.
              </p>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-900">
                <strong>How it works:</strong> Machine learning algorithms analyze customer behavior patterns to identify micro-segments
                like "Weekend Shoppers", "High-Value Browsers", "Price-Sensitive Buyers" within each main segment.
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Segment Edit Modal */}
      <Modal isOpen={showSegmentModal} onClose={() => setShowSegmentModal(false)} title="Edit Segment">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Segment Name</label>
            <input
              type="text"
              value={segmentForm.name || ''}
              onChange={(e) => setSegmentForm({ ...segmentForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={segmentForm.description || ''}
              onChange={(e) => setSegmentForm({ ...segmentForm, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <div className="grid grid-cols-6 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSegmentForm({ ...segmentForm, color: color.value })}
                  className={`w-full h-10 rounded border transition-all ${
                    segmentForm.color === color.value ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <div className={`w-full h-full rounded ${color.class}`}></div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              checked={segmentForm.enabled !== false}
              onChange={(e) => setSegmentForm({ ...segmentForm, enabled: e.target.checked })}
              className="w-4 h-4 text-brand-600 rounded"
            />
            <span className="text-sm text-gray-700">Enable this segment</span>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowSegmentModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSaveSegment} className="flex-1">
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};
