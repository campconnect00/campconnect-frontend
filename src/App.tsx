import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Suppliers } from './pages/Suppliers';
import { Impact } from './pages/Impact';
import { AIAgents } from './pages/AIAgents';
import { Settings } from './pages/Settings';
import { Transparency } from './pages/Transparency';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/agents" element={<AIAgents />} />
          <Route path="/transparency" element={<Transparency />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;