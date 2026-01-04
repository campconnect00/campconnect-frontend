// ============================================================================
// MOCK DATA FOR CAMPCONNECT MVP
// ============================================================================

// Agent color scheme
export const AGENT_COLORS = {
  supplyChain: '#004E8C',
  vendorAssistant: '#CA5010',
  sustainability: '#498205',
  cultural: '#8764B8',
  economic: '#038387',
  orchestrator: '#C19C00'
};

export const COLORS = {
  trustBlue: '#0078D4',
  sustainabilityGreen: '#107C10',
  alertAmber: '#F7630C',
  criticalRed: '#D13438',
  neutralGray: ['#F3F2F1', '#EDEBE9', '#8A8886', '#323130'],
  agents: AGENT_COLORS
};

// ============================================================================
// TYPES
// ============================================================================

export interface InventoryItem {
  id: string;
  item: string;
  stock: number;
  unit: string;
  status: 'good' | 'adequate' | 'low' | 'critical';
  shortage: string | null;
  confidence: number | null;
  dailyUsage: number;
  category: string;
}

export interface Vendor {
  id: string;
  name: string;
  rating: number;
  distance: number;
  location: string;
  certifications: string[];
  products: VendorProduct[];
  agentScores: {
    sustainability: number;
    cultural: number;
    economic: number;
  };
  carbonSavings: number;
  phone: string;
  responseTime: string;
  totalOrders: number;
}

export interface VendorProduct {
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  currency: string;
}

export interface AgentActivity {
  id: string;
  agent: string;
  agentKey: keyof typeof AGENT_COLORS;
  message: string;
  confidence: number | null;
  time: string;
  type: 'prediction' | 'recommendation' | 'alert' | 'action';
}

export interface Alert {
  show: boolean;
  agent: string;
  agentKey: keyof typeof AGENT_COLORS;
  message: string;
  confidence: number;
  currentStock: string;
  dailyUsage: string;
  predictedShortage: string;
  recommendedAction: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'idle' | 'learning';
  color: string;
  predictions: number;
  accuracy: number;
  userApproval: number;
  currentTask: string | null;
}

export interface CarbonMetrics {
  supplyChainSavings: number;
  aiOperationsCost: number;
  netImpact: number;
  equivalents: {
    kmNotDriven: number;
    treeSeedlings: number;
    kWhSaved: number;
  };
}

export interface EconomicMetrics {
  hostCommunityIncome: number;
  activeVendors: number;
  equityScore: number;
  monthlyGrowth: number;
  vendorDistribution: { name: string; income: number }[];
}

export interface EfficiencyMetrics {
  avgDeliveryTime: number;
  internationalComparison: number;
  orderFulfillment: number;
}

