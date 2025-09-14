import React from 'react';
import { Pop } from '../types';

interface PopCanProps {
  pop: Pop;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  showName?: boolean;
  className?: string;
}

export const PopCan: React.FC<PopCanProps> = ({
  pop,
  onClick,
  size = 'medium',
  showName = true,
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-12 h-16',
    medium: 'w-16 h-20',
    large: 'w-20 h-24'
  };

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  return (
    <div
      className={`flex flex-col items-center ${className}`}
      onClick={onClick}
    >
      {/* Can Container */}
      <div
        className={`
          ${sizeClasses[size]}
          rounded-lg shadow-lg cursor-pointer
          transition-all duration-300
          hover:scale-105 hover:shadow-xl
          relative overflow-hidden
          ${onClick ? 'cursor-pointer' : 'cursor-default'}
        `}
        style={{
          background: `linear-gradient(135deg,
            ${pop.primaryColor} 0%,
            ${pop.secondaryColor || pop.primaryColor} 70%,
            ${pop.accentColor || pop.secondaryColor || pop.primaryColor} 100%
          )`,
          border: `2px solid ${pop.accentColor || pop.secondaryColor || '#333'}`
        }}
      >
        {/* Can Tab */}
        <div
          className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-1 rounded-full"
          style={{ backgroundColor: pop.accentColor || pop.secondaryColor || '#fff' }}
        />

        {/* Brand Label */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-10 h-6 flex items-center justify-center">
          <div
            className="text-xs font-bold text-center leading-none px-1 rounded"
            style={{
              backgroundColor: pop.accentColor || pop.secondaryColor || '#fff',
              color: pop.primaryColor,
              fontSize: '0.5rem',
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {pop.brand.slice(0, 8)}
          </div>
        </div>

        {/* Diet Badge */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div
            className="text-xs font-bold px-1 rounded"
            style={{
              backgroundColor: pop.accentColor || pop.secondaryColor || '#fff',
              color: pop.primaryColor,
              fontSize: '0.4rem'
            }}
          >
            DIET
          </div>
        </div>

        {/* Custom Pop Indicator */}
        {pop.isCustom && (
          <div className="absolute top-1 right-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full border border-yellow-600" />
          </div>
        )}
      </div>

      {/* Pop Name */}
      {showName && (
        <div className={`${textSizeClasses[size]} font-medium text-center mt-1 text-white max-w-20`}>
          <div className="truncate" title={pop.name}>
            {pop.name}
          </div>
          {pop.flavor && (
            <div className="text-xs text-gray-400 truncate">
              {pop.flavor}
            </div>
          )}
        </div>
      )}
    </div>
  );
};