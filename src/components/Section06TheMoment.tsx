import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ShieldAlert, Radio, Volume2, Heart } from 'lucide-react';

export function Section06TheMoment() {
  const [phase, setPhase] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % 5);
    }, 3200);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const stages = [
    {
      title: 'DRIVER STATUS: NORMAL',
      sub: 'ALL SENSOR CHANNELS NOMINAL',
      state: 'NORMAL',
      ear: '0.94',
      posture: 'BALANCED',
      risk: '12%',
      color: 'text-emerald-400',
      border: 'border-emerald-500/30'
    },
    {
      title: 'EYE CLOSURE DETECTED',
      sub: 'EYE ASPECT RATIO DROPS BELOW 0.15 FOR > 400MS',
      state: 'DROWSY',
      ear: '0.12 [CLOSED]',
      posture: 'SLIGHT TILT',
      risk: '48%',
      color: 'text-amber-400',
      border: 'border-amber-400/50'
    },
    {
      title: 'POSTURE SHIFT DETECTED',
      sub: 'LUMBAR PRESSURE COLLAPSE DETECTED BY PIEZO MATRIX',
      state: 'SLUMPED',
      ear: '0.10 [CLOSED]',
      posture: '78% RIGHT ASYMMETRY',
      risk: '76%',
      color: 'text-amber-500',
      border: 'border-amber-500/60'
    },
    {
      title: 'FATIGUE SIGNAL INCREASING',
      sub: 'MULTI-SIGNAL BAYESIAN FUSION REACHES 94.8% CRITICAL RISK',
      state: 'WARNING',
      ear: '0.08 [CLOSED]',
      posture: 'UNSTABLE',
      risk: '94%',
      color: 'text-[#FF2A4B]',
      border: 'border-[#FF2A4B]/80'
    },
    {
      title: 'ALERT TRIGGERED // HAPTIC & ACOUSTIC INTERVENTION',
      sub: 'IMMEDIATE DRIVER SAFETY INTERVENTION ENGAGED',
      state: 'CRITICAL ALERT',
      ear: '0.00 [SLEEP]',
      posture: 'COLLAPSED',
      risk: '99.9%',
      color: 'text-[#FF2A4B]',
      border: 'border-[#FF2A4B] box-glow-alert'
    }
  ];

  const currentStage = stages[phase];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 md:px-12 bg-[#060709] border-t border-b border-[#181C23] overflow-hidden">
      {/* Background Pulse Atmosphere */}
      <div className={`absolute inset-0 transition-colors duration-1000 pointer-events-none ${
        phase === 4 ? 'bg-[#FF2A4B]/10' : phase >= 2 ? 'bg-amber-500/5' : 'bg-transparent'
      }`} />
      <div className="absolute inset-0 bg-telemetry-grid pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-3 text-xs font-mono-tech text-[#DFFF00] tracking-widest uppercase mb-8">
          <span className="px-2 py-0.5 bg-[#DFFF00]/10 border border-[#DFFF00]/40">SECTION 06</span>
          <span>// THE MOMENT OF INTERVENTION</span>
        </div>

        <h2 className="text-4xl md:text-7xl font-extrabold uppercase font-display tracking-tight text-[#F4F5F7]">
          WHEN EVERY MILLISECOND <span className="text-[#DFFF00]">MATTERS.</span>
        </h2>

        {/* Phase Timeline Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 font-mono-tech text-xs">
          {stages.map((st, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPhase(idx);
                setAutoPlay(false);
              }}
              className={`px-3 py-1.5 rounded border transition-colors ${
                phase === idx
                  ? 'bg-[#DFFF00] text-black font-bold border-[#DFFF00]'
                  : 'bg-[#111419] text-gray-400 border-[#232934] hover:text-white'
              }`}
            >
              PHASE 0{idx + 1}
            </button>
          ))}
        </div>

        {/* Cinematic Telemetry Display Box */}
        <div className="mt-12 relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5 }}
              className={`p-8 md:p-12 bg-[#0E1013] border-2 ${currentStage.border} rounded hud-corner text-center relative shadow-[0_0_60px_rgba(0,0,0,0.9)]`}
            >
              {/* Heartbeat pulse icon */}
              <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-full border border-current ${currentStage.color} ${phase >= 3 ? 'animate-bounce' : ''}`}>
                  <Heart size={32} className="animate-pulse" />
                </div>
              </div>

              <div className="text-xs font-mono-tech text-gray-500 tracking-widest uppercase mb-2">
                SEQUENCE STAGE 0{phase + 1} // 05
              </div>

              <h3 className={`text-2xl md:text-4xl font-extrabold font-display uppercase tracking-tight ${currentStage.color}`}>
                {currentStage.title}
              </h3>

              <p className="text-gray-400 text-sm font-mono-tech mt-3 max-w-lg mx-auto">
                {currentStage.sub}
              </p>

              {/* Metric Breakdown Grid */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-left border-t border-[#181C23] pt-6 font-mono-tech text-xs">
                <div className="p-3 bg-[#060709] border border-[#232934] rounded">
                  <span className="text-gray-500 text-[10px] block">EYE ASPECT RATIO</span>
                  <span className="text-white font-bold">{currentStage.ear}</span>
                </div>
                <div className="p-3 bg-[#060709] border border-[#232934] rounded">
                  <span className="text-gray-500 text-[10px] block">POSTURE SIGNAL</span>
                  <span className="text-white font-bold">{currentStage.posture}</span>
                </div>
                <div className="p-3 bg-[#060709] border border-[#232934] rounded">
                  <span className="text-gray-500 text-[10px] block">FATIGUE RISK INDEX</span>
                  <span className={`${currentStage.color} font-bold text-base`}>{currentStage.risk}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
