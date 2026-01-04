import React from 'react';
import { MapPin } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'active' | 'inactive';
}

interface SupplierMapProps {
  suppliers: Supplier[];
  onSupplierClick?: (supplier: Supplier) => void;
}

export const SupplierMap: React.FC<SupplierMapProps> = ({
  suppliers,
  onSupplierClick,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Supplier Locations</h3>
      </div>
      <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center text-gray-500">
        <p>Map view would be displayed here</p>
      </div>
      <div className="mt-4 space-y-2">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            onClick={() => onSupplierClick?.(supplier)}
            className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
          >
            <p className="font-medium text-gray-900">{supplier.name}</p>
            <p className="text-xs text-gray-500">
              {supplier.lat}, {supplier.lng}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
