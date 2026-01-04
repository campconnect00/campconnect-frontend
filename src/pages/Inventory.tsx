import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { AIChat } from '../components/shared/AIChat';
import { Search, Plus, Download, ChevronDown, CheckCircle, AlertTriangle, XCircle, MessageCircle } from 'lucide-react';
import { mockInventory, InventoryItem } from '../data/mockData';
import { AgentDecisionModal } from '../components/dashboard/AgentDecisionModal';
import { useTheme } from '../context/ThemeContext';

const statusConfig = {
  good: { color: 'text-green-600 bg-green-50 border-green-200', icon: CheckCircle, label: 'Good' },
  adequate: { color: 'text-blue-600 bg-blue-50 border-blue-200', icon: CheckCircle, label: 'Adequate' },
  low: { color: 'text-amber-600 bg-amber-50 border-amber-200', icon: AlertTriangle, label: 'Low' },
  critical: { color: 'text-red-600 bg-red-50 border-red-200', icon: XCircle, label: 'Critical' },
};

const categories = ['All Categories', 'Grains', 'Protein', 'Produce', 'Dairy', 'Cooking', 'Legumes', 'Staples'];
const statuses = ['All Statuses', 'Critical', 'Low', 'Adequate', 'Good'];
const sortOptions = ['Name', 'Stock (Low to High)', 'Stock (High to Low)', 'Status'];

export const Inventory: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('Name');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let items = mockInventory.filter(item => {
      const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All Statuses' || item.status === selectedStatus.toLowerCase();
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort
    switch (sortBy) {
      case 'Stock (Low to High)':
        items = [...items].sort((a, b) => a.stock - b.stock);
        break;
      case 'Stock (High to Low)':
        items = [...items].sort((a, b) => b.stock - a.stock);
        break;
      case 'Status':
        const statusOrder = { critical: 0, low: 1, adequate: 2, good: 3 };
        items = [...items].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        break;
      default:
        items = [...items].sort((a, b) => a.item.localeCompare(b.item));
    }

    return items;
  }, [searchTerm, selectedCategory, selectedStatus, sortBy]);

  const criticalCount = mockInventory.filter(i => i.status === 'critical').length;
  const lowCount = mockInventory.filter(i => i.status === 'low').length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Inventory Management</h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Track stock levels with AI-powered shortage predictions</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              Ask AI
            </button>
            <button className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
              }`}>
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>
        </div>

        {/* Alert Summary */}
        {(criticalCount > 0 || lowCount > 0) && (
          <div className="flex gap-4">
            {criticalCount > 0 && (
              <button
                onClick={() => setSelectedStatus('Critical')}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-800">{criticalCount} critical items</span>
              </button>
            )}
            {lowCount > 0 && (
              <button
                onClick={() => setSelectedStatus('Low')}
                className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
              >
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-800">{lowCount} low stock items</span>
              </button>
            )}
            {(selectedCategory !== 'All Categories' || selectedStatus !== 'All Statuses' || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCategory('All Categories');
                  setSelectedStatus('All Statuses');
                  setSearchTerm('');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors text-gray-700"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Search and Filters */}
        <div className={`rounded-xl shadow-sm border p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[250px] relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search inventory items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-gray-300 bg-white'
                  }`}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`appearance-none pl-4 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 ${isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300'
                  }`}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`appearance-none pl-4 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 ${isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300'
                  }`}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`appearance-none pl-4 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 ${isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300'
                  }`}
              >
                {sortOptions.map(opt => (
                  <option key={opt} value={opt}>Sort: {opt}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className={`rounded-xl shadow-sm border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDark ? 'bg-gray-750' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Item</th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Category</th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Current Stock</th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Daily Usage</th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>AI Prediction</th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-100'}`}>
                {filteredItems.map((item) => {
                  const status = statusConfig[item.status];
                  const Icon = status.icon;
                  const daysRemaining = item.dailyUsage > 0 ? Math.floor(item.stock / item.dailyUsage) : null;

                  return (
                    <tr key={item.id} className={`transition-colors ${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}>
                      <td className="px-6 py-4">
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.item}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.stock} {item.unit}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.dailyUsage} {item.unit}/day</span>
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
                            <div className="text-sm font-semibold text-red-600">Shortage: {item.shortage}</div>
                            <div className="flex items-center gap-1 mt-1">
                              <div className={`w-20 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                                <div
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${item.confidence}%` }}
                                />
                              </div>
                              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.confidence}% confidence</span>
                            </div>
                          </div>
                        ) : (
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {daysRemaining && `~${daysRemaining} days supply`}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {item.shortage ? (
                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              setModalOpen(true);
                            }}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            View Draft Order →
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

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className={`p-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No inventory items match your filters
            </div>
          )}

          {/* Footer */}
          <div className={`px-6 py-4 border-t flex items-center justify-between ${isDark ? 'bg-gray-750 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Showing {filteredItems.length} of {mockInventory.length} items
            </span>
            <div className="flex gap-2">
              <button className={`px-3 py-1 border rounded text-sm disabled:opacity-50 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'
                }`} disabled>
                Previous
              </button>
              <button className={`px-3 py-1 border rounded text-sm disabled:opacity-50 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'
                }`} disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <AgentDecisionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
      />

      <AIChat
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        selectedAgent="Supply Chain Orchestrator"
      />
    </Layout>
  );
};
