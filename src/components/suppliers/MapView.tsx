import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle, InfoWindow } from '@react-google-maps/api';
import { MapPin, Home, AlertCircle } from 'lucide-react';
import { Vendor } from '../../data/mockData';

interface MapViewProps {
    vendors: Vendor[];
    selectedVendor: Vendor | null;
    onSelectVendor: (vendor: Vendor) => void;
}

// Camp Kakuma coordinates (approximate)
const CAMP_CENTER = {
    lat: 3.7176,
    lng: 34.8289
};

const mapContainerStyle = {
    width: '100%',
    height: '100%',
    minHeight: '500px',
};

const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: true,
    fullscreenControl: true,
    styles: [
        {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
        },
    ],
};

// Generate vendor positions around the camp
const getVendorPosition = (vendor: Vendor, index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    const distanceInDegrees = vendor.distance * 0.009; // Approximate conversion
    return {
        lat: CAMP_CENTER.lat + distanceInDegrees * Math.sin(angle),
        lng: CAMP_CENTER.lng + distanceInDegrees * Math.cos(angle),
    };
};

// Get pin color based on average agent score
const getMarkerColor = (vendor: Vendor) => {
    const avgScore = (vendor.agentScores.sustainability + vendor.agentScores.cultural + vendor.agentScores.economic) / 3;
    if (avgScore >= 85) return '#22c55e'; // green
    if (avgScore >= 70) return '#eab308'; // yellow
    return '#9ca3af'; // gray
};

