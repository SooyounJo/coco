/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { MiniBlobBadge } from '@/components/test/TestBlobBackground';

// V6: V5 blob background + custom mic icon built from the provided CSS spec.
export default function MicV6() {
  return (
    <button type="button" className="touch-manipulation mic-btn mic-btn--v6" title="음성 입력">
      <span className="mic-mini-blob" aria-hidden>
        <MiniBlobBadge size={62} opacity={0.85} boost={0.34} paletteMix={0.02} />
      </span>

      <svg className="mic-svg" width="20" height="28" viewBox="0 0 20 28" fill="none" aria-hidden>
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

        .mic-mini-blob {
          position: absolute;
          left: 50%;
          top: calc(50% + 9px);
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: none;
          filter: blur(0.2px) saturate(1.28) hue-rotate(-10deg) brightness(1.04);
        }

        .mic-svg {
          position: relative;
          width: 20px;
          height: 28px;
          z-index: 1;
          display: block;
        }
      `}</style>
    </button>
  );
}


