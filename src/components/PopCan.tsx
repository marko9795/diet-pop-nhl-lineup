import React from 'react';
import type { Pop } from '../types';

interface PopCanProps {
  pop: Pop;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  showName?: boolean;
  className?: string;
  selected?: boolean;
  allowTextWrap?: boolean; // New prop to control text truncation
}

export const PopCan: React.FC<PopCanProps> = ({
  pop,
  onClick,
  size = 'medium',
  showName = true,
  className = '',
  selected = false,
  allowTextWrap = false
}) => {
  const sizeClasses = {
    small: 'w-14 h-18',
    medium: 'w-18 h-24',
    large: 'w-24 h-32',
    'extra-large': 'w-32 h-40'
  };

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
    'extra-large': 'text-lg'
  };

  // Enhanced color contrast calculation
  const getContrastColor = (hexColor: string): string => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  // Create metallic gradient based on brand colors
  const createMetallicGradient = () => {
    const primary = pop.primaryColor;
    const secondary = pop.secondaryColor || primary;
    const accent = pop.accentColor || secondary;

    return `linear-gradient(145deg,
      ${primary} 0%,
      ${secondary} 35%,
      ${accent} 65%,
      ${primary} 100%),
      linear-gradient(90deg,
      rgba(255,255,255,0.3) 10%,
      rgba(255,255,255,0.1) 30%,
      rgba(0,0,0,0.1) 70%,
      rgba(255,255,255,0.2) 90%)`;
  };

  const brandTextColor = getContrastColor(pop.accentColor || pop.secondaryColor || '#FFFFFF');
  const labelBgColor = pop.accentColor || pop.secondaryColor || '#FFFFFF';

  return (
    <div
      className={`
        flex flex-col items-center group
        ${className}
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
      `}
      onClick={onClick}
    >
      {/* 3D Pop Can Container */}
      <div
        className={`
          ${sizeClasses[size]}
          pop-can-3d
          rounded-xl
          shadow-pop-can
          relative overflow-hidden
          border-2
          ${selected ? 'ring-4 ring-neon-blue ring-opacity-60 shadow-neon-strong' : ''}
          ${onClick ? 'hover:shadow-pop-can-hover' : ''}
          transition-all duration-400
        `}
        style={{
          background: createMetallicGradient(),
          borderColor: pop.accentColor || pop.secondaryColor || '#888888',
          animation: selected ? 'float-glow 2s ease-in-out infinite' : undefined
        }}
      >
        {/* Can Pull Tab */}
        <div
          className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-2 rounded-full shadow-chrome"
          style={{
            background: `linear-gradient(135deg, ${labelBgColor} 0%, rgba(255,255,255,0.8) 50%, ${labelBgColor} 100%)`,
            border: `1px solid ${pop.primaryColor}40`
          }}
        />

        {/* Brand Logo Area */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-8 flex items-center justify-center">
          <div
            className="
              px-2 py-1 rounded-md text-center leading-tight
              font-hockey font-black text-xs tracking-wider
              shadow-chrome border border-opacity-30
              relative overflow-hidden
            "
            style={{
              backgroundColor: labelBgColor,
              color: brandTextColor,
              borderColor: pop.primaryColor,
              textShadow: `1px 1px 2px ${brandTextColor === '#000000' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}`
            }}
          >
            {/* Label shine effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-ice-shimmer"
              style={{ transform: 'skewX(-15deg)' }}
            />
            <div className="relative z-10">
              {pop.brand.slice(0, 6).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Pop Name/Flavor on Can */}
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-10 text-center">
          <div
            className="
              px-1 py-0.5 rounded text-center leading-none
              font-retro font-semibold tracking-wide
              shadow-sm border border-opacity-20
            "
            style={{
              backgroundColor: `${labelBgColor}CC`,
              color: brandTextColor,
              borderColor: pop.primaryColor,
              fontSize: size === 'small' ? '0.4rem' : size === 'medium' ? '0.5rem' : '0.6rem'
            }}
          >
            {pop.name.split(' ').slice(-1)[0].slice(0, 8).toUpperCase()}
          </div>
        </div>

        {/* DIET Badge */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
          <div
            className="
              px-2 py-0.5 rounded-full
              font-hockey font-black text-center tracking-widest
              shadow-chrome border-2
              relative overflow-hidden
            "
            style={{
              backgroundColor: '#FF0000',
              color: '#FFFFFF',
              borderColor: '#FFFFFF',
              fontSize: size === 'small' ? '0.4rem' : '0.5rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
            }}
          >
            {/* Badge glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-50 animate-pulse" />
            <div className="relative z-10">DIET</div>
          </div>
        </div>

        {/* Metallic Rim Effects */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 rounded-t-xl opacity-60"
          style={{
            background: `linear-gradient(90deg, ${pop.accentColor || '#C0C0C0'} 0%, #FFFFFF 50%, ${pop.accentColor || '#C0C0C0'} 100%)`
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1 rounded-b-xl opacity-60"
          style={{
            background: `linear-gradient(90deg, ${pop.accentColor || '#C0C0C0'} 0%, #FFFFFF 50%, ${pop.accentColor || '#C0C0C0'} 100%)`
          }}
        />

        {/* Custom Pop Indicator */}
        {pop.isCustom && (
          <div className="absolute top-1 right-1 z-20">
            <div className="w-3 h-3 bg-hockey-gold rounded-full border-2 border-neon-yellow animate-neon-pulse shadow-neon">
              <div className="w-1 h-1 bg-neon-yellow rounded-full absolute top-0.5 left-0.5 animate-pulse" />
            </div>
          </div>
        )}

        {/* Selection Glow Effect */}
        {selected && (
          <div className="absolute inset-0 rounded-xl border-2 border-neon-blue animate-neon-pulse pointer-events-none" />
        )}
      </div>

      {/* Enhanced Pop Name Display */}
      {showName && (
        <div className={`${textSizeClasses[size]} font-medium text-center mt-3 transition-all duration-300 ${size === 'extra-large' ? 'max-w-40' : allowTextWrap ? 'max-w-24' : 'max-w-20'}`}>
          <div
            className="font-retro font-semibold tracking-wide mb-1"
            style={{
              color: selected ? '#00BFFF' : '#FFFFFF',
              textShadow: selected ? '0 0 10px rgba(0,191,255,0.8)' : '0 1px 2px rgba(0,0,0,0.8)'
            }}
            title={pop.name}
          >
            <div className={allowTextWrap || size === 'extra-large' ? 'leading-tight' : 'truncate'}>
              {pop.name}
            </div>
          </div>

          {/* Brand & Additional Info */}
          <div className="text-xs font-retro text-ice-300 opacity-80 space-y-0.5">
            <div className="truncate font-medium">{pop.brand}</div>
            {pop.caffeine !== undefined && (
              <div className="text-hockey-gold text-xs font-semibold">
                {pop.caffeine}mg Caffeine
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};