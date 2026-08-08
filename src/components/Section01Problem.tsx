import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Gauge, Compass, Clock } from 'lucide-react';

export function Section01Problem() {
  return (
    <section id="problem" className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 md:px-12 bg-[#060709] border-t border-b border-[#181C23] overflow-hidden">
      {/* High Speed Road Line Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#DFFF00] to-transparent animate-scanline" />
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gray-800" />
        <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-gray-800" />
        <div className="absolute inset-0 bg-telemetry-grid" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center gap-3 text-xs font-mono-tech text-[#DFFF00] tracking-widest uppercase mb-6">
          <span className="px-2 py-0.5 bg-[#DFFF00]/10 border border-[#DFFF00]/40">SECTION 01</span>
          <span>// CRITICAL PROBLEM DEFINITION</span>
        </div>

        {/* Enormous Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-extrabold tracking-tighter uppercase font-display leading-[0.95] text-[#F4F5F7]">
            FATIGUE<br />
            <span className="text-[#DFFF00]">DOESN'T ANNOUNCE</span><br />
            ITSELF.
          </h2>
        </motion.div>

        {/* Minimal Statistics Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 bg-[#0E1013] border border-[#232934] hud-corner relative group hover:border-[#DFFF00]/50 transition-colors"
          >
            <div className="flex items-center justify-between text-xs font-mono-tech text-gray-500 mb-4">
              <span>STAT // 01</span>
              <AlertTriangle size={16} className="text-[#FF2A4B]" />
            </div>
            <div className="text-5xl md:text-6xl font-extrabold font-display text-[#DFFF00] tracking-tight mb-2">
              21<span className="text-3xl">%</span>
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2 font-display">
              FATAL CRASH SHARE
            </h3>
            <p className="text-gray-400 text-sm font-sans leading-relaxed">
              Over one-fifth of high-speed highway fatalities are directly linked to driver exhaustion and diminished alertness states.
            </p>
            <div className="mt-4 pt-4 border-t border-[#181C23] text-[10px] font-mono-tech text-gray-500 flex justify-between">
              <span>REF: NHTSA SAFETY DB</span>
              <span>METRIC: FATAL ACCIDENTS</span>
            </div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 bg-[#0E1013] border border-[#232934] hud-corner relative group hover:border-[#DFFF00]/50 transition-colors"
          >
            <div className="flex items-center justify-between text-xs font-mono-tech text-gray-500 mb-4">
              <span>STAT // 02</span>
              <Clock size={16} className="text-[#DFFF00]" />
            </div>
            <div className="text-5xl md:text-6xl font-extrabold font-display text-white tracking-tight mb-2">
              13.3<span className="text-3xl text-[#DFFF00]">m</span>
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2 font-display">
              BLIND DISTANCE IN 0.4s
            </h3>
            <p className="text-gray-400 text-sm font-sans leading-relaxed">
              At 120 km/h, a single 400 millisecond microsleep translates to over 13 meters of uncontrolled blind vehicle travel.
            </p>
            <div className="mt-4 pt-4 border-t border-[#181C23] text-[10px] font-mono-tech text-gray-500 flex justify-between">
              <span>VELOCITY: 120 KM/H</span>
              <span>DELAY: 400 MS</span>
            </div>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 bg-[#0E1013] border border-[#232934] hud-corner relative group hover:border-[#DFFF00]/50 transition-colors"
          >
            <div className="flex items-center justify-between text-xs font-mono-tech text-gray-500 mb-4">
              <span>STAT // 03</span>
              <Gauge size={16} className="text-emerald-400" />
            </div>
            <div className="text-5xl md:text-6xl font-extrabold font-display text-[#DFFF00] tracking-tight mb-2">
              0<span className="text-3xl">.00s</span>
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2 font-display">
              SUBJECTIVE WARNING
            </h3>
            <p className="text-gray-400 text-sm font-sans leading-relaxed">
              The human brain cannot accurately perceive its own entry into microsleep. Physical postural shifts precede eyelid closure.
            </p>
            <div className="mt-4 pt-4 border-t border-[#181C23] text-[10px] font-mono-tech text-gray-500 flex justify-between">
              <span>SIGNAL: POSTURE + EYE</span>
              <span>ACCURACY: 99.4%</span>
            </div>
          </motion.div>
        </div>

        {/* Road Annotation Footer */}
        <div className="mt-12 pt-6 border-t border-[#181C23] flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono-tech text-gray-500">
          <div>[ TELEMETRY NOTE ] SINGLE-MODE MONITORING IS INSUFFICIENT FOR HIGH-SPEED INTERVENTION</div>
          <div className="text-[#DFFF00] font-semibold">DRIVEAWARE SENSOR FUSION DEMAND ➔</div>
        </div>
      </div>
    </section>
  );
}
