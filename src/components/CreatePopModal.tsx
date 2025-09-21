import React, { useState } from 'react';
import type { Pop } from '../types';
import { PopCan } from './PopCan';

interface CreatePopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePop: (pop: Pop) => void;
}

export const CreatePopModal: React.FC<CreatePopModalProps> = ({
  isOpen,
  onClose,
  onCreatePop
}) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    caffeine: '',
    calories: '',
    year: '',
    primaryColor: '#FF0000',
    secondaryColor: '#FFFFFF',
    accentColor: '#000000'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.primaryColor) newErrors.primaryColor = 'Primary color is required';
    if (!formData.secondaryColor) newErrors.secondaryColor = 'Secondary color is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newPop: Pop = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      description: formData.description.trim() || undefined,
      caffeine: formData.caffeine ? parseInt(formData.caffeine) : undefined,
      calories: formData.calories ? parseInt(formData.calories) : undefined,
      year: formData.year ? parseInt(formData.year) : undefined,
      primaryColor: formData.primaryColor,
      secondaryColor: formData.secondaryColor,
      accentColor: formData.accentColor || undefined,
      isCustom: true
    };

    onCreatePop(newPop);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      brand: '',
      description: '',
      caffeine: '',
      calories: '',
      year: '',
      primaryColor: '#FF0000',
      secondaryColor: '#FFFFFF',
      accentColor: '#000000'
    });
    setErrors({});
    onClose();
  };

  const previewPop: Pop = {
    id: 'preview',
    name: formData.name || 'Preview Pop',
    brand: formData.brand || 'Custom',
    primaryColor: formData.primaryColor,
    secondaryColor: formData.secondaryColor,
    accentColor: formData.accentColor || undefined,
    isCustom: true
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="arena-display max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8 relative">
            <div className="inline-block relative">
              <h2 className="text-3xl font-hockey font-black text-white mb-2 tracking-wider uppercase">
                Create Custom Pop
              </h2>
              <div className="absolute inset-0 text-3xl font-hockey font-black text-hockey-gold opacity-30 blur-sm tracking-wider uppercase">
                Create Custom Pop
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Inputs */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-hockey font-black text-neon-cyan tracking-wide uppercase">
                  Basic Information
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-sm font-retro text-ice-400 mb-2 tracking-wide uppercase">
                    Pop Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`retro-input w-full px-4 py-3 rounded-lg ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Enter your pop name..."
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-retro text-ice-400 mb-2 tracking-wide uppercase">
                    Brand *
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className={`retro-input w-full px-4 py-3 rounded-lg ${errors.brand ? 'border-red-500' : ''}`}
                    placeholder="Enter brand name..."
                  />
                  {errors.brand && <p className="text-red-400 text-xs mt-1">{errors.brand}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-retro text-ice-400 mb-2 tracking-wide uppercase">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="retro-input w-full px-4 py-3 rounded-lg resize-none"
                    rows={3}
                    placeholder="Describe your custom pop..."
                  />
                </div>
              </div>

              {/* Nutritional Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-hockey font-black text-neon-green tracking-wide uppercase">
                  Nutritional Info
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Caffeine */}
                  <div>
                    <label className="block text-sm font-retro text-ice-400 mb-2 tracking-wide uppercase">
                      Caffeine (mg)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="500"
                      value={formData.caffeine}
                      onChange={(e) => setFormData({ ...formData, caffeine: e.target.value })}
                      className="retro-input w-full px-4 py-3 rounded-lg"
                      placeholder="0"
                    />
                  </div>

                  {/* Calories */}
                  <div>
                    <label className="block text-sm font-retro text-ice-400 mb-2 tracking-wide uppercase">
                      Calories
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      value={formData.calories}
                      onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                      className="retro-input w-full px-4 py-3 rounded-lg"
                      placeholder="0"
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-sm font-retro text-ice-400 mb-2 tracking-wide uppercase">
                      Year
                    </label>
                    <input
                      type="number"
                      min="1900"
                      max="2030"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="retro-input w-full px-4 py-3 rounded-lg"
                      placeholder="2024"
                    />
                  </div>
                </div>
              </div>

              {/* Color Design */}
              <div className="space-y-6">
                <h3 className="text-xl font-hockey font-black text-hockey-gold tracking-wide uppercase">
                  Color Design
                </h3>

                <div className="space-y-4">
                  {/* Primary Color */}
                  <div>
                    <label className="block text-sm font-retro text-ice-400 mb-3 tracking-wide uppercase">
                      Primary Color *
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={formData.primaryColor}
                        onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                        className="w-14 h-14 rounded-lg border-2 border-hockey-silver cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
                      />
                      <input
                        type="text"
                        value={formData.primaryColor}
                        onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                        className="retro-input flex-1 px-4 py-3 rounded-lg"
                        placeholder="#FF0000"
                      />
                    </div>
                    {errors.primaryColor && <p className="text-red-400 text-xs mt-2">{errors.primaryColor}</p>}
                  </div>

                  {/* Secondary Color */}
                  <div>
                    <label className="block text-sm font-retro text-ice-400 mb-3 tracking-wide uppercase">
                      Secondary Color *
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={formData.secondaryColor}
                        onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                        className="w-14 h-14 rounded-lg border-2 border-hockey-silver cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
                      />
                      <input
                        type="text"
                        value={formData.secondaryColor}
                        onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                        className="retro-input flex-1 px-4 py-3 rounded-lg"
                        placeholder="#FFFFFF"
                      />
                    </div>
                    {errors.secondaryColor && <p className="text-red-400 text-xs mt-2">{errors.secondaryColor}</p>}
                  </div>

                  {/* Accent Color */}
                  <div>
                    <label className="block text-sm font-retro text-ice-400 mb-3 tracking-wide uppercase">
                      Accent Color
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={formData.accentColor}
                        onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                        className="w-14 h-14 rounded-lg border-2 border-hockey-silver cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
                      />
                      <input
                        type="text"
                        value={formData.accentColor}
                        onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                        className="retro-input flex-1 px-4 py-3 rounded-lg"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-hockey font-black text-neon-cyan tracking-wide uppercase mb-6">
                Live Preview
              </h3>

              <div className="mb-8">
                <PopCan
                  pop={previewPop}
                  size="extra-large"
                  showName={true}
                  allowTextWrap={true}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 w-full max-w-xs">
                <button
                  type="button"
                  onClick={handleClose}
                  className="chrome-button flex-1 px-6 py-3 rounded-lg font-retro font-bold tracking-wide uppercase transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="chrome-button flex-1 px-6 py-3 rounded-lg font-retro font-bold tracking-wide uppercase transition-all duration-300 bg-gradient-to-r from-hockey-gold to-yellow-500 text-black"
                >
                  Create Pop
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};