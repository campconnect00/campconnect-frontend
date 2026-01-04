export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  status: 'in-stock' | 'low' | 'critical';
  supplier: string;
  supplierId: string;
  lastUpdated: string;
  location: string;
  cost: number;
}

export interface InventoryMetrics {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  criticalItems: number;
  turnoverRate: number;
}
