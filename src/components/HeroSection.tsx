import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveHeroTitle } from './InteractiveHeroTitle';
import { DriverScene } from '../scenes/DriverScene';
import { useMousePosition } from '../hooks/useMousePosition';
import { Shield, Eye, Activity, Gauge, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
}

export function HeroSection({ onExplore }: HeroSectionProps) {
  const mouse = useMousePosition();

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-4 md:px-12 bg-telemetry-grid overflow-hidden">
      {/* Background Lighting Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DFFF00]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Telemetry Bar */}
      <div className="flex items-center justify-between border-b border-[#232934] pb-4 mb-4 text-[11px] font-mono-tech text-gray-400">
        <div className="flex items-center gap-4">
          <span className="text-[#DFFF00]">SYS.ID // DA-2026-F1</span>
          <span className="hidden md:inline">FREQ: 60Hz MULTI-SENSOR FUSION</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-gray-500">CURSOR: {mouse.x.toFixed(0)}, {mouse.y.toFixed(0)}</span>
          <span className="text-emerald-400 font-semibold">[ TELEMETRY ACTIVE ]</span>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full">
        {/* Left Column: Typography & Engineering Hook */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Interactive Letter-by-Letter Title */}
          <InteractiveHeroTitle />

          {/* Subhead Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 space-y-3"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F4F5F7] uppercase font-display leading-[1.1]">
              DRIVING SHOULD NEVER<br />
              <span className="text-[#DFFF00]">DEPEND ON ALERTNESS.</span>
            </h2>

            <p className="text-gray-400 text-base md:text-xl font-sans max-w-xl font-normal leading-relaxed pt-2">
              DriveAware sees the signals you can't. A motorsport-grade sensor fusion system combining YOLO computer vision, pose tracking, and seat pressure matrix sensors to preempt fatigue before it becomes critical.
            </p>
          </motion.div>

          {/* Telemetry Indicator Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 text-[11px] font-mono-tech w-full max-w-lg"
          >
            <div className="p-3 bg-[#111419] border border-[#232934] hud-corner">
              <span className="text-gray-500 text-[9px] block">VISION HUD</span>
              <span className="text-[#DFFF00] font-bold">YOLOv8 POSE</span>
            </div>
            <div className="p-3 bg-[#111419] border border-[#232934] hud-corner">
              <span className="text-gray-500 text-[9px] block">SENSORS</span>
              <span className="text-emerald-400 font-bold">ARDUINO HEX</span>
            </div>
            <div className="p-3 bg-[#111419] border border-[#232934] hud-corner">
              <span className="text-gray-500 text-[9px] block">LATENCY</span>
              <span className="text-[#F4F5F7] font-bold">&lt; 14 MS</span>
            </div>
            <div className="p-3 bg-[#111419] border border-[#232934] hud-corner">
              <span className="text-gray-500 text-[9px] block">ACCURACY</span>
              <span className="text-[#DFFF00] font-bold">99.4% FUSION</span>
            </div>
          </motion.div>

          {/* CTA Action */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              onClick={onExplore}
              data-cursor="cta"
              data-cursor-label="SYSTEM →"
              className="group relative px-8 py-4 bg-[#DFFF00] text-black font-extrabold font-mono-tech text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(223,255,0,0.4)] hover:shadow-[0_0_40px_rgba(223,255,0,0.8)] hover:scale-105"
            >
              <span className="flex items-center gap-3">
                EXPLORE THE SYSTEM →
              </span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: 3D Interactive Cockpit Visualization */}
        <div className="lg:col-span-5 relative w-full h-[450px] lg:h-[550px] flex items-center justify-center">
          {/* 3D Scene */}
          <DriverScene mouseX={mouse.normalizedX} mouseY={mouse.normalizedY} />

          {/* Floating Telemetry Markers */}
          <div className="absolute top-6 left-6 p-2.5 bg-[#090A0C]/90 border border-[#DFFF00]/40 text-[10px] font-mono-tech rounded hud-corner backdrop-blur-md">
            <span className="text-[#DFFF00] font-bold block">● EYES TRACKING</span>
            <span className="text-gray-400">EAR: 0.32 [NORMAL]</span>
          </div>

          <div className="absolute top-6 right-6 p-2.5 bg-[#090A0C]/90 border border-emerald-500/40 text-[10px] font-mono-tech rounded hud-corner backdrop-blur-md">
            <span className="text-emerald-400 font-bold block">● POSE MATRIX</span>
            <span className="text-gray-400">TILT: 1.2° OPTIMAL</span>
          </div>

          <div className="absolute bottom-6 left-6 p-2.5 bg-[#090A0C]/90 border border-[#232934] text-[10px] font-mono-tech rounded hud-corner backdrop-blur-md">
            <span className="text-gray-400 block">SEAT LOAD BALANCER</span>
            <span className="text-[#DFFF00] font-bold">52% L / 48% R</span>
          </div>

          <div className="absolute bottom-6 right-6 p-2.5 bg-[#090A0C]/90 border border-[#232934] text-[10px] font-mono-tech rounded hud-corner backdrop-blur-md">
            <span className="text-gray-400 block">ALERT ENGINE</span>
            <span className="text-emerald-400 font-bold">STANDBY</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8">
        <button
          onClick={onExplore}
          className="flex flex-col items-center gap-2 text-xs font-mono-tech text-gray-500 hover:text-[#DFFF00] transition-colors group"
        >
          <span className="tracking-widest uppercase text-[10px] group-hover:translate-y-1 transition-transform">
            SCROLL TO ENGAGE TELEMETRY
          </span>
          <ChevronDown size={16} className="text-[#DFFF00] animate-bounce" />
        </button>
      </div>
    </section>
  );
}
