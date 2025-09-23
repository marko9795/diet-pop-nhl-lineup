import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Helper function to create authentic can profile points
export const createCanProfile = (): THREE.Vector2[] => {
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
export const createRealisticCanGeometry = (): THREE.BufferGeometry => {
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