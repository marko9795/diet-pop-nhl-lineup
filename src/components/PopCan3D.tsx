import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import type { Texture } from 'three';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { Pop } from '../types';

interface PopCan3DProps {
  pop: Pop;
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  className?: string;
  autoRotate?: boolean;
}

// Helper function to create realistic can geometry
const createRealisticCanGeometry = (): THREE.BufferGeometry => {
  const group = new THREE.Group();

  // Can dimensions (realistic proportions)
  const canHeight = 2.5;
  const baseRadius = 0.8;
  const topRadius = 0.78; // Slightly tapered
  const rimHeight = 0.1;
  const rimThickness = 0.05;

  // Main body (tapered cylinder)
  const bodyGeometry = new THREE.CylinderGeometry(
    topRadius, baseRadius, canHeight - rimHeight * 2, 32, 8
  );

  // Top rim (raised edge)
  const topRimGeometry = new THREE.CylinderGeometry(
    topRadius + rimThickness, topRadius, rimHeight, 32
  );

  // Bottom rim (raised edge)
  const bottomRimGeometry = new THREE.CylinderGeometry(
    baseRadius, baseRadius + rimThickness, rimHeight, 32
  );

  // Pull tab area (slightly raised circle)
  const tabAreaGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.02, 16);

  // Pull tab (small oval shape)
  const pullTabGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.01, 8);

  // Embossed ridge rings (for texture detail)
  const ridge1Geometry = new THREE.CylinderGeometry(
    baseRadius + 0.01, baseRadius + 0.01, 0.02, 32
  );
  const ridge2Geometry = new THREE.CylinderGeometry(
    baseRadius + 0.01, baseRadius + 0.01, 0.02, 32
  );

  // Combine geometries
  const bodyMesh = new THREE.Mesh(bodyGeometry);
  const topRimMesh = new THREE.Mesh(topRimGeometry);
  const bottomRimMesh = new THREE.Mesh(bottomRimGeometry);
  const tabAreaMesh = new THREE.Mesh(tabAreaGeometry);
  const pullTabMesh = new THREE.Mesh(pullTabGeometry);
  const ridge1Mesh = new THREE.Mesh(ridge1Geometry);
  const ridge2Mesh = new THREE.Mesh(ridge2Geometry);

  // Position elements
  bodyMesh.position.y = 0;
  topRimMesh.position.y = canHeight / 2 - rimHeight / 2;
  bottomRimMesh.position.y = -canHeight / 2 + rimHeight / 2;
  tabAreaMesh.position.y = canHeight / 2 + 0.01;
  pullTabMesh.position.set(0.15, canHeight / 2 + 0.02, 0);
  ridge1Mesh.position.y = canHeight * 0.3;
  ridge2Mesh.position.y = -canHeight * 0.3;

  // Merge geometries
  group.add(bodyMesh);
  group.add(topRimMesh);
  group.add(bottomRimMesh);
  group.add(tabAreaMesh);
  group.add(pullTabMesh);
  group.add(ridge1Mesh);
  group.add(ridge2Mesh);

  // Update matrices and merge
  group.updateMatrixWorld(true);

  const geometries: THREE.BufferGeometry[] = [];

  group.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      const geo = child.geometry.clone();
      geo.applyMatrix4(child.matrixWorld);
      geometries.push(geo);
    }
  });

  const merged = mergeGeometries(geometries);
  return merged || bodyGeometry;
};

// Helper function to create realistic aluminum base texture
const createAluminumTexture = (width = 512, height = 512): Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D canvas context');
  }

  // Base aluminum color
  ctx.fillStyle = '#E8E8E8';
  ctx.fillRect(0, 0, width, height);

  // Add brushed metal effect with vertical lines
  for (let i = 0; i < width; i += 2) {
    const opacity = Math.random() * 0.1 + 0.05;
    ctx.fillStyle = `rgba(255,255,255,${opacity})`;
    ctx.fillRect(i, 0, 1, height);
  }

  // Add some horizontal scratches for realism
  for (let i = 0; i < 20; i++) {
    const y = Math.random() * height;
    const opacity = Math.random() * 0.05 + 0.02;
    ctx.strokeStyle = `rgba(0,0,0,${opacity})`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping; // Seamless horizontal wrapping for brushed effect
  texture.wrapT = THREE.RepeatWrapping; // Vertical repeating for consistent texture
  texture.repeat.set(3, 2); // Slight tiling for detailed brushed metal appearance
  return texture;
};

