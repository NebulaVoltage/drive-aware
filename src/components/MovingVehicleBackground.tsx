import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface VehicleProps {
  scrollProgress: number;
  scrollVelocity: number;
}

function CyberTruck3D({ scrollProgress, scrollVelocity }: VehicleProps) {
  const truckGroupRef = useRef<THREE.Group>(null);
  const wheelsGroupRef = useRef<THREE.Group>(null);
  const headlightLeftRef = useRef<THREE.SpotLight>(null);
  const headlightRightRef = useRef<THREE.SpotLight>(null);
  const roadLinesRef = useRef<THREE.Group>(null);
  const scanLaserRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const absVelocity = Math.abs(scrollVelocity);
    const speedMultiplier = 1 + Math.min(6, absVelocity * 0.05);

    if (truckGroupRef.current) {
      // Natural idle cruising vibration + instant scroll position tracking
      const idleSway = Math.sin(time * 2) * 0.1;
      const targetZ = -4 + scrollProgress * 12;
      const targetX = Math.sin(scrollProgress * Math.PI * 4) * 2.2 + idleSway;
      const targetRotY = Math.sin(scrollProgress * Math.PI * 4) * 0.18;
      const targetPitch = scrollVelocity * 0.003;

      truckGroupRef.current.position.z = THREE.MathUtils.lerp(truckGroupRef.current.position.z, targetZ, 0.15);
      truckGroupRef.current.position.x = THREE.MathUtils.lerp(truckGroupRef.current.position.x, targetX, 0.12);
      truckGroupRef.current.position.y = -0.6 + Math.abs(Math.sin(time * 8)) * 0.03; // Road bounce
      truckGroupRef.current.rotation.y = THREE.MathUtils.lerp(truckGroupRef.current.rotation.y, targetRotY, 0.12);
      truckGroupRef.current.rotation.x = THREE.MathUtils.lerp(truckGroupRef.current.rotation.x, targetPitch, 0.15);
    }

    if (wheelsGroupRef.current) {
      // Continuous wheel rotation + scroll speed boost
      wheelsGroupRef.current.children.forEach((wheel) => {
        wheel.rotation.x += delta * 15 * speedMultiplier;
      });
    }

    if (headlightLeftRef.current && headlightRightRef.current) {
      const beamIntensity = Math.min(12, 4 + absVelocity * 0.6);
      headlightLeftRef.current.intensity = beamIntensity;
      headlightRightRef.current.intensity = beamIntensity;
    }

    if (roadLinesRef.current) {
      // Road markings rush past
      roadLinesRef.current.children.forEach((line) => {
        line.position.z += delta * 30 * speedMultiplier;
        if (line.position.z > 20) {
          line.position.z = -40;
        }
      });
    }

    if (scanLaserRef.current) {
      // Front radar laser sweep animation
      scanLaserRef.current.rotation.y = Math.sin(time * 4) * 0.3;
    }
  });

  return (
    <group>
      {/* 3D Cyber Semi-Truck Assembly */}
      <group ref={truckGroupRef} position={[0, -0.6, -2]}>
        {/* Main Aerodynamic Cabin */}
        <mesh position={[0, 1.5, 2.0]}>
          <boxGeometry args={[2.4, 2.2, 2.6]} />
          <meshStandardMaterial color="#181C23" wireframe roughness={0.1} metalness={0.95} />
        </mesh>

        {/* Cabin Front Grille with Neon Lime Lines */}
        <mesh position={[0, 1.1, 3.32]}>
          <boxGeometry args={[2.0, 1.0, 0.05]} />
          <meshBasicMaterial color="#DFFF00" wireframe />
        </mesh>

        {/* Illuminated Windshield */}
        <mesh position={[0, 1.9, 3.25]} rotation={[0.22, 0, 0]}>
          <planeGeometry args={[2.1, 1.0]} />
          <meshBasicMaterial color="#DFFF00" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>

        {/* Heavy Cargo Trailer Body */}
        <mesh position={[0, 2.0, -3.0]}>
          <boxGeometry args={[2.6, 3.0, 7.5]} />
          <meshStandardMaterial color="#0E1013" wireframe roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Glowing Neon Side Decal Stripes */}
        <mesh position={[1.32, 2.0, -3.0]}>
          <planeGeometry args={[7.2, 0.2]} />
          <meshBasicMaterial color="#DFFF00" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-1.32, 2.0, -3.0]}>
          <planeGeometry args={[7.2, 0.2]} />
          <meshBasicMaterial color="#DFFF00" side={THREE.DoubleSide} />
        </mesh>

        {/* Rear Red Tail Light Bar */}
        <mesh position={[0, 1.0, -6.78]}>
          <boxGeometry args={[2.4, 0.2, 0.1]} />
          <meshBasicMaterial color="#FF2A4B" />
        </mesh>

        {/* Headlight Bulbs */}
        <mesh position={[-0.9, 0.9, 3.32]}>
          <boxGeometry args={[0.4, 0.25, 0.1]} />
          <meshBasicMaterial color="#DFFF00" />
        </mesh>
        <mesh position={[0.9, 0.9, 3.32]}>
          <boxGeometry args={[0.4, 0.25, 0.1]} />
          <meshBasicMaterial color="#DFFF00" />
        </mesh>

        {/* High-Power Headlight Beams */}
        <spotLight
          ref={headlightLeftRef}
          position={[-0.9, 0.9, 3.32]}
          target-position={[-0.9, -1, 18]}
          angle={0.45}
          penumbra={0.4}
          color="#DFFF00"
          intensity={5}
          distance={35}
        />
        <spotLight
          ref={headlightRightRef}
          position={[0.9, 0.9, 3.32]}
          target-position={[0.9, -1, 18]}
          angle={0.45}
          penumbra={0.4}
          color="#DFFF00"
          intensity={5}
          distance={35}
        />

        {/* Front Radar Laser Scanner Sweep Cone */}
        <mesh ref={scanLaserRef} position={[0, 0.6, 3.5]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[2.5, 8, 16, 1, true]} />
          <meshBasicMaterial color="#DFFF00" transparent opacity={0.12} wireframe side={THREE.DoubleSide} />
        </mesh>

        {/* 6 Wheels Assembly with Metallic Rims */}
        <group ref={wheelsGroupRef}>
          {[-1.2, 1.2].map((x, i) =>
            [2.4, -1.8, -5.2].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, 0.5, z]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.5, 0.5, 0.35, 18]} />
                <meshStandardMaterial color="#232934" wireframe roughness={0.3} metalness={0.8} />
              </mesh>
            ))
          )}
        </group>
      </group>

      {/* Rushing Road Lane Markings */}
      <group ref={roadLinesRef}>
        {Array.from({ length: 25 }).map((_, idx) => (
          <mesh key={idx} position={[0, -1.95, -40 + idx * 2.5]}>
            <boxGeometry args={[0.2, 0.02, 1.4]} />
            <meshBasicMaterial color="#DFFF00" transparent opacity={0.7} />
          </mesh>
        ))}
      </group>

      {/* High Tech Cyber Grid Highway Surface */}
      <gridHelper args={[70, 50, '#DFFF00', '#1A1D24']} position={[0, -2, 0]} />

      {/* Dynamic Speed Dust Particles */}
      <Sparkles count={200} scale={[20, 10, 50]} size={3} speed={2} color="#DFFF00" opacity={0.5} />
    </group>
  );
}

export function MovingVehicleBackground({ scrollProgress = 0, scrollVelocity = 0 }: { scrollProgress?: number; scrollVelocity?: number }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60 transition-opacity duration-300">
      <Canvas
        camera={{ position: [0, 2.2, 8.5], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 12, -5]} intensity={1.5} color="#DFFF00" />
        <pointLight position={[0, -2, 6]} intensity={0.8} color="#00FF66" />

        <CyberTruck3D scrollProgress={scrollProgress} scrollVelocity={scrollVelocity} />
      </Canvas>
    </div>
  );
}
