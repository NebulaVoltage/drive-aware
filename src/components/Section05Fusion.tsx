import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Zap, Cpu, ShieldCheck, Activity, ChevronRight } from 'lucide-react';

export function Section05Fusion() {
  const [activePreset, setActivePreset] = useState<'NORMAL' | 'FATIGUE' | 'POSTURE'>('NORMAL');

  return (
    <section id="fusion" className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 md:px-12 bg-[#060709] border-t border-b border-[#181C23] overflow-hidden">
      {/* Energy Core Grid Background */}
      <div className="absolute inset-0 bg-telemetry-grid pointer-events-none opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#DFFF00]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#232934] pb-4 mb-8">
          <div className="flex items-center gap-3 text-xs font-mono-tech text-[#DFFF00] tracking-widest uppercase">
            <span className="px-2 py-0.5 bg-[#DFFF00]/10 border border-[#DFFF00]/40">SECTION 05</span>
            <span>// DRIVEAWARE SENSOR FUSION ENGINE</span>
          </div>
          <div className="text-xs font-mono-tech text-[#DFFF00] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#DFFF00] animate-ping" />
            <span>BAYESIAN CONFIDENCE MATRIX</span>
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase font-display tracking-tight text-[#F4F5F7]">
            MULTI-SIGNAL <span className="text-[#DFFF00]">INTELLIGENCE</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg font-sans mt-3">
            Optical computer vision and physical seat telemetry streams merge into a single real-time decision engine.
          </p>

          {/* Preset Buttons */}
          <div className="mt-6 flex justify-center gap-3 font-mono-tech text-xs">
            <button
              onClick={() => setActivePreset('NORMAL')}
              className={`px-4 py-2 rounded border uppercase transition-colors ${
                activePreset === 'NORMAL'
                  ? 'bg-emerald-400 text-black border-emerald-400 font-bold'
                  : 'bg-[#181C23] text-gray-400 border-[#232934] hover:text-white'
              }`}
            >
              PRESET: NOMINAL DRIVE
            </button>
            <button
              onClick={() => setActivePreset('POSTURE')}
              className={`px-4 py-2 rounded border uppercase transition-colors ${
                activePreset === 'POSTURE'
                  ? 'bg-amber-400 text-black border-amber-400 font-bold'
                  : 'bg-[#181C23] text-gray-400 border-[#232934] hover:text-white'
              }`}
            >
              PRESET: POSTURE SLUMP
            </button>
            <button
              onClick={() => setActivePreset('FATIGUE')}
              className={`px-4 py-2 rounded border uppercase transition-colors ${
                activePreset === 'FATIGUE'
                  ? 'bg-[#FF2A4B] text-white border-[#FF2A4B] font-bold'
                  : 'bg-[#181C23] text-gray-400 border-[#232934] hover:text-white'
              }`}
            >
              PRESET: CRITICAL FATIGUE
            </button>
          </div>
        </motion.div>

        {/* Dynamic Dual Stream Fusion Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
          {/* Stream 1: Optical Vision */}
          <div className="lg:col-span-4 p-6 bg-[#0E1013] border border-[#232934] rounded hud-corner space-y-4">
            <div className="flex items-center justify-between border-b border-[#181C23] pb-3 text-xs font-mono-tech">
              <span className="text-[#DFFF00] font-bold flex items-center gap-2">
                <Eye size={16} /> STREAM 01 // OPTICAL VISION
              </span>
              <span className="text-gray-500">YOLOv8</span>
            </div>

            <div className="space-y-3 font-mono-tech text-xs">
              <div className="p-3 bg-[#060709] border border-[#232934] rounded flex justify-between">
                <span className="text-gray-400">EYE ASPECT RATIO (EAR):</span>
                <span className={activePreset === 'FATIGUE' ? 'text-[#FF2A4B] font-bold' : 'text-emerald-400 font-bold'}>
                  {activePreset === 'FATIGUE' ? '0.11 [CLOSED]' : '0.94 [OPEN]'}
                </span>
              </div>
              <div className="p-3 bg-[#060709] border border-[#232934] rounded flex justify-between">
                <span className="text-gray-400">HEAD TILT VECTOR:</span>
                <span className={activePreset === 'POSTURE' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {activePreset === 'POSTURE' ? '-19.2° [SLUMP]' : '1.1° [STABLE]'}
                </span>
              </div>
              <div className="p-3 bg-[#060709] border border-[#232934] rounded flex justify-between">
                <span className="text-gray-400">BLINK FREQUENCY:</span>
                <span className="text-gray-200">
                  {activePreset === 'FATIGUE' ? '42 BLINKS/MIN' : '14 BLINKS/MIN'}
                </span>
              </div>
            </div>
          </div>

          {/* Center Engine Core */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[#111419] border-2 border-[#DFFF00] rounded hud-corner box-glow-lime text-center relative">
            <div className="absolute -top-3 px-3 py-0.5 bg-[#DFFF00] text-black font-mono-tech text-[10px] font-bold tracking-widest uppercase">
              DRIVEAWARE CORE ENGINE
            </div>

            <div className="w-20 h-20 rounded-full bg-[#060709] border-2 border-[#DFFF00] flex items-center justify-center my-4 shadow-[0_0_30px_rgba(223,255,0,0.5)]">
              <Cpu size={36} className="text-[#DFFF00] animate-pulse" />
            </div>

            <h3 className="text-xl font-extrabold uppercase font-display text-white">
              DECISION MATRIX
            </h3>
            <p className="text-xs font-mono-tech text-gray-400 mt-1">
              BAYESIAN SENSOR FUSION [0.5ms]
            </p>

            <div className="mt-6 w-full p-4 bg-[#060709] border border-[#232934] rounded">
              <span className="text-[10px] font-mono-tech text-gray-500 block mb-1">CLASSIFIED DRIVER STATE</span>
              <div className={`text-xl font-extrabold uppercase font-mono-tech ${
                activePreset === 'FATIGUE'
                  ? 'text-[#FF2A4B] animate-pulse'
                  : activePreset === 'POSTURE'
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}>
                {activePreset === 'FATIGUE'
                  ? '🚨 CRITICAL FATIGUE RISK'
                  : activePreset === 'POSTURE'
                  ? '⚠️ POOR POSTURE / SLUMP'
                  : '✓ NORMAL ALERTNESS'}
              </div>
            </div>
          </div>

          {/* Stream 2: Physical Pressure */}
          <div className="lg:col-span-4 p-6 bg-[#0E1013] border border-[#232934] rounded hud-corner space-y-4">
            <div className="flex items-center justify-between border-b border-[#181C23] pb-3 text-xs font-mono-tech">
              <span className="text-[#DFFF00] font-bold flex items-center gap-2">
                <Zap size={16} /> STREAM 02 // SEAT PRESSURE
              </span>
              <span className="text-gray-500">ARDUINO HEX</span>
            </div>

            <div className="space-y-3 font-mono-tech text-xs">
              <div className="p-3 bg-[#060709] border border-[#232934] rounded flex justify-between">
                <span className="text-gray-400">LOAD BALANCE (L/R):</span>
                <span className={activePreset === 'POSTURE' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {activePreset === 'POSTURE' ? '18% L / 82% R' : '51% L / 49% R'}
                </span>
              </div>
              <div className="p-3 bg-[#060709] border border-[#232934] rounded flex justify-between">
                <span className="text-gray-400">LUMBAR FORCE DROP:</span>
                <span className={activePreset === 'FATIGUE' ? 'text-[#FF2A4B] font-bold' : 'text-gray-200'}>
                  {activePreset === 'FATIGUE' ? '-45.2 N [COLLAPSE]' : '0.0 N [STABLE]'}
                </span>
              </div>
              <div className="p-3 bg-[#060709] border border-[#232934] rounded flex justify-between">
                <span className="text-gray-400">SAMPLING RATE:</span>
                <span className="text-emerald-400 font-bold">100 Hz ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
