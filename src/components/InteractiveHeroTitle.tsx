import React, { useRef, useEffect, useState } from 'react';

export function InteractiveHeroTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const titleText = "DRIVEAWARE";

  // Track letters state with RAF physics loop for 60fps performance
  const physicsState = useRef(
    titleText.split('').map(() => ({
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
      currentZ: 1,
      targetZ: 1,
      currentRot: 0,
      targetRot: 0,
      brightness: 1,
      targetBrightness: 1
    }))
  );

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    let mouseX = -9999;
    let mouseY = -9999;
    let lastMouseX = -9999;
    let lastMouseY = -9999;
    let mouseSpeed = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const nowX = e.clientX;
      const nowY = e.clientY;

      if (lastMouseX !== -9999) {
        const dx = nowX - lastMouseX;
        const dy = nowY - lastMouseY;
        mouseSpeed = Math.sqrt(dx * dx + dy * dy);
      }

      mouseX = nowX;
      mouseY = nowY;
      lastMouseX = nowX;
      lastMouseY = nowY;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // RAF Loop for letter physics
    const updatePhysics = () => {
      const fieldRadius = 240; // Proximity field radius in px
      const maxDisplacement = 14; // Max displacement in px

      letterRefs.current.forEach((letterEl, i) => {
        if (!letterEl) return;
        const state = physicsState.current[i];
        const rect = letterEl.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;

        const dx = mouseX - letterCenterX;
        const dy = mouseY - letterCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < fieldRadius && mouseX !== -9999) {
          // Calculate force (1 at center, 0 at field edge)
          const force = Math.pow(1 - dist / fieldRadius, 1.8);
          // Velocity multiplier boost
          const velocityFactor = Math.min(2.0, 1 + mouseSpeed / 40);

          // Magnetic pull towards cursor with subtle torque
          state.targetX = (dx / dist) * force * maxDisplacement * velocityFactor;
          state.targetY = (dy / dist) * force * maxDisplacement * velocityFactor;
          state.targetZ = 1 + force * 0.18; // Depth zoom towards viewer
          state.targetRot = (dx / fieldRadius) * force * 12; // Subtle angle
          state.targetBrightness = 1 + force * 0.8; // Metallic highlight
        } else {
          // Return to rest
          state.targetX = 0;
          state.targetY = 0;
          state.targetZ = 1;
          state.targetRot = 0;
          state.targetBrightness = 1;
        }

        // Spring interpolation (smooth damping)
        const spring = 0.14;
        state.currentX += (state.targetX - state.currentX) * spring;
        state.currentY += (state.targetY - state.currentY) * spring;
        state.currentZ += (state.targetZ - state.currentZ) * spring;
        state.currentRot += (state.targetRot - state.currentRot) * spring;
        state.brightness += (state.targetBrightness - state.brightness) * spring;

        // Apply direct GPU transforms
        letterEl.style.transform = `translate3d(${state.currentX.toFixed(2)}px, ${state.currentY.toFixed(2)}px, 0px) scale(${state.currentZ.toFixed(3)}) rotate(${state.currentRot.toFixed(2)}deg)`;
        
        // Metallic highlight effect
        if (i >= 5) {
          // "AWARE" letters get lime accent highlight
          letterEl.style.color = `rgb(${Math.round(223 * state.brightness)}, 255, 0)`;
        } else {
          // "DRIVE" letters get metallic off-white highlight
          const val = Math.min(255, Math.round(244 * state.brightness));
          letterEl.style.color = `rgb(${val}, ${val}, ${Math.min(255, val + 10)})`;
        }
      });

      // Decay mouse speed
      mouseSpeed *= 0.88;
      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouch]);

  return (
    <div
      ref={containerRef}
      className="relative select-none py-4 cursor-default inline-block"
      data-cursor="hover"
    >
      <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[11rem] font-extrabold tracking-wider font-display uppercase leading-none flex flex-wrap justify-center items-center">
        {titleText.split('').map((char, index) => (
          <span
            key={index}
            ref={(el) => (letterRefs.current[index] = el)}
            className={`inline-block transition-shadow duration-150 transform-gpu ${
              index >= 5 ? 'text-[#DFFF00] drop-shadow-[0_0_20px_rgba(223,255,0,0.4)]' : 'text-[#F4F5F7]'
            }`}
            style={{
              willChange: 'transform, color',
              display: 'inline-block'
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
