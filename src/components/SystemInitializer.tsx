import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SystemInitializerProps {
  onComplete: () => void;
}

export function SystemInitializer({ onComplete }: SystemInitializerProps) {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Stage sequence
    const timer1 = setTimeout(() => setStep(1), 600);   // SYSTEM INITIALIZING...
    const timer2 = setTimeout(() => setStep(2), 1500);  // DRIVEAWARE PULSE
    const timer3 = setTimeout(() => setStep(3), 2600);  // KEEP YOUR EYES ON THE ROAD
    const timer4 = setTimeout(() => setStep(4), 4000);  // TELEMETRY ONLINE CHECK
    const timer5 = setTimeout(() => {
      onComplete();
    }, 5400); // Smooth transition to hero

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] bg-[#090A0C] flex flex-col items-center justify-center p-6 bg-telemetry-grid overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Subtle Background Scanline & Pulse */}
        <div className="absolute inset-0 scanline-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-radial-glow opacity-30" />

        <div className="relative z-10 max-w-3xl w-full text-center flex flex-col items-center justify-center min-h-[400px]">
          {/* Step 0 & 1: System Initializing */}
          {step >= 0 && step < 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 text-xs font-mono-tech tracking-[0.25em] text-[#DFFF00]/80 uppercase mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#DFFF00] animate-ping" />
              <span>SYSTEM INITIALIZING... [v4.8.2-PROD]</span>
            </motion.div>
          )}

          {/* Step 2+: DRIVEAWARE Brand Pulse */}
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-widest text-[#F4F5F7] font-display uppercase drop-shadow-[0_0_25px_rgba(223,255,0,0.3)]">
                DRIVE<span className="text-[#DFFF00]">AWARE</span>
              </h1>
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="h-[2px] bg-gradient-to-r from-transparent via-[#DFFF00] to-transparent mt-3"
              />
            </motion.div>
          )}

          {/* Step 3+: KEEP YOUR EYES ON THE ROAD */}
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <h2 className="text-2xl md:text-5xl font-extrabold tracking-tight text-[#F4F5F7] leading-none uppercase">
                "KEEP YOUR EYES<br />
                <span className="text-[#DFFF00]">ON THE ROAD."</span>
              </h2>
            </motion.div>
          )}

          {/* Step 4: Rapid Telemetry Verification Overlay */}
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-3 text-[11px] font-mono-tech text-left border border-[#DFFF00]/20 bg-[#0E1013]/90 p-4 rounded hud-corner backdrop-blur-md"
            >
              <div className="flex flex-col">
                <span className="text-gray-500 text-[9px]">DRIVER STATUS</span>
                <span className="text-[#DFFF00] font-semibold">MONITORING</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-[9px]">VISION SYSTEM</span>
                <span className="text-emerald-400 font-semibold">ONLINE (60FPS)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-[9px]">POSTURE SENSOR</span>
                <span className="text-emerald-400 font-semibold">ONLINE (HEX)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-[9px]">AI MODEL</span>
                <span className="text-[#DFFF00] font-semibold">YOLOv8 ACTIVE</span>
              </div>
              <div className="flex flex-col col-span-2 md:col-span-1">
                <span className="text-gray-500 text-[9px]">SAFETY ENGINE</span>
                <span className="text-emerald-400 font-semibold">READY</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Skip button for returning users */}
        <button
          onClick={onComplete}
          className="absolute bottom-6 right-6 text-[10px] font-mono-tech text-gray-500 hover:text-[#DFFF00] tracking-widest uppercase transition-colors"
        >
          [ SKIP INITIALIZATION ↵ ]
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
