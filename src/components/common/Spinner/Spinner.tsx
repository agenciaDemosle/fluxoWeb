import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className,
  text,
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2
        className={clsx(
          'animate-spin text-primary',
          sizeClasses[size],
          className
        )}
      />
      {text && (
        <p className="text-sm text-text-muted font-medium">{text}</p>
      )}
    </div>
  );
};
