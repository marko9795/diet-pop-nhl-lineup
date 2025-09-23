/**
 * Color utility functions for the Diet Pop NHL Lineup App
 */

/**
 * Calculate contrast color (black or white) based on background color
 * Uses WCAG luminance calculation for accessibility
 * @param hexColor - Hex color string (e.g., "#FF0000")
 * @returns "#000000" for dark text or "#FFFFFF" for light text
 */
export const getContrastColor = (hexColor: string): string => {
  // Remove # if present
  const hex = hexColor.replace('#', '');

  // Parse RGB values
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Calculate luminance using WCAG formula
  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;

  // Return black for light backgrounds, white for dark backgrounds
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

/**
 * Convert hex color to RGB values
 * @param hexColor - Hex color string (e.g., "#FF0000")
 * @returns Object with r, g, b values (0-255)
 */
export const hexToRgb = (hexColor: string): { r: number; g: number; b: number } => {
  const hex = hexColor.replace('#', '');

  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16)
  };
};

/**
 * Convert RGB values to hex color
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hex color string (e.g., "#FF0000")
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Lighten a hex color by a percentage
 * @param hexColor - Hex color string
 * @param percent - Percentage to lighten (0-100)
 * @returns Lightened hex color
 */
export const lightenColor = (hexColor: string, percent: number): string => {
  const { r, g, b } = hexToRgb(hexColor);
  const factor = percent / 100;

  return rgbToHex(
    r + (255 - r) * factor,
    g + (255 - g) * factor,
    b + (255 - b) * factor
  );
};

/**
 * Darken a hex color by a percentage
 * @param hexColor - Hex color string
 * @param percent - Percentage to darken (0-100)
 * @returns Darkened hex color
 */
export const darkenColor = (hexColor: string, percent: number): string => {
  const { r, g, b } = hexToRgb(hexColor);
  const factor = 1 - (percent / 100);

  return rgbToHex(
    r * factor,
    g * factor,
    b * factor
  );
};