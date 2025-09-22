import React from 'react';
import type { Pop } from '../types';
import { PopCan3D } from './PopCan3D';

interface PopStatsCardProps {
  pop: Pop;
}

export const PopStatsCard: React.FC<PopStatsCardProps> = ({ pop }) => {
  const currentYear = new Date().getFullYear();
  const isVintage = pop.year && pop.year < currentYear - 10;
  const isLimited = pop.year && pop.year >= currentYear - 2;

  return (
    <div className="arena-display p-8 max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block relative">
          <h2 className="text-3xl font-hockey font-black text-white mb-2 tracking-wider uppercase">
            Pop Stats
          </h2>
          <div className="absolute inset-0 text-3xl font-hockey font-black text-hockey-gold opacity-30 blur-sm tracking-wider uppercase">
            Pop Stats
          </div>
        </div>
        <div className="hockey-line-header inline-block text-sm mt-3 px-4 py-1">
          📊 DETAILED ANALYSIS 📊
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Large Pop Can Display */}
        <div className="flex justify-center">
          <div className="relative">
            <PopCan3D
              pop={pop}
              size="extra-large"
              className="shadow-2xl"
            />

            {/* Special Badges */}
            <div className="absolute -top-4 -right-4 space-y-2">
              {pop.isCustom && (
                <div className="bg-hockey-gold text-black px-3 py-1 rounded-full text-xs font-hockey font-black tracking-wider animate-pulse">
                  CUSTOM
                </div>
              )}
              {isVintage && (
                <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-hockey font-black tracking-wider">
                  VINTAGE
                </div>
              )}
              {isLimited && (
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-hockey font-black tracking-wider animate-neon-pulse">
                  LIMITED
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="space-y-6">
          {/* Name & Brand */}
          <div>
            <h3 className="text-2xl font-hockey font-black text-neon-cyan mb-2 tracking-wide">
              {pop.name}
            </h3>
            <div className="text-lg font-retro text-hockey-silver tracking-wide">
              by {pop.brand}
            </div>
          </div>

          {/* Description */}
          {pop.description && (
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-ice-600">
              <div className="text-sm font-retro text-ice-300 uppercase tracking-widest mb-2">
                Description
              </div>
              <div className="text-white font-retro tracking-wide italic">
                "{pop.description}"
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Caffeine */}
            <div className="bg-gradient-to-br from-neon-green to-green-600 bg-opacity-20 p-4 rounded-lg border border-neon-green border-opacity-30">
              <div className="text-xs font-retro text-neon-green uppercase tracking-widest mb-1">
                Caffeine
              </div>
              <div className="text-xl font-hockey font-black text-white">
                {pop.caffeine !== undefined ? `${pop.caffeine}mg` : 'N/A'}
              </div>
            </div>

            {/* Calories */}
            <div className="bg-gradient-to-br from-neon-blue to-blue-600 bg-opacity-20 p-4 rounded-lg border border-neon-blue border-opacity-30">
              <div className="text-xs font-retro text-neon-blue uppercase tracking-widest mb-1">
                Calories
              </div>
              <div className="text-xl font-hockey font-black text-white">
                {pop.calories !== undefined ? pop.calories : 'N/A'}
              </div>
            </div>
          </div>

          {/* Year & Special Info */}
          {pop.year && (
            <div className="bg-gradient-to-br from-hockey-gold to-yellow-600 bg-opacity-20 p-4 rounded-lg border border-hockey-gold border-opacity-30">
              <div className="text-xs font-retro text-hockey-gold uppercase tracking-widest mb-1">
                {isVintage ? 'Vintage Year' : isLimited ? 'Release Year' : 'Year'}
              </div>
              <div className="text-xl font-hockey font-black text-white">
                {pop.year}
              </div>
            </div>
          )}

          {/* Color Palette */}
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-ice-600">
            <div className="text-xs font-retro text-ice-300 uppercase tracking-widest mb-3">
              Color Palette
            </div>
            <div className="flex gap-3">
              <div className="text-center">
                <div
                  className="w-8 h-8 rounded-full border-2 border-white border-opacity-30 mb-1"
                  style={{ backgroundColor: pop.primaryColor }}
                />
                <div className="text-xs font-retro text-ice-400">Primary</div>
              </div>
              <div className="text-center">
                <div
                  className="w-8 h-8 rounded-full border-2 border-white border-opacity-30 mb-1"
                  style={{ backgroundColor: pop.secondaryColor }}
                />
                <div className="text-xs font-retro text-ice-400">Secondary</div>
              </div>
              {pop.accentColor && (
                <div className="text-center">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white border-opacity-30 mb-1"
                    style={{ backgroundColor: pop.accentColor }}
                  />
                  <div className="text-xs font-retro text-ice-400">Accent</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fun Fact or Rating Section */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-cyan bg-opacity-20 rounded-full border border-neon-cyan border-opacity-50">
          <span className="text-neon-cyan">⚡</span>
          <span className="text-sm font-retro text-neon-cyan tracking-wide">
            {pop.caffeine && pop.caffeine > 50
              ? 'High Energy Formula'
              : pop.caffeine && pop.caffeine > 0
                ? 'Moderate Caffeine'
                : 'Caffeine Free'
            }
          </span>
        </div>
      </div>
    </div>
  );
};