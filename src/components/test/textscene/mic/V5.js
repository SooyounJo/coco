/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { MiniBlobBadge } from '@/components/test/TestBlobBackground';

// V5: V4 placement, but swap the blue disc for V1's mini WebGL blob (no glass cap).
export default function MicV5() {
  return (
    <button type="button" className="touch-manipulation mic-btn mic-btn--v5" title="음성 입력">
      <span className="mic-mini-blob" aria-hidden>
        <MiniBlobBadge size={62} opacity={0.85} boost={0.34} paletteMix={0.02} />
      </span>
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

        .mic-mini-blob {
          position: absolute;
          left: 50%;
          top: calc(50% + 9px);
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: none;
          filter: blur(0.2px) saturate(1.28) hue-rotate(-10deg) brightness(1.04);
        }

        .mic-icon {
          position: relative;
          z-index: 1;
          color: rgba(92, 80, 120, 0.92);
          filter: drop-shadow(0 2px 10px rgba(142, 118, 198, 0.14));
        }
      `}</style>
    </button>
  );
}


