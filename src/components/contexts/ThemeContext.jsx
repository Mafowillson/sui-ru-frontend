import React, { useState } from 'react';

// ==================== THEME SYSTEM ====================

const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark ? {
      // Dark theme (default)
      primary: '#0070f3',
      primaryHover: '#0060df',
      secondary: '#7c3aed',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      
      // Backgrounds
      bg: '#000000',
      bgSecondary: '#111111',
      bgTertiary: '#1a1a1a',
      bgCard: '#282828',
      bgCardHover: '#383838',
      
      // Borders
      border: 'rgba(255, 255, 255, 0.1)',
      borderHover: 'rgba(255, 255, 255, 0.2)',
      
      // Text
      text: '#ffffff',
      textSecondary: '#a1a1aa',
      textMuted: '#71717a',
      
      // Gradients
      gradientPrimary: 'linear-gradient(135deg, #0070f3 0%, #00d4ff 100%)',
      gradientSecondary: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
      gradientDanger: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
      gradientSuccess: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      
      // Navigation
      navBg: '#000000',
      navBorder: 'rgba(255, 255, 255, 0.1)',
    } : {
      // Light theme
      primary: '#0070f3',
      primaryHover: '#0060df',
      secondary: '#7c3aed',
      success: '#059669',
      warning: '#d97706',
      danger: '#dc2626',
      
      // Backgrounds
      bg: '#ffffff',
      bgSecondary: '#fafafa',
      bgTertiary: '#f5f5f5',
           bgCard: '#ffffff',
      bgCardHover: '#f0f0f0',
      
      // Borders
      border: 'rgba(0, 0, 0, 0.1)',
      borderHover: 'rgba(0, 0, 0, 0.2)',
      
      // Text
      text: '#000000',
      textSecondary: '#525252',
      textMuted: '#737373',
      
      // Gradients
      gradientPrimary: 'linear-gradient(135deg, #0070f3 0%, #00d4ff 100%)',
      gradientSecondary: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
      gradientDanger: 'linear-gradient(135deg, #dc2626 0%, #f87171 100%)',
      gradientSuccess: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
      
      // Navigation
      navBg: '#ffffff',
      navBorder: 'rgba(0, 0, 0, 0.1)',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme };
