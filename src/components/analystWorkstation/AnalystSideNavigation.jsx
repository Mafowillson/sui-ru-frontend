import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';
import { Home, Search, FileText, Settings } from 'lucide-react';

const AnalystSideNavigation = ({ onLogout }) => {
  const { colors } = useTheme();
  const [currentApp, setCurrentApp] = useState('analyst');

  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: Home },
    { id: 'analyst', label: 'Analyst Workstation', icon: Search },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleNavigation = (id) => {
    if (id === 'dashboard') {
      window.location.reload();
    } else {
      setCurrentApp(id);
    }
  };

  return (
    <div 
      className="w-64 backdrop-blur-sm border-r h-screen fixed left-0 top-16 z-40 transition-all duration-300"
      style={{ 
        backgroundColor: colors.navBg,
        borderColor: colors.navBorder 
      }}
    >
      <div className="p-4">
        <div className="space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 transform hover:scale-105 ${
                currentApp === item.id ? 'shadow-lg' : ''
              }`}
              style={{
                backgroundColor: currentApp === item.id ? colors.primary : 'transparent',
                color: currentApp === item.id ? '#ffffff' : colors.textSecondary
              }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
        
        <div 
          className="border-t mt-6 pt-6"
          style={{ borderColor: colors.border }}
        >
          <Button variant="danger" className="w-full" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalystSideNavigation;