import * as THREE from 'three';
import type { Pop } from '../types';
import { getContrastColor } from './colors';

// Brand Definition Framework - Authentic brand specifications
export interface BrandDefinition {
  id: string;
  name: string;
  primaryFont: string;
  secondaryFont: string;
  logoElements: {
    type: 'text' | 'stripe' | 'graphic';
    content: string;
    position: { x: number; y: number };
    size: number;
    color: string;
    style?: 'bold' | 'normal' | 'italic';
  }[];
  colorScheme: {
    base: string;
    primary: string;
    accent: string;
    text: string;
  };
  layout: {
    hasVerticalStripe: boolean;
    stripeWidth?: number;
    stripePosition?: 'left' | 'center' | 'right';
    logoPlacement: 'top' | 'center' | 'bottom';
  };
  // High-resolution texture support
  texture?: {
    hasHighResTexture: boolean;
    texturePath?: string;
    fallbackToProgrammatic: boolean;
    resolution: { width: number; height: number };
  };
}

// Diet Coke 2018 Rebrand Specification
export const DIET_COKE_BRAND: BrandDefinition = {
  id: 'diet-coke',
  name: 'Diet Coke',
  primaryFont: 'Impact, "Arial Black", sans-serif',
  secondaryFont: 'Arial, sans-serif',
  logoElements: [
    {
      type: 'stripe',
      content: '',
      position: { x: 0.75, y: 0.0 },
      size: 0.08,
      color: '#DC143C'
    },
    {
      type: 'text',
      content: 'Coca-Cola',
      position: { x: 0.5, y: 0.2 },
      size: 42,
      color: '#FFFFFF',
      style: 'bold'
    },
    {
      type: 'text',
      content: 'Diet Coke',
      position: { x: 0.5, y: 0.45 },
      size: 48,
      color: '#FFFFFF',
      style: 'bold'
    }
  ],
  colorScheme: {
    base: '#C0C0C0',
    primary: '#DC143C',
    accent: '#FFFFFF',
    text: '#FFFFFF'
  },
  layout: {
    hasVerticalStripe: true,
    stripeWidth: 0.08,
    stripePosition: 'right',
    logoPlacement: 'center'
  },
  texture: {
    hasHighResTexture: true,
    texturePath: '/textures/diet-coke-label.png',
    fallbackToProgrammatic: true,
    resolution: { width: 1024, height: 512 }
  }
};

// Get brand definition for a pop
export const getBrandDefinition = (pop: Pop): BrandDefinition | null => {
  if (pop.id === 'diet-coke' || (pop.name.toLowerCase().includes('diet coke') && pop.brand === 'Coca-Cola')) {
    return DIET_COKE_BRAND;
  }
  return null;
};

// Enhanced aluminum base texture with photorealistic metallic appearance
export const createEnhancedAluminumTexture = (width = 512, height = 512): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D canvas context');
  }

  // Professional aluminum gradient with multiple layers
  const baseGradient = ctx.createLinearGradient(0, 0, 0, height);
  baseGradient.addColorStop(0, '#F8F8F8');    // Bright aluminum top
  baseGradient.addColorStop(0.15, '#EEEEEE'); // Upper highlight
  baseGradient.addColorStop(0.5, '#E5E5E5');  // Mid tone
  baseGradient.addColorStop(0.85, '#DDDDDD'); // Lower tone
  baseGradient.addColorStop(1, '#D8D8D8');    // Base shadow
  ctx.fillStyle = baseGradient;
  ctx.fillRect(0, 0, width, height);

  // Enhanced brushed metal texture with realistic aluminum patterns
  for (let i = 0; i < width; i += 0.5) {
    const intensity = Math.random() * 0.2 + 0.1;
    const brightness = Math.random() > 0.6 ? 255 : Math.random() > 0.3 ? 240 : 200;
    const opacity = intensity * (0.8 + Math.sin(i * 0.01) * 0.2);
    ctx.fillStyle = `rgba(${brightness},${brightness},${brightness},${opacity})`;
    ctx.fillRect(i, 0, 0.8, height);
  }

  // Micro-scratches and surface details for realism
  for (let i = 0; i < 25; i++) {
    const y = Math.random() * height;
    const length = Math.random() * width * 0.7 + width * 0.3;
    const startX = Math.random() * (width - length);
    const opacity = Math.random() * 0.04 + 0.01;
    const brightness = Math.random() > 0.5 ? 255 : 180;

    ctx.strokeStyle = `rgba(${brightness},${brightness},${brightness},${opacity})`;
    ctx.lineWidth = 0.3 + Math.random() * 0.4;
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(startX + length, y + (Math.random() - 0.5) * 2);
    ctx.stroke();
  }

  // Subtle anodized finish effect
  const anoGradient = ctx.createLinearGradient(0, 0, 0, height);
  anoGradient.addColorStop(0, 'rgba(255,255,255,0.08)');
  anoGradient.addColorStop(0.5, 'rgba(255,255,255,0.03)');
  anoGradient.addColorStop(1, 'rgba(240,240,240,0.05)');
  ctx.fillStyle = anoGradient;
  ctx.fillRect(0, 0, width, height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(2, 1);
  return texture;
};

