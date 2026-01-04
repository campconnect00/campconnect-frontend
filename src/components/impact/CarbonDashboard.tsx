import React from 'react';
import { Leaf, TrendingDown } from 'lucide-react';

interface CarbonDashboardProps {
  totalEmissions: number;
  reduction: number;
  target: number;
}

export const CarbonDashboard: React.FC<CarbonDashboardProps> = ({
  totalEmissions,
  reduction,
  target,
}) => {
  const progress = (reduction / target) * 100;

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-md p-6 border border-green-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-lg">
          <Leaf className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Carbon Impact</h3>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Current Emissions</span>
            <span className="text-gray-900 font-semibold">{totalEmissions} kg CO₂</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Reduction Progress</span>
            <span className="text-green-600 font-semibold flex items-center gap-1">
              <TrendingDown className="w-4 h-4" />
              {reduction} kg CO₂
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {progress.toFixed(1)}% of target ({target} kg CO₂)
          </p>
        </div>
      </div>
    </div>
  );
};
