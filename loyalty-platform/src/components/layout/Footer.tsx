import React from 'react';
import { Button } from '../ui/Button';
import { Save, CheckCircle, ArrowLeft, ArrowRight, FileText } from 'lucide-react';

interface FooterProps {
  currentScreen: number;
  totalScreens: number;
  onNext: () => void;
  onPrevious: () => void;
  onSaveDraft?: () => void;
  onValidate?: () => void;
  onViewSpec?: () => void;
  hasSpec?: boolean;
  canProceed?: boolean;
  validationErrors?: number;
}

const screenLabels = [
  'Industry & Template Selection',
  'Configuration Dashboard',
  'Platform Basics',
  'External Integrations',
  'Organization & Customer Structure',
  'Points & Currency / Tiers',
  'Redemption & Rewards',
  'Customer Segmentation',
  'Automations & Triggers',
  'Safeguards & Controls',
  'Campaign Templates',
  'Intelligence Queues',
  'Data Strategy',
  'Analytics & KPIs',
  'Flow Orchestration',
  'Review & Deploy',
];

export const Footer: React.FC<FooterProps> = ({
  currentScreen,
  totalScreens,
  onNext,
  onPrevious,
  onSaveDraft,
  onValidate,
  onViewSpec,
  hasSpec = false,
  canProceed = true,
  validationErrors = 0,
}) => {
  return (
    <div className="bg-white border-t border-gray-200 px-8 py-4">
      <div className="flex justify-between items-center">
        {/* Left: Step Info */}
        <div>
          <div className="text-sm font-semibold text-gray-900">
            Step {currentScreen + 1} of {totalScreens}
          </div>
          <div className="text-xs text-gray-500">{screenLabels[currentScreen]}</div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {/* Save Draft */}
          {onSaveDraft && (
            <Button variant="secondary" size="sm" onClick={onSaveDraft}>
              <Save size={16} className="mr-1.5" />
              Save Draft
            </Button>
          )}

          {/* Validate */}
          {onValidate && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onValidate}
              className={validationErrors > 0 ? 'border-warning-500 text-warning-700' : ''}
            >
              <CheckCircle size={16} className="mr-1.5" />
              Validate
              {validationErrors > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-warning-100 text-warning-800 rounded-full text-xs font-semibold">
                  {validationErrors}
                </span>
              )}
            </Button>
          )}

          {/* View Spec */}
          {hasSpec && onViewSpec && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onViewSpec}
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <FileText size={16} className="mr-1.5" />
              View Spec
            </Button>
          )}

          {/* Navigation */}
          <div className="flex gap-2 ml-3 pl-3 border-l border-gray-200">
            {currentScreen > 0 && (
              <Button variant="secondary" onClick={onPrevious}>
                <ArrowLeft size={16} className="mr-1.5" />
                Back
              </Button>
            )}
            {currentScreen < totalScreens - 1 ? (
              <Button
                variant="primary"
                onClick={onNext}
                disabled={!canProceed}
                title={!canProceed ? 'Please complete required fields' : ''}
              >
                Next
                <ArrowRight size={16} className="ml-1.5" />
              </Button>
            ) : (
              <Button variant="primary" onClick={onNext} disabled={!canProceed}>
                <CheckCircle size={16} className="mr-1.5" />
                Complete Setup
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
