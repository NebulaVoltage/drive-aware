import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Activity, Gauge, Eye, Zap, ShieldCheck } from 'lucide-react';
import { TelemetryFrame } from '../hooks/useTelemetryData';

interface DashboardPreviewProps {
  telemetry: TelemetryFrame;
  onOpenFullDashboard: () => void;
}

export function Section07DashboardPreview({ telemetry, onOpenFullDashboard }: DashboardPreviewProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 md:px-12 bg-[#090A0C] overflow-hidden">
      <div className="absolute inset-0 bg-telemetry-grid pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#232934] pb-4 mb-10">
          <div className="flex items-center gap-3 text-xs font-mono-tech text-[#DFFF00] tracking-widest uppercase">
            <span className="px-2 py-0.5 bg-[#DFFF00]/10 border border-[#DFFF00]/40">SECTION 07</span>
            <span>// TELEMETRY DASHBOARD INTERFACE</span>
          </div>
          <button
            onClick={onOpenFullDashboard}
            data-cursor="cta"
            data-cursor-label="LAUNCH →"
            className="px-4 py-2 bg-[#DFFF00] text-black font-extrabold font-mono-tech text-xs rounded uppercase hover:bg-[#c6e600] transition-colors"
          >
            ENTER FULL DASHBOARD →
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase font-display tracking-tight text-[#F4F5F7]">
            REAL-TIME <span className="text-[#DFFF00]">TELEMETRY CONTROL</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-sans mt-2">
            High-frequency data streaming directly from camera and seat pressure hardware.
          </p>
        </motion.div>

        {/* Dashboard Preview Shell */}
        <div className="bg-[#0E1013] border-2 border-[#232934] rounded hud-corner p-6 md:p-8 shadow-[0_0_80px_rgba(0,0,0,0.9)] relative overflow-hidden">
          {/* Scanline overlay */}
          <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-30" />

          {/* Top Telemetry Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#181C23] pb-4 mb-6 text-xs font-mono-tech">
            <div className="flex items-center gap-4">
              <span className="text-[#DFFF00] font-bold">DRIVEAWARE TELEMETRY HUD</span>
              <span className="text-gray-500">TIMESTAMP: {telemetry.timestamp}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400">VISION: <strong className="text-emerald-400">{telemetry.visionConfidence}%</strong></span>
              <span className="text-gray-400">STATE: <strong className="text-[#DFFF00]">{telemetry.driverState}</strong></span>
            </div>
          </div>

          {/* 4-Card Primary Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 font-mono-tech">
            {/* Card 1: Fatigue Index */}
            <div className="p-4 bg-[#060709] border border-[#232934] rounded hud-corner">
              <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                <span>FATIGUE INDEX</span>
                <Gauge size={16} className="text-[#DFFF00]" />
              </div>
              <div className="text-3xl font-extrabold font-display text-[#DFFF00] mb-2">
                {telemetry.fatigueIndex}<span className="text-xs text-gray-500"> / 100</span>
              </div>
              <div className="h-2 bg-[#181C23] rounded overflow-hidden">
                <div
                  className="h-full bg-[#DFFF00] transition-all duration-300"
                  style={{ width: `${telemetry.fatigueIndex}%` }}
                />
              </div>
            </div>

            {/* Card 2: Eye Status */}
            <div className="p-4 bg-[#060709] border border-[#232934] rounded hud-corner">
              <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                <span>EYE TRACKING</span>
                <Eye size={16} className="text-emerald-400" />
              </div>
              <div className={`text-2xl font-extrabold font-display uppercase mb-2 ${
                telemetry.eyeStatus === 'CLOSED' ? 'text-[#FF2A4B]' : 'text-emerald-400'
              }`}>
                {telemetry.eyeStatus}
              </div>
              <span className="text-[10px] text-gray-500 block">EAR CONFIDENCE: 98.4%</span>
            </div>

            {/* Card 3: Posture Stability */}
            <div className="p-4 bg-[#060709] border border-[#232934] rounded hud-corner">
              <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                <span>POSTURE STABILITY</span>
                <Activity size={16} className="text-[#DFFF00]" />
              </div>
              <div className="text-3xl font-extrabold font-display text-white mb-2">
                {telemetry.postureStability}<span className="text-xs text-gray-500">%</span>
              </div>
              <span className="text-[10px] text-gray-500 block">HEAD TILT: {telemetry.headTiltAngle}°</span>
            </div>

            {/* Card 4: Pressure Load */}
            <div className="p-4 bg-[#060709] border border-[#232934] rounded hud-corner">
              <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                <span>SEAT PRESSURE</span>
                <Zap size={16} className="text-[#DFFF00]" />
              </div>
              <div className="text-2xl font-extrabold font-display text-white mb-2">
                {telemetry.seatPressureLeft}% L <span className="text-gray-500">/</span> {telemetry.seatPressureRight}% R
              </div>
              <span className="text-[10px] text-emerald-400 block">● 100Hz SAMPLING</span>
            </div>
          </div>

          {/* Dashboard Preview Footer Banner */}
          <div className="p-4 bg-[#111419] border border-[#232934] rounded flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech">
            <div className="flex items-center gap-2 text-gray-300">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>SYSTEM STATUS: <strong className="text-emerald-400">ALL SYSTEMS NOMINAL</strong></span>
            </div>
            <button
              onClick={onOpenFullDashboard}
              className="text-[#DFFF00] font-bold hover:underline uppercase flex items-center gap-2"
            >
              CLICK TO OPEN INTERACTIVE DASHBOARD VIEW →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
