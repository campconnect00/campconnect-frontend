import React from 'react';
import { Star, MapPin, Phone } from 'lucide-react';

interface VendorCardProps {
  id: string;
  name: string;
  rating: number;
  location: string;
  products: string[];
  phone?: string;
  onClick?: () => void;
}

export const VendorCard: React.FC<VendorCardProps> = ({
  id,
  name,
  rating,
  location,
  products,
  phone,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="font-medium text-gray-900">{rating}</span>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {location}
        </div>
        {phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {phone}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {products.map((product) => (
          <span
            key={product}
            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
          >
            {product}
          </span>
        ))}
      </div>
    </div>
  );
};
