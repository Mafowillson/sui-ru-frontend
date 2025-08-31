import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

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

export default Card;

