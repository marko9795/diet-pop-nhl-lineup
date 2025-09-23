import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
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

// Helper function to create authentic can profile points
const createCanProfile = (): THREE.Vector2[] => {
  const points: THREE.Vector2[] = [];

  // Real soda can proportions: 4.83" tall × 2.6" diameter
  const canHeight = 2.4;
  const maxRadius = 0.65;  // Maximum can radius
  const topRadius = 0.53;  // Top opening radius
  const rimRadius = 0.55;  // Rim outer radius

  // Start from bottom center (Y = 0 at bottom)
  const bottomY = -canHeight * 0.5;
  const topY = canHeight * 0.5;

  // Bottom of can - slight concave curve (authentic aluminum can bottom)
  points.push(new THREE.Vector2(0, bottomY));                          // Center bottom
  points.push(new THREE.Vector2(0.1, bottomY + 0.02));                 // Small rise
  points.push(new THREE.Vector2(0.3, bottomY + 0.05));                 // Bottom curve
  points.push(new THREE.Vector2(maxRadius - 0.05, bottomY + 0.08));    // Transition to sidewall

  // Main body - straight cylindrical section
  points.push(new THREE.Vector2(maxRadius, bottomY + 0.12));           // Body start
  points.push(new THREE.Vector2(maxRadius, topY - 0.3));               // Body end (most of the can)

  // Neck taper - gradual reduction to top
  points.push(new THREE.Vector2(maxRadius - 0.02, topY - 0.25));       // Start of neck taper
  points.push(new THREE.Vector2(rimRadius, topY - 0.15));              // Neck middle
  points.push(new THREE.Vector2(topRadius + 0.02, topY - 0.08));       // Approaching rim

  // Top rim - beveled edge detail
  points.push(new THREE.Vector2(topRadius + 0.025, topY - 0.05));      // Outer rim
  points.push(new THREE.Vector2(topRadius + 0.02, topY - 0.02));       // Rim bevel
  points.push(new THREE.Vector2(topRadius, topY));                     // Top edge

  return points;
};

// Helper function to create realistic can geometry using LatheGeometry
const createRealisticCanGeometry = (): THREE.BufferGeometry => {
  // Create the can profile
  const profile = createCanProfile();

  // Create the main can body using LatheGeometry
  const canGeometry = new THREE.LatheGeometry(profile, 32);

  // Create simple pull tab as separate geometry
  const tabGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.01, 12, 1, false);

  // Position tab on top
  const tabMesh = new THREE.Mesh(tabGeometry);
  tabMesh.position.set(0.2, 1.15, 0); // Position on top surface

  // Merge can body with pull tab
  const group = new THREE.Group();
  group.add(new THREE.Mesh(canGeometry));
  group.add(tabMesh);

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
  return merged || canGeometry;
};

// Helper function to create realistic aluminum base texture optimized for LatheGeometry
const createAluminumTexture = (width = 512, height = 512): Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D canvas context');
  }

  // Base aluminum color with slight gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#F0F0F0');
  gradient.addColorStop(0.5, '#E8E8E8');
  gradient.addColorStop(1, '#E0E0E0');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Vertical brushed metal lines (more pronounced for LatheGeometry)
  for (let i = 0; i < width; i += 1) {
    const opacity = Math.random() * 0.15 + 0.05;
    const brightness = Math.random() > 0.5 ? 255 : 0;
    ctx.fillStyle = `rgba(${brightness},${brightness},${brightness},${opacity})`;
    ctx.fillRect(i, 0, 1, height);
  }

  // Subtle horizontal variation for cylinder mapping
  for (let i = 0; i < 15; i++) {
    const y = Math.random() * height;
    const opacity = Math.random() * 0.03 + 0.01;
    ctx.strokeStyle = `rgba(200,200,200,${opacity})`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping; // Better for LatheGeometry vertical mapping
  texture.repeat.set(2, 1); // Optimized for cylindrical wrapping
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

  // Main background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, pop.primaryColor);
  gradient.addColorStop(0.5, pop.secondaryColor || pop.primaryColor);
  gradient.addColorStop(1, pop.primaryColor);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Brand section (top)
  const brandY = height * 0.15;
  ctx.fillStyle = getContrastColor(pop.primaryColor);
  ctx.font = 'bold 48px Impact, Arial Black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Add text outline for better visibility
  ctx.strokeStyle = pop.primaryColor;
  ctx.lineWidth = 3;
  ctx.strokeText(pop.brand.toUpperCase(), width / 2, brandY);
  ctx.fillText(pop.brand.toUpperCase(), width / 2, brandY);

  // Pop name (center)
  const nameY = height * 0.5;
  ctx.fillStyle = getContrastColor(pop.primaryColor);
  ctx.font = 'bold 36px Arial, sans-serif';

  // Handle long names
  const maxWidth = width * 0.9;
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
      y += 40;
    } else {
      line = testLine;
    }
  }
  ctx.strokeStyle = pop.primaryColor;
  ctx.lineWidth = 2;
  ctx.strokeText(line.trim(), width / 2, y);
  ctx.fillText(line.trim(), width / 2, y);

  // DIET badge (bottom)
  const dietY = height * 0.85;
  ctx.beginPath();
  ctx.arc(width / 2, dietY, 30, 0, 2 * Math.PI);
  ctx.fillStyle = '#FF0000';
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 20px Arial';
  ctx.fillText('DIET', width / 2, dietY + 6);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping; // Wrap around the cylinder
  texture.wrapT = THREE.ClampToEdgeWrapping; // Clamp top to bottom for LatheGeometry
  texture.repeat.set(1, 1); // Single wrap optimized for LatheGeometry UV layout
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
      {/* Main aluminum body with clean metallic appearance */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          map={aluminumTexture}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>

      {/* Label overlay with clean appearance */}
      <mesh geometry={geometry} position={[0, 0, 0.0005]}>
        <meshStandardMaterial
          map={labelTexture}
          metalness={0.1}
          roughness={0.4}
          transparent={true}
          opacity={0.95}
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
        {/* Enhanced lighting for metallic aluminum surfaces */}
        <ambientLight intensity={0.3} />

        {/* Main spotlight for realistic metallic highlights */}
        <spotLight
          position={[5, 8, 3]}
          intensity={1.2}
          angle={Math.PI / 6}
          penumbra={0.3}
          color="#ffffff"
          castShadow
        />

        {/* Key directional light */}
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.6}
          color="#ffffff"
        />

        {/* Fill light for even illumination */}
        <directionalLight
          position={[-3, 3, 2]}
          intensity={0.3}
          color="#f0f8ff"
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