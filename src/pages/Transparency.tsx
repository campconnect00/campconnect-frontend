import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import {
    Eye, History, Leaf, Shield, Brain, Clock, CheckCircle,
    XCircle, Edit3, AlertTriangle, ChevronRight
} from 'lucide-react';
import { mockDecisionHistory, mockAgents, mockCarbonMetrics, COLORS } from '../data/mockData';

type TabId = 'overview' | 'decisions' | 'carbon' | 'ethics';

const tabs: { id: TabId; label: string; icon: React.ComponentType<any> }[] = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'decisions', label: 'Decision History', icon: History },
    { id: 'carbon', label: 'Carbon Accounting', icon: Leaf },
    { id: 'ethics', label: 'Ethics & Bias', icon: Shield },
];

export const Transparency: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('overview');

    const renderOverview = () => (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">How Our AI Agents Work</h3>
                <p className="text-blue-100 leading-relaxed">
                    CampConnect uses a multi-agent AI system where specialized agents collaborate to make
                    procurement decisions. Each agent focuses on a specific aspect (supply chain, sustainability,
                    cultural appropriateness, economic equity), and the Orchestrator synthesizes their inputs
                    into balanced recommendations that humans approve.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockAgents.map(agent => (
                    <div
                        key={agent.id}
                        className="bg-white rounded-xl p-5 border-l-4 shadow-sm"
                        style={{ borderLeftColor: agent.color }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: agent.color }}
                            >
                                {agent.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                            </div>
                            <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{agent.description}</p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                            <span>{agent.predictions} predictions</span>
                            <span>{agent.accuracy}% accuracy</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-amber-900">Human-in-the-Loop</h4>
                        <p className="text-sm text-amber-800 mt-1">
                            All critical decisions require human approval. Agents make recommendations,
                            but camp managers have final authority. Every override is tracked to improve
                            agent learning.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDecisions = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Recent AI Decisions</h3>
                <span className="text-sm text-gray-500">{mockDecisionHistory.length} decisions in last 7 days</span>
            </div>

            <div className="space-y-3">
                {mockDecisionHistory.map(decision => (
                    <div key={decision.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div
                            className="p-4 cursor-pointer"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                        style={{ backgroundColor: COLORS.agents[decision.agentKey] }}
                                    >
                                        {decision.agent.slice(0, 2)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-gray-900">{decision.agent} Agent</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${decision.outcome === 'approved' ? 'bg-green-100 text-green-700' :
                                                    decision.outcome === 'modified' ? 'bg-blue-100 text-blue-700' :
                                                        decision.outcome === 'rejected' ? 'bg-red-100 text-red-700' :
                                                            'bg-gray-100 text-gray-700'
                                                }`}>
                                                {decision.outcome === 'approved' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                                                {decision.outcome === 'modified' && <Edit3 className="w-3 h-3 inline mr-1" />}
                                                {decision.outcome === 'rejected' && <XCircle className="w-3 h-3 inline mr-1" />}
                                                {decision.outcome.charAt(0).toUpperCase() + decision.outcome.slice(1)}
                                            </span>
                                        </div>
                                        <p className="text-gray-800">{decision.summary}</p>
                                        <p className="text-sm text-gray-500 mt-1">{decision.reasoning}</p>

                                        {/* Impact Metrics */}
                                        {Object.keys(decision.impactMetrics).length > 0 && (
                                            <div className="flex gap-4 mt-3 text-sm">
                                                {decision.impactMetrics.carbonSaved && (
                                                    <span className="text-green-600">🌱 {decision.impactMetrics.carbonSaved} kg CO₂ saved</span>
                                                )}
                                                {decision.impactMetrics.communityBenefit && (
                                                    <span className="text-blue-600">💰 ${decision.impactMetrics.communityBenefit} to community</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    {new Date(decision.timestamp).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderCarbon = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">AI Carbon Footprint Breakdown</h3>

                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700">GPT-4 API Calls</span>
                            <span className="font-semibold">8.2 kg CO₂</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '68%' }} />
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700">Azure Speech Services</span>
                            <span className="font-semibold">2.1 kg CO₂</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: '18%' }} />
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700">Azure Translator</span>
                            <span className="font-semibold">1.7 kg CO₂</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '14%' }} />
                        </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-900">Total AI Operations</span>
                            <span className="font-bold text-red-600">12 kg CO₂</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-semibold text-green-900 mb-4">Carbon ROI Analysis</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-green-700">{mockCarbonMetrics.supplyChainSavings} kg</p>
                        <p className="text-sm text-green-600">Saved by local sourcing</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-red-600">-12 kg</p>
                        <p className="text-sm text-red-500">AI operations cost</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-green-800">{mockCarbonMetrics.netImpact} kg</p>
                        <p className="text-sm text-green-700">Net savings</p>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-white rounded-lg">
                    <p className="text-center text-sm text-green-800">
                        <strong>Carbon ROI: 237:1</strong> — For every 1 kg CO₂ used by AI, 237 kg is saved through local sourcing
                    </p>
                </div>
            </div>
        </div>
    );

    const renderEthics = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        Responsible AI Controls
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm text-gray-700">All critical orders require human approval</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm text-gray-700">Decision reasoning always visible</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm text-gray-700">Emergency override always available</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-sm text-gray-700">Weekly performance reviews</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-purple-600" />
                        Bias Monitoring
                    </h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Vendor Selection Fairness</span>
                                <span className="font-semibold text-green-600">98%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">No significant vendor preference bias detected</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Geographic Distribution</span>
                                <span className="font-semibold text-green-600">95%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Orders distributed evenly across regions</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Price Fairness</span>
                                <span className="font-semibold text-green-600">97%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">No price discrimination patterns found</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Override Tracking</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">127</p>
                        <p className="text-sm text-gray-500">Total Recommendations</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">110</p>
                        <p className="text-sm text-gray-500">Approved as-is (87%)</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">17</p>
                        <p className="text-sm text-gray-500">Modified/Rejected (13%)</p>
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                    Override feedback is used to continuously improve agent accuracy
                </p>
            </div>
        </div>
    );

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">AI Transparency Center</h1>
                    <p className="text-gray-600">Understand how our AI agents make decisions</p>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex border-b border-gray-200">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.id
                                            ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="p-6">
                        {activeTab === 'overview' && renderOverview()}
                        {activeTab === 'decisions' && renderDecisions()}
                        {activeTab === 'carbon' && renderCarbon()}
                        {activeTab === 'ethics' && renderEthics()}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
