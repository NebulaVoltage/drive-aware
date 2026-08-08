import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TelemetryFrame } from '../hooks/useTelemetryData';
import { ArrowLeft, Radio, Gauge, Eye, Zap, Activity, AlertTriangle, ShieldCheck, RefreshCw, Sliders, Lock } from 'lucide-react';

interface DashboardViewProps {
  telemetry: TelemetryFrame;
  isConnected: boolean;
  isSimulated: boolean;
  triggerScenario: (scenario: 'NONE' | 'FATIGUE' | 'POSTURE' | 'DROWSY') => void;
  activeScenario: string;
  onBack: () => void;
}

export function DashboardView({
  telemetry,
  isConnected,
  isSimulated,
  triggerScenario,
  activeScenario,
  onBack
}: DashboardViewProps) {
  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] DRIVEAWARE TELEMETRY CORE INITIALIZED`,
    `[${new Date().toLocaleTimeString()}] YOLOv8 POSE MODEL LOADED (17 KEYPOINTS)`,
    `[${new Date().toLocaleTimeString()}] ARDUINO ADC SEAT MATRIX CONNECTED (100Hz)`,
    `[${new Date().toLocaleTimeString()}] MULTI-SENSOR BAYESIAN FUSION ENGAGED`
  ]);

  const handleScenarioChange = (scenario: 'NONE' | 'FATIGUE' | 'POSTURE' | 'DROWSY', label: string) => {
    triggerScenario(scenario);
    setLogs(prev => [
      `[${new Date().toLocaleTimeString()}] MANUALLY TRIGGERED SCENARIO: ${label}`,
      ...prev.slice(0, 15)
    ]);
  };

  return (
    <div className="min-h-screen w-full bg-[#060709] text-[#F4F5F7] font-sans selection:bg-[#DFFF00] selection:text-black overflow-x-hidden">
      {/* Top Fixed Telemetry Header */}
      <header className="sticky top-0 z-50 bg-[#090A0C]/90 border-b border-[#181C23] backdrop-blur-xl px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            data-cursor="hover"
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#111419] border border-[#232934] hover:border-[#DFFF00] text-xs font-mono-tech text-gray-300 hover:text-[#DFFF00] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>EXIT DASHBOARD</span>
          </button>

          <div className="flex items-center gap-2 text-base font-extrabold uppercase font-display">
            <span>DRIVE<span className="text-[#DFFF00]">AWARE</span></span>
            <span className="text-[10px] font-mono-tech text-gray-500 bg-[#111419] px-2 py-0.5 border border-[#232934] rounded">
              LIVE COMMAND CENTER
            </span>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center gap-4 text-xs font-mono-tech">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-[#111419] border border-[#232934]">
            <Radio size={14} className={isConnected ? 'text-emerald-400 animate-pulse' : 'text-[#DFFF00]'} />
            <span className="text-gray-300 uppercase">
              {isConnected ? 'LIVE WS BACKEND (localhost:8765)' : 'HIGH-FREQ SIMULATOR'}
            </span>
          </div>

          <div className={`px-3 py-1 rounded border font-bold uppercase ${
            telemetry.alertLevel === 'CRITICAL'
              ? 'bg-[#FF2A4B] text-white border-[#FF2A4B] animate-pulse'
              : telemetry.alertLevel === 'WARNING'
              ? 'bg-amber-400 text-black border-amber-400'
              : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
          }`}>
            ● {telemetry.driverState}
          </div>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="p-4 md:p-8 max-w-[1700px] mx-auto space-y-6">
        {/* Top Control Bar: Manual Simulator Controls */}
        <div className="p-4 bg-[#0E1013] border border-[#232934] rounded hud-corner flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-mono-tech text-xs">
            <Sliders size={16} className="text-[#DFFF00]" />
            <span className="text-white font-bold uppercase">TELEMETRY SCENARIO SIMULATOR:</span>
          </div>

          <div className="flex flex-wrap gap-2 font-mono-tech text-xs">
            <button
              onClick={() => handleScenarioChange('NONE', 'NORMAL ATTENTION')}
              className={`px-3 py-1.5 rounded border transition-colors ${
                activeScenario === 'NONE'
                  ? 'bg-emerald-400 text-black border-emerald-400 font-bold'
                  : 'bg-[#181C23] text-gray-400 border-[#232934] hover:text-white'
              }`}
            >
              ✓ SIMULATE NORMAL
            </button>
            <button
              onClick={() => handleScenarioChange('DROWSY', 'EYE CLOSURE')}
              className={`px-3 py-1.5 rounded border transition-colors ${
                activeScenario === 'DROWSY'
                  ? 'bg-amber-400 text-black border-amber-400 font-bold'
                  : 'bg-[#181C23] text-gray-400 border-[#232934] hover:text-white'
              }`}
            >
              👁 SIMULATE EYE CLOSURE
            </button>
            <button
              onClick={() => handleScenarioChange('POSTURE', 'POOR POSTURE')}
              className={`px-3 py-1.5 rounded border transition-colors ${
                activeScenario === 'POSTURE'
                  ? 'bg-amber-500 text-white border-amber-500 font-bold'
                  : 'bg-[#181C23] text-gray-400 border-[#232934] hover:text-white'
              }`}
            >
              ⚡ SIMULATE POSTURE SLUMP
            </button>
            <button
              onClick={() => handleScenarioChange('FATIGUE', 'CRITICAL FATIGUE')}
              className={`px-3 py-1.5 rounded border transition-colors ${
                activeScenario === 'FATIGUE'
                  ? 'bg-[#FF2A4B] text-white border-[#FF2A4B] font-bold animate-pulse'
                  : 'bg-[#181C23] text-gray-400 border-[#232934] hover:text-white'
              }`}
            >
              🚨 TRIGGER CRITICAL FATIGUE
            </button>
          </div>
        </div>

        {/* Primary Telemetry Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (5 cols): Live Computer Vision Skeleton Stream */}
          <div className="lg:col-span-5 bg-[#0E1013] border border-[#232934] p-5 rounded hud-corner space-y-4">
            <div className="flex justify-between items-center text-xs font-mono-tech border-b border-[#181C23] pb-3">
              <span className="text-[#DFFF00] font-bold flex items-center gap-2">
                <Eye size={16} /> CAM // OPTICAL YOLOv8 STREAM
              </span>
              <span className="text-emerald-400 font-bold">{telemetry.visionConfidence}% CONFIDENCE</span>
            </div>

            {/* Camera Frame Container */}
            <div className="relative aspect-video bg-[#060709] border border-[#232934] rounded overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-40" />

              {/* Driver Face / Pose Skeleton SVG Representation */}
              <svg viewBox="0 0 400 300" className="w-full h-full">
                {/* Head Circle */}
                <circle
                  cx={200 + telemetry.headTiltAngle * 2}
                  cy="120"
                  r="45"
                  fill="none"
                  stroke={telemetry.eyeStatus === 'CLOSED' ? '#FF2A4B' : '#DFFF00'}
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />

                {/* Keypoint Nodes */}
                {telemetry.keypoints.map((kp, i) => (
                  <g key={i}>
                    <circle
                      cx={kp.x * 400}
                      cy={kp.y * 300}
                      r="4"
                      fill="#DFFF00"
                    />
                    <text
                      x={kp.x * 400 + 8}
                      y={kp.y * 300 + 3}
                      fill="#888"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {kp.label}
                    </text>
                  </g>
                ))}

                {/* Skeleton Connection Lines */}
                <line
                  x1={telemetry.keypoints[3].x * 400}
                  y1={telemetry.keypoints[3].y * 300}
                  x2={telemetry.keypoints[4].x * 400}
                  y2={telemetry.keypoints[4].y * 300}
                  stroke="#DFFF00"
                  strokeWidth="2"
                />
              </svg>

              {/* Realtime Telemetry Overlays */}
              <div className="absolute top-3 left-3 p-2 bg-[#090A0C]/90 border border-[#232934] rounded font-mono-tech text-[10px] space-y-1">
                <div>EYE STATUS: <strong className={telemetry.eyeStatus === 'CLOSED' ? 'text-[#FF2A4B]' : 'text-emerald-400'}>{telemetry.eyeStatus}</strong></div>
                <div>HEAD TILT: <strong className="text-[#DFFF00]">{telemetry.headTiltAngle}°</strong></div>
              </div>
            </div>

            {/* Vision Metrics Footer */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono-tech">
              <div className="p-3 bg-[#060709] border border-[#232934] rounded">
                <span className="text-gray-500 text-[10px] block">EYE ASPECT RATIO (EAR)</span>
                <span className="text-white font-bold">{telemetry.eyeStatus === 'CLOSED' ? '0.11 [BLINK]' : '0.94 [OPEN]'}</span>
              </div>
              <div className="p-3 bg-[#060709] border border-[#232934] rounded">
                <span className="text-gray-500 text-[10px] block">HEAD VECTOR ANGLE</span>
                <span className="text-[#DFFF00] font-bold">{telemetry.headTiltAngle}°</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Seat Pressure Matrix & Realtime Gauges */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top 3 Gauge Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-tech">
              <div className="p-4 bg-[#0E1013] border border-[#232934] rounded hud-corner">
                <span className="text-gray-400 text-xs block mb-1">FATIGUE INDEX</span>
                <div className="text-3xl font-extrabold text-[#DFFF00] font-display">
                  {telemetry.fatigueIndex}<span className="text-xs text-gray-500"> / 100</span>
                </div>
                <div className="mt-2 h-2 bg-[#181C23] rounded overflow-hidden">
                  <div className="h-full bg-[#DFFF00]" style={{ width: `${telemetry.fatigueIndex}%` }} />
                </div>
              </div>

              <div className="p-4 bg-[#0E1013] border border-[#232934] rounded hud-corner">
                <span className="text-gray-400 text-xs block mb-1">POSTURE STABILITY</span>
                <div className="text-3xl font-extrabold text-white font-display">
                  {telemetry.postureStability}<span className="text-xs text-gray-500">%</span>
                </div>
                <span className="text-[10px] text-emerald-400 block mt-1">✓ LUMBAR TENSION</span>
              </div>

              <div className="p-4 bg-[#0E1013] border border-[#232934] rounded hud-corner">
                <span className="text-gray-400 text-xs block mb-1">SEAT LOAD BALANCE</span>
                <div className="text-xl font-extrabold text-[#DFFF00] font-display mt-1">
                  {telemetry.seatPressureLeft}% L / {telemetry.seatPressureRight}% R
                </div>
                <span className="text-[10px] text-gray-400 block mt-1">SAMPLING: 100 Hz</span>
              </div>
            </div>

            {/* Seat Load Distribution Graph */}
            <div className="p-5 bg-[#0E1013] border border-[#232934] rounded hud-corner font-mono-tech space-y-3">
              <div className="flex justify-between items-center text-xs border-b border-[#181C23] pb-2">
                <span className="text-[#DFFF00] font-bold flex items-center gap-2">
                  <Zap size={16} /> SEAT LOAD MATRIX MONITOR
                </span>
                <span className="text-gray-400">SPIKE TOLERANCE: ±5%</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-gray-400 text-xs block mb-1">LEFT SEAT QUADRANT</span>
                  <div className="h-4 bg-[#060709] border border-[#232934] rounded overflow-hidden p-0.5">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-[#DFFF00]" style={{ width: `${telemetry.seatPressureLeft}%` }} />
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-xs block mb-1">RIGHT SEAT QUADRANT</span>
                  <div className="h-4 bg-[#060709] border border-[#232934] rounded overflow-hidden p-0.5">
                    <div className={`h-full ${telemetry.seatPressureRight > 70 ? 'bg-[#FF2A4B]' : 'bg-gradient-to-r from-emerald-500 to-[#DFFF00]'}`} style={{ width: `${telemetry.seatPressureRight}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Live System Log Stream */}
            <div className="p-5 bg-[#0E1013] border border-[#232934] rounded hud-corner font-mono-tech space-y-3">
              <span className="text-xs text-gray-400 font-bold block border-b border-[#181C23] pb-2 uppercase">
                // SYSTEM EVENT TELEMETRY LOGS
              </span>
              <div className="h-32 overflow-y-auto space-y-1 text-[11px] text-gray-400 pr-2">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-[#DFFF00] shrink-0">➔</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
