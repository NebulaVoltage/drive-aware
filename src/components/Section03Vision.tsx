import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Eye, Sliders, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export function Section03Vision() {
  const [detectionState, setDetectionState] = useState<'NORMAL' | 'HEAD_TILT' | 'EYE_CLOSED'>('NORMAL');

  return (
    <section id="vision" className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 md:px-12 bg-[#060709] border-t border-b border-[#181C23] overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-telemetry-grid pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#232934] pb-4 mb-8">
          <div className="flex items-center gap-3 text-xs font-mono-tech text-[#DFFF00] tracking-widest uppercase">
            <span className="px-2 py-0.5 bg-[#DFFF00]/10 border border-[#DFFF00]/40">SECTION 03</span>
            <span>// COMPUTER VISION & POSE ESTIMATION</span>
          </div>
          <div className="text-xs font-mono-tech text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>YOLOv8 POSE INFERENCE ENGINE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography & Explanations */}
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
                Using real-time YOLOv8 neural network pose estimation, DriveAware continuously constructs a 17-point facial and upper-body skeletal rig at 60 FPS.
              </p>
            </motion.div>

            {/* Implemented vs Conceptual Feature Badges */}
            <div className="space-y-3 font-mono-tech text-xs pt-4 border-t border-[#181C23]">
              <div className="p-3 bg-[#111419] border border-[#DFFF00]/30 rounded">
                <div className="flex items-center gap-2 text-[#DFFF00] font-bold mb-1">
                  <CheckCircle2 size={14} />
                  <span>IMPLEMENTED CAPABILITIES</span>
                </div>
                <ul className="text-gray-400 text-[11px] space-y-1 pl-5 list-disc">
                  <li>YOLOv8 keypoint extraction (Nose, Eyes, Shoulders)</li>
                  <li>Shoulder & head tilt angle vector calculation</li>
                  <li>Eye closure aspect ratio heuristic & blink duration</li>
                  <li>Real-time WebSocket telemetry serialization</li>
                </ul>
              </div>

              <div className="p-3 bg-[#0E1013] border border-[#232934] rounded">
                <div className="flex items-center gap-2 text-gray-400 font-bold mb-1">
                  <AlertCircle size={14} className="text-amber-400" />
                  <span>FUTURE / CONCEPTUAL ROADMAP</span>
                </div>
                <ul className="text-gray-500 text-[11px] space-y-1 pl-5 list-disc">
                  <li>Infrared thermal pupil dilation monitoring</li>
                  <li>Multi-camera cockpit occlusion fallback</li>
                </ul>
              </div>
            </div>

            {/* Interactive State Toggle Buttons */}
            <div className="pt-4">
              <span className="text-xs font-mono-tech text-gray-500 block mb-2">SIMULATE VISION STATE:</span>
              <div className="flex flex-wrap gap-2 font-mono-tech text-xs">
                <button
                  onClick={() => setDetectionState('NORMAL')}
                  className={`px-3 py-2 border rounded transition-colors ${
                    detectionState === 'NORMAL'
                      ? 'bg-[#DFFF00] text-black border-[#DFFF00] font-bold'
                      : 'bg-[#181C23] text-gray-400 border-[#232934] hover:text-white'
                  }`}
                >
                  NORMAL ATTENTION
                </button>
                <button
                  onClick={() => setDetectionState('HEAD_TILT')}
                  className={`px-3 py-2 border rounded transition-colors ${
                    detectionState === 'HEAD_TILT'
                      ? 'bg-amber-400 text-black border-amber-400 font-bold'
                      : 'bg-[#181C23] text-gray-400 border-[#232934] hover:text-white'
                  }`}
                >
                  HEAD TILT [SLUMP]
                </button>
                <button
                  onClick={() => setDetectionState('EYE_CLOSED')}
                  className={`px-3 py-2 border rounded transition-colors ${
                    detectionState === 'EYE_CLOSED'
                      ? 'bg-[#FF2A4B] text-white border-[#FF2A4B] font-bold'
                      : 'bg-[#181C23] text-gray-400 border-[#232934] hover:text-white'
                  }`}
                >
                  EYE CLOSURE [DROWSY]
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Simulated Computer Vision Feed Visualizer */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-video bg-[#0B0D10] border-2 border-[#232934] rounded hud-corner overflow-hidden p-4 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
              {/* Scanlines & Grid */}
              <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-40" />
              <div className="absolute inset-0 bg-telemetry-grid pointer-events-none opacity-20" />

              {/* Simulated Driver Video / Silhouette Frame */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Silhouette SVG Head & Torso */}
                <motion.svg
                  viewBox="0 0 400 300"
                  className="w-3/4 h-3/4 text-gray-800 transition-transform duration-500"
                  animate={{
                    rotate: detectionState === 'HEAD_TILT' ? -18 : 0,
                    y: detectionState === 'EYE_CLOSED' ? 12 : 0
                  }}
                >
                  {/* Head */}
                  <circle cx="200" cy="110" r="55" fill="currentColor" opacity="0.3" stroke="#232934" strokeWidth="2" />
                  {/* Shoulders */}
                  <path d="M 100 280 Q 200 200 300 280 L 300 300 L 100 300 Z" fill="currentColor" opacity="0.4" />
                </motion.svg>

                {/* Animated Bounding Box around Person */}
                <motion.div
                  className="absolute border-2 border-[#DFFF00] rounded p-2"
                  animate={{
                    top: detectionState === 'EYE_CLOSED' ? '18%' : '14%',
                    left: detectionState === 'HEAD_TILT' ? '20%' : '26%',
                    width: '48%',
                    height: '72%'
                  }}
                  transition={{ type: 'spring', damping: 20 }}
                >
                  <span className="absolute -top-6 left-0 bg-[#DFFF00] text-black text-[10px] font-mono-tech font-bold px-2 py-0.5 uppercase">
                    PERSON 0.98
                  </span>

                  {/* Facial Bounding Box */}
                  <motion.div
                    className={`absolute border ${detectionState === 'EYE_CLOSED' ? 'border-[#FF2A4B] bg-[#FF2A4B]/10' : 'border-emerald-400 bg-emerald-400/10'}`}
                    style={{ top: '15%', left: '22%', width: '56%', height: '48%' }}
                  >
                    <span className="absolute -top-5 left-0 text-[9px] font-mono-tech font-semibold text-emerald-300">
                      FACE 0.97
                    </span>
                  </motion.div>

                  {/* Eye Bounding Markers */}
                  <div className="absolute top-[28%] left-[32%] flex gap-6">
                    <div className={`w-3 h-3 border ${detectionState === 'EYE_CLOSED' ? 'border-[#FF2A4B] bg-[#FF2A4B]' : 'border-[#DFFF00] bg-[#DFFF00]/30'} rounded-full flex items-center justify-center`}>
                      <span className="w-1 h-1 bg-[#DFFF00] rounded-full animate-ping" />
                    </div>
                    <div className={`w-3 h-3 border ${detectionState === 'EYE_CLOSED' ? 'border-[#FF2A4B] bg-[#FF2A4B]' : 'border-[#DFFF00] bg-[#DFFF00]/30'} rounded-full flex items-center justify-center`}>
                      <span className="w-1 h-1 bg-[#DFFF00] rounded-full animate-ping" />
                    </div>
                  </div>

                  {/* Skeleton Pose Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line x1="50%" y1="28%" x2="35%" y2="65%" stroke="#DFFF00" strokeWidth="2" strokeDasharray="3 3" />
                    <line x1="50%" y1="28%" x2="65%" y2="65%" stroke="#DFFF00" strokeWidth="2" strokeDasharray="3 3" />
                  </svg>
                </motion.div>
              </div>

              {/* HUD Detection Telemetry Overlay */}
              <div className="absolute top-4 left-4 space-y-1 font-mono-tech text-[10px] bg-[#090A0C]/90 p-2.5 border border-[#232934] rounded">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">PERSON DETECT:</span>
                  <span className="text-[#DFFF00] font-bold">0.98</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">FACE CONFIDENCE:</span>
                  <span className="text-emerald-400 font-bold">0.97</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">EYES ASPECT RATIO:</span>
                  <span className={detectionState === 'EYE_CLOSED' ? 'text-[#FF2A4B] font-bold' : 'text-[#DFFF00] font-bold'}>
                    {detectionState === 'EYE_CLOSED' ? '0.12 [CLOSED]' : '0.94 [OPEN]'}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">POSTURE ANGLE:</span>
                  <span className={detectionState === 'HEAD_TILT' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {detectionState === 'HEAD_TILT' ? '-18.4° [TILT]' : '1.2° [OK]'}
                  </span>
                </div>
              </div>

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