// Helper function to create label texture from pop data with cylindrical UV mapping
const createLabelTexture = (pop: Pop, width = 512, height = 512): Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D canvas context');
  }

  // Create cylindrical gradient that wraps around the can
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, pop.primaryColor);
  gradient.addColorStop(0.2, pop.secondaryColor || pop.primaryColor);
  gradient.addColorStop(0.5, pop.accentColor || pop.secondaryColor || pop.primaryColor);
  gradient.addColorStop(0.8, pop.secondaryColor || pop.primaryColor);
  gradient.addColorStop(1, pop.primaryColor);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add label paper texture effect
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 2;
    const opacity = Math.random() * 0.1;
    ctx.fillStyle = `rgba(255,255,255,${opacity})`;
    ctx.fillRect(x, y, size, size);
  }

  // Brand section (top third) with realistic styling
  const brandY = height * 0.08;
  const brandHeight = height * 0.28;

  // Brand banner background with gradient and borders
  const brandGradient = ctx.createLinearGradient(0, brandY, 0, brandY + brandHeight);
  brandGradient.addColorStop(0, `${pop.accentColor || pop.secondaryColor || '#FFFFFF'}F0`);
  brandGradient.addColorStop(0.5, `${pop.accentColor || pop.secondaryColor || '#FFFFFF'}E8`);
  brandGradient.addColorStop(1, `${pop.accentColor || pop.secondaryColor || '#FFFFFF'}F0`);

  ctx.fillStyle = brandGradient;
  ctx.fillRect(width * 0.02, brandY, width * 0.96, brandHeight);

  // Brand border for definition
  ctx.strokeStyle = getContrastColor(pop.accentColor || pop.secondaryColor || '#FFFFFF');
  ctx.lineWidth = 2;
  ctx.strokeRect(width * 0.02, brandY, width * 0.96, brandHeight);

  // Brand text with enhanced typography
  const brandTextColor = getContrastColor(pop.accentColor || pop.secondaryColor || '#FFFFFF');
  ctx.fillStyle = brandTextColor;
  ctx.font = 'bold 44px Impact, Arial Black, sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '2px';

  // Enhanced text shadow for depth
  ctx.shadowColor = brandTextColor === '#000000' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 3;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // Add subtle outline
  ctx.strokeStyle = brandTextColor === '#000000' ? '#FFFFFF' : '#000000';
  ctx.lineWidth = 1;
  ctx.strokeText(pop.brand.toUpperCase(), width / 2, brandY + brandHeight / 2 + 16);
  ctx.fillText(pop.brand.toUpperCase(), width / 2, brandY + brandHeight / 2 + 16);

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Pop name section (middle) with professional styling
  const nameY = height * 0.42;
  const nameHeight = height * 0.32;

  // Pop name background with subtle gradient
  const nameGradient = ctx.createLinearGradient(0, nameY, 0, nameY + nameHeight);
  nameGradient.addColorStop(0, `${pop.primaryColor}C0`);
  nameGradient.addColorStop(0.5, `${pop.secondaryColor || pop.primaryColor}B0`);
  nameGradient.addColorStop(1, `${pop.primaryColor}C0`);

  ctx.fillStyle = nameGradient;
  ctx.fillRect(width * 0.01, nameY, width * 0.98, nameHeight);

  // Pop name text with enhanced styling
  const nameTextColor = getContrastColor(pop.primaryColor);
  ctx.fillStyle = nameTextColor;
  ctx.font = 'bold 36px Helvetica, Arial, sans-serif';
  ctx.textAlign = 'center';

  // Professional text shadow
  ctx.shadowColor = nameTextColor === '#000000' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 2;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;

  // Split long names into multiple lines with better spacing
  const words = pop.name.split(' ');
  const maxWidth = width * 0.9;
  let line = '';
  let y = nameY + 50;
  const lineHeight = 42;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      // Add text outline for better visibility
      ctx.strokeStyle = nameTextColor === '#000000' ? '#FFFFFF' : '#000000';
      ctx.lineWidth = 0.5;
      ctx.strokeText(line.trim(), width / 2, y);
      ctx.fillText(line.trim(), width / 2, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  // Render final line
  ctx.strokeStyle = nameTextColor === '#000000' ? '#FFFFFF' : '#000000';
  ctx.lineWidth = 0.5;
  ctx.strokeText(line.trim(), width / 2, y);
  ctx.fillText(line.trim(), width / 2, y);

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // DIET badge (bottom)
  const dietY = height * 0.8;
  const dietRadius = 35;

  // Badge shadow
  ctx.shadowColor = 'rgba(0,0,0,0.4)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  ctx.beginPath();
  ctx.arc(width / 2, dietY, dietRadius, 0, 2 * Math.PI);
  ctx.fillStyle = '#FF0000';
  ctx.fill();

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Reset shadow for text
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 1;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.fillText('DIET', width / 2, dietY + 8);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping; // Wrap horizontally around the cylinder
  texture.wrapT = THREE.ClampToEdgeWrapping; // Clamp vertically for clean top/bottom
  texture.repeat.set(1, 1); // Single wrap around the can
  texture.offset.set(0, 0); // No offset for center alignment
  return texture;
};

