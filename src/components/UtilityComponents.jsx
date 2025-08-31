import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Card = ({ children, className = "", glow = false }) => {
  const { colors } = useTheme();
  
  return (
    <div 
      className={`backdrop-blur-sm border rounded-xl transition-all duration-300 ${glow ? 'shadow-lg' : ''} ${className}`}
      style={{ 
        backgroundColor: colors.bgCard,
        borderColor: colors.border,
        boxShadow: glow ? `0 0 20px ${colors.primary}20` : 'none'
      }}
    >
      {children}
    </div>
  );
};

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