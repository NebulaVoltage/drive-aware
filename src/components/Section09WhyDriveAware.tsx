import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, EyeOff, AlertOctagon, CheckCircle2 } from 'lucide-react';

export function Section09WhyDriveAware() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 md:px-12 bg-[#090A0C] border-t border-b border-[#181C23] overflow-hidden">
      <div className="absolute inset-0 bg-telemetry-grid pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#232934] pb-4 mb-12">
          <div className="flex items-center gap-3 text-xs font-mono-tech text-[#DFFF00] tracking-widest uppercase">
            <span className="px-2 py-0.5 bg-[#DFFF00]/10 border border-[#DFFF00]/40">SECTION 09</span>
            <span>// THE FUSION ADVANTAGE</span>
          </div>
        </div>

        {/* Large Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-extrabold uppercase font-display tracking-tight text-[#F4F5F7] leading-tight">
            "ONE SIGNAL CAN BE MISSED.<br />
            <span className="text-[#DFFF00]">TWO SIGNALS ARE HARDER TO IGNORE."</span>
          </h2>
          <p className="text-gray-400 text-base md:text-xl font-sans mt-6">
            DriveAware eliminates single-point optical or physical sensor failure through real-time cross-validation.
          </p>
        </motion.div>

        {/* 3-Column Comparison Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Vision Only */}
          <div className="p-6 bg-[#0E1013] border border-[#232934] rounded hud-corner space-y-4">
            <div className="flex items-center justify-between border-b border-[#181C23] pb-3 text-xs font-mono-tech">
              <span className="text-gray-400 font-bold uppercase">VISION ONLY</span>
              <EyeOff size={16} className="text-amber-400" />
            </div>

            <h3 className="text-lg font-bold text-white font-display uppercase">
              OPTICAL SYSTEM ALONE
            </h3>

            <ul className="space-y-2 text-xs font-sans text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-mono-tech">✕</span>
                <span>Fails during direct sunlight glares or dark night shadows</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-mono-tech">✕</span>
                <span>Obstructed by dark sunglasses or hat visors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-mono-tech">✕</span>
                <span>False positives when driver turns head to check side mirror</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-[#181C23] text-[10px] font-mono-tech text-amber-400">
              RISK: HIGH FALSE ALARM RATE
            </div>
          </div>

          {/* Pressure Only */}
          <div className="p-6 bg-[#0E1013] border border-[#232934] rounded hud-corner space-y-4">
            <div className="flex items-center justify-between border-b border-[#181C23] pb-3 text-xs font-mono-tech">
              <span className="text-gray-400 font-bold uppercase">PRESSURE ONLY</span>
              <AlertOctagon size={16} className="text-amber-400" />
            </div>

            <h3 className="text-lg font-bold text-white font-display uppercase">
              PHYSICAL SEAT ALONE
            </h3>

            <ul className="space-y-2 text-xs font-sans text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-mono-tech">✕</span>
                <span>Cannot confirm whether driver eyelids are open or closed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-mono-tech">✕</span>
                <span>Vulnerable to seatbelt adjustments or leg posture changes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-mono-tech">✕</span>
                <span>Cannot detect eye microsleep when driver remains upright</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-[#181C23] text-[10px] font-mono-tech text-amber-400">
              RISK: MISSED MICROSLEEP EVENTS
            </div>
          </div>

          {/* DriveAware Fusion */}
          <div className="p-6 bg-[#111419] border-2 border-[#DFFF00] rounded hud-corner box-glow-lime space-y-4">
            <div className="flex items-center justify-between border-b border-[#232934] pb-3 text-xs font-mono-tech">
              <span className="text-[#DFFF00] font-extrabold uppercase">DRIVEAWARE FUSION</span>
              <ShieldCheck size={18} className="text-[#DFFF00]" />
            </div>

            <h3 className="text-lg font-extrabold text-white font-display uppercase">
              MULTI-SIGNAL FUSION CORE
            </h3>

            <ul className="space-y-2 text-xs font-sans text-gray-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#DFFF00] shrink-0 mt-0.5" />
                <span>Cross-verifies eye aspect ratio with physical seat load drop</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#DFFF00] shrink-0 mt-0.5" />
                <span>Near-zero false alarm rate (99.4% fusion accuracy)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#DFFF00] shrink-0 mt-0.5" />
                <span>Instant &lt; 14ms alert trigger before microsleep transition</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-[#232934] text-[11px] font-mono-tech text-emerald-400 font-bold">
              ✓ MAXIMUM AUTOMOTIVE SAFETY RATING
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
