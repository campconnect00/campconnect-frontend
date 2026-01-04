import React from 'react';
import { Star, MapPin, Clock, Leaf, Users, DollarSign, MessageCircle, ShoppingCart } from 'lucide-react';
import { Vendor, COLORS } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

interface VendorCardEnhancedProps {
    vendor: Vendor;
    isSelected?: boolean;
    onSelect?: () => void;
    onOrder?: () => void;
    compact?: boolean;
}

export const VendorCardEnhanced: React.FC<VendorCardEnhancedProps> = ({
    vendor,
    isSelected,
    onSelect,
    onOrder,
    compact = false,
}) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const avgScore = Math.round(
        (vendor.agentScores.sustainability + vendor.agentScores.cultural + vendor.agentScores.economic) / 3
    );

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'bg-green-500';
        if (score >= 80) return 'bg-green-400';
        if (score >= 70) return 'bg-yellow-400';
        return 'bg-gray-400';
    };

    if (compact) {
        return (
            <div
                className={`rounded-xl shadow-sm border-2 overflow-hidden transition-all hover:shadow-md cursor-pointer ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                    } ${isSelected ? 'border-blue-500 ring-2 ring-blue-100' : ''}`}
                onClick={onSelect}
            >
                <div className="p-4 flex items-center gap-4">
                    <div className="flex-shrink-0 text-center">
                        <div className="text-2xl font-bold text-blue-600">{avgScore}%</div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Score</div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{vendor.name}</h3>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-full">
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                <span className="text-xs font-semibold text-amber-700">{vendor.rating}</span>
                            </div>
                        </div>
                        <div className={`flex items-center gap-4 text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <span>{vendor.distance} km</span>
                            <span>{vendor.certifications.join(', ')}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onOrder?.();
                            }}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm"
                        >
                            Order
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`rounded-xl shadow-sm border-2 overflow-hidden transition-all hover:shadow-lg cursor-pointer ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                } ${isSelected ? 'border-blue-500 ring-2 ring-blue-100' : ''}`}
            onClick={onSelect}
        >
            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{vendor.name}</h3>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-full">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span className="text-sm font-semibold text-amber-700">{vendor.rating}</span>
                            </div>
                        </div>
                        <div className={`flex items-center gap-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {vendor.distance} km
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {vendor.responseTime}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{avgScore}%</div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Agent Score</div>
                    </div>
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {vendor.certifications.map((cert, idx) => (
                        <span
                            key={idx}
                            className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200"
                        >
                            ✓ {cert}
                        </span>
                    ))}
                </div>

                {/* Products */}
                <div className="mb-4">
                    <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Available Products:</p>
                    <div className="grid grid-cols-2 gap-2">
                        {vendor.products.slice(0, 4).map((product, idx) => (
                            <div key={idx} className={`flex justify-between items-center rounded-lg px-3 py-2 ${isDark ? 'bg-gray-700' : 'bg-gray-50'
                                }`}>
                                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{product.name}</span>
                                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {product.currency === 'KES' ? 'KES ' : '$'}{product.pricePerUnit}/{product.unit}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Agent Scores */}
                <div className="mb-4">
                    <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Agent Intelligence Scores:</p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Leaf className="w-4 h-4" style={{ color: COLORS.agents.sustainability }} />
                            <span className={`text-xs w-24 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Sustainability</span>
                            <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
                                <div
                                    className={`h-full rounded-full ${getScoreColor(vendor.agentScores.sustainability)}`}
                                    style={{ width: `${vendor.agentScores.sustainability}%` }}
                                />
                            </div>
                            <span className={`text-xs font-medium w-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{vendor.agentScores.sustainability}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" style={{ color: COLORS.agents.cultural }} />
                            <span className={`text-xs w-24 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Cultural</span>
                            <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
                                <div
                                    className={`h-full rounded-full ${getScoreColor(vendor.agentScores.cultural)}`}
                                    style={{ width: `${vendor.agentScores.cultural}%` }}
                                />
                            </div>
                            <span className={`text-xs font-medium w-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{vendor.agentScores.cultural}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" style={{ color: COLORS.agents.economic }} />
                            <span className={`text-xs w-24 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Economic</span>
                            <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
                                <div
                                    className={`h-full rounded-full ${getScoreColor(vendor.agentScores.economic)}`}
                                    style={{ width: `${vendor.agentScores.economic}%` }}
                                />
                            </div>
                            <span className={`text-xs font-medium w-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{vendor.agentScores.economic}%</span>
                        </div>
                    </div>
                </div>

                {/* Carbon Savings */}
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-100 mb-4">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">
                        <strong>{vendor.carbonSavings} kg CO₂</strong> saved vs international
                    </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            alert(`Contacting ${vendor.name} at ${vendor.phone}`);
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border rounded-lg transition-colors font-medium ${isDark
                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <MessageCircle className="w-4 h-4" />
                        Contact
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onOrder?.();
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Order
                    </button>
                </div>
            </div>
        </div>
    );
};
