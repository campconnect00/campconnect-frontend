import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Calendar, BarChart2, PieChart, Activity, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Agent, COLORS } from '../../data/mockData';

interface AgentAnalyticsModalProps {
    isOpen: boolean;
    onClose: () => void;
    agent: Agent | null;
}

// Mock historical data for the agent
const generateMockData = (agent: Agent | null) => {
    if (!agent) return null;

    return {
        weeklyPredictions: [
            { day: 'Mon', count: Math.floor(Math.random() * 30) + 10, accuracy: Math.floor(Math.random() * 15) + 80 },
            { day: 'Tue', count: Math.floor(Math.random() * 30) + 10, accuracy: Math.floor(Math.random() * 15) + 80 },
            { day: 'Wed', count: Math.floor(Math.random() * 30) + 10, accuracy: Math.floor(Math.random() * 15) + 80 },
            { day: 'Thu', count: Math.floor(Math.random() * 30) + 10, accuracy: Math.floor(Math.random() * 15) + 80 },
            { day: 'Fri', count: Math.floor(Math.random() * 30) + 10, accuracy: Math.floor(Math.random() * 15) + 80 },
            { day: 'Sat', count: Math.floor(Math.random() * 20) + 5, accuracy: Math.floor(Math.random() * 15) + 80 },
            { day: 'Sun', count: Math.floor(Math.random() * 20) + 5, accuracy: Math.floor(Math.random() * 15) + 80 },
        ],
        outcomeBreakdown: {
            approved: 78,
            modified: 15,
            rejected: 7,
        },
        monthlyTrend: [
            { month: 'Oct', predictions: 245, accuracy: 84 },
            { month: 'Nov', predictions: 312, accuracy: 87 },
            { month: 'Dec', predictions: 398, accuracy: 89 },
            { month: 'Jan', predictions: agent.predictions, accuracy: agent.accuracy },
        ],
        topActions: [
            { action: 'Inventory shortage prediction', count: 45, successRate: 94 },
            { action: 'Vendor recommendation', count: 38, successRate: 91 },
            { action: 'Reorder alert', count: 32, successRate: 88 },
            { action: 'Price optimization', count: 28, successRate: 85 },
            { action: 'Quality assessment', count: 21, successRate: 92 },
        ],
        recentDecisions: [
            { time: '2 hours ago', decision: 'Predicted beef shortage in 4 days', outcome: 'approved', confidence: 87 },
            { time: '5 hours ago', decision: 'Recommended Ahmed\'s Farm for grain order', outcome: 'approved', confidence: 92 },
            { time: 'Yesterday', decision: 'Flagged milk quality concern', outcome: 'modified', confidence: 78 },
            { time: '2 days ago', decision: 'Suggested price negotiation with supplier', outcome: 'approved', confidence: 85 },
        ],
    };
};

