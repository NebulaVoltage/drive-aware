import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Eye, ShieldAlert, Activity } from 'lucide-react';

export type VisionStateType = 'NORMAL' | 'SLUMP' | 'DROWSY';

export function Section03Vision() {
  const [visionState, setVisionState] = useState<VisionStateType>('NORMAL');

  // State telemetry configurations
  const telemetryConfig = {
    NORMAL: {
      statusLabel: 'SYSTEM ONLINE',
      statusDetail: '● ALERT (NORMAL)',
      statusColor: 'text-[#DFFF00]',
      badgeBorder: 'border-[#DFFF00]/40 bg-[#DFFF00]/10 text-[#DFFF00]',
      boxColor: 'border-[#DFFF00]',
      faceBoxColor: 'border-emerald-400 bg-emerald-400/10',
      faceTextColor: 'text-emerald-300',
      faceConf: '0.98',
      leftEye: '0.98 (OPEN)',
      rightEye: '0.97 (OPEN)',
      eyeStateText: 'OPEN',
      ear: '0.94',
      pitch: '1.2°',
      yaw: '-0.8°',
      roll: '0.4°',
      posture: 'NORMAL',
      fatigue: 'LOW (12%)',
      closureTime: '0.00s',
      glowColor: 'rgba(223, 255, 0, 0.2)'
    },
    SLUMP: {
      statusLabel: 'POSTURE WARNING',
      statusDetail: '⚠️ SLUMP DETECTED',
      statusColor: 'text-amber-400',
      badgeBorder: 'border-amber-400/40 bg-amber-400/10 text-amber-400',
      boxColor: 'border-amber-400',
      faceBoxColor: 'border-amber-400 bg-amber-400/15',
      faceTextColor: 'text-amber-300',
      faceConf: '0.96',
      leftEye: '0.96 (OPEN)',
      rightEye: '0.95 (OPEN)',
      eyeStateText: 'OPEN / PARTIAL',
      ear: '0.62',
      pitch: '8.6°',
      yaw: '-1.4°',
      roll: '4.8°',
      posture: 'SLUMP DETECTED',
      fatigue: 'ELEVATED (48%)',
      closureTime: '0.12s',
      glowColor: 'rgba(245, 158, 11, 0.3)'
    },
    DROWSY: {
      statusLabel: 'DROWSINESS DETECTED',
      statusDetail: '🚨 CRITICAL FATIGUE',
      statusColor: 'text-[#FF2A4B]',
      badgeBorder: 'border-[#FF2A4B]/40 bg-[#FF2A4B]/10 text-[#FF2A4B]',
      boxColor: 'border-[#FF2A4B]',
      faceBoxColor: 'border-[#FF2A4B] bg-[#FF2A4B]/20',
      faceTextColor: 'text-[#FF2A4B]',
      faceConf: '0.95',
      leftEye: 'CLOSED',
      rightEye: 'CLOSED',
      eyeStateText: 'CLOSED',
      ear: '0.18',
      pitch: '5.4°',
      yaw: '-0.5°',
      roll: '1.8°',
      posture: 'DEGRADED',
      fatigue: 'HIGH (82%)',
      closureTime: '0.84s',
      glowColor: 'rgba(255, 42, 75, 0.4)'
    }
  };

  const current = telemetryConfig[visionState];

  return (
    <section id="vision" className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 md:px-12 bg-[#060709] border-t border-b border-[#181C23] overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-telemetry-grid pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#232934] pb-4 mb-8 gap-4">
          <div className="flex items-center gap-3 text-xs font-mono-tech text-[#DFFF00] tracking-widest uppercase">
            <span className="px-2 py-0.5 bg-[#DFFF00]/10 border border-[#DFFF00]/40">SECTION 03</span>
            <span>// COMPUTER VISION & POSE ESTIMATION</span>
          </div>
          <div className="text-xs font-mono-tech flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${visionState === 'NORMAL' ? 'bg-emerald-400 animate-ping' : visionState === 'SLUMP' ? 'bg-amber-400 animate-pulse' : 'bg-[#FF2A4B] animate-ping'}`} />
            <span className={current.statusColor}>
              YOLOv8 POSE ENGINE // {current.statusDetail}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography & Controls */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-extrabold uppercase font-display tracking-tight text-[#F4F5F7] leading-[1.05]">
                THE CAMERA<br />
                <span className="text-[#DFFF00]">SEES MORE THAN</span><br />
                A DRIVER.
              </h2>
              <p className="text-gray-400 text-base font-sans mt-4 leading-relaxed">
                Using real-time YOLOv8 neural network pose estimation, DriveAware continuously constructs a 17-point facial and upper-body skeletal rig at 60 FPS to detect fatigue and posture degradation.
              </p>
            </motion.div>

            {/* Implemented vs Roadmap Badges */}
            <div className="space-y-3 font-mono-tech text-xs pt-4 border-t border-[#181C23]">
              <div className="p-3 bg-[#111419] border border-[#DFFF00]/30 rounded">
                <div className="flex items-center gap-2 text-[#DFFF00] font-bold mb-1">
                  <CheckCircle2 size={14} />
                  <span>IMPLEMENTED POSE PIPELINE</span>
                </div>
                <ul className="text-gray-400 text-[11px] space-y-1 pl-5 list-disc">
                  <li>YOLOv8 17-point keypoint extraction (Eyes, Nose, Shoulders)</li>
                  <li>Continuous Head Tilt vector calculation (Pitch/Yaw/Roll)</li>
                  <li>Eye Aspect Ratio (EAR) & Eye Closure Duration Tracker</li>
                  <li>Real-time WebSocket JSON Telemetry Serializer</li>
                </ul>
              </div>
            </div>

            {/* Interactive Simulation Controls */}
            <div className="pt-2">
              <span className="text-xs font-mono-tech text-gray-400 block mb-3 font-bold uppercase tracking-wider">
                // SELECT SIMULATION STATE:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono-tech text-xs">
                <button
                  onClick={() => setVisionState('NORMAL')}
                  className={`px-3 py-3 border rounded transition-all flex flex-col items-center justify-center gap-1 ${
                    visionState === 'NORMAL'
                      ? 'bg-[#DFFF00] text-black border-[#DFFF00] font-bold shadow-[0_0_15px_rgba(223,255,0,0.4)]'
                      : 'bg-[#111419] text-gray-400 border-[#232934] hover:text-white hover:border-[#DFFF00]/50'
                  }`}
                >
                  <Activity size={14} />
                  <span>NORMAL ATTENTION</span>
                </button>
                
                <button
                  onClick={() => setVisionState('SLUMP')}
                  className={`px-3 py-3 border rounded transition-all flex flex-col items-center justify-center gap-1 ${
                    visionState === 'SLUMP'
                      ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'bg-[#111419] text-gray-400 border-[#232934] hover:text-white hover:border-amber-400/50'
                  }`}
                >
                  <AlertTriangle size={14} />
                  <span>HEAD TILT [SLUMP]</span>
                </button>

                <button
                  onClick={() => setVisionState('DROWSY')}
                  className={`px-3 py-3 border rounded transition-all flex flex-col items-center justify-center gap-1 ${
                    visionState === 'DROWSY'
                      ? 'bg-[#FF2A4B] text-white border-[#FF2A4B] font-bold shadow-[0_0_15px_rgba(255,42,75,0.4)]'
                      : 'bg-[#111419] text-gray-400 border-[#232934] hover:text-white hover:border-[#FF2A4B]/50'
                  }`}
                >
                  <ShieldAlert size={14} />
                  <span>EYE CLOSURE [DROWSY]</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Reactive Computer Vision Feed Visualizer */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-video bg-[#0B0D10] border-2 border-[#232934] rounded hud-corner overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]">
              {/* Scanlines & Grid */}
              <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-30" />
              <div className="absolute inset-0 bg-telemetry-grid pointer-events-none opacity-20" />

              {/* Status Banner Bar inside Feed */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-[#090A0C]/90 border-b border-[#232934] px-4 flex items-center justify-between text-[11px] font-mono-tech z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-gray-400">CAM_01 // COCKPIT_POSE_FEED</span>
                </div>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${current.badgeBorder}`}>
                  {current.statusDetail}
                </div>
              </div>

              {/* Driver & Pose Rig Canvas */}
              <div className="relative w-full h-full flex items-center justify-center pt-8">
                {/* Driver Body & Head SVG Container (Smooth 600ms Spring Easing) */}
                <motion.div
                  className="relative w-[340px] h-[240px] flex items-center justify-center"
                  animate={{
                    rotate: visionState === 'SLUMP' ? -18 : 0,
                    y: visionState === 'DROWSY' ? 14 : visionState === 'SLUMP' ? 8 : 0,
                    x: visionState === 'SLUMP' ? -12 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                >
                  {/* SVG Driver Silhouette */}
                  <svg viewBox="0 0 200 200" className="w-full h-full text-gray-700">
                    {/* Shoulders / Torso */}
                    <motion.path
                      d="M 20 180 Q 100 130 180 180 L 180 200 L 20 200 Z"
                      fill="currentColor"
                      opacity="0.5"
                      animate={{
                        d: visionState === 'SLUMP'
                          ? "M 20 190 Q 90 145 180 185 L 180 200 L 20 200 Z"
                          : "M 20 180 Q 100 130 180 180 L 180 200 L 20 200 Z"
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Head Contour */}
                    <circle cx="100" cy="85" r="42" fill="#181C23" stroke="#323B4A" strokeWidth="2" />
                    
                    {/* Ears */}
                    <ellipse cx="56" cy="85" rx="4" ry="8" fill="#232934" />
                    <ellipse cx="144" cy="85" rx="4" ry="8" fill="#232934" />
                    
                    {/* Nose Bridge Marker */}
                    <path d="M 100 78 L 97 92 L 103 92 Z" fill="#4B5563" />
                  </svg>

                  {/* Dynamic Face Bounding Box (Attaches to Head Tilt & Rotation) */}
                  <motion.div
                    className={`absolute rounded border-2 p-1 transition-colors duration-300 ${current.faceBoxColor}`}
                    style={{
                      width: '120px',
                      height: '130px',
                      top: '20px',
                      left: '110px'
                    }}
                    animate={{
                      scale: visionState === 'DROWSY' ? 0.98 : 1
                    }}
                  >
                    {/* Box Corner Reticles */}
                    <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white" />
                    <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white" />
                    <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white" />

                    {/* Face Label Tag */}
                    <span className={`absolute -top-5 left-0 text-[9px] font-mono-tech font-bold px-1.5 py-0.5 bg-[#090A0C] border border-[#232934] ${current.faceTextColor}`}>
                      FACE: {current.faceConf}
                    </span>

                    {/* EYE LANDMARKS & CONTOUR VISUALIZER */}
                    <div className="relative w-full h-full flex items-center justify-between px-3 pt-6">
                      {/* Left Eye Landmark Group */}
                      <div className="relative w-8 h-6 flex items-center justify-center">
                        {/* Eye Contour SVG */}
                        <svg viewBox="0 0 30 20" className="w-full h-full">
                          {/* Upper Eyelid Landmark */}
                          <motion.path
                            d="M 2 10 Q 15 1 28 10"
                            stroke="#DFFF00"
                            strokeWidth="2"
                            fill="none"
                            animate={{
                              d: visionState === 'DROWSY' ? "M 2 10 Q 15 9 28 10" : "M 2 10 Q 15 1 28 10"
                            }}
                            transition={{ duration: 0.5 }}
                          />
                          {/* Lower Eyelid Landmark */}
                          <motion.path
                            d="M 2 10 Q 15 19 28 10"
                            stroke="#DFFF00"
                            strokeWidth="2"
                            fill="none"
                            animate={{
                              d: visionState === 'DROWSY' ? "M 2 10 Q 15 11 28 10" : "M 2 10 Q 15 19 28 10"
                            }}
                            transition={{ duration: 0.5 }}
                          />
                          {/* Pupil / Iris (Fades when closed) */}
                          <motion.circle
                            cx="15"
                            cy="10"
                            r="3.5"
                            fill={visionState === 'DROWSY' ? '#FF2A4B' : '#DFFF00'}
                            animate={{
                              opacity: visionState === 'DROWSY' ? 0.2 : 1,
                              scale: visionState === 'DROWSY' ? 0.4 : 1
                            }}
                          />
                        </svg>
                        
                        {/* Eye Bounding Reticle Box */}
                        <motion.div
                          className={`absolute inset-0 border ${visionState === 'DROWSY' ? 'border-[#FF2A4B]' : 'border-[#DFFF00]/60'} rounded`}
                          animate={{
                            boxShadow: visionState === 'DROWSY' ? '0 0 8px rgba(255,42,75,0.8)' : '0 0 0px transparent'
                          }}
                        />
                      </div>

                      {/* Right Eye Landmark Group */}
                      <div className="relative w-8 h-6 flex items-center justify-center">
                        {/* Eye Contour SVG */}
                        <svg viewBox="0 0 30 20" className="w-full h-full">
                          {/* Upper Eyelid Landmark */}
                          <motion.path
                            d="M 2 10 Q 15 1 28 10"
                            stroke="#DFFF00"
                            strokeWidth="2"
                            fill="none"
                            animate={{
                              d: visionState === 'DROWSY' ? "M 2 10 Q 15 9 28 10" : "M 2 10 Q 15 1 28 10"
                            }}
                            transition={{ duration: 0.5 }}
                          />
                          {/* Lower Eyelid Landmark */}
                          <motion.path
                            d="M 2 10 Q 15 19 28 10"
                            stroke="#DFFF00"
                            strokeWidth="2"
                            fill="none"
                            animate={{
                              d: visionState === 'DROWSY' ? "M 2 10 Q 15 11 28 10" : "M 2 10 Q 15 19 28 10"
                            }}
                            transition={{ duration: 0.5 }}
                          />
                          {/* Pupil / Iris (Fades when closed) */}
                          <motion.circle
                            cx="15"
                            cy="10"
                            r="3.5"
                            fill={visionState === 'DROWSY' ? '#FF2A4B' : '#DFFF00'}
                            animate={{
                              opacity: visionState === 'DROWSY' ? 0.2 : 1,
                              scale: visionState === 'DROWSY' ? 0.4 : 1
                            }}
                          />
                        </svg>

                        {/* Eye Bounding Reticle Box */}
                        <motion.div
                          className={`absolute inset-0 border ${visionState === 'DROWSY' ? 'border-[#FF2A4B]' : 'border-[#DFFF00]/60'} rounded`}
                          animate={{
                            boxShadow: visionState === 'DROWSY' ? '0 0 8px rgba(255,42,75,0.8)' : '0 0 0px transparent'
                          }}
                        />
                      </div>
                    </div>

                    {/* Head Pose Axis Vector (Nose Bridge) */}
                    <div className="absolute top-[68px] left-[52px]">
                      <svg viewBox="0 0 40 40" className="w-6 h-6">
                        {/* Forward Vector Line */}
                        <line x1="20" y1="20" x2="20" y2="4" stroke="#DFFF00" strokeWidth="2" />
                        {/* Roll Line */}
                        <line x1="8" y1="20" x2="32" y2="20" stroke="#DFFF00" strokeWidth="1.5" strokeDasharray="2 2" />
                        <circle cx="20" cy="20" r="2" fill="#DFFF00" />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Dynamic HUD Telemetry Data Cards (Overlay) */}
              <div className="absolute bottom-4 left-4 space-y-1 font-mono-tech text-[10px] bg-[#090A0C]/90 p-3 border border-[#232934] rounded max-w-[210px] backdrop-blur-md shadow-lg">
                <div className="text-[#DFFF00] font-bold border-b border-[#232934] pb-1 mb-1 uppercase tracking-wider flex items-center justify-between">
                  <span>TELEMETRY STREAM</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF00] animate-ping" />
                </div>

                <div className="flex justify-between gap-2">
                  <span className="text-gray-400">EAR (EYE ASPECT):</span>
                  <span className={`font-bold ${visionState === 'DROWSY' ? 'text-[#FF2A4B]' : visionState === 'SLUMP' ? 'text-amber-400' : 'text-[#DFFF00]'}`}>
                    {current.ear}
                  </span>
                </div>

                <div className="flex justify-between gap-2">
                  <span className="text-gray-400">EYE STATE:</span>
                  <span className={`font-bold ${visionState === 'DROWSY' ? 'text-[#FF2A4B]' : visionState === 'SLUMP' ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {current.eyeStateText}
                  </span>
                </div>

                <div className="flex justify-between gap-2">
                  <span className="text-gray-400">HEAD POSE:</span>
                  <span className="text-gray-200 font-bold">
                    P:{current.pitch} R:{current.roll}
                  </span>
                </div>

                <div className="flex justify-between gap-2">
                  <span className="text-gray-400">POSTURE:</span>
                  <span className={`font-bold ${visionState === 'SLUMP' ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {current.posture}
                  </span>
                </div>

                <div className="flex justify-between gap-2">
                  <span className="text-gray-400">FATIGUE RISK:</span>
                  <span className={`font-bold ${visionState === 'DROWSY' ? 'text-[#FF2A4B]' : visionState === 'SLUMP' ? 'text-amber-400' : 'text-[#DFFF00]'}`}>
                    {current.fatigue}
                  </span>
                </div>
              </div>

              {/* Frame rate indicator */}
              <div className="absolute bottom-4 right-4 text-[10px] font-mono-tech text-gray-500 bg-[#090A0C]/90 p-2 border border-[#232934] rounded">
                FRAME TIME: <span className="text-[#DFFF00]">16.6ms (60 FPS)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