// Create ultra high-resolution Diet Coke texture (1024x512)
export const createUltraHighResDietCokeTexture = (width = 1024, height = 512): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D canvas context');
  }

  // Ultra-realistic aluminum base with enhanced detail
  const baseGradient = ctx.createLinearGradient(0, 0, 0, height);
  baseGradient.addColorStop(0, '#F2F2F2');
  baseGradient.addColorStop(0.1, '#EEEEEE');
  baseGradient.addColorStop(0.5, '#E3E3E3');
  baseGradient.addColorStop(0.9, '#DDDDDD');
  baseGradient.addColorStop(1, '#D5D5D5');
  ctx.fillStyle = baseGradient;
  ctx.fillRect(0, 0, width, height);

  // Enhanced metallic surface with micro-details
  for (let i = 0; i < width; i += 0.25) {
    const intensity = Math.random() * 0.15 + 0.05;
    const brightness = Math.random() > 0.7 ? 255 : Math.random() > 0.4 ? 245 : 220;
    const opacity = intensity * (0.9 + Math.sin(i * 0.005) * 0.1);
    ctx.fillStyle = `rgba(${brightness},${brightness},${brightness},${opacity})`;
    ctx.fillRect(i, 0, 0.5, height);
  }

  // Signature Diet Coke red vertical stripe (high-res version)
  const stripeWidth = width * 0.08;
  const stripeX = width - stripeWidth;

  // Main red stripe with enhanced gradient
  const redGradient = ctx.createLinearGradient(stripeX, 0, stripeX + stripeWidth, 0);
  redGradient.addColorStop(0, 'rgba(220, 20, 60, 0.95)');
  redGradient.addColorStop(0.3, 'rgba(230, 25, 65, 1.0)');
  redGradient.addColorStop(0.7, 'rgba(220, 20, 60, 1.0)');
  redGradient.addColorStop(1, 'rgba(200, 15, 55, 0.98)');
  ctx.fillStyle = redGradient;
  ctx.fillRect(stripeX, 0, stripeWidth, height);

  // Ultra-high quality "Coca-Cola" branding
  const cokeY = height * 0.2;
  ctx.font = `bold ${Math.floor(width * 0.06)}px Impact, "Arial Black", sans-serif`;
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Enhanced text shadow for depth
  ctx.shadowColor = 'rgba(0,0,0,0.4)';
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.shadowBlur = 6;
  ctx.fillText('Coca-Cola', width / 2, cokeY);

  // Ultra-high quality "Diet Coke" main logo
  const dietY = height * 0.45;
  ctx.font = `bold ${Math.floor(width * 0.08)}px Impact, "Arial Black", sans-serif`;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur = 8;
  ctx.fillText('Diet Coke', width / 2, dietY);

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;

  // Premium "DIET" badge with enhanced quality
  const badgeY = height * 0.85;
  const badgeRadius = Math.floor(width * 0.04);
  ctx.beginPath();
  ctx.arc(width / 2, badgeY, badgeRadius, 0, 2 * Math.PI);

  // Premium badge gradient
  const badgeGradient = ctx.createRadialGradient(
    width / 2, badgeY, 0,
    width / 2, badgeY, badgeRadius
  );
  badgeGradient.addColorStop(0, '#DC143C');
  badgeGradient.addColorStop(0.8, '#B71C1C');
  badgeGradient.addColorStop(1, '#8B0000');
  ctx.fillStyle = badgeGradient;
  ctx.fill();

  // Badge border
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Badge text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${Math.floor(width * 0.025)}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('DIET', width / 2, badgeY + 4);

  // Add subtle surface details for ultra-realism
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * width * 0.7 + width * 0.15;
    const y = Math.random() * height;
    const length = Math.random() * width * 0.4 + width * 0.1;
    const opacity = Math.random() * 0.03 + 0.01;

    ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
    ctx.lineWidth = 0.2 + Math.random() * 0.3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length, y + (Math.random() - 0.5) * 1);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(ctx.canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1, 1);
  texture.flipY = false;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return texture;
};

