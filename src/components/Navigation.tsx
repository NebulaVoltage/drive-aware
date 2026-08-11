import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DriveAwareFullLogo } from './DriveAwareLogo';
import { Radio } from 'lucide-react';

interface NavigationProps {
  onOpenDashboard: () => void;
  isConnected: boolean;
}

const NAV_ITEMS = [
  { id: 'problem', num: '01', label: 'PROBLEM' },
  { id: 'system', num: '02', label: 'SYSTEM' },
  { id: 'vision', num: '03', label: 'VISION' },
  { id: 'pressure', num: '04', label: 'PRESSURE' },
  { id: 'fusion', num: '05', label: 'FUSION' },
  { id: 'hardware', num: '08', label: 'HARDWARE' },
];

export function Navigation({ onOpenDashboard, isConnected }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('problem');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false); // Hide on fast scroll down
      } else {
        setIsVisible(true);  // Show on scroll up
      }

      setLastScrollY(currentScrollY);

      // Active section detection
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPos = currentScrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-4 pt-3 sm:pt-4 pointer-events-none"
        >
          {/* Main Primary Telemetry Control Navbar Container */}
          <div
            className={`pointer-events-auto flex items-center justify-between w-full w-[calc(100%-24px)] sm:w-[calc(100%-48px)] max-w-[1600px] h-[72px] sm:h-[78px] transition-all duration-300 bg-[#060709]/95 backdrop-blur-2xl border border-[#DFFF00]/25 rounded-xl px-4 sm:px-6 shadow-[0_12px_40px_rgba(0,0,0,0.9)] overflow-hidden ${
              isScrolled ? 'border-[#DFFF00]/40 shadow-[0_15px_50px_rgba(0,0,0,0.95)]' : ''
            }`}
          >
            {/* Corner HUD Bracket Reticles */}
            <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#DFFF00]/60 pointer-events-none" />
            <span className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#DFFF00]/60 pointer-events-none" />
            <span className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#DFFF00]/60 pointer-events-none" />
            <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#DFFF00]/60 pointer-events-none" />

            {/* 1. LOGO AREA (LEFT, 22-24% Width) */}
            <div className="flex items-center shrink-0 min-w-[160px] sm:min-w-[200px]">
              <a
                href="#"
                aria-label="DriveAware Home"
                className="group relative transition-transform duration-200 hover:scale-[1.015] hover:brightness-110 flex items-center"
              >
                <DriveAwareFullLogo />
                <div className="absolute -inset-2 rounded-lg bg-[#DFFF00]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </a>
            </div>

            {/* 2. NAVIGATION RAIL (MIDDLE, Compact & Subtle Active State) */}
            <div className="hidden lg:flex flex-1 justify-center px-4">
              <nav className="flex items-center gap-1 xl:gap-2 px-2.5 py-1 bg-[#0A0C0F]/90 border border-[#232934]/60 rounded-lg font-mono-tech text-xs tracking-wider">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`group relative px-3 py-1.5 flex items-center gap-1.5 transition-all text-xs uppercase whitespace-nowrap rounded ${
                        isActive ? 'bg-[#DFFF00]/5 text-white font-bold' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {/* Technical Number Badge */}
                      <span
                        className={`text-[10px] font-mono-tech transition-colors ${
                          isActive ? 'text-[#DFFF00] font-bold' : 'text-gray-500 group-hover:text-[#DFFF00]'
                        }`}
                      >
                        [{item.num}]
                      </span>

                      {/* Label Text */}
                      <span className="transition-all uppercase">
                        {item.label}
                      </span>

                      {/* Subtle Neon-Lime 1.5px Underline for Active Section */}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavLine"
                          className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-[#DFFF00] shadow-[0_0_6px_#DFFF00]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* 3. SYSTEM STATUS & TELEMETRY DASHBOARD BUTTON (RIGHT, 24px Gap, Zero Clipping) */}
            <div className="flex items-center gap-5 sm:gap-6 shrink-0">
              {/* SYSTEM ONLINE Module */}
              <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111419]/90 border border-[#232934] text-[10px] font-mono-tech shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnected ? 'bg-emerald-400' : 'bg-[#DFFF00]'}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isConnected ? 'bg-emerald-400' : 'bg-[#DFFF00]'}`} />
                </span>
                <span className="text-gray-300 tracking-wider uppercase whitespace-nowrap font-bold">
                  {isConnected ? 'LIVE SENSOR' : 'SYSTEM ONLINE'}
                </span>
              </div>

              {/* TELEMETRY DASHBOARD CTA (Unclipped, Min-Width, 12px 20px padding) */}
              <button
                onClick={onOpenDashboard}
                data-cursor="cta"
                data-cursor-label="DASHBOARD →"
                className="group relative flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-lg bg-[#DFFF00] hover:bg-[#c6e600] text-black font-extrabold text-xs font-mono-tech tracking-wider uppercase transition-all duration-200 shadow-[0_0_16px_rgba(223,255,0,0.35)] hover:shadow-[0_0_26px_rgba(223,255,0,0.65)] hover:-translate-y-0.5 active:translate-y-0 shrink-0 whitespace-nowrap min-w-[170px] sm:min-w-[190px]"
              >
                <Radio size={13} className="animate-pulse shrink-0" />
                <span className="whitespace-nowrap">TELEMETRY DASHBOARD</span>
              </button>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
