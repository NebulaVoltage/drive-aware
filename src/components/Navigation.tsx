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

      if (currentScrollY > 60) {
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
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none"
        >
          {/* Main Telemetry HUD Navbar Container */}
          <div
            className={`relative pointer-events-auto flex items-center justify-between w-full max-w-7xl transition-all duration-300 bg-[#060709]/92 backdrop-blur-2xl border border-[#DFFF00]/30 rounded-2xl px-4 sm:px-6 shadow-[0_12px_45px_rgba(0,0,0,0.9)] overflow-hidden ${
              isScrolled ? 'py-2 sm:py-2.5 border-[#DFFF00]/45 shadow-[0_15px_50px_rgba(0,0,0,0.95)]' : 'py-3 sm:py-4'
            }`}
          >
            {/* Top & Bottom Neon Hairline Accent Bars */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#DFFF00]/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#DFFF00]/30 to-transparent pointer-events-none" />

            {/* Corner HUD Bracket Reticles */}
            <span className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#DFFF00]/70 pointer-events-none" />
            <span className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-[#DFFF00]/70 pointer-events-none" />
            <span className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-[#DFFF00]/70 pointer-events-none" />
            <span className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#DFFF00]/70 pointer-events-none" />

            {/* Left: Official Brand Logo Anchor */}
            <div className="flex items-center gap-4 shrink-0">
              <a
                href="#"
                aria-label="DriveAware Home"
                className="group relative shrink-0 transition-transform duration-200 hover:scale-[1.015] hover:brightness-110 flex items-center"
              >
                <DriveAwareFullLogo />
                {/* Subtle Hover Lime Glow */}
                <div className="absolute -inset-2 rounded-lg bg-[#DFFF00]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </a>

              {/* Micro-Telemetry Badge */}
              <div className="hidden 2xl:flex items-center gap-2 font-mono-tech text-[9px] text-gray-500 border-l border-[#232934] pl-4 uppercase tracking-widest">
                <span className="text-[#DFFF00] font-bold">60Hz</span>
                <span>// MULTI-SENSOR FUSION</span>
              </div>
            </div>

            {/* Middle: Telemetry Module Navigation Link Bar */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-3 px-3 py-1 bg-[#0D0F13]/80 border border-[#232934] rounded-xl font-mono-tech text-xs tracking-wider">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="group relative px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 transition-all text-xs uppercase whitespace-nowrap rounded-lg"
                  >
                    {/* Technical Number Badge */}
                    <span
                      className={`text-[10px] font-bold font-mono-tech transition-colors ${
                        isActive ? 'text-[#DFFF00]' : 'text-gray-500 group-hover:text-[#DFFF00]'
                      }`}
                    >
                      [{item.num}]
                    </span>

                    {/* Label Text */}
                    <span
                      className={`transition-all font-semibold ${
                        isActive
                          ? 'text-white font-bold tracking-widest'
                          : 'text-gray-400 group-hover:text-white group-hover:-translate-y-0.5'
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Active Section Underline & Indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#DFFF00] shadow-[0_0_8px_#DFFF00]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover Glow Light Accent */}
                    <span className="absolute inset-0 rounded-lg bg-[#DFFF00]/0 group-hover:bg-[#DFFF00]/5 transition-colors pointer-events-none" />
                  </button>
                );
              })}
            </nav>

            {/* Right: System Status & Hardware Control CTA */}
            <div className="flex items-center gap-3 shrink-0">
              {/* System Status Module */}
              <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#111419]/90 border border-[#232934] text-[10px] font-mono-tech shrink-0 shadow-inner">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnected ? 'bg-emerald-400' : 'bg-[#DFFF00]'}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isConnected ? 'bg-emerald-400' : 'bg-[#DFFF00]'}`} />
                </span>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[8px] text-gray-500 font-mono-tech tracking-widest">SYSTEM</span>
                  <span className="text-gray-200 font-bold tracking-wider uppercase">
                    {isConnected ? 'LIVE SENSOR' : 'ONLINE'}
                  </span>
                </div>
              </div>

              {/* Hardware Control Telemetry Dashboard CTA Button */}
              <button
                onClick={onOpenDashboard}
                data-cursor="cta"
                data-cursor-label="DASHBOARD →"
                className="group relative flex items-center gap-2 px-4 py-2 rounded-xl bg-[#DFFF00] hover:bg-[#c6e600] text-black font-extrabold text-xs font-mono-tech tracking-wider uppercase transition-all duration-200 shadow-[0_0_18px_rgba(223,255,0,0.35)] hover:shadow-[0_0_28px_rgba(223,255,0,0.65)] hover:-translate-y-0.5 active:translate-y-0 shrink-0 whitespace-nowrap overflow-hidden"
              >
                <Radio size={14} className="animate-pulse" />
                <span>TELEMETRY DASHBOARD</span>
              </button>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
