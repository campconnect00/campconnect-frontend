import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  clickable = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-md border border-gray-100 p-6',
        clickable && 'cursor-pointer hover:shadow-lg transition',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