// Helper function to get contrasting text color
const getContrastColor = (hexColor: string): string => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

// 3D Can Mesh Component
const CanMesh: React.FC<{ pop: Pop; autoRotate: boolean }> = ({ pop, autoRotate }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Create textures for different can areas
  const aluminumTexture = useMemo(() => createAluminumTexture(), []);
  const labelTexture = useMemo(() => createLabelTexture(pop), [pop]);

  // Auto-rotation animation
  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  // Realistic can geometry with tapered top and raised rims
  const geometry = useMemo(() => createRealisticCanGeometry(), []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main aluminum body with advanced metallic properties */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          map={aluminumTexture}
          metalness={0.95}
          roughness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          envMapIntensity={1.5}
          ior={1.5}
          transmission={0.0}
          thickness={0.5}
          attenuationColor="#E8E8E8"
          attenuationDistance={1.0}
        />
      </mesh>

      {/* Label overlay with semi-transparent properties */}
      <mesh geometry={geometry} position={[0, 0, 0.001]}>
        <meshPhysicalMaterial
          map={labelTexture}
          metalness={0.2}
          roughness={0.3}
          clearcoat={0.8}
          clearcoatRoughness={0.05}
          transparent={true}
          opacity={0.92}
          envMapIntensity={0.6}
          ior={1.4}
          transmission={0.1}
          thickness={0.05}
          attenuationColor="#FFFFFF"
          attenuationDistance={0.5}
        />
      </mesh>
    </group>
  );
};

// Main PopCan3D Component
export const PopCan3D: React.FC<PopCan3DProps> = ({
  pop,
  size = 'medium',
  className = '',
  autoRotate = false
}) => {
  const canvasSize = {
    small: { width: 120, height: 150 },
    medium: { width: 160, height: 200 },
    large: { width: 200, height: 250 },
    'extra-large': { width: 280, height: 350 }
  }[size];

  return (
    <div
      className={`${className}`}
      style={{
        width: canvasSize.width,
        height: canvasSize.height,
        borderRadius: '12px',
        overflow: 'hidden'
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 4],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true
        }}
        style={{
          background: 'transparent'
        }}
      >
        {/* Environment mapping for realistic reflections */}
        <Environment
          preset="city"
          background={false}
          blur={0.2}
        />

        {/* Enhanced lighting setup for metallic surfaces */}
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          color="#ffffff"
          castShadow
        />
        <directionalLight
          position={[-5, 5, 3]}
          intensity={0.4}
          color="#87ceeb"
        />

        {/* Key light for metallic highlights */}
        <pointLight
          position={[3, 4, 2]}
          intensity={0.6}
          color="#ffffff"
        />

        {/* Rim light for edge definition */}
        <pointLight
          position={[-2, 2, -3]}
          intensity={0.3}
          color="#ffd700"
        />

        {/* 3D Can */}
        <CanMesh pop={pop} autoRotate={autoRotate} />

        {/* Interactive Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={2 * Math.PI / 3}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};