// Create authentic Diet Coke texture following 2018 rebrand specifications
export const createDietCokeTexture = (
  ctx: CanvasRenderingContext2D,
  _pop: Pop,
  brandDef: BrandDefinition,
  width: number,
  height: number
): THREE.Texture => {
  // Silver aluminum base with slight texture
  const silverGradient = ctx.createLinearGradient(0, 0, 0, height);
  silverGradient.addColorStop(0, '#E8E8E8');
  silverGradient.addColorStop(0.5, '#D0D0D0');
  silverGradient.addColorStop(1, '#C8C8C8');
  ctx.fillStyle = silverGradient;
  ctx.fillRect(0, 0, width, height);

  // Diet Coke's signature vertical red stripe (right side)
  if (brandDef.layout.hasVerticalStripe) {
    const stripeWidth = width * (brandDef.layout.stripeWidth || 0.08);
    const stripeX = width - stripeWidth;

    ctx.fillStyle = brandDef.colorScheme.primary;
    ctx.fillRect(stripeX, 0, stripeWidth, height);

    // Add subtle gradient to the stripe for depth
    const stripeGradient = ctx.createLinearGradient(stripeX, 0, stripeX + stripeWidth, 0);
    stripeGradient.addColorStop(0, 'rgba(220, 20, 60, 0.9)');
    stripeGradient.addColorStop(0.5, 'rgba(220, 20, 60, 1.0)');
    stripeGradient.addColorStop(1, 'rgba(180, 15, 50, 0.95)');
    ctx.fillStyle = stripeGradient;
    ctx.fillRect(stripeX, 0, stripeWidth, height);
  }

  // Render brand elements with precise positioning
  brandDef.logoElements.forEach(element => {
    if (element.type === 'text') {
      const x = element.position.x * width;
      const y = element.position.y * height;

      ctx.font = `${element.style === 'bold' ? 'bold ' : ''}${element.size}px ${brandDef.primaryFont}`;
      ctx.fillStyle = element.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Add text shadow for depth
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 4;

      ctx.fillText(element.content, x, y);

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 0;
    }
  });

  // Add "DIET" badge at bottom
  const badgeY = height * 0.85;
  ctx.beginPath();
  ctx.arc(width / 2, badgeY, 25, 0, 2 * Math.PI);
  ctx.fillStyle = brandDef.colorScheme.primary;
  ctx.fill();
  ctx.strokeStyle = brandDef.colorScheme.accent;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = brandDef.colorScheme.accent;
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('DIET', width / 2, badgeY + 5);

  const texture = new THREE.CanvasTexture(ctx.canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1, 1);
  return texture;
};

// Enhanced generic texture for non-branded pops
export const createEnhancedGenericTexture = (
  ctx: CanvasRenderingContext2D,
  pop: Pop,
  width: number,
  height: number
): THREE.Texture => {
  // Enhanced generic implementation (upgraded from original)
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, pop.primaryColor);
  gradient.addColorStop(0.5, pop.secondaryColor || pop.primaryColor);
  gradient.addColorStop(1, pop.primaryColor);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Brand section (top) with enhanced typography
  const brandY = height * 0.15;
  ctx.fillStyle = getContrastColor(pop.primaryColor);
  ctx.font = 'bold 44px Impact, Arial Black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Enhanced text outline
  ctx.strokeStyle = pop.primaryColor;
  ctx.lineWidth = 3;
  ctx.strokeText(pop.brand.toUpperCase(), width / 2, brandY);
  ctx.fillText(pop.brand.toUpperCase(), width / 2, brandY);

  // Pop name (center) with better handling
  const nameY = height * 0.5;
  ctx.fillStyle = getContrastColor(pop.primaryColor);
  ctx.font = 'bold 38px Arial, sans-serif';

  const maxWidth = width * 0.85;
  const words = pop.name.split(' ');
  let line = '';
  let y = nameY;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && n > 0) {
      ctx.strokeStyle = pop.primaryColor;
      ctx.lineWidth = 2;
      ctx.strokeText(line.trim(), width / 2, y);
      ctx.fillText(line.trim(), width / 2, y);
      line = words[n] + ' ';
      y += 42;
    } else {
      line = testLine;
    }
  }
  ctx.strokeStyle = pop.primaryColor;
  ctx.lineWidth = 2;
  ctx.strokeText(line.trim(), width / 2, y);
  ctx.fillText(line.trim(), width / 2, y);

  // Enhanced DIET badge
  const dietY = height * 0.85;
  ctx.beginPath();
  ctx.arc(width / 2, dietY, 28, 0, 2 * Math.PI);
  ctx.fillStyle = '#FF0000';
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px Arial';
  ctx.fillText('DIET', width / 2, dietY + 6);

  const texture = new THREE.CanvasTexture(ctx.canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1, 1);
  return texture;
};

// Enhanced brand-aware label texture with hybrid high-res/programmatic system
export const createBrandedLabelTexture = (pop: Pop, width = 512, height = 512): THREE.Texture => {
  const brandDef = getBrandDefinition(pop);

  if (brandDef?.texture?.hasHighResTexture) {
    // For Diet Coke, use ultra-high resolution texture (1024x512)
    if (brandDef.id === 'diet-coke') {
      return createUltraHighResDietCokeTexture();
    }

    // Future: Attempt to load texture file if path exists
    // const texture = await loadHighResTexture(brandDef.texture.texturePath);
    // if (texture) return texture;
  }

  // Fallback to programmatic generation
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D canvas context');
  }

  if (brandDef) {
    // Create authentic branded texture (existing system)
    return createDietCokeTexture(ctx, pop, brandDef, width, height);
  } else {
    // Enhanced generic texture for non-branded pops
    return createEnhancedGenericTexture(ctx, pop, width, height);
  }
};