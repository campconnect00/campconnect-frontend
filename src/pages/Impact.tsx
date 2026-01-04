import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import {
  Leaf, DollarSign, Clock, TrendingUp, Download, ChevronDown,
  Car, TreeDeciduous, Zap, Users
} from 'lucide-react';
import {
  mockCarbonMetrics,
  mockEconomicMetrics,
  mockEfficiencyMetrics,
  mockAgents,
  COLORS
} from '../data/mockData';

const timeRanges = ['Last 30 Days', 'Last 90 Days', 'This Year', 'All Time'];

export const Impact: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState('Last 30 Days');
  const carbon = mockCarbonMetrics;
  const economic = mockEconomicMetrics;
  const efficiency = mockEfficiencyMetrics;
  const agents = mockAgents;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Impact Dashboard</h1>
            <p className="text-gray-600">Track environmental, economic, and operational impact</p>
          </div>
          <div className="flex gap-3">
            {/* Time Range */}
            <div className="relative">
              <select
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
              >
                {timeRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Environmental Impact</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Net Carbon Impact */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Net Carbon Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
                  <span className="text-gray-700">Supply Chain Savings</span>
                  <span className="text-2xl font-bold text-green-600">+{carbon.supplyChainSavings.toLocaleString()} kg CO₂</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                  <span className="text-gray-700">AI Operations Cost</span>
                  <span className="text-2xl font-bold text-red-600">-{carbon.aiOperationsCost} kg CO₂</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-100 to-green-50 rounded-xl border-2 border-green-300">
                    <span className="text-lg font-semibold text-gray-900">Net Impact</span>
                    <span className="text-3xl font-bold text-green-700">{carbon.netImpact.toLocaleString()} kg CO₂ saved</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Equivalents */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Equivalent To</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Car className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{carbon.equivalents.kmNotDriven.toLocaleString()} km</p>
                    <p className="text-sm text-gray-500">not driven by car</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-green-100 rounded-full">
                    <TreeDeciduous className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{carbon.equivalents.treeSeedlings} trees</p>
                    <p className="text-sm text-gray-500">grown for 10 years</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Zap className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{carbon.equivalents.kWhSaved.toLocaleString()} kWh</p>
                    <p className="text-sm text-gray-500">electricity saved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Economic Impact & Efficiency */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Economic Impact */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Economic Impact</h2>
            </div>

            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 mb-1">Host Community Income</p>
              <p className="text-4xl font-bold text-blue-600">${economic.hostCommunityIncome.toLocaleString()}</p>
              <div className="flex items-center justify-center gap-1 mt-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">↑ {economic.monthlyGrowth}% from last month</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-3xl font-bold text-gray-900">{economic.activeVendors}</p>
                <p className="text-sm text-gray-500">Active Vendors</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-3xl font-bold text-green-600">{economic.equityScore}%</p>
                <p className="text-sm text-gray-500">Equity Score</p>
              </div>
            </div>

            {/* Vendor Distribution */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Income Distribution</h3>
              <div className="space-y-2">
                {economic.vendorDistribution.map((vendor, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-24 truncate">{vendor.name}</span>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(vendor.income / 680) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700 w-12">${vendor.income}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Efficiency Gains */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Efficiency Gains</h2>
            </div>

            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100">
                <p className="text-sm text-gray-500 mb-1">Average Delivery Time</p>
                <p className="text-4xl font-bold text-purple-600">{efficiency.avgDeliveryTime} days</p>
                <div className="flex items-center justify-center gap-1 mt-1 text-green-600">
                  <span className="text-sm font-medium">↓ {efficiency.internationalComparison}% vs international</span>
                </div>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Order Fulfillment Rate</p>
                <p className="text-4xl font-bold text-gray-900">{efficiency.orderFulfillment}%</p>
                <div className="w-full h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${efficiency.orderFulfillment}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Agent Performance</h2>
              <p className="text-sm text-gray-500">AI agent effectiveness and user approval rates</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Agent</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Predictions</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Accuracy</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">User Approval</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {agents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: agent.color }}
                        >
                          {agent.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </div>
                        <span className="font-medium text-gray-900">{agent.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{agent.predictions}</td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${getScoreColor(agent.accuracy)}`}>
                        {agent.accuracy}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${getScoreColor(agent.userApproval)}`}>
                        {agent.userApproval}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${agent.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">Overall System Learning: ↑ 12% improvement this month</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
