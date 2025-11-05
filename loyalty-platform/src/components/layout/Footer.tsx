import React from 'react';
import { Button } from '../ui/Button';

interface FooterProps {
  currentScreen: number;
  totalScreens: number;
  onNext: () => void;
  onPrevious: () => void;
}

const screenLabels = [
  'Business Discovery',
  'Organization Structure',
  'Value Mechanisms',
  'Customer Segmentation',
  'Earning Rules',
  'Redemption Rules',
  'Campaign Framework',
  'Queue Intelligence',
  'Data Strategy',
  'Integrations',
  'Analytics & KPIs',
  'Flow Orchestration',
  'Deployment',
];

export const Footer: React.FC<FooterProps> = ({
  currentScreen,
  totalScreens,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="bg-white border-t border-gray-200 px-10 py-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Step {currentScreen + 1} of {totalScreens} • {screenLabels[currentScreen]}
        </div>
        <div className="flex gap-3">
          {currentScreen > 0 && (
            <Button variant="secondary" onClick={onPrevious}>
              Back
            </Button>
          )}
          {currentScreen < totalScreens - 1 ? (
            <Button variant="primary" onClick={onNext}>
              Continue
            </Button>
          ) : (
            <Button variant="primary" onClick={onNext}>
              Complete Setup
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
