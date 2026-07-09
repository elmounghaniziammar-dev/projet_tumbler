import React from 'react';
import { motion } from 'motion/react';
import { ColorOption } from '../types';

interface SVGTumblerProps {
  productId: string;
  selectedColor: ColorOption;
  engravingText?: string;
  accessoryId?: string;
  className?: string;
  animate?: boolean;
}

export const SVGTumbler: React.FC<SVGTumblerProps> = ({
  productId,
  selectedColor,
  engravingText = '',
  accessoryId = '',
  className = 'w-64 h-64',
  animate = true,
}) => {
  const mainColor = selectedColor.imageColor;
  const shadowColor = selectedColor.accentHex;
  const rawHex = selectedColor.hex;

  // Render different tumbler designs depending on the product ID
  const renderTumbler = () => {
    switch (productId) {
      case 'aura-horizon':
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Soft lighting gradients */}
              <linearGradient id={`grad-body-${productId}-${rawHex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={mainColor} />
                <stop offset="35%" stopColor={rawHex} />
                <stop offset="70%" stopColor={mainColor} />
                <stop offset="100%" stopColor={shadowColor} />
              </linearGradient>

              <linearGradient id="grad-steel" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9CA3AF" />
                <stop offset="30%" stopColor="#E5E7EB" />
                <stop offset="70%" stopColor="#D1D5DB" />
                <stop offset="100%" stopColor="#4B5563" />
              </linearGradient>

              <linearGradient id="grad-lid" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.7)" />
                <stop offset="100%" stopColor="rgba(150,150,150,0.3)" />
              </linearGradient>

              <linearGradient id="grad-handle" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2E2E31" />
                <stop offset="50%" stopColor="#424246" />
                <stop offset="100%" stopColor="#1A1A1C" />
              </linearGradient>

              <clipPath id="engraving-clip">
                {/* Limits the laser engraving text inside the tumbler body width */}
                <path d="M120 180 L280 180 L250 380 L235 440 L165 440 L150 380 Z" />
              </clipPath>
            </defs>

            {/* Background platform shadow */}
            <ellipse cx="200" cy="455" rx="90" ry="12" fill="rgba(0,0,0,0.08)" />

            {/* Handle on the left */}
            <motion.path
              d="M125 210 C70 210 70 340 125 340 M123 235 C90 235 90 315 123 315"
              stroke="url(#grad-handle)"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={animate ? { x: -10, opacity: 0 } : false}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            {/* Handle attachment accents */}
            <rect x="115" y="222" width="16" height="12" rx="2" fill="#2E2E31" />
            <rect x="115" y="316" width="16" height="12" rx="2" fill="#2E2E31" />

            {/* Tumbler Body */}
            {/* Top Stainless Steel Rim */}
            <path d="M120 168 C120 162, 280 162, 280 168 L280 180 L120 180 Z" fill="url(#grad-steel)" />
            <ellipse cx="200" cy="168" rx="80" ry="6" fill="#F3F4F6" />

            {/* Colored Powder-Coated Outer Shell */}
            <motion.path
              d="M120 180 
                 L280 180 
                 C280 180, 275 310, 270 330
                 C265 350, 255 365, 250 380
                 L240 440
                 C238 448, 162 448, 160 440
                 L150 380
                 C145 365, 135 350, 130 330
                 C125 310, 120 180, 120 180 Z"
              fill={`url(#grad-body-${productId}-${rawHex})`}
              initial={animate ? { scaleY: 0.8, originY: 1 } : false}
              animate={{ scaleY: 1 }}
              transition={{ type: 'spring', stiffness: 80 }}
            />

            {/* Stainless Steel Bottom Band */}
            <path d="M160 440 L240 440 L236 452 C236 455, 164 455, 164 452 Z" fill="url(#grad-steel)" />
            <ellipse cx="200" cy="452" rx="36" ry="3" fill="#D1D5DB" />

            {/* Laser Engraving Text (Centered on Body) */}
            {engravingText && (
              <g clipPath="url(#engraving-clip)">
                <text
                  x="200"
                  y="280"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.35)"
                  fontFamily="JetBrains Mono, Courier, monospace"
                  fontSize="22"
                  fontWeight="600"
                  letterSpacing="0.15em"
                  transform="rotate(-90 200 280)"
                  className="uppercase pointer-events-none select-none mix-blend-overlay"
                >
                  {engravingText.slice(0, 16)}
                </text>
              </g>
            )}

            {/* Lid Design */}
            <ellipse cx="200" cy="168" rx="80" ry="6" fill="url(#grad-lid)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M121 168 C121 155, 279 155, 279 168 Z" fill="url(#grad-lid)" opacity="0.85" />
            
            {/* Top rotational slider piece */}
            <ellipse cx="200" cy="158" rx="35" ry="5" fill="#374151" />
            <rect x="188" y="152" width="24" height="10" rx="3" fill="#1F2937" />

            {/* Straw Accessory (Dynamic representation) */}
            {accessoryId !== 'acc-sip' && (
              <g>
                {/* Clear Tritan Straw bending outward */}
                <motion.path
                  d="M198 155 L198 80 C198 75, 205 70, 215 70 L225 70"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  initial={animate ? { scaleY: 0, originY: 1 } : false}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                />
                {/* Highlight inside straw */}
                <path d="M196 155 L196 82 C196 79, 202 75, 212 75 L225 75" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
                {/* Silicone soft-tip indicator if silicone protector selected */}
                {accessoryId === 'acc-silicone' && (
                  <path d="M213 70 L225 70" stroke="#0066FF" strokeWidth="11" strokeLinecap="round" />
                )}
              </g>
            )}

            {/* Protective Silicone boot visualization at bottom if selected */}
            {accessoryId === 'acc-silicone' && (
              <motion.path
                d="M152 390 L248 390 L240 440 C238 448, 162 448, 160 440 Z"
                fill="#0066FF"
                opacity="0.85"
                initial={animate ? { scaleY: 0, originY: 1 } : false}
                animate={{ scaleY: 1 }}
                transition={{ type: 'spring', damping: 15 }}
              />
            )}
          </svg>
        );

      case 'aura-nomad':
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`grad-body-${productId}-${rawHex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={mainColor} />
                <stop offset="35%" stopColor={rawHex} />
                <stop offset="70%" stopColor={mainColor} />
                <stop offset="100%" stopColor={shadowColor} />
              </linearGradient>
              <linearGradient id="grad-steel" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9CA3AF" />
                <stop offset="30%" stopColor="#E5E7EB" />
                <stop offset="70%" stopColor="#D1D5DB" />
                <stop offset="100%" stopColor="#4B5563" />
              </linearGradient>
              <clipPath id="engraving-clip-nomad">
                <path d="M140 180 L260 180 L245 440 L155 440 Z" />
              </clipPath>
            </defs>

            {/* Shadow */}
            <ellipse cx="200" cy="455" rx="75" ry="10" fill="rgba(0,0,0,0.08)" />

            {/* Stainless Steel Neck */}
            <path d="M155 155 L245 155 L245 170 L155 170 Z" fill="url(#grad-steel)" />

            {/* Nomad Body (Tall and Slender) */}
            <motion.path
              d="M155 170
                 L245 170
                 C245 170, 252 240, 250 310
                 C248 360, 243 410, 240 440
                 C238 446, 162 446, 160 440
                 C157 410, 152 360, 150 310
                 C148 240, 155 170, 155 170 Z"
              fill={`url(#grad-body-${productId}-${rawHex})`}
              initial={animate ? { scaleY: 0.8, originY: 1 } : false}
              animate={{ scaleY: 1 }}
              transition={{ type: 'spring', stiffness: 80 }}
            />

            {/* Base steel accent */}
            <path d="M160 440 L240 440 L238 448 C238 450, 162 450, 162 448 Z" fill="url(#grad-steel)" />

            {/* Engraving */}
            {engravingText && (
              <g clipPath="url(#engraving-clip-nomad)">
                <text
                  x="200"
                  y="290"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.32)"
                  fontFamily="JetBrains Mono, Courier, monospace"
                  fontSize="18"
                  fontWeight="600"
                  letterSpacing="0.18em"
                  transform="rotate(-90 200 290)"
                  className="uppercase pointer-events-none select-none mix-blend-overlay"
                >
                  {engravingText.slice(0, 16)}
                </text>
              </g>
            )}

            {/* Cap - Technical Loop Design */}
            <g>
              {/* Cap base black */}
              <path d="M152 125 L248 125 L244 155 L156 155 Z" fill="#2E2E31" />
              <ellipse cx="200" cy="125" rx="48" ry="4" fill="#424246" />

              {/* Loop strap on cap (Active feature) */}
              <motion.path
                d="M180 125 C180 75, 220 75, 220 125"
                stroke="#2E2E31"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
                initial={animate ? { scaleY: 0, originY: 1 } : false}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />
              <motion.path
                d="M180 125 C180 75, 220 75, 220 125"
                stroke={accessoryId === 'acc-filter' ? '#0066FF' : '#5A5A5D'}
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                initial={animate ? { scaleY: 0, originY: 1 } : false}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />

              {/* Sip nozzle toggle */}
              <rect x="194" y="115" width="12" height="10" rx="2" fill="#1F2937" />
            </g>
          </svg>
        );

      case 'aura-flow':
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`grad-body-${productId}-${rawHex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={mainColor} />
                <stop offset="35%" stopColor={rawHex} />
                <stop offset="70%" stopColor={mainColor} />
                <stop offset="100%" stopColor={shadowColor} />
              </linearGradient>
              <linearGradient id="grad-steel" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9CA3AF" />
                <stop offset="30%" stopColor="#E5E7EB" />
                <stop offset="70%" stopColor="#D1D5DB" />
                <stop offset="100%" stopColor="#4B5563" />
              </linearGradient>
              <clipPath id="engraving-clip-flow">
                <path d="M130 180 L270 180 L260 430 L140 430 Z" />
              </clipPath>
            </defs>

            {/* Shadow */}
            <ellipse cx="200" cy="455" rx="85" ry="11" fill="rgba(0,0,0,0.08)" />

            {/* Rim Steel */}
            <path d="M135 155 L265 155 L265 165 L135 165 Z" fill="url(#grad-steel)" />

            {/* Rugged Flow Body */}
            <motion.path
              d="M135 165
                 L265 165
                 L260 430
                 C259 444, 141 444, 140 430
                 Z"
              fill={`url(#grad-body-${productId}-${rawHex})`}
              initial={animate ? { scaleY: 0.8, originY: 1 } : false}
              animate={{ scaleY: 1 }}
              transition={{ type: 'spring', stiffness: 70 }}
            />

            {/* Base Ring Steel */}
            <path d="M140 430 L260 430 L257 442 C257 444, 143 444, 143 442 Z" fill="url(#grad-steel)" />

            {/* Grip Texture lines (Rugged Flow feature) */}
            <g opacity="0.15">
              <line x1="138" y1="220" x2="262" y2="220" stroke="white" strokeWidth="2" strokeDasharray="4,4" />
              <line x1="139" y1="230" x2="261" y2="230" stroke="white" strokeWidth="2" strokeDasharray="4,4" />
              <line x1="140" y1="240" x2="260" y2="240" stroke="white" strokeWidth="2" strokeDasharray="4,4" />
            </g>

            {/* Engraving */}
            {engravingText && (
              <g clipPath="url(#engraving-clip-flow)">
                <text
                  x="200"
                  y="300"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.3)"
                  fontFamily="JetBrains Mono, Courier, monospace"
                  fontSize="20"
                  fontWeight="600"
                  letterSpacing="0.2em"
                  transform="rotate(-90 200 300)"
                  className="uppercase pointer-events-none select-none mix-blend-overlay"
                >
                  {engravingText.slice(0, 16)}
                </text>
              </g>
            )}

            {/* Cap: Chug / Strap lid */}
            <g>
              <rect x="145" y="125" width="110" height="30" rx="4" fill="#1F2937" />
              <path d="M180 125 L180 100 L220 100 L220 125 Z" fill="#2E2E31" />
              <ellipse cx="200" cy="100" rx="20" ry="4" fill="#4B5563" />

              {/* Strap option */}
              {accessoryId === 'acc-strap' && (
                <motion.path
                  d="M220 112 C280 112, 280 190, 230 220"
                  stroke="#0066FF"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                  initial={animate ? { scale: 0.5, opacity: 0 } : false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </g>
          </svg>
        );

      case 'aura-pulse':
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`grad-body-${productId}-${rawHex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={mainColor} />
                <stop offset="35%" stopColor={rawHex} />
                <stop offset="70%" stopColor={mainColor} />
                <stop offset="100%" stopColor={shadowColor} />
              </linearGradient>
              <linearGradient id="grad-steel" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9CA3AF" />
                <stop offset="30%" stopColor="#E5E7EB" />
                <stop offset="70%" stopColor="#D1D5DB" />
                <stop offset="100%" stopColor="#4B5563" />
              </linearGradient>
              <linearGradient id="grad-lid" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.7)" />
                <stop offset="100%" stopColor="rgba(150,150,150,0.3)" />
              </linearGradient>
              <clipPath id="engraving-clip-pulse">
                <path d="M125 180 L275 180 L235 440 L165 440 Z" />
              </clipPath>
            </defs>

            {/* Shadow */}
            <ellipse cx="200" cy="455" rx="65" ry="9" fill="rgba(0,0,0,0.08)" />

            {/* Rim Steel */}
            <path d="M125 168 C125 162, 275 162, 275 168 L275 180 L125 180 Z" fill="url(#grad-steel)" />

            {/* Pulse Cup Body (Tapered) */}
            <motion.path
              d="M125 180
                 L275 180
                 L230 440
                 C228 446, 172 446, 170 440
                 L125 180 Z"
              fill={`url(#grad-body-${productId}-${rawHex})`}
              initial={animate ? { scaleY: 0.8, originY: 1 } : false}
              animate={{ scaleY: 1 }}
              transition={{ type: 'spring', stiffness: 90 }}
            />

            {/* Base Steel */}
            <path d="M170 440 L230 440 L226 448 C226 450, 174 450, 174 448 Z" fill="url(#grad-steel)" />

            {/* Engraving */}
            {engravingText && (
              <g clipPath="url(#engraving-clip-pulse)">
                <text
                  x="200"
                  y="290"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.3)"
                  fontFamily="JetBrains Mono, Courier, monospace"
                  fontSize="16"
                  fontWeight="600"
                  letterSpacing="0.15em"
                  transform="rotate(-90 200 290)"
                  className="uppercase pointer-events-none select-none mix-blend-overlay"
                >
                  {engravingText.slice(0, 12)}
                </text>
              </g>
            )}

            {/* Magnetic Lid */}
            <ellipse cx="200" cy="168" rx="75" ry="5" fill="url(#grad-lid)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M126 168 C126 156, 274 156, 274 168 Z" fill="url(#grad-lid)" opacity="0.85" />
            
            {/* Slide Magnet */}
            <rect x="180" y="152" width="40" height="8" rx="2" fill="#374151" />
            <rect x="192" y="148" width="16" height="6" rx="1.5" fill="#111827" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {renderTumbler()}
    </div>
  );
};