// Fallback map component when Google Maps fails to load
const FallbackMap: React.FC<MapViewProps> = ({ vendors, selectedVendor, onSelectVendor }) => {
    const getVendorPositionCSS = (vendor: Vendor, index: number) => {
        const angle = (index / vendors.length) * 2 * Math.PI;
        const normalizedDistance = Math.min(vendor.distance / 50, 1);
        const radius = 30 + normalizedDistance * 30;
        return {
            left: `${50 + radius * Math.cos(angle)}%`,
            top: `${50 + radius * Math.sin(angle)}%`,
        };
    };

    return (
        <div className="relative h-full min-h-[500px] bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 rounded-lg overflow-hidden">
            {/* Distance rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-[80%] h-[80%] rounded-full border-2 border-dashed border-gray-300" />
                <div className="absolute w-[55%] h-[55%] rounded-full border-2 border-dashed border-gray-300" />
                <div className="absolute w-[30%] h-[30%] rounded-full border-2 border-dashed border-gray-300" />
            </div>

            {/* Camp marker */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg border-4 border-white">
                    <Home className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs font-semibold bg-blue-600 text-white px-2 py-1 rounded-full shadow">
                        Camp Kakuma
                    </span>
                </div>
            </div>

            {/* Vendor pins */}
            {vendors.map((vendor, index) => {
                const position = getVendorPositionCSS(vendor, index);
                const isSelected = selectedVendor?.id === vendor.id;
                const pinColor = getMarkerColor(vendor);

                return (
                    <div
                        key={vendor.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                        style={{ left: position.left, top: position.top }}
                        onClick={() => onSelectVendor(vendor)}
                    >
                        <div className={`relative transition-transform duration-200 ${isSelected ? 'scale-125 z-30' : 'hover:scale-110'}`}>
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                                style={{
                                    backgroundColor: pinColor,
                                    border: isSelected ? '3px solid #3b82f6' : '2px solid white',
                                }}
                            >
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                                    <div className="font-semibold">{vendor.name}</div>
                                    <div className="text-gray-300">{vendor.distance} km away</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-sm border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">Agent Scores</p>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-xs text-gray-600">High (&gt;85%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <span className="text-xs text-gray-600">Medium (70-85%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                        <span className="text-xs text-gray-600">Lower (&lt;70%)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const MapView: React.FC<MapViewProps> = ({
    vendors,
    selectedVendor,
    onSelectVendor,
}) => {
    const [activeMarker, setActiveMarker] = useState<string | null>(null);

    // Load Google Maps - you'll need to add your API key to .env
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
        // If no API key, the map won't load and we'll show the fallback
    });

    const onMapClick = useCallback(() => {
        setActiveMarker(null);
    }, []);

    const handleMarkerClick = (vendor: Vendor) => {
        setActiveMarker(vendor.id);
        onSelectVendor(vendor);
    };

    // Show fallback if no API key or loading error
    if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY || loadError) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full min-h-[500px]">
                <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-900">Vendor Map</h3>
                            <p className="text-xs text-gray-500">Click pins to view vendor details</p>
                        </div>
                        {!process.env.REACT_APP_GOOGLE_MAPS_API_KEY && (
                            <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                                <AlertCircle className="w-3 h-3" />
                                Add Google Maps API key for real map
                            </div>
                        )}
                    </div>
                </div>
                <FallbackMap vendors={vendors} selectedVendor={selectedVendor} onSelectVendor={onSelectVendor} />
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full min-h-[500px] flex items-center justify-center">
                <div className="text-gray-500">Loading map...</div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full min-h-[500px]">
            <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="font-semibold text-gray-900">Vendor Map</h3>
                <p className="text-xs text-gray-500">Click markers to view vendor details</p>
            </div>

            <div className="h-[450px]">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={CAMP_CENTER}
                    zoom={11}
                    options={mapOptions}
                    onClick={onMapClick}
                >
                    {/* Camp marker */}
                    <Marker
                        position={CAMP_CENTER}
                        icon={{
                            path: 'M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0',
                            fillColor: '#2563eb',
                            fillOpacity: 1,
                            strokeColor: '#ffffff',
                            strokeWeight: 3,
                            scale: 1.5,
                        }}
                        title="Camp Kakuma"
                    />

                    {/* Distance circles */}
                    {[10, 25, 50].map((radius) => (
                        <Circle
                            key={radius}
                            center={CAMP_CENTER}
                            radius={radius * 1000}
                            options={{
                                strokeColor: '#9ca3af',
                                strokeOpacity: 0.5,
                                strokeWeight: 1,
                                fillOpacity: 0,
                            }}
                        />
                    ))}

                    {/* Vendor markers */}
                    {vendors.map((vendor, index) => {
                        const position = getVendorPosition(vendor, index, vendors.length);
                        const markerColor = getMarkerColor(vendor);
                        const isSelected = selectedVendor?.id === vendor.id;

                        return (
                            <React.Fragment key={vendor.id}>
                                <Marker
                                    position={position}
                                    icon={{
                                        path: 'M-8,0a8,8 0 1,0 16,0a8,8 0 1,0 -16,0',
                                        fillColor: markerColor,
                                        fillOpacity: 1,
                                        strokeColor: isSelected ? '#3b82f6' : '#ffffff',
                                        strokeWeight: isSelected ? 3 : 2,
                                        scale: isSelected ? 1.3 : 1,
                                    }}
                                    title={vendor.name}
                                    onClick={() => handleMarkerClick(vendor)}
                                />
                                {activeMarker === vendor.id && (
                                    <InfoWindow
                                        position={position}
                                        onCloseClick={() => setActiveMarker(null)}
                                    >
                                        <div className="p-2 min-w-[150px]">
                                            <h4 className="font-semibold text-gray-900">{vendor.name}</h4>
                                            <p className="text-sm text-gray-600">{vendor.distance} km away</p>
                                            <p className="text-sm text-gray-600">Rating: {vendor.rating}★</p>
                                            <div className="mt-2 flex gap-1 flex-wrap">
                                                {vendor.certifications.map((cert, i) => (
                                                    <span key={i} className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                                                        {cert}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </InfoWindow>
                                )}
                            </React.Fragment>
                        );
                    })}
                </GoogleMap>
            </div>

            {/* Legend */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center gap-4 text-xs">
                    <span className="text-gray-500">Agent Scores:</span>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span>High</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                        <span>Lower</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
