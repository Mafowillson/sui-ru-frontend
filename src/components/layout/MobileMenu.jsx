import React, { useState } from 'react';
import { Home, MessageSquare, Camera, Phone, ChevronDown, Brain, BarChart3, GraduationCap, FileText, HelpCircle, Building2} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';

const MobileMenu = ({ user, handleAuthClick, onNavigate, isOpen, onClose, onLogout }) => {
  const { colors } = useTheme();
  const [expandedSection, setExpandedSection] = useState(null);

  const handleNavigation = (path) => {
    onNavigate(path);
    onClose();
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const MobileDropdownSection = ({ title, items, isExpanded, onToggle, icon: Icon }) => (
    <div className="space-y-2">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onToggle}
        className="text-sm font-medium hover:scale-105 transition-transform justify-between w-full"
      >
        <div className="flex items-center">
          <Icon className="w-4 h-4 mr-2" />
          {title}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </Button>
      
      {isExpanded && (
        <div className="ml-6 space-y-2">
          {items.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation(item.path)}
              className="text-sm hover:scale-105 transition-transform justify-start w-full"
            >
              <item.icon className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
              <div className="text-left">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs" style={{ color: colors.textMuted }}>{item.description}</div>
              </div>
            </Button>
          ))}
        </div>
      )}
    </div>
  );

  const servicesItems = [
    {
      title: "Model Testing",
      description: "Test our hate speech detection AI",
      path: "/model-testing",
      icon: Brain
    },
    {
      title: "Image Detection AI",
      description: "Advanced AI-powered image analysis",
      path: "/image-detection",
      icon: Camera
    },
    {
      title: "Chatbot",
      description: "Intelligent conversation assistant",
      path: "/chatbot",
      icon: MessageSquare
    },
    {
      title: "Content Monitoring",
      description: "Real-time content surveillance",
      path: "/dashboard",
      icon: BarChart3
    }
  ];

  const solutionsItems = [
    {
      title: "For Businesses",
      description: "Enterprise solutions and consulting",
      path: "/marketing",
      icon: Building2
    }
  ];

  const resourcesItems = [
    {
      title: "Blog & News",
      description: "Latest updates and insights",
      path: "/blog",
      icon: FileText
    },
    {
      title: "Help Center",
      description: "Support and documentation",
      path: "/help",
      icon: HelpCircle
    }
  ];

  return (
    isOpen && (
      <div 
        className="fixed top-16 left-0 right-0 z-40 lg:hidden backdrop-blur-md border-b transition-all duration-300 max-h-screen overflow-y-auto"
        style={{ 
          backgroundColor: colors.navBg,
          borderColor: colors.navBorder 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col space-y-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("/")}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>

            <MobileDropdownSection
              title="Services"
              items={servicesItems}
              isExpanded={expandedSection === 'services'}
              onToggle={() => toggleSection('services')}
              icon={Brain}
            />

            <MobileDropdownSection
              title="Solutions"
              items={solutionsItems}
              isExpanded={expandedSection === 'solutions'}
              onToggle={() => toggleSection('solutions')}
              icon={Building2}
            />

            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("/sui-learn")}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Tips
            </Button>

            <MobileDropdownSection
              title="Resources"
              items={resourcesItems}
              isExpanded={expandedSection === 'resources'}
              onToggle={() => toggleSection('resources')}
              icon={FileText}
            />

            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("/about")}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              About
            </Button>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("/contact")}
              className="text-sm font-medium hover:scale-105 transition-transform justify-start"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
            
            {/* Mobile Auth Buttons */}
            <div className="pt-3 border-t" style={{ borderColor: colors.border }}>
              {user ? (
                <div className="flex flex-col space-y-2">
                  <div className="text-sm font-medium" style={{ color: colors.text }}>
                    Welcome, {user.username || user.name}
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="justify-start"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      handleAuthClick('login');
                      onClose();
                    }}
                    className="justify-start"
                  >
                    Login
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={() => {
                      handleAuthClick('register');
                      onClose();
                    }}
                    className="justify-start"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MobileMenu;

