import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveHeroTitle } from './InteractiveHeroTitle';
import { DriverScene } from '../scenes/DriverScene';
import { useMousePosition } from '../hooks/useMousePosition';
import { ChevronDown, Shield, Eye, Activity, Cpu } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
}

export function HeroSection({ onExplore }: HeroSectionProps) {
  const mouse = useMousePosition();

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 md:px-12 bg-telemetry-grid overflow-hidden border-b border-[#181C23]">
      {/* Background Radial Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#DFFF00]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Telemetry Indicator Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-[#232934] pb-3 mb-6 text-[11px] font-mono-tech text-gray-400">
        <div className="flex items-center gap-4">
          <span className="text-[#DFFF00] font-semibold">SYS.ID // DA-2026-F1</span>
          <span className="hidden sm:inline text-gray-500">|</span>
          <span className="hidden sm:inline">60Hz MULTI-SENSOR FUSION</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-gray-500 hidden md:inline">CURSOR: {mouse.x.toFixed(0)}, {mouse.y.toFixed(0)}</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            [ TELEMETRY ACTIVE ]
          </span>
        </div>
      </div>

      {/* Main Hero Grid Composition */}
      <div className="relative z-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto w-full">
        {/* Left Column: Typography & Engineering Hook */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Interactive Letter Physics Title */}
          <InteractiveHeroTitle />

          {/* Subhead Statements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 space-y-3"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F4F5F7] uppercase font-display leading-tight">
              DRIVING SHOULD NEVER<br />
              <span className="text-[#DFFF00]">DEPEND ON ALERTNESS.</span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base md:text-lg font-sans max-w-xl font-normal leading-relaxed pt-1">
              DriveAware sees the signals you can't. A motorsport-grade sensor fusion engine combining YOLO computer vision, pose tracking, and seat pressure matrix sensors to detect fatigue before it becomes critical.
            </p>
          </motion.div>

          {/* Cohesive Telemetry Indicator Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 text-[11px] font-mono-tech w-full max-w-xl"
          >
            <div className="p-3 bg-[#0E1013] border border-[#232934] hud-corner">
              <span className="text-gray-500 text-[9px] block uppercase">VISION HUD</span>
              <span className="text-[#DFFF00] font-bold">YOLOv8 POSE</span>
            </div>
            <div className="p-3 bg-[#0E1013] border border-[#232934] hud-corner">
              <span className="text-gray-500 text-[9px] block uppercase">SENSORS</span>
              <span className="text-emerald-400 font-bold">ARDUINO HEX</span>
            </div>
            <div className="p-3 bg-[#0E1013] border border-[#232934] hud-corner">
              <span className="text-gray-500 text-[9px] block uppercase">LATENCY</span>
              <span className="text-[#F4F5F7] font-bold">&lt; 14 MS</span>
            </div>
            <div className="p-3 bg-[#0E1013] border border-[#232934] hud-corner">
              <span className="text-gray-500 text-[9px] block uppercase">ACCURACY</span>
              <span className="text-[#DFFF00] font-bold">99.4% FUSION</span>
            </div>
          </motion.div>

          {/* Primary Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8"
          >
            <button
              onClick={onExplore}
              data-cursor="cta"
              data-cursor-label="VEHICLE →"
              className="px-8 py-4 bg-[#DFFF00] text-black font-extrabold font-mono-tech text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(223,255,0,0.3)] hover:shadow-[0_0_35px_rgba(223,255,0,0.7)] hover:scale-[1.02]"
            >
              EXPLORE THE SYSTEM →
            </button>
          </motion.div>
        </div>

        {/* Right Column: 3D Cockpit Scene with Standardized HUD Grid Layout */}
        <div className="lg:col-span-5 relative w-full h-[400px] sm:h-[480px] lg:h-[520px] flex items-center justify-center">
          {/* 3D Scene */}
          <DriverScene mouseX={mouse.normalizedX} mouseY={mouse.normalizedY} />

          {/* Standardized Floating HUD Cards */}
          <div className="absolute top-4 left-4 p-2.5 bg-[#090A0C]/90 border border-[#DFFF00]/40 text-[10px] font-mono-tech rounded hud-corner backdrop-blur-md">
            <span className="text-[#DFFF00] font-bold block">● EYES TRACKING</span>
            <span className="text-gray-400">EAR: 0.32 [NORMAL]</span>
          </div>

          <div className="absolute top-4 right-4 p-2.5 bg-[#090A0C]/90 border border-emerald-500/40 text-[10px] font-mono-tech rounded hud-corner backdrop-blur-md">
            <span className="text-emerald-400 font-bold block">● POSE MATRIX</span>
            <span className="text-gray-400">TILT: 1.2° OPTIMAL</span>
          </div>

          <div className="absolute bottom-4 left-4 p-2.5 bg-[#090A0C]/90 border border-[#232934] text-[10px] font-mono-tech rounded hud-corner backdrop-blur-md">
            <span className="text-gray-400 block">SEAT LOAD BALANCER</span>
            <span className="text-[#DFFF00] font-bold">52% L / 48% R</span>
          </div>

          <div className="absolute bottom-4 right-4 p-2.5 bg-[#090A0C]/90 border border-[#232934] text-[10px] font-mono-tech rounded hud-corner backdrop-blur-md">
            <span className="text-gray-400 block">SAFETY ENGINE</span>
            <span className="text-emerald-400 font-bold">STANDBY</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-4">
        <button
          onClick={onExplore}
          className="flex flex-col items-center gap-1.5 text-[10px] font-mono-tech text-gray-500 hover:text-[#DFFF00] transition-colors group"
        >
          <span className="tracking-widest uppercase group-hover:translate-y-0.5 transition-transform">
            SCROLL TO REVEAL VEHICLE TELEMETRY
          </span>
          <ChevronDown size={14} className="text-[#DFFF00] animate-bounce" />
        </button>
      </div>
    </section>
  );
}
