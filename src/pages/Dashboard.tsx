import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { MetricCard } from '../components/dashboard/MetricCard';
import { AlertBanner } from '../components/dashboard/AlertBanner';
import { InventoryTable } from '../components/dashboard/InventoryTable';
import { AgentFeed } from '../components/dashboard/AgentFeed';
import { AgentDecisionModal } from '../components/dashboard/AgentDecisionModal';
import { AIChat } from '../components/shared/AIChat';
import { Package, Leaf, DollarSign, Brain, MessageCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  mockInventory,
  mockAgentFeed,
  mockAlert,
  mockDashboardMetrics,
  InventoryItem
} from '../data/mockData';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [alert, setAlert] = useState(mockAlert);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const metrics = mockDashboardMetrics;

  const handleViewDetails = () => {
    setModalOpen(true);
  };

  const handleApprove = () => {
    setAlert(prev => ({ ...prev, show: false }));
  };

  const handleDismiss = () => {
    setAlert(prev => ({ ...prev, show: false }));
  };

  const handleViewDraft = (item: InventoryItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Real-time overview of camp operations and AI agent activities
            </p>
          </div>
          <button
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Ask AI
          </button>
        </div>

        {/* Alert Banner */}
        <AlertBanner
          alert={alert}
          onViewDetails={handleViewDetails}
          onApprove={handleApprove}
          onDismiss={handleDismiss}
        />

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div onClick={() => navigate('/suppliers')} className="cursor-pointer hover:scale-[1.02] transition-transform">
            <MetricCard
              icon={Package}
              title="Active Orders"
              value={metrics.activeOrders}
              subtitle="↑ 3 from last week"
              trend="+25%"
              trendDirection="up"
            />
          </div>
          <div onClick={() => navigate('/impact')} className="cursor-pointer hover:scale-[1.02] transition-transform">
            <MetricCard
              icon={Leaf}
              title="Carbon Impact"
              value={`${metrics.carbonSaved.toLocaleString()} kg`}
              subtitle="CO₂ saved this month"
              badge="Net: -12kg AI"
              badgeColor="green"
            />
          </div>
          <div onClick={() => navigate('/impact')} className="cursor-pointer hover:scale-[1.02] transition-transform">
            <MetricCard
              icon={DollarSign}
              title="Host Community"
              value={`$${metrics.localSpend.toLocaleString()}`}
              subtitle="18 vendors active"
              badge="Equity: 92%"
              badgeColor="blue"
            />
          </div>
          <div onClick={() => navigate('/agents')} className="cursor-pointer hover:scale-[1.02] transition-transform">
            <MetricCard
              icon={Brain}
              title="AI Agents"
              value={`${metrics.agentActivity.active} active`}
              subtitle={`${metrics.agentActivity.actionsToday} actions today`}
              badge={`${metrics.agentActivity.approvalRate}% approval`}
              badgeColor="purple"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inventory Table - Takes 2 columns */}
          <div className="lg:col-span-2">
            <InventoryTable
              items={mockInventory}
              onViewDraft={handleViewDraft}
              onViewAll={() => navigate('/inventory')}
            />
          </div>

          {/* Agent Activity Feed - Takes 1 column */}
          <div>
            <AgentFeed
              activities={mockAgentFeed}
              onViewAll={() => navigate('/agents')}
            />
          </div>
        </div>
      </div>

      {/* Agent Decision Modal */}
      <AgentDecisionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
      />

      {/* AI Chat */}
      <AIChat
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        selectedAgent="Meta Orchestrator"
      />
    </Layout>
  );
};