export const AgentAnalyticsModal: React.FC<AgentAnalyticsModalProps> = ({
    isOpen,
    onClose,
    agent,
}) => {
    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

    if (!isOpen || !agent) return null;

    const data = generateMockData(agent);
    if (!data) return null;

    const maxPredictions = Math.max(...data.weeklyPredictions.map(d => d.count));

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div
                    className="px-6 py-4 flex items-center justify-between text-white"
                    style={{ backgroundColor: agent.color }}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <BarChart2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{agent.name} - Analytics</h2>
                            <p className="text-white/80 text-sm">Performance metrics and insights</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Time Range Selector */}
                        <div className="flex bg-white/20 rounded-lg p-1">
                            {(['week', 'month', 'year'] as const).map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range)}
                                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${timeRange === range
                                            ? 'bg-white text-gray-900'
                                            : 'text-white/80 hover:text-white'
                                        }`}
                                >
                                    {range.charAt(0).toUpperCase() + range.slice(1)}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                    {/* Key Metrics Row */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-3xl font-bold text-gray-900">{agent.predictions}</p>
                            <p className="text-sm text-gray-500">Total Predictions</p>
                            <div className="flex items-center justify-center gap-1 mt-1 text-green-600">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm font-medium">+12%</span>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-3xl font-bold" style={{ color: agent.color }}>{agent.accuracy}%</p>
                            <p className="text-sm text-gray-500">Accuracy Rate</p>
                            <div className="flex items-center justify-center gap-1 mt-1 text-green-600">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm font-medium">+3%</span>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-3xl font-bold text-blue-600">{agent.userApproval}%</p>
                            <p className="text-sm text-gray-500">User Approval</p>
                            <div className="flex items-center justify-center gap-1 mt-1 text-green-600">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm font-medium">+5%</span>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-3xl font-bold text-amber-600">1.2s</p>
                            <p className="text-sm text-gray-500">Avg Response Time</p>
                            <div className="flex items-center justify-center gap-1 mt-1 text-green-600">
                                <TrendingDown className="w-4 h-4" />
                                <span className="text-sm font-medium">-0.3s</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        {/* Weekly Activity Chart */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5" style={{ color: agent.color }} />
                                Weekly Activity
                            </h3>
                            <div className="flex items-end justify-between h-40 gap-2">
                                {data.weeklyPredictions.map((day, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                                        <div className="relative w-full flex flex-col items-center">
                                            {/* Accuracy dot */}
                                            <div
                                                className="absolute w-3 h-3 rounded-full border-2 border-white shadow"
                                                style={{
                                                    bottom: `${(day.accuracy - 70) * 3}%`,
                                                    backgroundColor: day.accuracy >= 90 ? '#22c55e' : day.accuracy >= 80 ? '#eab308' : '#ef4444'
                                                }}
                                            />
                                            {/* Bar */}
                                            <div
                                                className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80"
                                                style={{
                                                    height: `${(day.count / maxPredictions) * 100}%`,
                                                    backgroundColor: agent.color,
                                                    minHeight: '20px',
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-500">{day.day}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded" style={{ backgroundColor: agent.color }} />
                                    <span>Predictions</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span>Accuracy</span>
                                </div>
                            </div>
                        </div>

                        {/* Outcome Breakdown */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <PieChart className="w-5 h-5" style={{ color: agent.color }} />
                                Decision Outcomes
                            </h3>
                            <div className="flex items-center gap-6">
                                {/* Pie Chart Simulation */}
                                <div className="relative w-32 h-32">
                                    <svg viewBox="0 0 36 36" className="w-full h-full">
                                        <circle
                                            cx="18" cy="18" r="15.9"
                                            fill="transparent"
                                            stroke="#22c55e"
                                            strokeWidth="3.8"
                                            strokeDasharray={`${data.outcomeBreakdown.approved} ${100 - data.outcomeBreakdown.approved}`}
                                            strokeDashoffset="25"
                                        />
                                        <circle
                                            cx="18" cy="18" r="15.9"
                                            fill="transparent"
                                            stroke="#3b82f6"
                                            strokeWidth="3.8"
                                            strokeDasharray={`${data.outcomeBreakdown.modified} ${100 - data.outcomeBreakdown.modified}`}
                                            strokeDashoffset={25 - data.outcomeBreakdown.approved}
                                        />
                                        <circle
                                            cx="18" cy="18" r="15.9"
                                            fill="transparent"
                                            stroke="#ef4444"
                                            strokeWidth="3.8"
                                            strokeDasharray={`${data.outcomeBreakdown.rejected} ${100 - data.outcomeBreakdown.rejected}`}
                                            strokeDashoffset={25 - data.outcomeBreakdown.approved - data.outcomeBreakdown.modified}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-gray-900">{data.outcomeBreakdown.approved}%</span>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span className="text-sm text-gray-700">Approved</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{data.outcomeBreakdown.approved}%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-blue-500" />
                                            <span className="text-sm text-gray-700">Modified</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{data.outcomeBreakdown.modified}%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <XCircle className="w-4 h-4 text-red-500" />
                                            <span className="text-sm text-gray-700">Rejected</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{data.outcomeBreakdown.rejected}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        {/* Top Actions */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <h3 className="font-semibold text-gray-900 mb-4">Top Actions This Month</h3>
                            <div className="space-y-3">
                                {data.topActions.map((action, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                                            style={{ backgroundColor: agent.color }}
                                        >
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{action.action}</p>
                                            <p className="text-xs text-gray-500">{action.count} times • {action.successRate}% success</p>
                                        </div>
                                        <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: `${action.successRate}%`,
                                                    backgroundColor: action.successRate >= 90 ? '#22c55e' : action.successRate >= 80 ? '#eab308' : '#ef4444'
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Monthly Trend */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <h3 className="font-semibold text-gray-900 mb-4">Monthly Trend</h3>
                            <div className="space-y-4">
                                {data.monthlyTrend.map((month, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <span className="text-sm text-gray-500 w-10">{month.month}</span>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all"
                                                        style={{
                                                            width: `${(month.predictions / 400) * 100}%`,
                                                            backgroundColor: agent.color
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-900 w-12">{month.predictions}</span>
                                            </div>
                                        </div>
                                        <span className={`text-sm font-medium ${month.accuracy >= 90 ? 'text-green-600' :
                                                month.accuracy >= 85 ? 'text-yellow-600' : 'text-gray-600'
                                            }`}>
                                            {month.accuracy}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Decisions */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <h3 className="font-semibold text-gray-900 mb-4">Recent Decisions</h3>
                        <div className="space-y-3">
                            {data.recentDecisions.map((decision, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-4 p-3 rounded-lg ${decision.outcome === 'approved' ? 'bg-green-50' :
                                            decision.outcome === 'modified' ? 'bg-blue-50' : 'bg-red-50'
                                        }`}
                                >
                                    <div className={`p-2 rounded-full ${decision.outcome === 'approved' ? 'bg-green-100' :
                                            decision.outcome === 'modified' ? 'bg-blue-100' : 'bg-red-100'
                                        }`}>
                                        {decision.outcome === 'approved' ? (
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                        ) : decision.outcome === 'modified' ? (
                                            <Clock className="w-4 h-4 text-blue-600" />
                                        ) : (
                                            <XCircle className="w-4 h-4 text-red-600" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{decision.decision}</p>
                                        <p className="text-xs text-gray-500">{decision.time} • {decision.confidence}% confidence</p>
                                    </div>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${decision.outcome === 'approved' ? 'bg-green-100 text-green-700' :
                                            decision.outcome === 'modified' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {decision.outcome.charAt(0).toUpperCase() + decision.outcome.slice(1)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
