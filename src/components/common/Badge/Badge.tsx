import React from 'react';
import clsx from 'clsx';

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | 'primary'
    | 'success'
    | 'warning'
    | 'info'
    | 'default'
    | 'recommended';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
}) => {
  const baseClasses = clsx(
    'inline-flex items-center font-medium rounded-full',
    'transition-all duration-200',
    'shadow-sm backdrop-blur-sm'
  );

  const variantClasses = {
    primary: 'bg-primary/90 text-white border border-primary/30',
    success: 'bg-success/90 text-white border border-success/30',
    warning: 'bg-warning/95 text-text-primary border border-warning/30',
    info: 'bg-accent-soft text-primary border border-primary/20',
    default: 'bg-bg-muted text-text-muted border border-border-soft',
    recommended:
      'bg-gradient-to-r from-success to-primary text-white font-semibold shadow-md',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
};