export interface DashboardMetrics {
  activeOrders: number;
  carbonSaved: number;
  localSpend: number;
  agentActivity: {
    active: number;
    actionsToday: number;
    approvalRate: number;
  };
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockInventory: InventoryItem[] = [
  { id: '1', item: 'Rice', stock: 850, unit: 'kg', status: 'adequate', shortage: null, confidence: null, dailyUsage: 120, category: 'Grains' },
  { id: '2', item: 'Meat (Beef)', stock: 125, unit: 'kg', status: 'low', shortage: '4 days', confidence: 87, dailyUsage: 125, category: 'Protein' },
  { id: '3', item: 'Vegetables (Mixed)', stock: 320, unit: 'kg', status: 'good', shortage: null, confidence: null, dailyUsage: 80, category: 'Produce' },
  { id: '4', item: 'Milk', stock: 45, unit: 'L', status: 'critical', shortage: 'Tomorrow', confidence: 95, dailyUsage: 50, category: 'Dairy' },
  { id: '5', item: 'Cooking Oil', stock: 180, unit: 'L', status: 'adequate', shortage: null, confidence: null, dailyUsage: 15, category: 'Cooking' },
  { id: '6', item: 'Beans', stock: 420, unit: 'kg', status: 'good', shortage: null, confidence: null, dailyUsage: 65, category: 'Legumes' },
  { id: '7', item: 'Flour', stock: 95, unit: 'kg', status: 'low', shortage: '6 days', confidence: 78, dailyUsage: 45, category: 'Grains' },
  { id: '8', item: 'Sugar', stock: 200, unit: 'kg', status: 'good', shortage: null, confidence: null, dailyUsage: 25, category: 'Staples' },
  { id: '9', item: 'Salt', stock: 50, unit: 'kg', status: 'adequate', shortage: null, confidence: null, dailyUsage: 5, category: 'Staples' },
  { id: '10', item: 'Chicken', stock: 60, unit: 'kg', status: 'low', shortage: '3 days', confidence: 91, dailyUsage: 75, category: 'Protein' }
];

export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: "Ahmed's Farm",
    rating: 4.8,
    distance: 12,
    location: 'Kakuma Town',
    certifications: ['Halal', 'Organic'],
    products: [
      { name: 'Beef', quantity: 500, unit: 'kg', pricePerUnit: 350, currency: 'KES' },
      { name: 'Chicken', quantity: 300, unit: 'kg', pricePerUnit: 280, currency: 'KES' }
    ],
    agentScores: { sustainability: 92, cultural: 100, economic: 85 },
    carbonSavings: 45,
    phone: '+254-722-123-456',
    responseTime: '45 minutes',
    totalOrders: 23
  },
  {
    id: '2',
    name: 'Mama Grace Dairy',
    rating: 4.6,
    distance: 8,
    location: 'Lokichoggio',
    certifications: ['Halal', 'Local Women-Owned'],
    products: [
      { name: 'Fresh Milk', quantity: 200, unit: 'L', pricePerUnit: 50, currency: 'KES' },
      { name: 'Yogurt', quantity: 50, unit: 'L', pricePerUnit: 80, currency: 'KES' }
    ],
    agentScores: { sustainability: 88, cultural: 95, economic: 92 },
    carbonSavings: 32,
    phone: '+254-733-234-567',
    responseTime: '30 minutes',
    totalOrders: 45
  },
  {
    id: '3',
    name: 'Turkana Grains Cooperative',
    rating: 4.5,
    distance: 25,
    location: 'Lodwar',
    certifications: ['Fair Trade', 'Cooperative'],
    products: [
      { name: 'Rice', quantity: 1000, unit: 'kg', pricePerUnit: 120, currency: 'KES' },
      { name: 'Flour', quantity: 500, unit: 'kg', pricePerUnit: 95, currency: 'KES' },
      { name: 'Beans', quantity: 300, unit: 'kg', pricePerUnit: 150, currency: 'KES' }
    ],
    agentScores: { sustainability: 85, cultural: 88, economic: 95 },
    carbonSavings: 28,
    phone: '+254-744-345-678',
    responseTime: '2 hours',
    totalOrders: 67
  },
  {
    id: '4',
    name: 'Fresh Harvest Vegetables',
    rating: 4.7,
    distance: 15,
    location: 'Kakuma',
    certifications: ['Organic', 'Local'],
    products: [
      { name: 'Tomatoes', quantity: 200, unit: 'kg', pricePerUnit: 80, currency: 'KES' },
      { name: 'Onions', quantity: 150, unit: 'kg', pricePerUnit: 60, currency: 'KES' },
      { name: 'Cabbage', quantity: 100, unit: 'kg', pricePerUnit: 40, currency: 'KES' },
      { name: 'Kale', quantity: 80, unit: 'kg', pricePerUnit: 50, currency: 'KES' }
    ],
    agentScores: { sustainability: 95, cultural: 82, economic: 88 },
    carbonSavings: 52,
    phone: '+254-755-456-789',
    responseTime: '1 hour',
    totalOrders: 89
  },
  {
    id: '5',
    name: 'Ali Cooking Supplies',
    rating: 4.3,
    distance: 20,
    location: 'Kakuma Town',
    certifications: ['Halal'],
    products: [
      { name: 'Cooking Oil', quantity: 500, unit: 'L', pricePerUnit: 250, currency: 'KES' },
      { name: 'Sugar', quantity: 300, unit: 'kg', pricePerUnit: 140, currency: 'KES' },
      { name: 'Salt', quantity: 200, unit: 'kg', pricePerUnit: 50, currency: 'KES' }
    ],
    agentScores: { sustainability: 78, cultural: 100, economic: 82 },
    carbonSavings: 18,
    phone: '+254-766-567-890',
    responseTime: '3 hours',
    totalOrders: 34
  }
];

