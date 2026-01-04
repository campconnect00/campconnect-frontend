import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  icon: React.ComponentType<{ className: string }>;
  title: string;
  value: string | number;
  subtitle: string;
  badge?: string;
  badgeColor?: 'green' | 'blue' | 'purple' | 'amber' | 'red';
  trend?: string;
  trendDirection?: 'up' | 'down';
}

const badgeColors = {
  green: 'bg-green-100 text-green-700 border-green-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  amber: 'bg-amber-100 text-amber-700 border-amber-200',
  red: 'bg-red-100 text-red-700 border-red-200',
};

const iconBgColors = {
  green: 'bg-green-50',
  blue: 'bg-blue-50',
  purple: 'bg-purple-50',
  amber: 'bg-amber-50',
  red: 'bg-red-50',
};

export const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  title,
  value,
  subtitle,
  badge,
  badgeColor = 'green',
  trend,
  trendDirection = 'up',
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${iconBgColors[badgeColor]} group-hover:scale-110 transition-transform`}>
        <Icon className={`w-6 h-6 text-${badgeColor === 'green' ? 'green' : badgeColor === 'blue' ? 'blue' : badgeColor === 'purple' ? 'purple' : badgeColor === 'amber' ? 'amber' : 'red'}-600`} />
      </div>
      {badge && (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeColors[badgeColor]}`}>
          {badge}
        </span>
      )}
    </div>

    <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
    <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
    <p className="text-sm text-gray-500">{subtitle}</p>

    {trend && (
      <div className={`mt-3 flex items-center text-sm font-medium ${trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
        {trendDirection === 'up' ? (
          <TrendingUp className="w-4 h-4 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 mr-1" />
        )}
        {trend}
      </div>
    )}
  </div>
);
