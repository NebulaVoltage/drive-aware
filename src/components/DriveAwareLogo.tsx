import React from 'react';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function DriveAwareLogoMark({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      className={`${className} shrink-0`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer D-A Monogram in Crisp Off-White */}
      <path
        d="M 14 12 H 52 L 70 38 L 52 68 H 14 Z"
        fill="none"
        stroke="#F4F5F7"
        strokeWidth="6.5"
        strokeLinejoin="miter"
        strokeMiterlimit="3"
      />

      {/* Interlocking Diagonal & Inner D-A Structure */}
      <path
        d="M 14 68 L 54 12 M 14 12 V 68 M 32 40 H 68"
        stroke="#F4F5F7"
        strokeWidth="6.5"
        strokeLinecap="square"
      />

      {/* Vision Radar / Camera Beam Cone (Electric Lime) */}
      <polygon points="46,40 88,18 88,62" fill="#DFFF00" opacity="0.95" />

      {/* Center Optical Iris Lens Pupil */}
      <circle cx="46" cy="40" r="5" fill="#090A0C" stroke="#DFFF00" strokeWidth="2.5" />
      <circle cx="46" cy="40" r="2" fill="#DFFF00" />
    </svg>
  );
}

export function DriveAwareFullLogo({ className = "h-8 w-auto" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      <DriveAwareLogoMark className="h-7 sm:h-8 w-auto" />
      <span className="text-base sm:text-lg font-extrabold tracking-wider uppercase font-display text-[#F4F5F7] whitespace-nowrap">
        DRIVE<span className="text-[#DFFF00] drop-shadow-[0_0_12px_rgba(223,255,0,0.3)]">AWARE</span>
      </span>
    </div>
  );
}
