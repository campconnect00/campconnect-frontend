import React, { useState } from 'react';
import { X, Calendar, ShoppingCart, Leaf, DollarSign, Truck } from 'lucide-react';
import { Vendor } from '../../data/mockData';

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    vendor: Vendor | null;
}

export const OrderModal: React.FC<OrderModalProps> = ({
    isOpen,
    onClose,
    vendor,
}) => {
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [deliveryDate, setDeliveryDate] = useState('');
    const [notes, setNotes] = useState('');

    if (!isOpen || !vendor) return null;

    const handleQuantityChange = (productName: string, value: number) => {
        setQuantities(prev => ({ ...prev, [productName]: value }));
    };

    const calculateTotal = () => {
        return vendor.products.reduce((total, product) => {
            const qty = quantities[product.name] || 0;
            return total + qty * product.pricePerUnit;
        }, 0);
    };

    const hasItems = Object.values(quantities).some(q => q > 0);
    const total = calculateTotal();

    const handleSubmit = () => {
        alert(`Order submitted to ${vendor.name}!\n\nTotal: KES ${total.toLocaleString()}\n\nVendor will be notified via SMS.`);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 flex items-center justify-between text-white">
                    <div>
                        <h2 className="text-xl font-bold">Place Order</h2>
                        <p className="text-blue-200 text-sm">{vendor.name}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    {/* Product Selection */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Select Products</h3>
                        <div className="space-y-3">
                            {vendor.products.map((product) => (
                                <div
                                    key={product.name}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900">{product.name}</p>
                                        <p className="text-sm text-gray-500">
                                            KES {product.pricePerUnit}/{product.unit} • Available: {product.quantity} {product.unit}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="number"
                                            min="0"
                                            max={product.quantity}
                                            value={quantities[product.name] || ''}
                                            onChange={(e) => handleQuantityChange(product.name, parseInt(e.target.value) || 0)}
                                            placeholder="0"
                                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <span className="text-sm text-gray-500 w-8">{product.unit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Delivery Date */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Delivery Details</h3>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <input
                                type="date"
                                value={deliveryDate}
                                onChange={(e) => setDeliveryDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Special Instructions</h3>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Any special delivery instructions or requirements..."
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        />
                    </div>

                    {/* Order Summary */}
                    {hasItems && (
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>

                            {/* Items */}
                            <div className="space-y-2 mb-4">
                                {vendor.products.map((product) => {
                                    const qty = quantities[product.name] || 0;
                                    if (qty === 0) return null;
                                    return (
                                        <div key={product.name} className="flex justify-between text-sm">
                                            <span className="text-gray-700">{product.name} × {qty} {product.unit}</span>
                                            <span className="font-medium">KES {(qty * product.pricePerUnit).toLocaleString()}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="border-t border-gray-200 pt-3">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-blue-600">KES {total.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Impact Preview */}
                            <div className="mt-4 grid grid-cols-3 gap-3">
                                <div className="text-center p-2 bg-white rounded-lg border border-gray-200">
                                    <Leaf className="w-4 h-4 text-green-600 mx-auto mb-1" />
                                    <p className="text-xs text-gray-500">Carbon Saved</p>
                                    <p className="text-sm font-bold text-green-600">{vendor.carbonSavings} kg</p>
                                </div>
                                <div className="text-center p-2 bg-white rounded-lg border border-gray-200">
                                    <DollarSign className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                                    <p className="text-xs text-gray-500">To Community</p>
                                    <p className="text-sm font-bold text-blue-600">KES {total.toLocaleString()}</p>
                                </div>
                                <div className="text-center p-2 bg-white rounded-lg border border-gray-200">
                                    <Truck className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                                    <p className="text-xs text-gray-500">Delivery</p>
                                    <p className="text-sm font-bold text-purple-600">{vendor.distance} km</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!hasItems}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};
