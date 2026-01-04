export interface Order {
  id: string;
  orderNumber: string;
  vendorId: string;
  vendorName: string;
  items: OrderItem[];
  totalCost: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdDate: string;
  expectedDeliveryDate: string;
  deliveryDate?: string;
  notes?: string;
}

export interface OrderItem {
  inventoryId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface OrderMetrics {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  averageDeliveryTime: number;
  onTimeDeliveryPercentage: number;
}
