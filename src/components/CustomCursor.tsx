import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState<'default' | 'hover' | 'cta'>('default');
  const [ctaLabel, setCtaLabel] = useState('ENTER →');
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest('[data-cursor]');
      if (interactive) {
        const mode = interactive.getAttribute('data-cursor');
        const label = interactive.getAttribute('data-cursor-label');
        if (mode === 'cta') {
          setCursorMode('cta');
          if (label) setCtaLabel(label);
        } else if (mode === 'hover' || interactive.tagName === 'BUTTON' || interactive.tagName === 'A') {
          setCursorMode('hover');
        }
      } else if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setCursorMode('hover');
      } else {
        setCursorMode('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouch) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Primary Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#DFFF00] rounded-full mix-blend-difference pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#DFFF00]"
        animate={{
          x: position.x,
          y: position.y,
          scale: cursorMode === 'default' ? 1 : 0.5,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Outer Reticle HUD */}
      <motion.div
        className="fixed top-0 left-0 border border-[#DFFF00]/60 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: position.x,
          y: position.y,
          width: cursorMode === 'cta' ? 84 : cursorMode === 'hover' ? 52 : 32,
          height: cursorMode === 'cta' ? 84 : cursorMode === 'hover' ? 52 : 32,
          borderColor: cursorMode === 'cta' ? '#DFFF00' : 'rgba(223, 255, 0, 0.4)',
          backgroundColor: cursorMode === 'cta' ? 'rgba(9, 10, 12, 0.85)' : 'rgba(223, 255, 0, 0.03)',
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 220, mass: 0.2 }}
      >
        {/* Reticle Ticks */}
        {cursorMode !== 'default' && (
          <>
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-[2px] h-[4px] bg-[#DFFF00]" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[2px] h-[4px] bg-[#DFFF00]" />
            <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-[2px] w-[4px] bg-[#DFFF00]" />
            <span className="absolute -right-1 top-1/2 -translate-y-1/2 h-[2px] w-[4px] bg-[#DFFF00]" />
          </>
        )}

        {/* CTA Label inside cursor */}
        {cursorMode === 'cta' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-mono-tech tracking-wider text-[#DFFF00] font-bold text-center px-1"
          >
            {ctaLabel}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
