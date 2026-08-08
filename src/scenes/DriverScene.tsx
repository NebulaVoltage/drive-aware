import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, Ring, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface DriverModelProps {
  mouseX: number;
  mouseY: number;
}

function DriverCockpitWireframe({ mouseX, mouseY }: DriverModelProps) {
  const headGroupRef = useRef<THREE.Group>(null);
  const scanRingRef = useRef<THREE.Mesh>(null);
  const particleGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (headGroupRef.current) {
      // Smoothly rotate 3D driver head based on cursor position
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(headGroupRef.current.rotation.y, mouseX * 0.4, 0.05);
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(headGroupRef.current.rotation.x, -mouseY * 0.3, 0.05);
    }

    if (scanRingRef.current) {
      // Animate laser scanner ring vertically
      scanRingRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 1.2;
      scanRingRef.current.rotation.z += delta * 0.5;
    }

    if (particleGroupRef.current) {
      particleGroupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Driver Head & Helmet Geometry */}
      <group ref={headGroupRef} position={[0, 0.2, 0]}>
        {/* Outer Helmet Sphere Wireframe */}
        <mesh>
          <sphereGeometry args={[1.2, 24, 24]} />
          <meshStandardMaterial
            wireframe
            color="#232934"
            emissive="#181C23"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Visor / Face Scan Area */}
        <mesh position={[0, 0.1, 0.9]} scale={[1.1, 0.5, 0.4]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#DFFF00"
            transparent
            opacity={0.15}
            roughness={0.1}
            metalness={1}
          />
        </mesh>

        {/* Eye Keypoints Indicators */}
        <mesh position={[-0.32, 0.15, 1.15]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#DFFF00" />
        </mesh>
        <mesh position={[0.32, 0.15, 1.15]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#DFFF00" />
        </mesh>

        {/* Nose / Center Keypoint */}
        <mesh position={[0, 0, 1.22]}>
          <octahedronGeometry args={[0.04]} />
          <meshBasicMaterial color="#00FF66" />
        </mesh>

        {/* Spine & Neck Column */}
        <mesh position={[0, -1.2, -0.2]}>
          <cylinderGeometry args={[0.3, 0.5, 1.2, 12]} />
          <meshStandardMaterial wireframe color="#343C4D" />
        </mesh>
      </group>

      {/* Driver Seat Back Structure */}
      <group position={[0, -0.6, -0.8]}>
        <mesh rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[2.4, 3.2, 0.2]} />
          <meshStandardMaterial wireframe color="#1A1D24" />
        </mesh>

        {/* Pressure Sensor Nodes on Seat */}
        {[-0.6, 0.6].map((x, i) =>
          [-0.8, -0.2, 0.4].map((y, j) => (
            <mesh key={`${i}-${j}`} position={[x, y, 0.12]}>
              <boxGeometry args={[0.15, 0.15, 0.05]} />
              <meshBasicMaterial color={j === 0 ? '#FF2A4B' : '#DFFF00'} wireframe />
            </mesh>
          ))
        )}
      </group>

      {/* Scanning Laser Ring */}
      <mesh ref={scanRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.35, 1.4, 64]} />
        <meshBasicMaterial color="#DFFF00" side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>

      {/* Ground Telemetry Grid */}
      <gridHelper args={[20, 20, '#DFFF00', '#181C23']} position={[0, -2, 0]} />

      {/* Telemetry Particles Swarm */}
      <group ref={particleGroupRef}>
        <Sparkles count={120} scale={[6, 6, 6]} size={3} speed={0.4} color="#DFFF00" opacity={0.5} />
      </group>
    </group>
  );
}

export function DriverScene({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  return (
    <div className="w-full h-full min-h-[450px] relative">
      <Canvas
        camera={{ position: [0, 0.5, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#DFFF00" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#00FF66" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <DriverCockpitWireframe mouseX={mouseX} mouseY={mouseY} />
        </Float>
      </Canvas>
    </div>
  );
}
