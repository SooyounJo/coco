/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';

export default function MicV3() {
  // Reserved for future style experiments; for now keep the plain mic.
  return (
    <button type="button" className="touch-manipulation mic-btn mic-btn--v3" title="음성 입력">
      <span className="mic-green-disc" aria-hidden />
      <svg className="w-6 h-6 mic-icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
        <path
          fillRule="evenodd"
          d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
          clipRule="evenodd"
        />
      </svg>

      <style jsx>{`
        .mic-btn {
          padding: 12px 16px;
          background: transparent;
          border: 0;
          cursor: default;
          -webkit-tap-highlight-color: transparent;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
        }
        .mic-green-disc {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 56px;
          height: 56px;
          transform: translate(-50%, -50%);
          border-radius: 999px;
          z-index: 0;
          pointer-events: none;
          /* Flat, blurred green disc (same as V2) */
          background: rgba(110, 245, 185, 0.72);
          filter: blur(8px);
          opacity: 0.95;
          animation: discTint 3s ease-in-out infinite;
          will-change: background-color, opacity;
        }
        @keyframes discTint {
          0%,
          100% {
            background-color: rgba(110, 245, 185, 0.72); /* green */
            opacity: 0.92;
          }
          50% {
            background-color: rgba(185, 255, 228, 0.78); /* mint */
            opacity: 0.98;
          }
        }
        .mic-icon {
          /* low-sat purple-gray (keep similar brightness) */
          position: relative;
          z-index: 1;
          color: rgba(92, 80, 120, 0.92);
          transform-origin: 50% 60%;
          animation: micBreath 2.4s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes micBreath {
          0%,
          100% {
            transform: scale(0.96);
          }
          50% {
            transform: scale(1.08);
          }
        }
      `}</style>
    </button>
  );
}


