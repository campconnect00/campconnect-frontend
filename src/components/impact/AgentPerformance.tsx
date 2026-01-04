import React from 'react';
import { Badge } from '../shared/Badge';

interface Agent {
  id: string;
  name: string;
  successRate: number;
  decisionsCount: number;
  color: string;
}

interface AgentPerformanceProps {
  agents: Agent[];
}

export const AgentPerformance: React.FC<AgentPerformanceProps> = ({ agents }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Performance</h3>
      <div className="space-y-4">
        {agents.map((agent) => (
          <div key={agent.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: agent.color }}
                />
                <h4 className="font-medium text-gray-900">{agent.name}</h4>
              </div>
              <Badge variant="success" label={`${agent.successRate}%`} />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Decisions Made: {agent.decisionsCount}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${agent.successRate}%`,
                    backgroundColor: agent.color,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
