import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TruckShowcaseScene } from '../scenes/TruckShowcaseScene';
import { ShieldCheck, Zap, Activity, Gauge, Radio, Cpu } from 'lucide-react';

export function VehicleSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Clamp scroll progress between 0 and 1
  const sceneProgress = useTransform(scrollYProgress, [0.1, 0.65], [0, 1]);
  const hudOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const hudY = useTransform(scrollYProgress, [0.35, 0.6], [20, 0]);

  const [currentProgress, setCurrentProgress] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = sceneProgress.on('change', (val) => {
      setCurrentProgress(Math.max(0, Math.min(1, val)));
    });
    return () => unsubscribe();
  }, [sceneProgress]);

  return (
    <section
      ref={containerRef}
      id="vehicle-showcase"
      className="relative min-h-[120vh] w-full flex flex-col justify-center py-20 px-4 sm:px-6 md:px-12 bg-[#060709] border-b border-[#181C23] overflow-hidden"
    >
      {/* Visual Transition Sweep Line separating Hero and Vehicle Section */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#DFFF00] to-transparent shadow-[0_0_15px_#DFFF00]" />

      {/* Background Telemetry Grid */}
      <div className="absolute inset-0 bg-telemetry-grid pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* Section Transition Header */}
        <div className="w-full flex items-center justify-between border-b border-[#232934] pb-3 mb-8 text-[11px] font-mono-tech">
          <div className="flex items-center gap-3 text-[#DFFF00] tracking-widest uppercase">
            <span className="px-2 py-0.5 bg-[#DFFF00]/10 border border-[#DFFF00]/40">VEHICLE REVEAL</span>
            <span>// ADVANCED CHASSIS INTELLIGENCE</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>360° LIDAR & RADAR MATRIX ACTIVE</span>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center max-w-3xl mb-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase font-display tracking-tight text-[#F4F5F7]">
            ADVANCED <span className="text-[#DFFF00]">VEHICLE INTELLIGENCE</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-sans mt-2">
            The commercial chassis becomes an extension of the driver. Real-time LIDAR, radar telemetry, and autonomous brake intervention working in unison.
          </p>
        </div>

        {/* Central 3D Truck Scene with Surrounding Telemetry HUD Panels */}
        <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[650px] flex items-center justify-center my-4">
          {/* 3D Truck Canvas */}
          <TruckShowcaseScene progress={currentProgress} />

          {/* Surrounding Telemetry HUD Panels (Animate into position as truck arrives) */}
          <motion.div
            style={{ opacity: hudOpacity, y: hudY }}
            className="absolute top-4 left-4 p-3 sm:p-4 bg-[#0E1013]/90 border border-[#DFFF00]/40 rounded hud-corner backdrop-blur-md font-mono-tech text-xs space-y-1.5 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center justify-between gap-4 text-[#DFFF00] font-bold border-b border-[#181C23] pb-1">
              <span>VEHICLE STATUS</span>
              <Radio size={14} className="animate-pulse" />
            </div>
            <div className="flex justify-between gap-6 text-[11px] text-gray-300">
              <span className="text-gray-500">SYSTEM:</span>
              <span className="text-emerald-400 font-bold">ONLINE</span>
            </div>
            <div className="flex justify-between gap-6 text-[11px] text-gray-300">
              <span className="text-gray-500">CRUISE SPEED:</span>
              <span className="text-white font-bold">42 KM/H</span>
            </div>
            <div className="flex justify-between gap-6 text-[11px] text-gray-300">
              <span className="text-gray-500">VISION ENGINE:</span>
              <span className="text-[#DFFF00] font-bold">ACTIVE (60FPS)</span>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: hudOpacity, y: hudY }}
            className="absolute top-4 right-4 p-3 sm:p-4 bg-[#0E1013]/90 border border-emerald-500/40 rounded hud-corner backdrop-blur-md font-mono-tech text-xs space-y-1.5 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center justify-between gap-4 text-emerald-400 font-bold border-b border-[#181C23] pb-1">
              <span>PERIMETER LIDAR</span>
              <Activity size={14} />
            </div>
            <div className="flex justify-between gap-6 text-[11px] text-gray-300">
              <span className="text-gray-500">COVERAGE:</span>
              <span className="text-white font-bold">360° SPHERICAL</span>
            </div>
            <div className="flex justify-between gap-6 text-[11px] text-gray-300">
              <span className="text-gray-500">SCAN FREQ:</span>
              <span className="text-[#DFFF00] font-bold">100 Hz MATRIX</span>
            </div>
            <div className="flex justify-between gap-6 text-[11px] text-gray-300">
              <span className="text-gray-500">RANGE:</span>
              <span className="text-emerald-400 font-bold">150 METERS</span>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: hudOpacity, y: hudY }}
            className="absolute bottom-4 left-4 p-3 sm:p-4 bg-[#0E1013]/90 border border-[#232934] rounded hud-corner backdrop-blur-md font-mono-tech text-xs space-y-1.5 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center justify-between gap-4 text-[#DFFF00] font-bold border-b border-[#181C23] pb-1">
              <span>AUTONOMOUS BRAKING</span>
              <Zap size={14} />
            </div>
            <div className="flex justify-between gap-6 text-[11px] text-gray-300">
              <span className="text-gray-500">LATENCY:</span>
              <span className="text-white font-bold">&lt; 8 MS</span>
            </div>
            <div className="flex justify-between gap-6 text-[11px] text-gray-300">
              <span className="text-gray-500">INTERVENTION:</span>
              <span className="text-emerald-400 font-bold">STANDBY READY</span>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: hudOpacity, y: hudY }}
            className="absolute bottom-4 right-4 p-3 sm:p-4 bg-[#0E1013]/90 border border-[#232934] rounded hud-corner backdrop-blur-md font-mono-tech text-xs space-y-1.5 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center justify-between gap-4 text-gray-300 font-bold border-b border-[#181C23] pb-1">
              <span>CHASSIS DIAGNOSTICS</span>
              <Cpu size={14} />
            </div>
            <div className="flex justify-between gap-6 text-[11px] text-gray-300">
              <span className="text-gray-500">TOTAL MASS:</span>
              <span className="text-[#DFFF00] font-bold">14.2 TONS</span>
            </div>
            <div className="flex justify-between gap-6 text-[11px] text-gray-300">
              <span className="text-gray-500">TIRE PRESSURE:</span>
              <span className="text-emerald-400 font-bold">OPTIMAL (110 PSI)</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
