import React, { useState } from 'react';
import { VendorCard } from './VendorCard';

interface Vendor {
  id: string;
  name: string;
  rating: number;
  location: string;
  products: string[];
  phone?: string;
}

interface VendorListProps {
  vendors: Vendor[];
  onVendorSelect?: (vendor: Vendor) => void;
}

export const VendorList: React.FC<VendorListProps> = ({
  vendors,
  onVendorSelect,
}) => {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const handleVendorClick = (vendor: Vendor) => {
    setSelectedVendor(vendor.id);
    onVendorSelect?.(vendor);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Suppliers & Vendors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            {...vendor}
            onClick={() => handleVendorClick(vendor)}
          />
        ))}
      </div>
    </div>
  );
};
