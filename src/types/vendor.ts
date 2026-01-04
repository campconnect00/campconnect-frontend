export interface Vendor {
  id: string;
  name: string;
  rating: number;
  location: string;
  latitude: number;
  longitude: number;
  products: string[];
  phone?: string;
  email?: string;
  website?: string;
  status: 'active' | 'inactive';
  leadTime: number;
  minimumOrder: number;
}

export interface VendorMetrics {
  totalVendors: number;
  activeVendors: number;
  averageRating: number;
  onTimeDeliveryRate: number;
}