export const mockAgentFeed: AgentActivity[] = [
  { id: '1', agent: 'Supply Chain', agentKey: 'supplyChain', message: 'Predicted protein shortage in 4 days based on consumption patterns', confidence: 87, time: '2 minutes ago', type: 'prediction' },
  { id: '2', agent: 'Sustainability', agentKey: 'sustainability', message: 'Recommended Ahmed\'s Farm - saves 45kg CO₂ vs international supplier', confidence: null, time: '5 minutes ago', type: 'recommendation' },
  { id: '3', agent: 'Cultural', agentKey: 'cultural', message: 'Flagged non-halal product in order draft (78% camp population Muslim)', confidence: null, time: '12 minutes ago', type: 'alert' },
  { id: '4', agent: 'Economic', agentKey: 'economic', message: 'Vendor C hasn\'t received orders in 10 days - recommending for equity', confidence: null, time: '18 minutes ago', type: 'recommendation' },
  { id: '5', agent: 'Vendor Assistant', agentKey: 'vendorAssistant', message: 'Confirmed delivery from Mama Grace Dairy - payment processed via M-Pesa', confidence: null, time: '25 minutes ago', type: 'action' },
  { id: '6', agent: 'Orchestrator', agentKey: 'orchestrator', message: 'Coordinated 3-agent consensus for beef procurement decision', confidence: 94, time: '32 minutes ago', type: 'action' }
];

export const mockAlert: Alert = {
  show: true,
  agent: 'Supply Chain Agent',
  agentKey: 'supplyChain',
  message: 'Protein shortage predicted in 4 days',
  confidence: 87,
  currentStock: '450 kg',
  dailyUsage: '125 kg/day',
  predictedShortage: 'Friday, Dec 27',
  recommendedAction: 'Order 400kg halal beef from Ahmed\'s Farm'
};

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Supply Chain Orchestrator',
    description: 'Predicts demand, detects shortages, generates procurement recommendations',
    status: 'active',
    color: AGENT_COLORS.supplyChain,
    predictions: 127,
    accuracy: 89,
    userApproval: 87,
    currentTask: 'Analyzing weekly consumption patterns'
  },
  {
    id: '2',
    name: 'Vendor Assistant',
    description: 'Manages vendor communications, processes orders via SMS/WhatsApp',
    status: 'active',
    color: AGENT_COLORS.vendorAssistant,
    predictions: 2340,
    accuracy: 94,
    userApproval: 91,
    currentTask: 'Confirming delivery with Mama Grace Dairy'
  },
  {
    id: '3',
    name: 'Sustainability Agent',
    description: 'Calculates carbon footprint, recommends eco-friendly options',
    status: 'active',
    color: AGENT_COLORS.sustainability,
    predictions: 94,
    accuracy: 92,
    userApproval: 94,
    currentTask: 'Calculating emissions for pending orders'
  },
  {
    id: '4',
    name: 'Cultural Liaison',
    description: 'Ensures cultural appropriateness of food items and vendors',
    status: 'active',
    color: AGENT_COLORS.cultural,
    predictions: 43,
    accuracy: 97,
    userApproval: 98,
    currentTask: null
  },
  {
    id: '5',
    name: 'Economic Empowerment',
    description: 'Promotes fair distribution of orders among local vendors',
    status: 'active',
    color: AGENT_COLORS.economic,
    predictions: 67,
    accuracy: 85,
    userApproval: 81,
    currentTask: 'Reviewing vendor income distribution'
  },
  {
    id: '6',
    name: 'Meta Orchestrator',
    description: 'Coordinates all agents, resolves conflicts, produces final recommendations',
    status: 'active',
    color: AGENT_COLORS.orchestrator,
    predictions: 156,
    accuracy: 91,
    userApproval: 89,
    currentTask: 'Synthesizing multi-agent recommendation'
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  activeOrders: 12,
  carbonSaved: 2847,
  localSpend: 4250,
  agentActivity: {
    active: 5,
    actionsToday: 127,
    approvalRate: 87
  }
};

