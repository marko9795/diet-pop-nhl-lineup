import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { Mesh, Texture } from 'three';
import * as THREE from 'three';
import type { Pop } from '../types';

interface PopCan3DProps {
  pop: Pop;
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  className?: string;
  autoRotate?: boolean;
}

// Helper function to create canvas texture from pop data
const createCanTexture = (pop: Pop, width = 512, height = 512): Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Create metallic gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, pop.primaryColor);
  gradient.addColorStop(0.3, pop.secondaryColor || pop.primaryColor);
  gradient.addColorStop(0.7, pop.accentColor || pop.secondaryColor || pop.primaryColor);
  gradient.addColorStop(1, pop.primaryColor);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add metallic highlight strips
  const highlightGradient = ctx.createLinearGradient(0, 0, width, 0);
  highlightGradient.addColorStop(0, 'rgba(255,255,255,0.1)');
  highlightGradient.addColorStop(0.1, 'rgba(255,255,255,0.3)');
  highlightGradient.addColorStop(0.3, 'rgba(255,255,255,0.1)');
  highlightGradient.addColorStop(0.7, 'rgba(0,0,0,0.1)');
  highlightGradient.addColorStop(0.9, 'rgba(255,255,255,0.2)');
  highlightGradient.addColorStop(1, 'rgba(255,255,255,0.1)');

  ctx.fillStyle = highlightGradient;
  ctx.fillRect(0, 0, width, height);

  // Brand section (top third)
  const brandY = height * 0.1;
  const brandHeight = height * 0.25;

  // Brand background
  ctx.fillStyle = pop.accentColor || pop.secondaryColor || '#FFFFFF';
  ctx.fillRect(width * 0.1, brandY, width * 0.8, brandHeight);

  // Brand text
  ctx.fillStyle = getContrastColor(pop.accentColor || pop.secondaryColor || '#FFFFFF');
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(pop.brand.toUpperCase(), width / 2, brandY + brandHeight / 2 + 12);

  // Pop name section (middle)
  const nameY = height * 0.4;
  const nameHeight = height * 0.3;

  ctx.fillStyle = `${pop.accentColor || pop.secondaryColor || '#FFFFFF'}CC`;
  ctx.fillRect(width * 0.05, nameY, width * 0.9, nameHeight);

  ctx.fillStyle = getContrastColor(pop.accentColor || pop.secondaryColor || '#FFFFFF');
  ctx.font = 'bold 28px Arial';

  // Split long names into multiple lines
  const words = pop.name.split(' ');
  const maxWidth = width * 0.8;
  let line = '';
  let y = nameY + 40;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), width / 2, y);
      line = words[n] + ' ';
      y += 35;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), width / 2, y);

  // DIET badge (bottom)
  const dietY = height * 0.8;
  const dietRadius = 30;

  ctx.beginPath();
  ctx.arc(width / 2, dietY, dietRadius, 0, 2 * Math.PI);
  ctx.fillStyle = '#FF0000';
  ctx.fill();

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 20px Arial';
  ctx.fillText('DIET', width / 2, dietY + 7);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
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
  const meshRef = useRef<Mesh>(null);

  // Create texture from pop data
  const texture = useMemo(() => createCanTexture(pop), [pop]);

  // Auto-rotation animation
  useFrame((_, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  // Cylinder geometry: radiusTop, radiusBottom, height, radialSegments
  const geometry = useMemo(() => new THREE.CylinderGeometry(0.8, 0.8, 2.5, 32), []);

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]}>
      <meshStandardMaterial
        map={texture}
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={1.0}
      />
    </mesh>
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
        {/* Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.0}
          color="#ffffff"
          castShadow
        />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={0.3}
          color="#4a9eff"
        />

        {/* Point light for extra metallic highlights */}
        <pointLight
          position={[2, 3, 2]}
          intensity={0.5}
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