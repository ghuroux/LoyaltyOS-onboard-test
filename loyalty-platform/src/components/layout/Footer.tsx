import React from 'react';
import { Button } from '../ui/Button';
import { Save, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface FooterProps {
  currentScreen: number;
  totalScreens: number;
  onNext: () => void;
  onPrevious: () => void;
  onSaveDraft?: () => void;
  onValidate?: () => void;
  canProceed?: boolean;
  validationErrors?: number;
}

const screenLabels = [
  'Configuration Dashboard',
  'Platform Basics',
  'External Integrations',
  'Organization & Customer Structure',
  'Points & Currency',
  'Tier & Status Levels',
  'Earning Rules',
  'Redemption & Rewards',
  'Campaign Templates',
  'Member Portal',
  'Analytics & Reporting',
  'Notifications',
  'Workflow & Automation',
  'Review & Deploy',
];

export const Footer: React.FC<FooterProps> = ({
  currentScreen,
  totalScreens,
  onNext,
  onPrevious,
  onSaveDraft,
  onValidate,
  canProceed = true,
  validationErrors = 0,
}) => {
  return (
    <div className="bg-white border-t border-gray-200 px-10 py-5">
      <div className="flex justify-between items-center">
        {/* Left: Step Info */}
        <div>
          <div className="text-sm font-semibold text-gray-900">
            Step {currentScreen + 1} of {totalScreens}
          </div>
          <div className="text-xs text-gray-500">{screenLabels[currentScreen]}</div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Save Draft */}
          {onSaveDraft && (
            <Button variant="secondary" size="sm" onClick={onSaveDraft}>
              <Save size={16} className="mr-2" />
              Save Draft
            </Button>
          )}

          {/* Validate */}
          {onValidate && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onValidate}
              className={validationErrors > 0 ? 'border-yellow-500 text-yellow-700' : ''}
            >
              <CheckCircle size={16} className="mr-2" />
              Validate
              {validationErrors > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                  {validationErrors}
                </span>
              )}
            </Button>
          )}

          {/* Navigation */}
          <div className="flex gap-2 ml-4 pl-4 border-l border-gray-300">
            {currentScreen > 0 && (
              <Button variant="secondary" onClick={onPrevious}>
                <ArrowLeft size={16} className="mr-2" />
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
                <ArrowRight size={16} className="ml-2" />
              </Button>
            ) : (
              <Button variant="primary" onClick={onNext} disabled={!canProceed}>
                <CheckCircle size={16} className="mr-2" />
                Complete Setup
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
