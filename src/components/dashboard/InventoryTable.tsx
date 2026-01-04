import React from 'react';
import { CheckCircle, AlertTriangle, Search, Filter, XCircle } from 'lucide-react';
import { InventoryItem } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

interface InventoryTableProps {
  items: InventoryItem[];
  onViewDraft?: (item: InventoryItem) => void;
  onViewAll?: () => void;
}

const statusConfig = {
  good: {
    color: 'text-green-600 bg-green-50 border-green-200',
    icon: CheckCircle,
    label: 'Good'
  },
  adequate: {
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    icon: CheckCircle,
    label: 'Adequate'
  },
  low: {
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    icon: AlertTriangle,
    label: 'Low'
  },
  critical: {
    color: 'text-red-600 bg-red-50 border-red-200',
    icon: XCircle,
    label: 'Critical'
  },
};

export const InventoryTable: React.FC<InventoryTableProps> = ({ items, onViewDraft, onViewAll }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`rounded-xl shadow-sm border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
      }`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark
          ? 'border-gray-700 bg-gradient-to-r from-gray-800 to-gray-750'
          : 'border-gray-200 bg-gradient-to-r from-gray-50 to-white'
        }`}>
        <div>
          <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Inventory Overview</h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Real-time stock levels with AI predictions</p>
        </div>
        <div className="flex gap-2">
          <button className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-colors ${isDark
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 hover:bg-gray-50'
            }`}>
            <Search className="w-4 h-4" />
            Search
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-colors ${isDark
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 hover:bg-gray-50'
            }`}>
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={isDark ? 'bg-gray-750' : 'bg-gray-50'}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                Item
              </th>
              <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                Stock
              </th>
              <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                Status
              </th>
              <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                Predicted Shortage
              </th>
              <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                Agent Action
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-100'}`}>
            {items.map((item) => {
              const status = statusConfig[item.status];
              const Icon = status.icon;

              return (
                <tr
                  key={item.id}
                  className={`transition-colors ${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.item}</span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.stock} {item.unit}
                    </span>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Usage: {item.dailyUsage} {item.unit}/day
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {item.shortage ? (
                      <div>
                        <div className="text-sm font-semibold text-red-600">{item.shortage}</div>
                        {item.confidence && (
                          <div className="flex items-center gap-1 mt-1">
                            <div className={`w-16 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${item.confidence}%` }}
                              />
                            </div>
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.confidence}% conf.</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.shortage ? (
                      <button
                        onClick={() => onViewDraft?.(item)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center gap-1"
                      >
                        View Draft Order
                        <span className="text-blue-400">→</span>
                      </button>
                    ) : (
                      <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className={`px-6 py-3 border-t flex items-center justify-between ${isDark ? 'bg-gray-750 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Showing {items.length} items • {items.filter(i => i.shortage).length} require attention
        </span>
        <button
          onClick={onViewAll}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          View All Inventory →
        </button>
      </div>
    </div>
  );
};
