import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Button = ({ children, variant = "primary", size = "md", icon: Icon, onClick, className = "", disabled = false, ...props }) => {
  const { colors } = useTheme();
  
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95";
  
  const getVariantStyles = () => {
    switch(variant) {
      case 'primary':
        return {
          background: colors.gradientPrimary,
          color: '#ffffff'
        };
      case 'secondary':
        return {
          backgroundColor: colors.bgTertiary,
          color: colors.text,
          borderColor: colors.border
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: colors.textSecondary
        };
      case 'danger':
        return {
          background: colors.gradientDanger,
          color: '#ffffff'
        };
      case 'success':
        return {
          background: colors.gradientSuccess,
          color: '#ffffff'
        };
      case 'warning':
        return {
          background: colors.gradientSecondary,
          color: '#ffffff'
        };
      default:
        return {
          background: colors.gradientPrimary,
          color: '#ffffff'
        };
    }
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      className={`${baseClasses} ${sizes[size]} ${className}`}
      style={getVariantStyles()}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};

export default Button;

