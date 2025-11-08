import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import { useOnboardingStore } from '../../store/onboardingStore';
import { Star, Check, Bot, Plus, Settings, Trash2, AlertCircle, TrendingUp, Activity, GitCompare, Zap } from 'lucide-react';
import { SignalTemplateBuilder } from '../queue/SignalTemplateBuilder';
import type { SignalTemplate } from '../../store/onboardingStore';

export const Screen11Queues: React.FC = () => {
  const { queues, updateQueue, addSignal, updateSignal, removeSignal } = useOnboardingStore();
  const [expandedQueue, setExpandedQueue] = useState<string | null>(null);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [currentQueue, setCurrentQueue] = useState<{ id: string; name: string } | null>(null);
  const [editingSignal, setEditingSignal] = useState<SignalTemplate | null>(null);

  const handleAddSignal = (queueId: string, queueName: string) => {
    setCurrentQueue({ id: queueId, name: queueName });
    setEditingSignal(null);
    setBuilderOpen(true);
  };

  const handleEditSignal = (queueId: string, queueName: string, signal: SignalTemplate) => {
    setCurrentQueue({ id: queueId, name: queueName });
    setEditingSignal(signal);
    setBuilderOpen(true);
  };

  const handleSaveSignal = (signal: SignalTemplate) => {
    if (!currentQueue) return;

    if (editingSignal) {
      // Update existing signal
      updateSignal(currentQueue.id, signal.id, signal);
    } else {
      // Add new signal
      addSignal(currentQueue.id, signal);
    }

    setBuilderOpen(false);
    setEditingSignal(null);
    setCurrentQueue(null);
  };

  const handleRemoveSignal = (queueId: string, signalId: string) => {
    if (confirm('Are you sure you want to delete this signal template?')) {
      removeSignal(queueId, signalId);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getOperatorIcon = (operator: string) => {
    switch (operator) {
      case 'trend':
        return TrendingUp;
      case 'percentage_change':
        return Activity;
      case 'comparative':
        return GitCompare;
      case 'anomaly':
        return Zap;
      case 'threshold_breach':
        return AlertCircle;
      default:
        return Activity;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Star className="text-brand-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Queue Intelligence Configuration</h1>
          </div>
          <p className="text-gray-600 text-lg">Configure queue-based operational intelligence (key differentiator)</p>
          <p className="text-sm text-gray-500 mt-2">
            Build signal templates that algorithmically detect operational patterns. Signals feed into queues for human-in-the-loop review before automation.
          </p>
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> All signals configured here will be visible in their respective queues. Disabled signals remain in the queue but won't trigger alerts.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {queues.map((queue) => {
            const isExpanded = expandedQueue === queue.id;
            const signalCount = queue.signals?.length || 0;
            const enabledSignalCount = queue.signals?.filter((s) => s.enabled).length || 0;

            return (
              <Card key={queue.id} className="overflow-hidden">
                {/* Queue Header */}
                <div className="p-5 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{queue.name}</h3>
                        <Toggle checked={queue.enabled} onChange={(enabled) => updateQueue(queue.id, { enabled })} />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{queue.description}</p>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Signals:</span>
                          <span className="font-semibold text-brand-600">
                            {enabledSignalCount} / {signalCount} active
                          </span>
                        </div>
                        <button
                          onClick={() => setExpandedQueue(isExpanded ? null : queue.id)}
                          className="text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
                        >
                          {isExpanded ? 'Hide' : 'Show'} Signals
                          <span className="text-xs">{isExpanded ? '▲' : '▼'}</span>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddSignal(queue.id, queue.name)}
                      className="ml-4 px-4 py-2 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition-colors flex items-center gap-2"
                    >
                      <Plus size={18} />
                      Build Signal
                    </button>
                  </div>
                </div>

                {/* Expanded Signal List */}
                {isExpanded && (
                  <div className="p-5">
                    {signalCount === 0 ? (
                      <div className="text-center py-12">
                        <AlertCircle size={48} className="text-gray-300 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">No Signal Templates Yet</h4>
                        <p className="text-gray-500 mb-4">
                          Create your first signal template to start detecting operational patterns
                        </p>
                        <button
                          onClick={() => handleAddSignal(queue.id, queue.name)}
                          className="px-6 py-2 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition-colors"
                        >
                          Build Your First Signal
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {queue.signals?.map((signal) => {
                          const OperatorIcon = getOperatorIcon(signal.operator);

                          return (
                            <div
                              key={signal.id}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                signal.enabled
                                  ? 'border-brand-200 bg-white'
                                  : 'border-gray-200 bg-gray-50 opacity-60'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <Toggle
                                      checked={signal.enabled}
                                      onChange={(enabled) => updateSignal(queue.id, signal.id, { enabled })}
                                    />
                                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(signal.priority)}`}></div>
                                    <h4 className="font-semibold text-gray-900">{signal.name}</h4>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full uppercase font-medium">
                                      {signal.priority}
                                    </span>
                                  </div>

                                  <p className="text-sm text-gray-600 mb-3 ml-12">{signal.description}</p>

                                  {/* Signal Configuration Summary */}
                                  <div className="ml-12 flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                      <OperatorIcon size={16} className="text-gray-400" />
                                      <span className="text-gray-600">Metric:</span>
                                      <span className="font-medium">{signal.metric}</span>
                                    </div>
                                    <div className="text-gray-300">|</div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-gray-600">Operator:</span>
                                      <span className="font-medium capitalize">{signal.operator.replace('_', ' ')}</span>
                                    </div>
                                    <div className="text-gray-300">|</div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-gray-600">Period:</span>
                                      <span className="font-medium">{signal.period}</span>
                                    </div>
                                    <div className="text-gray-300">|</div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-gray-600">Threshold:</span>
                                      <span className="font-medium">
                                        {signal.condition === 'greater_than' && '>'}
                                        {signal.condition === 'less_than' && '<'}
                                        {signal.condition === 'equals' && '='}
                                        {signal.condition === 'between' && ''}
                                        {' '}
                                        {signal.threshold}
                                        {signal.unit === 'percentage' && '%'}
                                        {signal.unit === 'currency' && '$'}
                                        {signal.condition === 'between' && ` - ${signal.thresholdMax}`}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="ml-12 mt-3 flex flex-wrap gap-2">
                                    {signal.actions.map((action, idx) => (
                                      <span
                                        key={idx}
                                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full flex items-center gap-1"
                                      >
                                        <Check size={12} />
                                        {action}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 ml-4">
                                  <button
                                    onClick={() => handleEditSignal(queue.id, queue.name, signal)}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Edit signal"
                                  >
                                    <Settings size={18} />
                                  </button>
                                  <button
                                    onClick={() => handleRemoveSignal(queue.id, signal.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete signal"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Active Signals Overview (Collapsed View) */}
                {!isExpanded && (
                  <div className="p-5">
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Active Signals ({enabledSignalCount}):</h4>
                      {enabledSignalCount > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {queue.signals
                            ?.filter((s) => s.enabled)
                            .map((signal) => (
                              <span
                                key={signal.id}
                                className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-medium flex items-center gap-1"
                              >
                                <div className={`w-1.5 h-1.5 rounded-full ${getPriorityColor(signal.priority)}`}></div>
                                {signal.name}
                              </span>
                            ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No active signals - click "Build Signal" to create</p>
                      )}
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Automation Readiness:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-gray-700">Phase 1: Signal Detection</span>
                          </div>
                          <span className="text-xs font-semibold text-blue-600">{enabledSignalCount} Active</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                            <span className="text-gray-700">Phase 2: ML Pattern Analysis</span>
                          </div>
                          <span className="text-xs font-semibold text-gray-500">Pending Data</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                            <span className="text-gray-700">Phase 3: Human Validation</span>
                          </div>
                          <span className="text-xs font-semibold text-gray-500">0 In Review</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-gray-700">Phase 4: Full Automation</span>
                          </div>
                          <span className="text-xs font-semibold text-gray-500">0 Automated</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <label className="block text-xs font-semibold mb-2 text-gray-700">Detection Sensitivity</label>
                      <input type="range" min="1" max="100" defaultValue="70" className="w-full" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Conservative</span>
                        <span>Aggressive</span>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 p-5 bg-gray-50 border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Bot size={20} className="text-brand-600" />
            <h3 className="text-lg font-semibold">Intelligence Level</h3>
          </div>
          <p className="text-sm text-gray-700 mb-4">
            Queues continuously learn from your data and become more accurate over time. The system will start conservative and gradually increase confidence.
          </p>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Queue Items Processed', value: '0' },
              { label: 'Patterns Identified', value: '0' },
              { label: 'Actions Triggered', value: '0' },
              { label: 'Confidence Level', value: 'Learning' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-brand-600 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mt-5 p-5 bg-blue-50 border border-blue-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Signal Factory Approach</h3>
              <p className="text-sm text-blue-800 mb-2">
                Signals are algorithmic detectors that feed into queues for human review. After sufficient review cycles, signals can be promoted to fully automated actions.
              </p>
              <p className="text-sm text-blue-800">
                <strong>Phase 1:</strong> Linear/algorithmic signal detection → <strong>Phase 2:</strong> ML pattern analysis → <strong>Phase 3:</strong> Human-in-the-loop validation → <strong>Phase 4:</strong> Automated actions
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Signal Template Builder Modal */}
      {currentQueue && (
        <SignalTemplateBuilder
          isOpen={builderOpen}
          onClose={() => {
            setBuilderOpen(false);
            setEditingSignal(null);
            setCurrentQueue(null);
          }}
          queueId={currentQueue.id}
          queueName={currentQueue.name}
          existingSignal={editingSignal || undefined}
          onSave={handleSaveSignal}
        />
      )}
    </motion.div>
  );
};
