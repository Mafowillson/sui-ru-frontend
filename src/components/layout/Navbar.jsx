import React, { useContext, useState } from 'react';
import { Shield, Menu, X, Home, MessageSquare, Camera, Phone, ChevronDown, Brain, GraduationCap, FileText, HelpCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';
import ThemeToggle from '../common/ThemeToggle';
import { AuthContext } from '../../AuthProvider';

const Navbar = ({ handleLogout, handleAuthClick, navigateWithLoading, isMobileMenuOpen, setIsMobileMenuOpen, user }) => {
  const { colors } = useTheme();
  const { isLoggedIn } = useContext(AuthContext);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleNavigation = (path) => {
    navigateWithLoading(path, 500);
    setActiveDropdown(null);
  };

  const DropdownMenu = ({ title, items, isActive, onToggle, icon: Icon }) => (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onToggle}
        className="text-sm font-medium hover:scale-105 transition-transform flex items-center"
      >
        {Icon && <Icon className="w-4 h-4 mr-1" />}
        {title}
        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isActive ? 'rotate-180' : ''}`} />
      </Button>
      
      {isActive && (
        <div 
          className="absolute top-full left-0 mt-2 w-64 rounded-lg shadow-lg border z-50"
          style={{ 
            backgroundColor: colors.bgCard,
            borderColor: colors.border,
            opacity: 1 
          }}
        >
          <div className="py-2">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className="w-full px-4 py-3 text-left transition-colors flex items-center"
                style={{ 
                  color: colors.text,
                  backgroundColor: colors.bgCard,
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = colors.bgHover}
                onMouseLeave={(e) => e.target.style.backgroundColor = colors.bgCard}
              >
                <item.icon className="w-5 h-5 mr-3" style={{ color: colors.primary }} />
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs" style={{ color: colors.textMuted }}>{item.description}</div>
                </div>
              </button>
            ))}
          </div>
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
      title: "Report Page",
      description: "Submit reports and feedback",
      path: "/report",
      icon: FileText
    }
  ];

  // const solutionsItems = [
  //   {
  //     title: "For Businesses",
  //     description: "Enterprise solutions and consulting",
  //     path: "/marketing",
  //     icon: Building2
  //   }
  // ];

  const resourcesItems = [
    {
      title: "Blog & News",
      description: "Latest updates and insights",
      path: "/news",
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
    <nav 
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      style={{ 
        backgroundColor: colors.navBg,
        borderColor: colors.navBorder 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer"
              style={{ background: colors.gradientPrimary }}
              onClick={() => handleNavigation("/")}
            >
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="cursor-pointer" onClick={() => handleNavigation("/")}>
              <h1 className="text-xl font-bold" style={{ color: colors.text }}>Sui-Ru</h1>
              <p className="text-xs" style={{ color: colors.textMuted }}>MHSMS</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("/")}
              className="text-sm font-medium hover:scale-105 transition-transform"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Button>

            <DropdownMenu
              title="Services"
              items={servicesItems}
              isActive={activeDropdown === 'services'}
              onToggle={() => handleDropdownToggle('services')}
              icon={Brain}
            />

            {/* <DropdownMenu
              title="Solutions"
              items={solutionsItems}
              isActive={activeDropdown === 'solutions'}
              onToggle={() => handleDropdownToggle('solutions')}
              icon={Building2}
            /> */}

            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("/sui-learn")}
              className="text-sm font-medium hover:scale-105 transition-transform"
            >
              <GraduationCap className="w-4 h-4 mr-1" />
              Tips
            </Button>

            <DropdownMenu
              title="Resources"
              items={resourcesItems}
              isActive={activeDropdown === 'resources'}
              onToggle={() => handleDropdownToggle('resources')}
              icon={FileText}
            />

            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("/about")}
              className="text-sm font-medium hover:scale-105 transition-transform"
            >
              About
            </Button>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("/contact")}
              className="text-sm font-medium hover:scale-105 transition-transform"
            >
              <Phone className="w-4 h-4 mr-1" />
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" style={{ color: colors.text }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: colors.text }} />
              )}
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isLoggedIn && user ? (
              <div className="flex items-center space-x-2">
                <span className="font-medium" style={{ color: colors.text }}>
                  {user.username || user.name}
                </span>
              </div>
            ) : null}
            {isLoggedIn ? (
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="ghost" onClick={() => handleAuthClick("login")}>
                Login
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </nav>
  );
};

export default Navbar;

