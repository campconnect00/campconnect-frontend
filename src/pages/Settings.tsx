import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { Settings as SettingsIcon, Moon, Globe, Bell } from 'lucide-react';

export const Settings: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  const handleSave = () => {
    // Handle settings save
    console.log({ theme, notifications, language });
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Customize your CampConnect experience
          </p>
        </div>

        <Card>
          <div className="space-y-6">
            {/* Theme Setting */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Moon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Theme</h3>
                  <p className="text-sm text-gray-600">Choose your preferred theme</p>
                </div>
              </div>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* Notifications Setting */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Bell className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-600">Receive system notifications</p>
                </div>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
              </label>
            </div>

            {/* Language Setting */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Globe className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Language</h3>
                  <p className="text-sm text-gray-600">Select your preferred language</p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
              <Button variant="secondary">Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
