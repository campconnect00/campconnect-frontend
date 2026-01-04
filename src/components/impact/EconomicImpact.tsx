import React from 'react';
import { DollarSign } from 'lucide-react';

interface EconomicImpactProps {
  savingsBenefits: number;
  investmentCost: number;
  roi: number;
}

export const EconomicImpact: React.FC<EconomicImpactProps> = ({
  savingsBenefits,
  investmentCost,
  roi,
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg shadow-md p-6 border border-blue-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg">
          <DollarSign className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Economic Impact</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4">
          <p className="text-gray-600 text-sm font-medium">Savings & Benefits</p>
          <p className="text-2xl font-bold text-green-600 mt-2">${savingsBenefits}k</p>
        </div>

        <div className="bg-white rounded-lg p-4">
          <p className="text-gray-600 text-sm font-medium">Investment Cost</p>
          <p className="text-2xl font-bold text-red-600 mt-2">${investmentCost}k</p>
        </div>

        <div className="bg-white rounded-lg p-4">
          <p className="text-gray-600 text-sm font-medium">ROI</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{roi}%</p>
        </div>
      </div>
    </div>
  );
};
