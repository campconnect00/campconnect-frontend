import React from 'react';
import { X, Check, Edit3, XCircle, Leaf, DollarSign, Users } from 'lucide-react';
import { InventoryItem, COLORS, mockVendors } from '../../data/mockData';

interface AgentDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: InventoryItem | null;
}

export const AgentDecisionModal: React.FC<AgentDecisionModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  if (!isOpen) return null;

  const recommendedVendor = mockVendors[0]; // Ahmed's Farm

  const handleApprove = () => {
    alert('Order approved! Vendor will be notified via SMS.');
    onClose();
  };

  const handleModify = () => {
    alert('Opening order modification form...');
    onClose();
  };

  const handleReject = () => {
    alert('Order rejected. Agent will learn from this feedback.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 flex items-center justify-between text-white">
          <div>
            <h2 className="text-xl font-bold">Agent Decision: {item?.item || 'Protein'} Shortage Resolution</h2>
            <p className="text-blue-200 text-sm">Multi-agent collaboration analysis</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6">
          {/* Problem Statement */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">🔍 Problem Identified</h3>
            <p className="text-gray-700">
              Supply Chain Agent detected: <span className="font-bold">{item?.item || 'Protein'}</span> sources will run out in{' '}
              <span className="font-bold text-red-600">{item?.shortage || '4 days'}</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Confidence: {item?.confidence || 87}% based on 30-day consumption pattern analysis
            </p>
          </div>

          {/* Agent Deliberation */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">🤝 Agent Collaboration</h3>
            <div className="space-y-3">
              {/* Supply Chain Agent */}
              <div
                className="rounded-xl p-4 border-l-4"
                style={{ borderLeftColor: COLORS.agents.supplyChain, backgroundColor: '#f0f7ff' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow"
                    style={{ backgroundColor: COLORS.agents.supplyChain }}
                  >
                    SC
                  </div>
                  <span className="font-semibold text-gray-900">Supply Chain Agent</span>
                </div>
                <p className="text-sm text-gray-700 mb-1">"Need {item?.stock ? 400 : 400}kg {item?.item?.toLowerCase() || 'meat'} by Friday. 3 vendors available within 25km radius."</p>
                <span className="text-xs text-gray-500">Priority: Speed & Reliability</span>
              </div>

              {/* Sustainability Agent */}
              <div
                className="rounded-xl p-4 border-l-4"
                style={{ borderLeftColor: COLORS.agents.sustainability, backgroundColor: '#f0fdf4' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow"
                    style={{ backgroundColor: COLORS.agents.sustainability }}
                  >
                    SU
                  </div>
                  <span className="font-semibold text-gray-900">Sustainability Agent</span>
                </div>
                <p className="text-sm text-gray-700 mb-1">"Ahmed's Farm is 12km away → saves 45kg CO₂ compared to international supplier"</p>
                <span className="text-xs text-gray-500">Priority: Carbon Reduction</span>
              </div>

              {/* Cultural Agent */}
              <div
                className="rounded-xl p-4 border-l-4"
                style={{ borderLeftColor: COLORS.agents.cultural, backgroundColor: '#faf5ff' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow"
                    style={{ backgroundColor: COLORS.agents.cultural }}
                  >
                    CL
                  </div>
                  <span className="font-semibold text-gray-900">Cultural Liaison Agent</span>
                </div>
                <p className="text-sm text-gray-700 mb-1">"Ahmed's Farm has halal certification (required by 78% camp population)"</p>
                <span className="text-xs text-gray-500">Priority: Cultural Appropriateness</span>
              </div>

              {/* Economic Agent */}
              <div
                className="rounded-xl p-4 border-l-4"
                style={{ borderLeftColor: COLORS.agents.economic, backgroundColor: '#f0fdfa' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow"
                    style={{ backgroundColor: COLORS.agents.economic }}
                  >
                    EE
                  </div>
                  <span className="font-semibold text-gray-900">Economic Empowerment Agent</span>
                </div>
                <p className="text-sm text-gray-700 mb-1">"Ahmed's Farm had 3 orders this month. Prioritizing helps maintain vendor diversity."</p>
                <span className="text-xs text-gray-500">Priority: Fair Distribution</span>
              </div>

              {/* Orchestrator Consensus */}
              <div
                className="rounded-xl p-4 border-l-4 border-2 border-yellow-400"
                style={{ borderLeftColor: COLORS.agents.orchestrator, backgroundColor: '#fefce8' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow"
                    style={{ backgroundColor: COLORS.agents.orchestrator }}
                  >
                    ⚡
                  </div>
                  <span className="font-bold text-gray-900">Orchestrator Consensus</span>
                </div>
                <p className="text-base font-semibold text-gray-900 mb-3">
                  ✅ Recommend: {recommendedVendor.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-medium">✓ Halal certified</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-medium">✓ Lower emissions</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-medium">✓ Reliable history ({recommendedVendor.rating}★)</span>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-medium">⚠ Not lowest price</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Action */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">📋 Recommended Action</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Order</p>
                <p className="font-semibold text-gray-900">400kg halal beef</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Vendor</p>
                <p className="font-semibold text-gray-900">{recommendedVendor.name}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Price</p>
                <p className="font-semibold text-gray-900">KES 350/kg = KES 140,000</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Delivery</p>
                <p className="font-semibold text-gray-900">Friday (2 days)</p>
              </div>
            </div>

            {/* Impact */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-900 mb-3">Projected Impact:</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-500">Carbon Saved</p>
                  <p className="font-bold text-green-600">45 kg CO₂</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-500">To Community</p>
                  <p className="font-bold text-blue-600">KES 140,000</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-2">
                    <Users className="w-5 h-5 text-teal-600" />
                  </div>
                  <p className="text-xs text-gray-500">Equity Impact</p>
                  <p className="font-bold text-teal-600">+2%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
          <button
            onClick={handleApprove}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-green-200"
          >
            <Check className="w-5 h-5" />
            Approve Order
          </button>
          <button
            onClick={handleModify}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Edit3 className="w-5 h-5" />
            Modify
          </button>
          <button
            onClick={handleReject}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-gray-700"
          >
            <XCircle className="w-5 h-5" />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};
