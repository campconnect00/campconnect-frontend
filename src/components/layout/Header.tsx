import React, { useState } from 'react';
import { Bell, ChevronDown, Moon, Sun } from 'lucide-react';
import { mockCamps, mockLanguages } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  userName?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userName = 'John Doe' }) => {
  const { theme, toggleTheme } = useTheme();
  const [selectedCamp, setSelectedCamp] = useState(mockCamps[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(mockLanguages[0]);
  const [showCampDropdown, setShowCampDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'Supply Chain Agent: Protein shortage predicted', time: '2 min ago', unread: true },
    { id: 2, message: 'Order confirmed from Ahmed\'s Farm', time: '15 min ago', unread: true },
    { id: 3, message: 'Sustainability Agent: Carbon target achieved', time: '1 hour ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const isDark = theme === 'dark';

  return (
    <header className={`border-b px-6 py-4 shadow-sm transition-colors duration-300 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
      <div className="flex items-center justify-between">
        {/* Left side - Camp selector */}
        <div className="flex items-center gap-4">
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Camp:</h2>
          <div className="relative">
            <button
              onClick={() => setShowCampDropdown(!showCampDropdown)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-900'
                }`}
            >
              <span className="font-semibold">{selectedCamp.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showCampDropdown && (
              <div className={`absolute top-full left-0 mt-1 w-56 rounded-lg shadow-lg border z-50 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                {mockCamps.map(camp => (
                  <button
                    key={camp.id}
                    onClick={() => {
                      setSelectedCamp(camp);
                      setShowCampDropdown(false);
                    }}
                    className={`w-full px-4 py-3 text-left first:rounded-t-lg last:rounded-b-lg transition-colors ${selectedCamp.id === camp.id
                        ? (isDark ? 'bg-blue-900' : 'bg-blue-50')
                        : (isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50')
                      }`}
                  >
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{camp.name}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {camp.country} • Pop: {camp.population.toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side - Theme, Language, Notifications, User */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-colors ${isDark
                  ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-white'
                  : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
            >
              <span className="text-lg">{selectedLanguage.flag}</span>
              <span className="text-sm font-medium">{selectedLanguage.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showLanguageDropdown && (
              <div className={`absolute top-full right-0 mt-1 w-40 rounded-lg shadow-lg border z-50 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                {mockLanguages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setShowLanguageDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg transition-colors ${selectedLanguage.code === lang.code
                        ? (isDark ? 'bg-blue-900' : 'bg-blue-50')
                        : (isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50')
                      }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-full relative transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
            >
              <Bell className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className={`absolute top-full right-0 mt-1 w-80 rounded-lg shadow-lg border z-50 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 border-b last:border-0 transition-colors cursor-pointer ${notification.unread
                          ? (isDark ? 'bg-blue-900/30' : 'bg-blue-50')
                          : ''
                        } ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'}`}
                    >
                      <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{notification.message}</p>
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className={`px-4 py-2 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className={`flex items-center gap-3 pl-4 border-l ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold shadow-md">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="hidden md:block">
              <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{userName}</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Camp Manager</div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside handlers */}
      {(showCampDropdown || showLanguageDropdown || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowCampDropdown(false);
            setShowLanguageDropdown(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
};
