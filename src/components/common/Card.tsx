import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'interactive';
  glow?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  glow = false,
  className = '',
  ...props
}) => {
  const variantStyles = {
    glass: 'bg-background-card backdrop-blur-md border border-border',
    solid: 'bg-background-secondary border border-border',
    interactive:
      'bg-background-card backdrop-blur-md border border-border hover:border-primary/40 hover:bg-background-hover transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer',
  };

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden p-6 ${variantStyles[variant]} ${
        glow ? 'shadow-glow-subtle' : ''
      } ${className}`}
      {...props}
    >
      {glow && (
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      )}
      {children}
    </motion.div>
  );
};
