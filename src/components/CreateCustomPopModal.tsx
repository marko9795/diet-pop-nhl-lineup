import React, { useState } from 'react';
import { CustomPop } from '../types';
import { getAllBrands } from '../data/pops';
import { PopCan } from './PopCan';

interface CreateCustomPopModalProps {
  isOpen: boolean;
  onCreatePop: (customPop: Omit<CustomPop, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

// Brand-based color presets
const BRAND_PRESETS = {
  'Coca-Cola': {
    primaryColor: '#FF0000',
    secondaryColor: '#C0C0C0',
    accentColor: '#FFFFFF'
  },
  'PepsiCo': {
    primaryColor: '#004B93',
    secondaryColor: '#B8C5D6',
    accentColor: '#FFFFFF'
  },
  'Dr Pepper': {
    primaryColor: '#722F37',
    secondaryColor: '#B8860B',
    accentColor: '#FFFFFF'
  },
  '7UP': {
    primaryColor: '#32CD32',
    secondaryColor: '#FFFFFF',
    accentColor: '#228B22'
  },
  'Custom': {
    primaryColor: '#6B46C1',
    secondaryColor: '#A855F7',
    accentColor: '#FFFFFF'
  }
};

export const CreateCustomPopModal: React.FC<CreateCustomPopModalProps> = ({
  isOpen,
  onCreatePop,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    baseBrand: 'Custom',
    flavor: '',
    primaryColor: '#6B46C1',
    secondaryColor: '#A855F7',
    accentColor: '#FFFFFF',
    description: '',
    caffeine: 0,
    calories: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const availableBrands = getAllBrands();

  // Handle input changes
  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle brand preset selection
  const handleBrandPresetChange = (baseBrand: string) => {
    const preset = BRAND_PRESETS[baseBrand as keyof typeof BRAND_PRESETS];
    if (preset) {
      setFormData(prev => ({
        ...prev,
        baseBrand,
        primaryColor: preset.primaryColor,
        secondaryColor: preset.secondaryColor,
        accentColor: preset.accentColor
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Pop name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Pop name must be at least 2 characters';
    }

    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    }

    if (formData.caffeine < 0) {
      newErrors.caffeine = 'Caffeine cannot be negative';
    }

    if (formData.calories < 0) {
      newErrors.calories = 'Calories cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const customPop: Omit<CustomPop, 'id' | 'createdAt'> = {
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      flavor: formData.flavor.trim() || undefined,
      primaryColor: formData.primaryColor,
      secondaryColor: formData.secondaryColor,
      accentColor: formData.accentColor,
      isCustom: true,
      baseBrand: formData.baseBrand,
      description: formData.description.trim() || undefined,
      caffeine: formData.caffeine || undefined,
      calories: formData.calories || undefined
    };

    onCreatePop(customPop);
    handleClose();
  };

  // Handle modal close
  const handleClose = () => {
    setFormData({
      name: '',
      brand: '',
      baseBrand: 'Custom',
      flavor: '',
      primaryColor: '#6B46C1',
      secondaryColor: '#A855F7',
      accentColor: '#FFFFFF',
      description: '',
      caffeine: 0,
      calories: 0
    });
    setErrors({});
    onClose();
  };

  // Create preview pop for display
  const previewPop = {
    id: 'preview',
    name: formData.name || 'Preview Pop',
    brand: formData.brand || 'Custom',
    flavor: formData.flavor,
    primaryColor: formData.primaryColor,
    secondaryColor: formData.secondaryColor,
    accentColor: formData.accentColor,
    isCustom: true,
    description: formData.description,
    caffeine: formData.caffeine,
    calories: formData.calories
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Create Custom Pop</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Form Fields */}
            <div className="space-y-4">
              {/* Basic Information */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Basic Information</h4>

                {/* Pop Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Pop Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                    }`}
                    placeholder="e.g., Diet Cola Supreme"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => handleChange('brand', e.target.value)}
                    className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      errors.brand ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                    }`}
                    placeholder="e.g., MyBrand Cola Co."
                  />
                  {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
                </div>

                {/* Flavor */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Flavor (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.flavor}
                    onChange={(e) => handleChange('flavor', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Cherry Vanilla"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your custom pop..."
                  />
                </div>
              </div>

              {/* Nutritional Information */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Nutritional Info</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Caffeine (mg)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.caffeine}
                      onChange={(e) => handleChange('caffeine', parseInt(e.target.value) || 0)}
                      className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-2 ${
                        errors.caffeine ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                      }`}
                    />
                    {errors.caffeine && <p className="text-red-500 text-sm mt-1">{errors.caffeine}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Calories
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.calories}
                      onChange={(e) => handleChange('calories', parseInt(e.target.value) || 0)}
                      className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-2 ${
                        errors.calories ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                      }`}
                    />
                    {errors.calories && <p className="text-red-500 text-sm mt-1">{errors.calories}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Design */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-3">Visual Design</h4>

              {/* Brand Preset */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Brand Style Preset
                </label>
                <select
                  value={formData.baseBrand}
                  onChange={(e) => handleBrandPresetChange(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Custom">Custom Style</option>
                  {Object.keys(BRAND_PRESETS).filter(brand => brand !== 'Custom').map(brand => (
                    <option key={brand} value={brand}>{brand} Style</option>
                  ))}
                </select>
              </div>

              {/* Color Customization */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Primary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => handleChange('primaryColor', e.target.value)}
                      className="w-12 h-10 rounded border border-gray-600"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => handleChange('primaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Secondary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => handleChange('secondaryColor', e.target.value)}
                      className="w-12 h-10 rounded border border-gray-600"
                    />
                    <input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={(e) => handleChange('secondaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Accent Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => handleChange('accentColor', e.target.value)}
                      className="w-12 h-10 rounded border border-gray-600"
                    />
                    <input
                      type="text"
                      value={formData.accentColor}
                      onChange={(e) => handleChange('accentColor', e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preview
                </label>
                <div className="flex justify-center">
                  <PopCan pop={previewPop} size="large" showName={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
            >
              Create Pop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};