export const mockCarbonMetrics: CarbonMetrics = {
  supplyChainSavings: 2847,
  aiOperationsCost: 12,
  netImpact: 2835,
  equivalents: {
    kmNotDriven: 1200,
    treeSeedlings: 47,
    kWhSaved: 3200
  }
};

export const mockEconomicMetrics: EconomicMetrics = {
  hostCommunityIncome: 4250,
  activeVendors: 18,
  equityScore: 92,
  monthlyGrowth: 18,
  vendorDistribution: [
    { name: 'Top Vendor', income: 680 },
    { name: 'Vendor 2', income: 520 },
    { name: 'Vendor 3', income: 450 },
    { name: 'Vendor 4', income: 380 },
    { name: 'Vendor 5', income: 320 },
    { name: 'Lowest Vendor', income: 180 }
  ]
};

export const mockEfficiencyMetrics: EfficiencyMetrics = {
  avgDeliveryTime: 2.5,
  internationalComparison: 85,
  orderFulfillment: 96
};

export const mockCamps = [
  { id: '1', name: 'Kakuma', country: 'Kenya', population: 196000 },
  { id: '2', name: 'Dadaab', country: 'Kenya', population: 235000 },
  { id: '3', name: 'Zaatari', country: 'Jordan', population: 80000 }
];

export const mockLanguages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'fr', name: 'French', flag: '🇫🇷' }
];

// Decision history for AI Transparency Center
export interface Decision {
  id: string;
  timestamp: string;
  agent: string;
  agentKey: keyof typeof AGENT_COLORS;
  type: 'procurement' | 'vendor_selection' | 'alert' | 'routing';
  summary: string;
  reasoning: string;
  outcome: 'approved' | 'modified' | 'rejected' | 'pending';
  impactMetrics: {
    carbonSaved?: number;
    costSaved?: number;
    communityBenefit?: number;
  };
}

export const mockDecisionHistory: Decision[] = [
  {
    id: '1',
    timestamp: '2026-01-04T10:30:00',
    agent: 'Supply Chain',
    agentKey: 'supplyChain',
    type: 'procurement',
    summary: 'Recommended 400kg beef order from Ahmed\'s Farm',
    reasoning: 'Based on 30-day consumption pattern analysis, protein shortage predicted in 4 days. Ahmed\'s Farm selected due to halal certification, proximity (12km), and reliability score (4.8).',
    outcome: 'approved',
    impactMetrics: { carbonSaved: 45, costSaved: 200, communityBenefit: 1400 }
  },
  {
    id: '2',
    timestamp: '2026-01-04T09:15:00',
    agent: 'Sustainability',
    agentKey: 'sustainability',
    type: 'vendor_selection',
    summary: 'Prioritized local vendor over international supplier',
    reasoning: 'International supplier offered 5% lower price, but local vendor saves 52kg CO₂ per delivery. Net benefit: $180 in carbon credits plus community economic impact.',
    outcome: 'approved',
    impactMetrics: { carbonSaved: 52, communityBenefit: 850 }
  },
  {
    id: '3',
    timestamp: '2026-01-03T16:45:00',
    agent: 'Cultural',
    agentKey: 'cultural',
    type: 'alert',
    summary: 'Flagged non-halal product in pending order',
    reasoning: 'Camp demographic analysis shows 78% Muslim population. Pork-based product detected in draft order. Recommended halal alternative.',
    outcome: 'modified',
    impactMetrics: {}
  },
  {
    id: '4',
    timestamp: '2026-01-03T14:20:00',
    agent: 'Economic',
    agentKey: 'economic',
    type: 'vendor_selection',
    summary: 'Recommended order redistribution to underserved vendor',
    reasoning: 'Vendor equity analysis shows Ali Cooking Supplies received 40% fewer orders than average. Recommendation to prioritize for current grain order to improve distribution.',
    outcome: 'approved',
    impactMetrics: { communityBenefit: 320 }
  }
];
