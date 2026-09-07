import React, { useState } from 'react';

interface PowerGymLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const PowerGymLogo: React.FC<PowerGymLogoProps> = ({
  className = '',
  size = 'md',
  showText = true
}) => {
  const [imgError, setImgError] = useState(false);

  // Height and max width mapping for the official badge logo
  const heights = {
    sm: 'h-9',
    md: 'h-11 sm:h-12',
    lg: 'h-16 sm:h-20',
    xl: 'h-24 sm:h-28'
  };

  const currentHeight = heights[size] || heights.md;

  if (!imgError) {
    return (
      <div 
        className={`inline-flex items-center gap-2 select-none group cursor-pointer ${className}`} 
        title="POWER GYM - باور جيم (الشعار الرسمي)"
      >
        <img
          src="/powergym-logo.png"
          alt="Power Gym Logo"
          onError={() => setImgError(true)}
          className={`${currentHeight} w-auto object-contain rounded-xl drop-shadow-[0_4px_16px_rgba(34,197,94,0.3)] transition-transform duration-300 group-hover:scale-105`}
        />
        {showText && size !== 'sm' && (
          <div className="hidden xl:flex flex-col text-right">
            <span className="text-[13px] font-black tracking-tight text-white font-heading leading-tight">
              باور جيم
            </span>
            <span className="text-[9px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
              Official Club
            </span>
          </div>
        )}
      </div>
    );
  }

  // Fallback SVG representation
  const dimensions = {
    sm: { height: 38, width: 140 },
    md: { height: 50, width: 185 },
    lg: { height: 72, width: 260 },
    xl: { height: 100, width: 360 }
  };
  const dim = dimensions[size] || dimensions.md;

  return (
    <div className={`inline-flex items-center select-none ${className}`} title="POWER GYM - باور جيم">
      <svg
        viewBox="0 0 540 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: `${dim.height}px`, width: `${dim.width}px` }}
        className="transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_4px_12px_rgba(34,197,94,0.25)]"
      >
        <defs>
          <linearGradient id="pgGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="45%" stopColor="#22c55e" />
            <stop offset="85%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
          <linearGradient id="pgOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="40%" stopColor="#f97316" />
            <stop offset="85%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>
          <linearGradient id="pgOrangeHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="60%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          <filter id="logoShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.75" />
          </filter>
        </defs>

        <g filter="url(#logoShadow)">
          {/* LETTER P WITH LIGHTNING */}
          <path
            d="M 50 40 L 115 40 C 145 40, 160 55, 160 85 C 160 115, 142 135, 110 135 L 85 135 L 85 145 L 100 145 L 65 195 L 80 195 L 45 270 L 62 180 L 50 180 Z"
            fill="url(#pgGreenGrad)"
            stroke="#15803d"
            strokeWidth="2"
          />
          <path
            d="M 85 65 L 110 65 C 125 65, 132 75, 132 87 C 132 100, 125 110, 110 110 L 85 110 Z"
            fill="#171717"
            stroke="#15803d"
            strokeWidth="1.5"
          />
          <path
            d="M 65 52 L 105 52 C 125 52, 138 60, 138 85 L 85 85 Z"
            fill="url(#pgOrangeHighlight)"
            opacity="0.9"
          />

          {/* LETTER O WITH BICEP */}
          <path
            d="M 230 40 C 275 40, 310 75, 310 120 C 310 165, 275 200, 230 200 C 185 200, 150 165, 150 120 C 150 75, 185 40, 230 40 Z"
            fill="url(#pgGreenGrad)"
            stroke="#15803d"
            strokeWidth="2"
          />
          <circle cx="230" cy="120" r="62" fill="#171717" />
          <circle cx="230" cy="120" r="58" fill="url(#pgOrangeGrad)" />
          <path
            d="M 175 160 Q 230 148 285 160 L 295 170 Q 230 160 165 170 Z"
            fill="#22c55e"
            opacity="0.9"
          />

          {/* LETTERS WER */}
          <g transform="translate(10, 0)">
            <path
              d="M 315 160 L 338 215 L 360 160 L 382 215 L 405 160 L 430 160 L 395 240 L 372 188 L 350 240 L 315 160 Z"
              fill="url(#pgOrangeGrad)"
              stroke="#9a3412"
              strokeWidth="1.5"
            />
            <path
              d="M 425 160 L 485 160 L 480 182 L 452 182 L 449 198 L 478 198 L 473 220 L 445 220 L 441 240 L 472 240 L 467 262 L 405 262 Z"
              fill="url(#pgOrangeGrad)"
              stroke="#9a3412"
              strokeWidth="1.5"
            />
            <path
              d="M 480 160 L 530 160 C 555 160, 565 175, 560 195 C 556 212, 542 222, 525 225 L 545 262 L 518 262 L 502 228 L 495 228 L 490 262 L 465 262 Z"
              fill="url(#pgOrangeGrad)"
              stroke="#9a3412"
              strokeWidth="1.5"
            />
          </g>

          {/* WORD GYM */}
          <g transform="translate(285, 225)">
            <text
              x="0"
              y="38"
              fontFamily="Impact, sans-serif"
              fontStyle="italic"
              fontWeight="900"
              fontSize="48"
              letterSpacing="2"
              fill="url(#pgOrangeGrad)"
              stroke="#7c2d12"
              strokeWidth="1"
            >
              GYM
            </text>
          </g>

          {/* DUAL SPEED STRIPES */}
          <rect x="90" y="232" width="180" height="9" rx="4.5" fill="url(#pgOrangeGrad)" />
          <rect x="90" y="248" width="180" height="9" rx="4.5" fill="url(#pgGreenGrad)" />
        </g>
      </svg>
    </div>
  );
};
