import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Circle from 'ol/geom/Circle';
import { fromLonLat } from 'ol/proj';
import { Style, Fill, Stroke, Text, Circle as CircleStyle } from 'ol/style';
import Overlay from 'ol/Overlay';
import 'ol/ol.css';
import { MapPin, Home } from 'lucide-react';
import { Vendor } from '../../data/mockData';

interface MapViewProps {
    vendors: Vendor[];
    selectedVendor: Vendor | null;
    onSelectVendor: (vendor: Vendor) => void;
}

// Camp Kakuma coordinates
const CAMP_CENTER: [number, number] = [34.8289, 3.7176]; // [lng, lat]

// Generate vendor positions around the camp
const getVendorPosition = (vendor: Vendor, index: number, total: number): [number, number] => {
    const angle = (index / total) * 2 * Math.PI;
    const distanceInDegrees = vendor.distance * 0.009;
    return [
        CAMP_CENTER[0] + distanceInDegrees * Math.cos(angle),
        CAMP_CENTER[1] + distanceInDegrees * Math.sin(angle),
    ];
};

// Get marker color based on average agent score
const getMarkerColor = (vendor: Vendor) => {
    const avgScore = (vendor.agentScores.sustainability + vendor.agentScores.cultural + vendor.agentScores.economic) / 3;
    if (avgScore >= 85) return '#22c55e'; // green
    if (avgScore >= 70) return '#eab308'; // yellow
    return '#9ca3af'; // gray
};

export const MapView: React.FC<MapViewProps> = ({
    vendors,
    selectedVendor,
    onSelectVendor,
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<Map | null>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const [popupContent, setPopupContent] = useState<Vendor | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        // Create camp marker feature
        const campFeature = new Feature({
            geometry: new Point(fromLonLat(CAMP_CENTER)),
            name: 'Camp Kakuma',
            type: 'camp',
        });

        campFeature.setStyle(
            new Style({
                image: new CircleStyle({
                    radius: 12,
                    fill: new Fill({ color: '#2563eb' }),
                    stroke: new Stroke({ color: '#ffffff', width: 3 }),
                }),
                text: new Text({
                    text: '🏠',
                    font: '16px sans-serif',
                    offsetY: 1,
                }),
            })
        );

        // Create vendor marker features
        const vendorFeatures = vendors.map((vendor, index) => {
            const position = getVendorPosition(vendor, index, vendors.length);
            const feature = new Feature({
                geometry: new Point(fromLonLat(position)),
                vendor: vendor,
                type: 'vendor',
            });

            const color = getMarkerColor(vendor);
            const isSelected = selectedVendor?.id === vendor.id;

            feature.setStyle(
                new Style({
                    image: new CircleStyle({
                        radius: isSelected ? 14 : 10,
                        fill: new Fill({ color }),
                        stroke: new Stroke({
                            color: isSelected ? '#3b82f6' : '#ffffff',
                            width: isSelected ? 3 : 2
                        }),
                    }),
                })
            );

            return feature;
        });

        // Create distance circles (10km, 25km, 50km)
        const distanceCircles = [10, 25, 50].map((km) => {
            const circle = new Feature({
                geometry: new Circle(fromLonLat(CAMP_CENTER), km * 1000),
            });
            circle.setStyle(
                new Style({
                    stroke: new Stroke({
                        color: 'rgba(156, 163, 175, 0.4)',
                        width: 1,
                        lineDash: [10, 10],
                    }),
                    fill: new Fill({
                        color: 'rgba(0, 0, 0, 0)',
                    }),
                })
            );
            return circle;
        });

        // Vector source and layer for markers
        const vectorSource = new VectorSource({
            features: [campFeature, ...vendorFeatures, ...distanceCircles],
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
        });

        // Create the map
        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                vectorLayer,
            ],
            view: new View({
                center: fromLonLat(CAMP_CENTER),
                zoom: 10,
            }),
        });

        // Create popup overlay
        const popup = new Overlay({
            element: popupRef.current!,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -15],
        });
        map.addOverlay(popup);

        // Handle click events
        map.on('click', (event) => {
            const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
            if (feature && feature.get('type') === 'vendor') {
                const vendor = feature.get('vendor');
                onSelectVendor(vendor);
                setPopupContent(vendor);
                popup.setPosition(event.coordinate);
            } else {
                setPopupContent(null);
                popup.setPosition(undefined);
            }
        });

        // Change cursor on hover
        map.on('pointermove', (event) => {
            const hit = map.hasFeatureAtPixel(event.pixel, {
                layerFilter: (layer) => layer === vectorLayer,
            });
            map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        });

        mapInstanceRef.current = map;

        return () => {
            map.setTarget(undefined);
        };
    }, [vendors, selectedVendor, onSelectVendor]);

    // Update vendor styles when selection changes
    useEffect(() => {
        if (!mapInstanceRef.current) return;

        const vectorLayer = mapInstanceRef.current.getLayers().getArray()[1] as VectorLayer<VectorSource>;
        const source = vectorLayer.getSource();

        source?.getFeatures().forEach((feature) => {
            if (feature.get('type') === 'vendor') {
                const vendor = feature.get('vendor');
                const color = getMarkerColor(vendor);
                const isSelected = selectedVendor?.id === vendor.id;

                feature.setStyle(
                    new Style({
                        image: new CircleStyle({
                            radius: isSelected ? 14 : 10,
                            fill: new Fill({ color }),
                            stroke: new Stroke({
                                color: isSelected ? '#3b82f6' : '#ffffff',
                                width: isSelected ? 3 : 2
                            }),
                        }),
                    })
                );
            }
        });
    }, [selectedVendor]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full min-h-[500px]">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-900">Vendor Map</h3>
                        <p className="text-xs text-gray-500">Click markers to view vendor details • Powered by OpenStreetMap</p>
                    </div>
                </div>
            </div>

            {/* Map Container */}
            <div ref={mapRef} className="h-[450px] w-full" />

            {/* Popup */}
            <div ref={popupRef} className={popupContent ? 'block' : 'hidden'}>
                {popupContent && (
                    <div className="bg-white rounded-lg shadow-lg p-3 min-w-[180px] border border-gray-200">
                        <h4 className="font-semibold text-gray-900">{popupContent.name}</h4>
                        <p className="text-sm text-gray-600">{popupContent.distance} km away</p>
                        <p className="text-sm text-gray-600">Rating: {popupContent.rating}★</p>
                        <div className="mt-2 flex gap-1 flex-wrap">
                            {popupContent.certifications.slice(0, 2).map((cert, i) => (
                                <span key={i} className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                                    {cert}
                                </span>
                            ))}
                        </div>
                        <button
                            onClick={() => onSelectVendor(popupContent)}
                            className="mt-2 w-full text-xs bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 transition-colors"
                        >
                            View Details
                        </button>
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs">
                        <span className="text-gray-500">Agent Scores:</span>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span>High (&gt;85%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <span>Medium (70-85%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-gray-400" />
                            <span>Lower (&lt;70%)</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <div className="w-3 h-3 rounded-full bg-blue-600" />
                        <span>Camp</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
