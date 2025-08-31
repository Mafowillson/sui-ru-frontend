import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Badge = ({ children, variant = "default", size = "md" }) => {
  const { colors } = useTheme();
  
  const getVariantStyles = () => {
    switch(variant) {
      case 'primary':
        return { background: colors.gradientPrimary, color: '#ffffff' };
      case 'success':
        return { background: colors.gradientSuccess, color: '#ffffff' };
      case 'warning':
        return { backgroundColor: colors.warning, color: '#ffffff' };
      case 'danger':
        return { background: colors.gradientDanger, color: '#ffffff' };
      case 'outline':
        return { 
          backgroundColor: 'transparent', 
          color: colors.text,
          border: `1px solid ${colors.border}`
        };
      default:
        return { 
          backgroundColor: colors.bgTertiary, 
          color: colors.text 
        };
    }
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5"
  };

  return (
    <span 
      className={`inline-flex items-center rounded-full font-medium transition-all duration-200 ${sizes[size]}`}
      style={getVariantStyles()}
    >
      {children}
    </span>
  );
};

export default Badge;

