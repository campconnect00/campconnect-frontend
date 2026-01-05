import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { AIChat } from '../components/shared/AIChat';
import { AgentAnalyticsModal } from '../components/shared/AgentAnalyticsModal';
import {
  Brain, Power, TrendingUp, AlertCircle, CheckCircle,
  Zap, Users, Leaf, DollarSign, Eye, MessageCircle, Activity,
  PlayCircle, PauseCircle, BarChart2
} from 'lucide-react';
import { mockAgents, Agent } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const AIAgents: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [agents, setAgents] = useState(mockAgents);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string>('Meta Orchestrator');
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [analyticsAgent, setAnalyticsAgent] = useState<Agent | null>(null);

  const toggleAgent = (agentId: string) => {
    setAgents(prev => prev.map(agent =>
      agent.id === agentId
        ? { ...agent, status: agent.status === 'active' ? 'idle' : 'active' as const }
        : agent
    ));
  };

  const openChatWithAgent = (agentName: string) => {
    setSelectedAgent(agentName);
    setChatOpen(true);
  };

  const openAnalytics = (agent: Agent) => {
    setAnalyticsAgent(agent);
    setAnalyticsOpen(true);
  };

  const activeCount = agents.filter(a => a.status === 'active').length;
  const totalPredictions = agents.reduce((sum, a) => sum + a.predictions, 0);
  const avgAccuracy = Math.round(agents.reduce((sum, a) => sum + a.accuracy, 0) / agents.length);

  const getAgentIcon = (name: string) => {
    if (name.includes('Supply')) return <Zap className="w-5 h-5" />;
    if (name.includes('Vendor')) return <Users className="w-5 h-5" />;
    if (name.includes('Sustainability')) return <Leaf className="w-5 h-5" />;
    if (name.includes('Cultural')) return <Users className="w-5 h-5" />;
    if (name.includes('Economic')) return <DollarSign className="w-5 h-5" />;
    return <Brain className="w-5 h-5" />;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>AI Agents</h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Monitor and manage autonomous AI agents</p>
          </div>
          <button
            onClick={() => openChatWithAgent('Meta Orchestrator')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-5 h-5" />
            Chat with AI
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`rounded-xl p-6 shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <Power className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{activeCount}/{agents.length}</p>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Agents Active</p>
              </div>
            </div>
          </div>
          <div className={`rounded-xl p-6 shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalPredictions.toLocaleString()}</p>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Total Predictions</p>
              </div>
            </div>
          </div>
          <div className={`rounded-xl p-6 shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{avgAccuracy}%</p>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Average Accuracy</p>
              </div>
            </div>
          </div>
          <div className={`rounded-xl p-6 shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Activity className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>127</p>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Actions Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {agents.map((agent) => {
            const isExpanded = expandedAgent === agent.id;

            return (
              <div
                key={agent.id}
                className={`rounded-xl shadow-sm border overflow-hidden transition-all duration-300 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                  } ${isExpanded ? 'ring-2 ring-blue-500' : ''}`}
              >
                {/* Agent Header */}
                <div
                  className="p-5 text-white"
                  style={{ backgroundColor: agent.color }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        {getAgentIcon(agent.name)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{agent.name}</h3>
                        <p className="text-sm text-white/80">{agent.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleAgent(agent.id)}
                      className={`relative w-14 h-7 rounded-full transition-colors ${agent.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                        }`}
                    >
                      <div
                        className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${agent.status === 'active' ? 'left-8' : 'left-1'
                          }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Agent Body */}
                <div className="p-5">
                  {/* Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {agent.status === 'active' ? (
                        <PlayCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <PauseCircle className="w-5 h-5 text-gray-400" />
                      )}
                      <span className={`font-medium ${agent.status === 'active'
                          ? 'text-green-600'
                          : (isDark ? 'text-gray-400' : 'text-gray-500')
                        }`}>
                        {agent.status === 'active' ? 'Active' : 'Idle'}
                      </span>
                      {agent.currentTask && agent.status === 'active' && (
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                          — {agent.currentTask}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
                      className={`text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                        }`}
                    >
                      {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`text-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{agent.predictions}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Predictions</p>
                    </div>
                    <div className={`text-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-2xl font-bold ${agent.accuracy >= 90 ? 'text-green-600' :
                          agent.accuracy >= 80 ? 'text-yellow-600' : 'text-red-600'
                        }`}>{agent.accuracy}%</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Accuracy</p>
                    </div>
                    <div className={`text-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-2xl font-bold ${agent.userApproval >= 90 ? 'text-green-600' :
                          agent.userApproval >= 80 ? 'text-yellow-600' : 'text-red-600'
                        }`}>{agent.userApproval}%</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Approval</p>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                      <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Recent Activity
                      </h4>
                      <div className="space-y-2">
                        <div className={`p-3 rounded-lg text-sm ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className={isDark ? 'text-white' : 'text-gray-800'}>
                            Analyzed inventory levels and predicted protein shortage
                          </p>
                          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>5 minutes ago</p>
                        </div>
                        <div className={`p-3 rounded-lg text-sm ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <p className={isDark ? 'text-white' : 'text-gray-800'}>
                            Recommended Ahmed's Farm for beef order - 87% confidence
                          </p>
                          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>15 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => openChatWithAgent(agent.name)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-medium shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </button>
                    <button
                      onClick={() => openAnalytics(agent)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-lg transition-colors font-medium ${isDark
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <BarChart2 className="w-4 h-4" />
                      Analytics
                    </button>
                    <button className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg transition-colors ${isDark
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}>
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency Override */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 rounded-xl">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-800 mb-1">Emergency Override</h3>
              <p className="text-sm text-red-700 mb-4">
                Disable all agent automation and take manual control of all operations.
                Use this only in emergency situations.
              </p>
              <button className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg hover:shadow-xl">
                Activate Manual Override
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Window */}
      <AIChat
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        selectedAgent={selectedAgent}
      />

      {/* Analytics Modal */}
      <AgentAnalyticsModal
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
        agent={analyticsAgent}
      />
    </Layout>
  );
};
