import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { Pop } from '../types';
import { createEnhancedAluminumTexture, createBrandedLabelTexture } from '../utils/textureGeneration';
import { createRealisticCanGeometry } from '../utils/geometryGeneration';

interface PopCan3DProps {
  pop: Pop;
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  className?: string;
  autoRotate?: boolean;
}

// 3D Can Mesh Component
const CanMesh: React.FC<{ pop: Pop; autoRotate: boolean }> = ({ pop, autoRotate }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Optimized geometry creation with useMemo
  const geometry = useMemo(() => createRealisticCanGeometry(), []);

  // Create enhanced textures with useMemo for performance
  const aluminumTexture = useMemo(() => createEnhancedAluminumTexture(), []);
  const labelTexture = useMemo(() => createBrandedLabelTexture(pop), [pop]);

  // Auto-rotation animation
  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

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