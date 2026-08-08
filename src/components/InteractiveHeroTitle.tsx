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

    // RAF Loop for letter spring physics
    const updatePhysics = () => {
      const fieldRadius = 220; // Proximity field radius in px
      const maxDisplacement = 12; // Max displacement in px

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
          const force = Math.pow(1 - dist / fieldRadius, 1.8);
          const velocityFactor = Math.min(1.8, 1 + mouseSpeed / 50);

          state.targetX = (dx / dist) * force * maxDisplacement * velocityFactor;
          state.targetY = (dy / dist) * force * maxDisplacement * velocityFactor;
          state.targetZ = 1 + force * 0.12; // Controlled scale
          state.targetRot = (dx / fieldRadius) * force * 8; // Subtle torque
          state.targetBrightness = 1 + force * 0.6; // Controlled metallic highlight
        } else {
          state.targetX = 0;
          state.targetY = 0;
          state.targetZ = 1;
          state.targetRot = 0;
          state.targetBrightness = 1;
        }

        // Spring interpolation
        const spring = 0.14;
        state.currentX += (state.targetX - state.currentX) * spring;
        state.currentY += (state.targetY - state.currentY) * spring;
        state.currentZ += (state.targetZ - state.currentZ) * spring;
        state.currentRot += (state.targetRot - state.currentRot) * spring;
        state.brightness += (state.targetBrightness - state.brightness) * spring;

        // GPU accelerated transform
        letterEl.style.transform = `translate3d(${state.currentX.toFixed(2)}px, ${state.currentY.toFixed(2)}px, 0px) scale(${state.currentZ.toFixed(3)}) rotate(${state.currentRot.toFixed(2)}deg)`;
        
        if (i >= 5) {
          // "AWARE" letters get electric lime highlight
          letterEl.style.color = `rgb(${Math.round(223 * state.brightness)}, 255, 0)`;
        } else {
          // "DRIVE" letters get off-white highlight
          const val = Math.min(255, Math.round(244 * state.brightness));
          letterEl.style.color = `rgb(${val}, ${val}, ${Math.min(255, val + 10)})`;
        }
      });

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
      className="relative select-none py-2 cursor-default w-full max-w-full overflow-hidden"
      data-cursor="hover"
    >
      {/* Enforced Single-Line DRIVEAWARE Heading */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.2rem] xl:text-[6.2rem] font-extrabold tracking-wider font-display uppercase leading-none flex flex-nowrap whitespace-nowrap justify-center lg:justify-start items-center">
        {titleText.split('').map((char, index) => (
          <span
            key={index}
            ref={(el) => (letterRefs.current[index] = el)}
            className={`inline-block transition-shadow duration-150 transform-gpu ${
              index >= 5 ? 'text-[#DFFF00] drop-shadow-[0_0_15px_rgba(223,255,0,0.3)]' : 'text-[#F4F5F7]'
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
