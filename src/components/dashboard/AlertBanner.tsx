import React from 'react';
import { AlertTriangle, X, Eye, Check } from 'lucide-react';
import { Alert, COLORS } from '../../data/mockData';

interface AlertBannerProps {
  alert: Alert;
  onViewDetails: () => void;
  onApprove: () => void;
  onDismiss: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  alert,
  onViewDetails,
  onApprove,
  onDismiss,
}) => {
  if (!alert?.show) return null;

  const agentColor = COLORS.agents[alert.agentKey] || COLORS.alertAmber;

  return (
    <div
      className="relative overflow-hidden rounded-xl border-2 border-amber-400 bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 p-5 shadow-lg"
      style={{ borderLeftColor: agentColor, borderLeftWidth: '4px' }}
    >
      {/* Animated pulse effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400 animate-pulse" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          {/* Agent Icon */}
          <div
            className="p-3 rounded-full shadow-md"
            style={{ backgroundColor: agentColor }}
          >
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-bold text-gray-900 text-lg">{alert.agent}</span>
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-white border border-amber-300 text-amber-700 shadow-sm">
                {alert.confidence}% confidence
              </span>
            </div>

            <p className="text-gray-800 font-semibold text-lg mb-3">
              ⚠️ {alert.message}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/70 rounded-lg px-3 py-2">
                <span className="text-gray-500">Current Stock</span>
                <p className="font-semibold text-gray-900">{alert.currentStock}</p>
              </div>
              <div className="bg-white/70 rounded-lg px-3 py-2">
                <span className="text-gray-500">Daily Usage</span>
                <p className="font-semibold text-gray-900">{alert.dailyUsage}</p>
              </div>
              <div className="bg-white/70 rounded-lg px-3 py-2">
                <span className="text-gray-500">Shortage Date</span>
                <p className="font-semibold text-red-600">{alert.predictedShortage}</p>
              </div>
              <div className="bg-white/70 rounded-lg px-3 py-2">
                <span className="text-gray-500">Recommendation</span>
                <p className="font-semibold text-blue-700 truncate">{alert.recommendedAction}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onViewDetails}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-sm transition-all font-medium text-gray-700"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          <button
            onClick={onApprove}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition-all font-medium"
          >
            <Check className="w-4 h-4" />
            Approve Order
          </button>
          <button
            onClick={onDismiss}
            className="flex items-center justify-center p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg transition-all"
            title="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
