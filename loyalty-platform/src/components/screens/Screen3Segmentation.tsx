import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useOnboardingStore, type Segment } from '../../store/onboardingStore';
import { Users, Zap, Sliders } from 'lucide-react';

const segmentationMethods = [
  { id: 'rfm', name: 'RFM Segmentation', desc: 'Recency, Frequency, Monetary analysis (Recommended)', icon: Users },
  { id: 'demographic', name: 'Demographic', desc: 'Based on customer attributes like age, location', icon: Sliders },
  { id: 'custom', name: 'Custom Rules', desc: 'Build your own segmentation logic', icon: Zap },
];

const colorOptions = [
  { value: 'green', class: 'bg-green-500' },
  { value: 'blue', class: 'bg-blue-500' },
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

export const Screen3Segmentation: React.FC = () => {
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Segmentation Strategy</h1>
          <p className="text-gray-600 text-lg">Define how you'll segment customers for personalization and targeting</p>
        </div>

        {/* Segmentation Method Selection */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Segmentation Method</h3>
          <div className="grid grid-cols-3 gap-4">
            {segmentationMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.id}
                  onClick={() => setSegmentationMethod(method.id as any)}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    segmentationMethod === method.id
                      ? 'border-primary bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon size={32} className="text-primary mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-1">{method.name}</h4>
                  <p className="text-sm text-gray-600">{method.desc}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* RFM Configuration */}
        {segmentationMethod === 'rfm' && (
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">RFM Threshold Configuration</h3>
            <p className="text-sm text-gray-600 mb-6">
              Configure the thresholds that determine how customers are scored on Recency, Frequency, and Monetary dimensions.
              Scores range from 1 (low) to 5 (high).
            </p>

            <div className="grid grid-cols-3 gap-6">
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

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
              <strong>Note:</strong> RFM scores are automatically calculated based on these thresholds. Scores 2-4 are distributed between the high and low values.
            </div>
          </Card>
        )}

        {/* Demographic Configuration */}
        {segmentationMethod === 'demographic' && (
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Demographic Segmentation</h3>
            <div className="p-8 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600">
                Demographic segmentation will use the entity attributes you configured in the Organization screen.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Segments will be created based on age groups, locations, income brackets, and other demographic data.
              </p>
            </div>
          </Card>
        )}

        {/* Custom Rules Configuration */}
        {segmentationMethod === 'custom' && (
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Custom Rule Builder</h3>
            <div className="p-8 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600">
                Custom rule builder allows you to create segments with advanced logic combining multiple criteria.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This feature will be configured in a later step of the onboarding process.
              </p>
            </div>
          </Card>
        )}

        {/* Segment List */}
        <Card className="p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Customer Segments</h3>
            <span className="text-sm text-gray-600">{segments.filter(s => s.enabled).length} of {segments.length} enabled</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {segments.map((segment) => (
              <div
                key={segment.id}
                onClick={() => handleEditSegment(segment)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
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
                  </div>
                  <input
                    type="checkbox"
                    checked={segment.enabled}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateSegment(segment.id, { enabled: e.target.checked });
                    }}
                    className="w-4 h-4 text-primary rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ML Subsegments */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <input
              type="checkbox"
              checked={enableMLSubsegments}
              onChange={(e) => setEnableMLSubsegments(e.target.checked)}
              className="w-5 h-5 text-primary rounded mt-1"
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
                  className={`w-full h-10 rounded border-2 transition-all ${
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
              className="w-4 h-4 text-primary rounded"
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
