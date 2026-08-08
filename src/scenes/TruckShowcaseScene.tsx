import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface TruckSceneProps {
  progress: number; // 0 to 1 scroll progress through VehicleSection
}

function TransportTruckModel({ progress }: TruckSceneProps) {
  const truckGroupRef = useRef<THREE.Group>(null);
  const wheelsGroupRef = useRef<THREE.Group>(null);
  const headlightLeftRef = useRef<THREE.SpotLight>(null);
  const headlightRightRef = useRef<THREE.SpotLight>(null);
  const roadLinesRef = useRef<THREE.Group>(null);
  const scanConeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (truckGroupRef.current) {
      // Truck enters smoothly from z = -14 to z = -1 based on scroll progress
      // At progress 0 (entry): truck is far away / hidden in depth
      // At progress 0.5 - 1.0: truck settles at center stage
      const targetZ = -14 + Math.min(1, progress * 1.8) * 13;
      const targetY = -0.7 + Math.sin(time * 6) * 0.02; // Heavy mechanical road vibration
      const targetRotY = (1 - Math.min(1, progress * 1.8)) * -0.25; // Subtle entrance angle turn

      truckGroupRef.current.position.z = THREE.MathUtils.lerp(truckGroupRef.current.position.z, targetZ, 0.1);
      truckGroupRef.current.position.y = THREE.MathUtils.lerp(truckGroupRef.current.position.y, targetY, 0.15);
      truckGroupRef.current.rotation.y = THREE.MathUtils.lerp(truckGroupRef.current.rotation.y, targetRotY, 0.1);
    }

    if (wheelsGroupRef.current) {
      // Wheel spin proportional to progress and time
      wheelsGroupRef.current.children.forEach((wheel) => {
        wheel.rotation.x += delta * 12 * (0.5 + progress * 1.5);
      });
    }

    if (headlightLeftRef.current && headlightRightRef.current) {
      const beamIntensity = Math.min(10, 2 + progress * 8);
      headlightLeftRef.current.intensity = beamIntensity;
      headlightRightRef.current.intensity = beamIntensity;
    }

    if (roadLinesRef.current) {
      roadLinesRef.current.children.forEach((line) => {
        line.position.z += delta * 24 * (0.5 + progress * 1.2);
        if (line.position.z > 20) {
          line.position.z = -40;
        }
      });
    }

    if (scanConeRef.current) {
      scanConeRef.current.rotation.y = Math.sin(time * 3) * 0.35;
    }
  });

  return (
    <group>
      {/* 3D Heavy Transport Truck Model */}
      <group ref={truckGroupRef} position={[0, -0.7, -14]}>
        {/* Main Aerodynamic Cabin */}
        <mesh position={[0, 1.5, 2.0]}>
          <boxGeometry args={[2.5, 2.2, 2.7]} />
          <meshStandardMaterial color="#181C23" wireframe roughness={0.1} metalness={0.95} />
        </mesh>

        {/* Front Grille Matrix */}
        <mesh position={[0, 1.1, 3.37]}>
          <boxGeometry args={[2.1, 1.0, 0.05]} />
          <meshBasicMaterial color="#DFFF00" wireframe />
        </mesh>

        {/* Windshield Glass */}
        <mesh position={[0, 1.95, 3.3]} rotation={[0.22, 0, 0]}>
          <planeGeometry args={[2.2, 1.0]} />
          <meshBasicMaterial color="#DFFF00" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>

        {/* Heavy Cargo Trailer Body */}
        <mesh position={[0, 2.1, -3.2]}>
          <boxGeometry args={[2.7, 3.1, 7.8]} />
          <meshStandardMaterial color="#0E1013" wireframe roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Neon Lime Decal Side Stripes */}
        <mesh position={[1.37, 2.1, -3.2]}>
          <planeGeometry args={[7.5, 0.2]} />
          <meshBasicMaterial color="#DFFF00" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-1.37, 2.1, -3.2]}>
          <planeGeometry args={[7.5, 0.2]} />
          <meshBasicMaterial color="#DFFF00" side={THREE.DoubleSide} />
        </mesh>

        {/* Rear Red Tail Light Bar */}
        <mesh position={[0, 1.0, -7.12]}>
          <boxGeometry args={[2.5, 0.25, 0.1]} />
          <meshBasicMaterial color="#FF2A4B" />
        </mesh>

        {/* Headlight Bulbs */}
        <mesh position={[-0.95, 0.9, 3.37]}>
          <boxGeometry args={[0.4, 0.25, 0.1]} />
          <meshBasicMaterial color="#DFFF00" />
        </mesh>
        <mesh position={[0.95, 0.9, 3.37]}>
          <boxGeometry args={[0.4, 0.25, 0.1]} />
          <meshBasicMaterial color="#DFFF00" />
        </mesh>

        {/* High-Power Headlight Beams */}
        <spotLight
          ref={headlightLeftRef}
          position={[-0.95, 0.9, 3.37]}
          target-position={[-0.95, -1, 18]}
          angle={0.45}
          penumbra={0.4}
          color="#DFFF00"
          intensity={5}
          distance={35}
        />
        <spotLight
          ref={headlightRightRef}
          position={[0.95, 0.9, 3.37]}
          target-position={[0.95, -1, 18]}
          angle={0.45}
          penumbra={0.4}
          color="#DFFF00"
          intensity={5}
          distance={35}
        />

        {/* Front LIDAR Radar Scanner Cone */}
        <mesh ref={scanConeRef} position={[0, 0.6, 3.6]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[3.0, 9, 16, 1, true]} />
          <meshBasicMaterial color="#DFFF00" transparent opacity={0.15} wireframe side={THREE.DoubleSide} />
        </mesh>

        {/* 6 Wheel Assemblies */}
        <group ref={wheelsGroupRef}>
          {[-1.25, 1.25].map((x, i) =>
            [2.4, -1.8, -5.4].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, 0.5, z]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.5, 0.5, 0.35, 18]} />
                <meshStandardMaterial color="#232934" wireframe roughness={0.3} metalness={0.8} />
              </mesh>
            ))
          )}
        </group>
      </group>

      {/* Speed Road Lane Markings */}
      <group ref={roadLinesRef}>
        {Array.from({ length: 25 }).map((_, idx) => (
          <mesh key={idx} position={[0, -1.95, -40 + idx * 2.5]}>
            <boxGeometry args={[0.2, 0.02, 1.4]} />
            <meshBasicMaterial color="#DFFF00" transparent opacity={0.7} />
          </mesh>
        ))}
      </group>

      {/* Ground Cyber Grid Highway Surface */}
      <gridHelper args={[80, 60, '#DFFF00', '#1A1D24']} position={[0, -2, 0]} />

      {/* Speed Particle Dust */}
      <Sparkles count={200} scale={[25, 12, 50]} size={3} speed={2} color="#DFFF00" opacity={0.5} />
    </group>
  );
}

export function TruckShowcaseScene({ progress = 0 }: { progress?: number }) {
  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-[600px] relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 2.2, 8.5], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 12, -5]} intensity={1.5} color="#DFFF00" />
        <pointLight position={[0, -2, 6]} intensity={0.8} color="#00FF66" />

        <TransportTruckModel progress={progress} />
      </Canvas>
    </div>
  );
}
