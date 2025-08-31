import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../ui/Button';
import { Home, Search, Activity, BarChart3, Globe2, Monitor, Bell, FileText, Settings } from 'lucide-react';

const SideNavigation = ({ activeTab, setActiveTab, onLogout}) => {
  const { colors } = useTheme();
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analyst', label: 'Analyst Workstation', icon: Search},
    { id: 'monitoring', label: 'Live Monitoring', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'geographic', label: 'Geographic Intel', icon: Globe2 },
    { id: 'platforms', label: 'Platform Analysis', icon: Monitor },
    { id: 'alerts', label: 'Alert Management', icon: Bell },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleItemClick = (item) => {
    if (item) {
      setActiveTab(item.id);
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
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 transform hover:scale-105 ${
                activeTab === item.id ? 'shadow-lg' : ''
              }`}
              style={{
                backgroundColor: activeTab === item.id ? colors.primary : 'transparent',
                color: activeTab === item.id ? '#ffffff' : colors.textSecondary
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

export default SideNavigation;
