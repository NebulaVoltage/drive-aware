import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldAlert, ArrowLeftRight, Activity } from 'lucide-react';

export function Section04Pressure() {
  const [isSlumped, setIsSlumped] = useState<boolean>(false);

  // Seat pressure matrix 8x8 sensor values
  const normalMatrix = [
    [10, 20, 30, 30, 30, 30, 20, 10],
    [20, 50, 75, 75, 75, 75, 50, 20],
    [30, 75, 95, 90, 90, 95, 75, 30],
    [40, 80, 100, 95, 95, 100, 80, 40],
    [35, 70, 85, 80, 80, 85, 70, 35],
    [20, 45, 60, 55, 55, 60, 45, 20],
    [10, 25, 35, 30, 30, 35, 25, 10],
    [5, 10, 15, 15, 15, 15, 10, 5],
  ];

  const slumpedMatrix = [
    [5, 10, 15, 35, 60, 80, 65, 40],
    [10, 20, 30, 55, 85, 100, 90, 60],
    [10, 25, 35, 65, 95, 100, 95, 70],
    [15, 30, 40, 70, 100, 100, 95, 75],
    [10, 20, 30, 60, 90, 95, 85, 60],
    [5, 15, 20, 45, 75, 80, 65, 40],
    [5, 10, 15, 30, 50, 55, 40, 20],
    [2, 5, 8, 15, 25, 30, 20, 10],
  ];

  const activeMatrix = isSlumped ? slumpedMatrix : normalMatrix;
  const leftTotal = isSlumped ? 22 : 51;
  const rightTotal = isSlumped ? 78 : 49;

  return (
    <section id="pressure" className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 md:px-12 bg-[#090A0C] overflow-hidden">
      <div className="absolute inset-0 bg-telemetry-grid pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#232934] pb-4 mb-12">
          <div className="flex items-center gap-3 text-xs font-mono-tech text-[#DFFF00] tracking-widest uppercase">
            <span className="px-2 py-0.5 bg-[#DFFF00]/10 border border-[#DFFF00]/40">SECTION 04</span>
            <span>// PHYSICAL SENSING & PRESSURE HEATMAP</span>
          </div>
          <div className="text-xs font-mono-tech text-gray-400">
            ARDUINO PIEZO ARRAY [100 Hz MATRIX]
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-7xl font-extrabold uppercase font-display tracking-tight text-[#F4F5F7]">
            YOUR POSTURE<br />
            <span className="text-[#DFFF00]">LEAVES A SIGNAL.</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl font-sans mt-3">
            Before eyelids close, physical fatigue manifests in lumbar collapse and asymmetrical seat pressure displacement. DriveAware reads the seat's piezo matrix signal in real time.
          </p>
        </motion.div>

        {/* Heatmap & Pressure Distribution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Heatmap Matrix Visualizer */}
          <div className="lg:col-span-7 bg-[#0E1013] border border-[#232934] p-6 md:p-8 rounded hud-corner">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#181C23]">
              <div className="flex items-center gap-3 font-mono-tech text-xs">
                <Zap size={16} className="text-[#DFFF00]" />
                <span className="text-white font-bold uppercase">SEAT SENSOR HEATMAP MATRIX (8x8)</span>
              </div>
              <button
                onClick={() => setIsSlumped(!isSlumped)}
                className="px-4 py-1.5 rounded bg-[#181C23] border border-[#232934] hover:border-[#DFFF00] text-xs font-mono-tech text-[#DFFF00] uppercase transition-colors"
              >
                TOGGLE POSTURE STATE [{isSlumped ? 'SLUMPED' : 'UPRIGHT'}]
              </button>
            </div>

            {/* 8x8 Seat Matrix Grid */}
            <div className="grid grid-cols-8 gap-2 aspect-square max-w-md mx-auto p-4 bg-[#060709] border border-[#232934] rounded">
              {activeMatrix.map((row, rowIndex) =>
                row.map((val, colIndex) => {
                  // Map 0-100 value to heatmap color
                  let colorClass = 'bg-[#181C23] text-gray-700';
                  if (val > 85) colorClass = 'bg-[#FF2A4B] text-white font-bold shadow-[0_0_10px_#FF2A4B]';
                  else if (val > 65) colorClass = 'bg-amber-400 text-black font-bold';
                  else if (val > 40) colorClass = 'bg-[#DFFF00] text-black font-semibold';
                  else if (val > 20) colorClass = 'bg-emerald-600/80 text-white';

                  return (
                    <motion.div
                      key={`${rowIndex}-${colIndex}`}
                      animate={{ scale: isSlumped ? [0.95, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                      className={`rounded flex items-center justify-center text-[9px] font-mono-tech transition-colors duration-300 ${colorClass}`}
                    >
                      {val}
                    </motion.div>
                  );
                })
              )}
            </div>

            <div className="mt-6 flex items-center justify-between text-[10px] font-mono-tech text-gray-500 pt-4 border-t border-[#181C23]">
              <span>LOW LOAD (0-20 N)</span>
              <div className="flex gap-1 h-2 w-32 rounded overflow-hidden">
                <span className="bg-[#181C23] w-1/4" />
                <span className="bg-emerald-600 w-1/4" />
                <span className="bg-[#DFFF00] w-1/4" />
                <span className="bg-[#FF2A4B] w-1/4" />
              </div>
              <span>HIGH LOAD (&gt; 80 N)</span>
            </div>
          </div>

          {/* Left / Right Balance & Signal Bars */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-[#111419] border border-[#232934] rounded hud-corner space-y-6">
              <div className="flex items-center justify-between font-mono-tech text-xs">
                <span className="text-gray-400">POSTURE BALANCE:</span>
                <span className={isSlumped ? 'text-[#FF2A4B] font-bold' : 'text-emerald-400 font-bold'}>
                  {isSlumped ? 'CRITICAL ASYMMETRY' : 'OPTIMAL LOAD DISTRIBUTION'}
                </span>
              </div>

              {/* Bar Comparison */}
              <div className="space-y-4">
                {/* Left Side */}
                <div>
                  <div className="flex justify-between text-xs font-mono-tech mb-1">
                    <span className="text-gray-300">LEFT SEAT ZONE:</span>
                    <span className="text-[#DFFF00] font-bold">{leftTotal}%</span>
                  </div>
                  <div className="h-4 bg-[#060709] border border-[#232934] rounded overflow-hidden p-0.5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 to-[#DFFF00]"
                      animate={{ width: `${leftTotal}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Right Side */}
                <div>
                  <div className="flex justify-between text-xs font-mono-tech mb-1">
                    <span className="text-gray-300">RIGHT SEAT ZONE:</span>
                    <span className="text-[#DFFF00] font-bold">{rightTotal}%</span>
                  </div>
                  <div className="h-4 bg-[#060709] border border-[#232934] rounded overflow-hidden p-0.5">
                    <motion.div
                      className={`h-full ${isSlumped ? 'bg-[#FF2A4B]' : 'bg-gradient-to-r from-emerald-500 to-[#DFFF00]'}`}
                      animate={{ width: `${rightTotal}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Technical annotation text */}
              <div className="p-4 bg-[#060709] border border-[#232934] text-xs font-sans text-gray-400 rounded">
                {isSlumped ? (
                  <p className="text-amber-300 font-mono-tech text-[11px]">
                    ⚠️ ALERT: Pelvic force has shifted 78% rightwards. Lumbar pressure drop indicates driver exhaustion and loss of posture tension.
                  </p>
                ) : (
                  <p className="text-gray-400 font-mono-tech text-[11px]">
                    ✓ NORMAL: Symmetrical load balancing within 2.4% tolerance. Spine and lumbar support active.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
