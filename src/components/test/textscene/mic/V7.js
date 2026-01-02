'use client';

import React from 'react';

// V7: solid deep-green button + white mic SVG (no WebGL blob, no png mask).
export default function MicV7() {
  return (
    <button type="button" className="touch-manipulation mic-btn mic-btn--v7" title="음성 입력">
      <span className="mic-white-glass" aria-hidden />

      <svg className="mic-svg" width="20" height="28" viewBox="0 0 20 28" fill="none" aria-hidden>
        <defs>
          {/* top = green, bottom = blue */}
          <linearGradient id="micGradV7" x1="10" y1="0" x2="10" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22E6B1" />
            <stop offset="55%" stopColor="#22E6B1" />
            <stop offset="100%" stopColor="#1F7BFF" />
          </linearGradient>
        </defs>
        <path d="M14 5C14 2.79086 12.2091 1 10 1C7.79086 1 6 2.79086 6 5" stroke="url(#micGradV7)" strokeWidth="2" />
        <path d="M6 12C6 14.2091 7.79086 16 10 16C12.2091 16 14 14.2091 14 12" stroke="url(#micGradV7)" strokeWidth="2" />
        <path
          d="M18.2551 16C16.9542 19.248 14.0187 21.5 10 21.5C4.47715 21.5 1 17.2467 1 12"
          stroke="url(#micGradV7)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line x1="10" y1="22" x2="10" y2="27" stroke="url(#micGradV7)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="19" cy="12" r="1" fill="url(#micGradV7)" />
        <rect x="5" y="5" width="2" height="7" fill="url(#micGradV7)" />
        <rect x="13" y="5" width="2" height="7" fill="url(#micGradV7)" />
      </svg>

      <style jsx>{`
        .mic-btn {
          width: 50px;
          height: 50px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 0;
          cursor: default;
          -webkit-tap-highlight-color: transparent;
          isolation: isolate;
          border-radius: 999px;
        }

        /* plain white glassmorphism button */
        .mic-white-glass {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          z-index: 0;
          pointer-events: none;
          background: rgba(255, 255, 255, 0.34);
          border: 1px solid rgba(255, 255, 255, 0.62);
          box-shadow: 0 18px 34px rgba(22, 42, 58, 0.10);
          backdrop-filter: blur(16px) saturate(1.15);
          -webkit-backdrop-filter: blur(16px) saturate(1.15);
        }

        .mic-svg {
          position: relative;
          z-index: 1;
          display: block;
          filter: drop-shadow(0 10px 18px rgba(31, 123, 255, 0.10));
          width: 20px;
          height: 28px;
        }
      `}</style>
    </button>
  );
}


