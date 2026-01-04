import React from 'react';
import { Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { AgentActivity, COLORS } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

interface AgentFeedProps {
  activities: AgentActivity[];
  onViewAll?: () => void;
}

const typeIcons = {
  prediction: TrendingUp,
  recommendation: CheckCircle,
  alert: AlertCircle,
  action: CheckCircle,
};

const typeLabels = {
  prediction: 'Prediction',
  recommendation: 'Recommendation',
  alert: 'Alert',
  action: 'Action',
};

export const AgentFeed: React.FC<AgentFeedProps> = ({ activities, onViewAll }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`rounded-xl shadow-sm border overflow-hidden h-full ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
      }`}>
      {/* Header */}
      <div className={`px-4 py-4 border-b ${isDark
          ? 'border-gray-700 bg-gradient-to-r from-gray-800 to-gray-750'
          : 'border-gray-200 bg-gradient-to-r from-gray-50 to-white'
        }`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Agent Activity</h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Real-time AI agent updates</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Live</span>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className={`divide-y max-h-[480px] overflow-y-auto ${isDark ? 'divide-gray-700' : 'divide-gray-100'}`}>
        {activities.map((activity) => {
          const agentColor = COLORS.agents[activity.agentKey];
          const TypeIcon = typeIcons[activity.type];

          return (
            <div
              key={activity.id}
              className={`p-4 transition-colors cursor-pointer ${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}
              style={{ borderLeftWidth: '4px', borderLeftColor: agentColor }}
            >
              {/* Agent Header */}
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm"
                  style={{ backgroundColor: agentColor }}
                >
                  {activity.agent.split(' ').map(w => w[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{activity.agent} Agent</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                      <TypeIcon className="w-3 h-3" />
                      {typeLabels[activity.type]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <p className={`text-sm mb-2 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {activity.message}
              </p>

              {/* Footer */}
              <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </div>
                {activity.confidence && (
                  <div className="flex items-center gap-1">
                    <div className={`w-12 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${activity.confidence}%`,
                          backgroundColor: agentColor
                        }}
                      />
                    </div>
                    <span>{activity.confidence}%</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className={`px-4 py-3 border-t ${isDark ? 'bg-gray-750 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <button
          onClick={onViewAll}
          className="w-full text-sm font-medium text-blue-600 hover:text-blue-800 text-center transition-colors"
        >
          View All Agent Activity →
        </button>
      </div>
    </div>
  );
};
