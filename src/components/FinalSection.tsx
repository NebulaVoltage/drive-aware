import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ArrowUpRight } from 'lucide-react';

interface FinalSectionProps {
  onOpenDashboard: () => void;
  onExploreTech: () => void;
}

export function FinalSection({ onOpenDashboard, onExploreTech }: FinalSectionProps) {
  return (
    <section className="relative py-32 px-4 md:px-12 bg-[#060709] border-t border-[#181C23] overflow-hidden text-center">
      {/* Subtle Lime Pulse Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DFFF00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl sm:text-7xl md:text-9xl font-extrabold uppercase font-display tracking-tight text-[#F4F5F7]">
            STAY AWAKE.<br />
            <span className="text-[#DFFF00]">STAY AWARE.</span>
          </h2>
        </motion.div>

        <p className="text-gray-400 text-lg md:text-2xl font-mono-tech max-w-xl mx-auto uppercase tracking-wider">
          DRIVEAWARE — Technology that watches when you can't.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-6">
          <button
            onClick={onOpenDashboard}
            data-cursor="cta"
            data-cursor-label="DASHBOARD →"
            className="px-8 py-4 bg-[#DFFF00] text-black font-extrabold font-mono-tech text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(223,255,0,0.4)] hover:shadow-[0_0_45px_rgba(223,255,0,0.8)] hover:scale-105"
          >
            <span className="flex items-center gap-3">
              <LayoutDashboard size={18} /> ENTER THE DASHBOARD →
            </span>
          </button>

          <button
            onClick={onExploreTech}
            className="px-8 py-4 bg-[#111419] border border-[#232934] hover:border-[#DFFF00] text-white font-mono-tech text-sm tracking-widest uppercase transition-all hover:text-[#DFFF00]"
          >
            EXPLORE THE TECHNOLOGY →
          </button>
        </div>
      </div>
    </section>
  );
}
