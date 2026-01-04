import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Package,
  Truck,
  Zap,
  Brain,
  Settings,
  ChevronRight,
  Eye,
  ChevronLeft,
} from 'lucide-react';

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/dashboard' },
  { icon: Package, label: 'Inventory', href: '/inventory' },
  { icon: Truck, label: 'Suppliers', href: '/suppliers' },
  { icon: Zap, label: 'Impact', href: '/impact' },
  { icon: Brain, label: 'AI Agents', href: '/agents' },
  { icon: Eye, label: 'AI Transparency', href: '/transparency' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex flex-col transition-all duration-300 relative`}>
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-blue-600 hover:bg-blue-700 rounded-full p-1.5 shadow-lg z-10 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-white" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg flex-shrink-0">
            <Package className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">CampConnect</h1>
              <p className="text-xs text-gray-400">AI Humanitarian Logistics</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
              {!isCollapsed && <span className="flex-1 font-medium">{item.label}</span>}
              {!isCollapsed && isActive && <ChevronRight className="w-4 h-4 text-white/70" />}
            </Link>
          );
        })}
      </nav>

      {/* Agent Status Footer - Always at bottom */}
      <div className="p-4 border-t border-gray-700 bg-gray-800/50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-75" />
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium text-white">5 Agents Active</p>
              <p className="text-xs text-gray-400">127 actions today</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
