import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useTheme } from '../../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  userName?: string;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  userName,
  onLogout,
}) => {
  const { theme } = useTheme();

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName={userName} onLogout={onLogout} />
        <main className={`flex-1 overflow-auto transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};
