/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';

export default function MicV4() {
  return (
    <button type="button" className="touch-manipulation mic-btn mic-btn--v4" title="음성 입력">
      <span className="mic-green-btn" aria-hidden />
      <span className="mic-glass-cap" aria-hidden />
      <svg className="w-6 h-6 mic-icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
        <path
          fillRule="evenodd"
          d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
          clipRule="evenodd"
        />
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

        /* Flat, blurry blue-green disc (no 3D) */
        .mic-green-btn {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          z-index: 0;
          pointer-events: none;
          /* slightly more blue-ish green (teal) */
          background: rgba(92, 238, 214, 0.82);
          filter: blur(6px);
          opacity: 0.95;
          box-shadow: 0 10px 26px rgba(255, 255, 255, 0.28);
        }

        /* Flat glass cap (no 3D highlight/shadow) */
        .mic-glass-cap {
          position: absolute;
          inset: 2px;
          border-radius: 999px;
          z-index: 1;
          pointer-events: none;
          background: rgba(255, 255, 255, 0.30);
          border: 1px solid rgba(255, 255, 255, 0.58);
          backdrop-filter: blur(16px) saturate(1.15);
          -webkit-backdrop-filter: blur(16px) saturate(1.15);
        }

        .mic-icon {
          position: relative;
          z-index: 2;
          /* slightly saturated purple-gray */
          color: rgba(92, 80, 120, 0.92);
          filter: drop-shadow(0 2px 10px rgba(142, 118, 198, 0.14));
        }
      `}</style>
    </button>
  );
}


