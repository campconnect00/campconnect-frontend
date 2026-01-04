import React, { useState, useMemo } from 'react';
import { Layout } from '../components/layout/Layout';
import { VendorCardEnhanced } from '../components/suppliers/VendorCardEnhanced';
import { MapView } from '../components/suppliers/MapView';
import { OrderModal } from '../components/suppliers/OrderModal';
import { AIChat } from '../components/shared/AIChat';
import { Search, ChevronDown, MapPin, MessageCircle, Grid, List } from 'lucide-react';
import { mockVendors, Vendor } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const productTypes = ['All Products', 'Meat', 'Dairy', 'Grains', 'Vegetables', 'Cooking Supplies'];
const dietaryTags = ['All', 'Halal', 'Organic', 'Fair Trade', 'Local', 'Women-Owned'];
const distanceOptions = ['Any Distance', 'Within 10km', 'Within 25km', 'Within 50km'];
const sortOptions = ['Agent Score', 'Distance', 'Rating', 'Price'];

export const Suppliers: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('All Products');
  const [selectedDietary, setSelectedDietary] = useState('All');
  const [selectedDistance, setSelectedDistance] = useState('Any Distance');
  const [sortBy, setSortBy] = useState('Agent Score');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderVendor, setOrderVendor] = useState<Vendor | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort vendors with useMemo for performance
  const sortedVendors = useMemo(() => {
    // Filter vendors
    let vendors = mockVendors.filter(vendor => {
      const matchesSearch = searchTerm === '' ||
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.products.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDietary = selectedDietary === 'All' ||
        vendor.certifications.some(c => c.toLowerCase().includes(selectedDietary.toLowerCase()));

      let matchesDistance = true;
      if (selectedDistance === 'Within 10km') matchesDistance = vendor.distance <= 10;
      else if (selectedDistance === 'Within 25km') matchesDistance = vendor.distance <= 25;
      else if (selectedDistance === 'Within 50km') matchesDistance = vendor.distance <= 50;

      // Product type filter
      let matchesProduct = true;
      if (selectedProduct !== 'All Products') {
        matchesProduct = vendor.products.some(p =>
          p.name.toLowerCase().includes(selectedProduct.toLowerCase())
        );
      }

      return matchesSearch && matchesDietary && matchesDistance && matchesProduct;
    });

    // Sort vendors
    switch (sortBy) {
      case 'Agent Score':
        return [...vendors].sort((a, b) => {
          const aScore = (a.agentScores.sustainability + a.agentScores.cultural + a.agentScores.economic) / 3;
          const bScore = (b.agentScores.sustainability + b.agentScores.cultural + b.agentScores.economic) / 3;
          return bScore - aScore;
        });
      case 'Distance':
        return [...vendors].sort((a, b) => a.distance - b.distance);
      case 'Rating':
        return [...vendors].sort((a, b) => b.rating - a.rating);
      case 'Price':
        return [...vendors].sort((a, b) => {
          const aAvgPrice = a.products.reduce((sum, p) => sum + p.pricePerUnit, 0) / a.products.length;
          const bAvgPrice = b.products.reduce((sum, p) => sum + p.pricePerUnit, 0) / b.products.length;
          return aAvgPrice - bAvgPrice;
        });
      default:
        return vendors;
    }
  }, [searchTerm, selectedProduct, selectedDietary, selectedDistance, sortBy]);

  const handleOrder = (vendor: Vendor) => {
    setOrderVendor(vendor);
    setOrderModalOpen(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedProduct('All Products');
    setSelectedDietary('All');
    setSelectedDistance('Any Distance');
    setSortBy('Agent Score');
  };

  const hasActiveFilters = searchTerm || selectedProduct !== 'All Products' ||
    selectedDietary !== 'All' || selectedDistance !== 'Any Distance';

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Supplier Marketplace</h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Find and order from local vendors with AI-powered recommendations</p>
          </div>
          <button
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Ask AI
          </button>
        </div>

        {/* Search & Filters */}
        <div className={`rounded-xl shadow-sm border p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="flex-1 min-w-[280px] relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search products or vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-gray-300 bg-white'
                  }`}
              />
            </div>

            {/* Product Type */}
            <div className="relative">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className={`appearance-none pl-4 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
              >
                {productTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            {/* Dietary Tags */}
            <div className="relative">
              <select
                value={selectedDietary}
                onChange={(e) => setSelectedDietary(e.target.value)}
                className={`appearance-none pl-4 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
              >
                {dietaryTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            {/* Distance */}
            <div className="relative">
              <select
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(e.target.value)}
                className={`appearance-none pl-4 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
              >
                {distanceOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`appearance-none pl-4 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
              >
                {sortOptions.map(opt => (
                  <option key={opt} value={opt}>Sort: {opt}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            {/* View Toggle */}
            <div className={`flex border rounded-lg overflow-hidden ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 ${viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : (isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white hover:bg-gray-50')
                  }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 ${viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : (isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white hover:bg-gray-50')
                  }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Main Content: Map + Vendor List */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Map View - 2 columns */}
          <div className="lg:col-span-2">
            <MapView
              vendors={sortedVendors}
              selectedVendor={selectedVendor}
              onSelectVendor={setSelectedVendor}
            />
          </div>

          {/* Vendor List - 3 columns */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {sortedVendors.length} vendors found
              </span>
              <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <MapPin className="w-4 h-4" />
                Near Camp Kakuma
              </div>
            </div>

            <div className={viewMode === 'grid' ? 'space-y-4' : 'space-y-2'}>
              {sortedVendors.map(vendor => (
                <VendorCardEnhanced
                  key={vendor.id}
                  vendor={vendor}
                  isSelected={selectedVendor?.id === vendor.id}
                  onSelect={() => setSelectedVendor(vendor)}
                  onOrder={() => handleOrder(vendor)}
                  compact={viewMode === 'list'}
                />
              ))}
            </div>

            {sortedVendors.length === 0 && (
              <div className={`rounded-xl p-8 text-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>No vendors match your search criteria</p>
                <button
                  onClick={clearFilters}
                  className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        vendor={orderVendor}
      />

      <AIChat
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        selectedAgent="Vendor Assistant"
      />
    </Layout>
  );
};
