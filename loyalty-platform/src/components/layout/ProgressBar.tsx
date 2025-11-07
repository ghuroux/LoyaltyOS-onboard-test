import React from 'react';
import { motion } from 'framer-motion';

interface Step {
  number: number;
  label: string;
}

const steps: Step[] = [
  { number: 0, label: 'Discovery' },
  { number: 1, label: 'Dashboard' },
  { number: 2, label: 'Basics' },
  { number: 3, label: 'Integrations' },
  { number: 4, label: 'Structure' },
  { number: 5, label: 'Value' },
  { number: 6, label: 'Redemption' },
  { number: 7, label: 'Segments' },
  { number: 8, label: 'Automations' },
  { number: 9, label: 'Safeguards' },
  { number: 10, label: 'Campaigns' },
  { number: 11, label: 'Queues' },
  { number: 12, label: 'Data' },
  { number: 13, label: 'Analytics' },
  { number: 14, label: 'Flows' },
  { number: 15, label: 'Deploy' },
];

interface ProgressBarProps {
  currentScreen: number;
  onNavigate?: (screen: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentScreen, onNavigate }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-10 py-5">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center relative">
          {steps.map((step, index) => {
            const isCompleted = index < currentScreen;
            const isActive = index === currentScreen;
            const isVisible = index <= 5; // Show only first 6 steps to save space

            if (!isVisible) return null;

            return (
              <div key={step.number} className="flex flex-col items-center gap-2 relative flex-1">
                {index < 5 && (
                  <div className="absolute top-5 left-1/2 w-full h-0.5 bg-gray-200 -z-10">
                    {isCompleted && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-secondary"
                      />
                    )}
                  </div>
                )}
                <motion.button
                  onClick={() => onNavigate && onNavigate(index)}
                  disabled={!onNavigate}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isCompleted
                      ? '#10B981'
                      : isActive
                      ? '#1E3A8A'
                      : '#ffffff',
                    borderColor: isCompleted || isActive ? 'transparent' : '#E5E7EB',
                    color: isCompleted || isActive ? '#ffffff' : '#6B7280',
                  }}
                  whileHover={onNavigate ? { scale: 1.15, cursor: 'pointer' } : {}}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm z-10 transition-transform"
                  title={`Go to ${step.label}`}
                >
                  {isCompleted ? '✓' : step.number}
                </motion.button>
                <span
                  className={`text-xs text-center ${
                    isActive ? 'text-primary font-semibold' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
          {currentScreen > 5 && (
            <button
              onClick={() => onNavigate && onNavigate(currentScreen)}
              className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
              title="Current screen"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-semibold">
                {currentScreen}
              </div>
              <span className="text-xs text-gray-500">current</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
