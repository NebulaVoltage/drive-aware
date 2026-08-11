import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DriveAwareFullLogo } from './DriveAwareLogo';

interface NavigationProps {
  onOpenDashboard: () => void;
  isConnected: boolean;
}

export function Navigation({ onOpenDashboard, isConnected }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
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
          <div
            className={`pointer-events-auto flex items-center justify-between w-full max-w-7xl transition-all duration-300 rounded-full border border-[#DFFF00]/30 bg-[#090A0C]/95 backdrop-blur-2xl px-4 sm:px-6 shadow-[0_10px_35px_rgba(0,0,0,0.85)] ${
              isScrolled ? 'py-2 sm:py-2.5 border-[#DFFF00]/40 shadow-[0_12px_40px_rgba(0,0,0,0.95)]' : 'py-3 sm:py-4'
            }`}
          >
            {/* Left: Official Brand Logo Mark & Wordmark */}
            <a
              href="#"
              aria-label="DriveAware Home"
              className="shrink-0 transition-transform duration-200 hover:scale-[1.02] hover:brightness-110 flex items-center"
            >
              <DriveAwareFullLogo />
            </a>

            {/* Middle Nav Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs font-mono-tech text-gray-400 tracking-wider">
              <button
                onClick={() => scrollToSection('problem')}
                className="hover:text-[#DFFF00] transition-colors uppercase whitespace-nowrap"
              >
                [01] PROBLEM
              </button>
              <button
                onClick={() => scrollToSection('system')}
                className="hover:text-[#DFFF00] transition-colors uppercase whitespace-nowrap"
              >
                [02] SYSTEM
              </button>
              <button
                onClick={() => scrollToSection('vision')}
                className="hover:text-[#DFFF00] transition-colors uppercase whitespace-nowrap"
              >
                [03] VISION
              </button>
              <button
                onClick={() => scrollToSection('pressure')}
                className="hover:text-[#DFFF00] transition-colors uppercase whitespace-nowrap"
              >
                [04] PRESSURE
              </button>
              <button
                onClick={() => scrollToSection('fusion')}
                className="hover:text-[#DFFF00] transition-colors uppercase whitespace-nowrap"
              >
                [05] FUSION
              </button>
              <button
                onClick={() => scrollToSection('hardware')}
                className="hover:text-[#DFFF00] transition-colors uppercase whitespace-nowrap"
              >
                [08] HARDWARE
              </button>
            </nav>

            {/* Right: Status Indicator Badge + Dashboard CTA */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* System Status Pill Badge */}
              <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#181C23] border border-[#232934] text-[10px] font-mono-tech shrink-0">
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-[#DFFF00] animate-ping'}`} />
                <span className="text-gray-300 tracking-wider uppercase whitespace-nowrap">
                  {isConnected ? 'LIVE SENSOR' : 'SYSTEM ONLINE'}
                </span>
              </div>

              {/* Telemetry Dashboard Button */}
              <button
                onClick={onOpenDashboard}
                data-cursor="cta"
                data-cursor-label="DASHBOARD →"
                className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#DFFF00] hover:bg-[#c6e600] text-black font-bold text-xs font-mono-tech tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(223,255,0,0.3)] hover:shadow-[0_0_25px_rgba(223,255,0,0.6)] shrink-0 whitespace-nowrap"
              >
                <span>TELEMETRY DASHBOARD</span>
              </button>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
