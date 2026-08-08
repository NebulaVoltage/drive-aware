import React from 'react';

interface FooterProps {
  onOpenDashboard: () => void;
}

export function Footer({ onOpenDashboard }: FooterProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#090A0C] border-t border-[#181C23] py-12 px-4 md:px-12 text-xs font-mono-tech text-gray-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Brand Col */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2 text-base font-extrabold text-white uppercase font-display">
            <div className="w-6 h-6 rounded bg-[#DFFF00] text-black flex items-center justify-center font-black text-xs">
              DA
            </div>
            <span>DRIVE<span className="text-[#DFFF00]">AWARE</span></span>
          </div>
          <p className="text-gray-400 text-xs font-sans max-w-sm">
            AI-Powered Driver Safety & Multi-Sensor Fusion Telemetry System.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-2 py-1 bg-[#111419] border border-[#232934] text-[10px] text-gray-400">YOLOv8</span>
            <span className="px-2 py-1 bg-[#111419] border border-[#232934] text-[10px] text-gray-400">ARDUINO MCU</span>
            <span className="px-2 py-1 bg-[#111419] border border-[#232934] text-[10px] text-gray-400">COMPUTER VISION</span>
            <span className="px-2 py-1 bg-[#111419] border border-[#232934] text-[10px] text-gray-400">SENSOR FUSION</span>
          </div>
        </div>

        {/* Links Col 1 */}
        <div className="md:col-span-3 space-y-2">
          <span className="text-gray-300 font-bold block mb-3 uppercase">// SYSTEM DIRECTORY</span>
          <ul className="space-y-2">
            <li>
              <button onClick={() => scrollToSection('problem')} className="hover:text-[#DFFF00] uppercase">
                [01] THE PROBLEM
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('system')} className="hover:text-[#DFFF00] uppercase">
                [02] SYSTEM ARCHITECTURE
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('vision')} className="hover:text-[#DFFF00] uppercase">
                [03] COMPUTER VISION
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('pressure')} className="hover:text-[#DFFF00] uppercase">
                [04] PRESSURE SENSING
              </button>
            </li>
          </ul>
        </div>

        {/* Links Col 2 */}
        <div className="md:col-span-4 space-y-2">
          <span className="text-gray-300 font-bold block mb-3 uppercase">// TELEMETRY INTERFACE</span>
          <ul className="space-y-2">
            <li>
              <button onClick={() => scrollToSection('fusion')} className="hover:text-[#DFFF00] uppercase">
                [05] SENSOR FUSION ENGINE
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('hardware')} className="hover:text-[#DFFF00] uppercase">
                [08] HARDWARE SPECS
              </button>
            </li>
            <li>
              <button onClick={onOpenDashboard} className="text-[#DFFF00] font-bold uppercase">
                LAUNCH TELEMETRY DASHBOARD ➔
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#181C23] flex flex-wrap items-center justify-between gap-4 text-[10px] text-gray-600">
        <div>DRIVEAWARE TELEMETRY ENGINE v4.8.2 // PROD BUILD</div>
        <div>REAL-TIME DRIVER SAFETY SYSTEM</div>
      </div>
    </footer>
  );
}
