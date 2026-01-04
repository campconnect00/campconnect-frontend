// src/types/index.ts

// ============================================================================
// CORE ENTITIES
// ============================================================================

export interface Camp {
  id: string;
  name: string;
  location: GeoLocation;
  population: number;
  demographics: CampDemographics;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GeoLocation {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface CampDemographics {
  nationalities: Nationality[];
  religions: Religion[];
  dietaryRestrictions: DietaryRestrictions;
}

export interface Nationality {
  country: string;
  percentage: number;
}

export interface Religion {
  religion: string;
  percentage: number;
}

export interface DietaryRestrictions {
  halalRequired: boolean;
  kosherRequired: boolean;
  vegetarianPercentage: number;
  veganPercentage: number;
}

// ============================================================================
// INVENTORY
// ============================================================================

export interface InventoryItem {
  id: string;
  campId: string;
  itemName: string;
  category: ItemCategory;
  currentStock: number;
  unit: Unit;
  reorderThreshold: number;
  dailyConsumptionAvg: number;
  lastRestocked: Date;
  predictedShortageDate: Date | null;
  predictionConfidence: number | null;
  status: InventoryStatus;
  consumptionHistory: ConsumptionRecord[];
  updatedAt: Date;
}

export type ItemCategory = 
  | 'grains' 
  | 'protein' 
  | 'vegetables' 
  | 'fruits' 
  | 'dairy' 
  | 'beverages' 
  | 'hygiene' 
  | 'medical';

export type Unit = 'kg' | 'L' | 'units' | 'boxes';

export type InventoryStatus = 'good' | 'adequate' | 'low' | 'critical';

export interface ConsumptionRecord {
  date: Date;
  consumed: number;
  notes?: string;
}

// ============================================================================
// VENDORS
// ============================================================================

export interface Vendor {
  id: string;
  name: string;
  phoneNumber: string;
  phoneNormalized: string;
  language: Language;
  location: GeoLocation;
  distanceFromCamp: number; // km
  products: VendorProduct[];
  certifications: Certification[];
  rating: number;
  totalOrders: number;
  totalRevenue: number;
  lastOrderDate: Date | null;
  responseTimeAvgMinutes: number;
  onTimeDeliveryRate: number;
  vendorAssistantContext: VendorAssistantContext;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorProduct {
  name: string;
  availableQuantity: number;
  unit: Unit;
  pricePerUnit: number;
  currency: Currency;
  lastUpdated: Date;
}

export type Certification = 
  | 'halal' 
  | 'kosher' 
  | 'organic' 
  | 'fair-trade';

export type Language = 
  | 'en' 
  | 'sw' 
  | 'ar' 
  | 'fr' 
  | 'so' 
  | 'am' 
  | 'ti' 
  | 'rw';

export type Currency = 'KES' | 'USD' | 'EUR' | 'UGX' | 'TZS' | 'RWF';

export interface VendorAssistantContext {
  typicalListingDays: string[];
  harvestCycles: Record<string, HarvestCycle>;
  preferredCommunication: 'voice' | 'text';
  conversationHistorySummary: string;
}

export interface HarvestCycle {
  frequencyDays: number;
  typicalQuantity: number;
}

// ============================================================================
// ORDERS
// ============================================================================

export interface Order {
  id: string;
  campId: string;
  vendorId: string;
  items: OrderItem[];
  totalAmount: number;
  currency: Currency;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  delivery: DeliveryInfo;
  agentRecommendation: AgentRecommendation;
  carbonImpact: CarbonImpact;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
}

export interface OrderItem {
  product: string;
  quantity: number;
  unit: Unit;
  pricePerUnit: number;
  total: number;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'in_transit' 
  | 'delivered' 
  | 'paid' 
  | 'cancelled';

export type PaymentStatus = 
  | 'pending' 
  | 'processing' 
  | 'paid' 
  | 'failed';

export interface DeliveryInfo {
  address: string;
  requestedBy: Date;
  deliveredAt: Date | null;
  contactPerson: string;
  contactPhone: string;
}

// ============================================================================
// AI AGENTS
// ============================================================================

export type AgentType = 
  | 'supply-chain' 
  | 'vendor-assistant' 
  | 'sustainability' 
  | 'cultural' 
  | 'economic' 
  | 'orchestrator';

export interface AgentRecommendation {
  id: string;
  recommendedVendorId: string;
  reasoning: string;
  agentScores: AgentScores;
  alternativesPresented: number;
  userAction: UserAction | null;
  userOverrideReason: string | null;
  confidence: number;
  createdAt: Date;
}

export interface AgentScores {
  supplyChain: number;
  sustainability: number;
  cultural: number;
  economic: number;
  overall: number;
}

export type UserAction = 'approved' | 'rejected' | 'modified';

export interface AgentActivity {
  id: string;
  agentType: AgentType;
  agentName: string;
  activityType: AgentActivityType;
  message: string;
  confidence: number | null;
  metadata: Record<string, any>;
  timestamp: Date;
}

export type AgentActivityType = 
  | 'prediction' 
  | 'recommendation' 
  | 'alert' 
  | 'negotiation' 
  | 'analysis';

export interface AgentPerformance {
  agentType: AgentType;
  totalPredictions: number;
  accuracy: number;
  userApprovalRate: number;
  averageConfidence: number;
  lastActive: Date;
}

// ============================================================================
// CARBON TRACKING
// ============================================================================

export interface CarbonImpact {
  localEmissionsKg: number;
  internationalBaselineKg: number;
  savingsKg: number;
  calculationMethod: string;
}

export interface AICarbonLog {
  id: string;
  timestamp: Date;
  operationType: AIOperationType;
  agentName: string;
  modelUsed: string;
  tokensProcessed?: number;
  durationSeconds?: number;
  carbonKg: number;
  region: string;
  metadata: Record<string, any>;
}

export type AIOperationType = 
  | 'openai_completion' 
  | 'speech_to_text' 
  | 'text_to_speech' 
  | 'translation';

export interface CarbonSummary {
  period: string;
  aiEmissionsKg: number;
  supplyChainSavingsKg: number;
  netImpactKg: number;
  roi: number; // Ratio of savings to AI cost
}

// ============================================================================
// IMPACT METRICS
// ============================================================================

export interface EconomicImpact {
  period: string;
  totalSpendUSD: number;
  activeVendors: number;
  averageVendorIncome: number;
  equityScore: number; // 0-100
  vendorDistribution: VendorIncomeDistribution[];
}

export interface VendorIncomeDistribution {
  vendorId: string;
  vendorName: string;
  income: number;
  percentage: number;
}

export interface EfficiencyMetrics {
  period: string;
  averageDeliveryTimeDays: number;
  orderFulfillmentRate: number;
  wasteReductionPercentage: number;
  costSavingsUSD: number;
}

// ============================================================================
// NOTIFICATIONS & ALERTS
// ============================================================================

export interface Alert {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  agentType: AgentType | null;
  relatedEntityId: string | null;
  relatedEntityType: string | null;
  actionRequired: boolean;
  actionUrl: string | null;
  dismissed: boolean;
  createdAt: Date;
}

export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical';

// ============================================================================
// USER & AUTHENTICATION
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  campId: string | null;
  language: Language;
  preferences: UserPreferences;
  createdAt: Date;
}

export type UserRole = 
  | 'camp_manager' 
  | 'logistics_coordinator' 
  | 'finance_officer' 
  | 'ai_auditor' 
  | 'vendor';

export interface UserPreferences {
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  language: Language;
}

// ============================================================================
// API RESPONSES
// ============================================================================

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: APIError;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================================================
// FILTERS & QUERIES
// ============================================================================

export interface InventoryFilters {
  status?: InventoryStatus[];
  category?: ItemCategory[];
  predictedShortage?: boolean;
}

export interface VendorFilters {
  products?: string[];
  maxDistance?: number;
  certifications?: Certification[];
  minRating?: number;
  sortBy?: 'distance' | 'rating' | 'price' | 'agent-score';
}

export interface OrderFilters {
  status?: OrderStatus[];
  vendorId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  sortBy?: 'date' | 'amount' | 'status';
}

// ============================================================================
// REAL-TIME UPDATES
// ============================================================================

export interface WebSocketMessage {
  type: WSMessageType;
  payload: any;
  timestamp: Date;
}

export type WSMessageType = 
  | 'agent_activity' 
  | 'inventory_update' 
  | 'order_update' 
  | 'vendor_update' 
  | 'alert' 
  | 'carbon_update';

// ============================================================================
// DASHBOARD STATE
// ============================================================================

export interface DashboardState {
  selectedCamp: Camp | null;
  inventory: InventoryItem[];
  vendors: Vendor[];
  orders: Order[];
  agentActivities: AgentActivity[];
  alerts: Alert[];
  metrics: DashboardMetrics;
  loading: boolean;
  error: string | null;
}

export interface DashboardMetrics {
  activeOrders: number;
  carbonSavedKg: number;
  localSpendUSD: number;
  agentActivityCount: number;
  agentApprovalRate: number;
}