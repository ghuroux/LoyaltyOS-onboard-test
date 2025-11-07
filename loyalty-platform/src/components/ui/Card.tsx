import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
  selected?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  clickable = false,
  onClick,
  selected = false,
}) => {
  const baseClasses = 'bg-white rounded-lg border border-gray-200 transition-all duration-200';
  const clickableClasses = clickable ? 'cursor-pointer hover:shadow-md hover:border-gray-300' : 'shadow-sm';
  const selectedClasses = selected ? 'border-brand-500 ring-2 ring-brand-100 shadow-md' : '';

  return (
    <motion.div
      whileHover={clickable ? { y: -2 } : {}}
      onClick={onClick}
      className={`${baseClasses} ${clickableClasses} ${selectedClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};
