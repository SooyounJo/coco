/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';

// V8: white mic SVG + blue/green-tinted glass button (inverse of V7).
export default function MicV8() {
  return (
    <button type="button" className="touch-manipulation mic-btn mic-btn--v8" title="음성 입력">
      <span className="mic-bluegreen-glass" aria-hidden />

      <svg className="mic-svg" width="24" height="34" viewBox="0 0 20 28" fill="none" aria-hidden>
        <path d="M14 5C14 2.79086 12.2091 1 10 1C7.79086 1 6 2.79086 6 5" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M6 12C6 14.2091 7.79086 16 10 16C12.2091 16 14 14.2091 14 12" stroke="#FFFFFF" strokeWidth="2" />
        <path
          d="M18.2551 16C16.9542 19.248 14.0187 21.5 10 21.5C4.47715 21.5 1 17.2467 1 12"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line x1="10" y1="22" x2="10" y2="27" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="19" cy="12" r="1" fill="#FFFFFF" />
        <rect x="5" y="5" width="2" height="7" fill="#FFFFFF" />
        <rect x="13" y="5" width="2" height="7" fill="#FFFFFF" />
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

        /* blue/green glass */
        .mic-bluegreen-glass {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          z-index: 0;
          pointer-events: none;
          /* punchier / more visible */
          background: linear-gradient(155deg, rgba(31, 123, 255, 0.48) 0%, rgba(34, 230, 177, 0.38) 100%);
          border: 1px solid rgba(255, 255, 255, 0.74);
          box-shadow:
            0 18px 34px rgba(22, 42, 58, 0.10),
            0 0 20px rgba(31, 123, 255, 0.18),
            0 0 18px rgba(34, 230, 177, 0.16);
          backdrop-filter: blur(16px) saturate(1.35);
          -webkit-backdrop-filter: blur(16px) saturate(1.35);
        }

        .mic-svg {
          position: relative;
          z-index: 1;
          display: block;
          filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.10));
        }
      `}</style>
    </button>
  );
}


