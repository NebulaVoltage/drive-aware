import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
          className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none"
        >
          <div
            className={`pointer-events-auto flex items-center justify-between transition-all duration-300 rounded-full border border-[#DFFF00]/20 bg-[#090A0C]/85 backdrop-blur-xl px-4 md:px-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${
              isScrolled ? 'py-2.5 w-full max-w-4xl' : 'py-4 w-full max-w-6xl'
            }`}
          >
            {/* Left: Official Brand Logo & Status */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="#"
                aria-label="DriveAware Home"
                className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
              >
                {/* Official DriveAware Emblem Mark */}
                <img
                  src="/assets/images/driveaware-logo-mark.svg"
                  alt="DriveAware"
                  className="h-7 sm:h-8 w-auto object-contain text-[#F4F5F7]"
                  style={{ color: '#F4F5F7' }}
                />
                
                {/* Wordmark */}
                <span className="hidden sm:inline text-base md:text-lg font-extrabold tracking-wider uppercase font-display text-white">
                  DRIVE<span className="text-[#DFFF00]">AWARE</span>
                </span>
              </a>

              {/* Status Badge */}
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#181C23] border border-[#232934] text-[10px] font-mono-tech">
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-[#DFFF00] animate-ping'}`} />
                <span className="text-gray-300 tracking-wider uppercase">
                  {isConnected ? 'LIVE EDGE SENSOR' : 'SYSTEM ONLINE'}
                </span>
              </div>
            </div>

            {/* Middle Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-mono-tech text-gray-400 tracking-wider">
              <button
                onClick={() => scrollToSection('problem')}
                className="hover:text-[#DFFF00] transition-colors uppercase"
              >
                [01] PROBLEM
              </button>
              <button
                onClick={() => scrollToSection('system')}
                className="hover:text-[#DFFF00] transition-colors uppercase"
              >
                [02] SYSTEM
              </button>
              <button
                onClick={() => scrollToSection('vision')}
                className="hover:text-[#DFFF00] transition-colors uppercase"
              >
                [03] VISION
              </button>
              <button
                onClick={() => scrollToSection('pressure')}
                className="hover:text-[#DFFF00] transition-colors uppercase"
              >
                [04] PRESSURE
              </button>
              <button
                onClick={() => scrollToSection('fusion')}
                className="hover:text-[#DFFF00] transition-colors uppercase"
              >
                [05] FUSION
              </button>
              <button
                onClick={() => scrollToSection('hardware')}
                className="hover:text-[#DFFF00] transition-colors uppercase"
              >
                [08] HARDWARE
              </button>
            </nav>

            {/* Right CTA */}
            <button
              onClick={onOpenDashboard}
              data-cursor="cta"
              data-cursor-label="DASHBOARD →"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#DFFF00] hover:bg-[#c6e600] text-black font-bold text-xs font-mono-tech tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(223,255,0,0.3)] hover:shadow-[0_0_25px_rgba(223,255,0,0.6)]"
            >
              <span>TELEMETRY DASHBOARD</span>
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
