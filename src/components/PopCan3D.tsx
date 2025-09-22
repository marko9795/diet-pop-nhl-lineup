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
  // Real soda can proportions: 4.83" tall × 2.6" diameter (ratio ~1.86:1)
  const canHeight = 2.4; // Much shorter for realistic proportions
  const bodyRadius = 0.65; // Wider for proper can shape
  const topRadius = 0.53; // Slight taper at top
  const rimHeight = 0.03;

  // Main cylindrical body (90% of total height)
  const bodyHeight = canHeight * 0.9;
  const bodyGeometry = new THREE.CylinderGeometry(
    bodyRadius, bodyRadius, bodyHeight, 32, 1, false
  );

  // Top section with slight taper (10% of height)
  const topHeight = canHeight * 0.1;
  const topGeometry = new THREE.CylinderGeometry(
    topRadius, bodyRadius, topHeight, 32, 1, false
  );

  // Top rim
  const rimGeometry = new THREE.CylinderGeometry(
    topRadius + 0.02, topRadius, rimHeight, 32, 1, false
  );

  // Pull tab (simple raised area)
  const tabGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.01, 12, 1, false);

  // Create meshes and position them
  const bodyMesh = new THREE.Mesh(bodyGeometry);
  bodyMesh.position.y = -canHeight * 0.05;

  const topMesh = new THREE.Mesh(topGeometry);
  topMesh.position.y = canHeight * 0.4;

  const rimMesh = new THREE.Mesh(rimGeometry);
  rimMesh.position.y = canHeight * 0.48;

  const tabMesh = new THREE.Mesh(tabGeometry);
  tabMesh.position.set(0.2, canHeight * 0.5, 0);

  // Create group and add meshes
  const group = new THREE.Group();
  group.add(bodyMesh);
  group.add(topMesh);
  group.add(rimMesh);
  group.add(tabMesh);

  // Update matrices
  group.updateMatrixWorld(true);

  // Collect geometries for merging
  const geometries: THREE.BufferGeometry[] = [];
  group.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      const geo = child.geometry.clone();
      geo.applyMatrix4(child.matrixWorld);
      geometries.push(geo);
    }
  });

  // Merge all geometries into one
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
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1, 1);
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
      {/* Main aluminum body with enhanced realistic metallic properties */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          map={aluminumTexture}
          metalness={0.98}
          roughness={0.02}
          clearcoat={0.9}
          clearcoatRoughness={0.05}
          reflectivity={0.95}
          envMapIntensity={2.0}
          ior={1.8}
          transmission={0.0}
          thickness={0.3}
          attenuationColor="#F0F0F0"
          attenuationDistance={0.8}
          anisotropy={0.8}
          anisotropyRotation={0}
        />
      </mesh>

      {/* Label overlay with enhanced semi-transparent properties */}
      <mesh geometry={geometry} position={[0, 0, 0.0005]}>
        <meshPhysicalMaterial
          map={labelTexture}
          metalness={0.15}
          roughness={0.25}
          clearcoat={0.7}
          clearcoatRoughness={0.03}
          transparent={true}
          opacity={0.94}
          envMapIntensity={0.8}
          ior={1.45}
          transmission={0.08}
          thickness={0.02}
          attenuationColor="#FFFFFF"
          attenuationDistance={0.3}
          anisotropy={0.2}
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