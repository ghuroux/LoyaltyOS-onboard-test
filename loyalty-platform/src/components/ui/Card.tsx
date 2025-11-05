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
  const baseClasses = 'bg-white rounded-xl shadow-card transition-all duration-200';
  const clickableClasses = clickable ? 'cursor-pointer hover:-translate-y-1 hover:shadow-card-hover' : '';
  const selectedClasses = selected ? 'border-2 border-primary ring-2 ring-primary/20' : 'border-2 border-transparent';

  return (
    <motion.div
      whileHover={clickable ? { y: -4 } : {}}
      onClick={onClick}
      className={`${baseClasses} ${clickableClasses} ${selectedClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};
