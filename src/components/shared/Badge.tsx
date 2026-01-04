import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

const variantClasses = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'info',
  className,
}) => {
  return (
    <span
      className={clsx(
        'px-3 py-1 rounded-full text-xs font-medium inline-block',
        variantClasses[variant],
        className
      )}
    >
      {label}
    </span>
  );
};
