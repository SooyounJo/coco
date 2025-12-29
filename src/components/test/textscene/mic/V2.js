/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useId, useMemo } from 'react';

export default function MicV2() {
  const rawId = useId();
  const safeId = useMemo(() => String(rawId).replace(/[^a-zA-Z0-9_-]/g, ''), [rawId]);
  const clipId = `mic-clip-${safeId}`;
  const gradId = `mic-shine-grad-${safeId}`;
  const blurId = `mic-shine-blur-${safeId}`;

  return (
    <button type="button" className="touch-manipulation mic-btn mic-btn--v2" title="음성 입력">
      <span className="mic-green-disc" aria-hidden />
      <svg className="w-6 h-6 mic-icon" viewBox="0 0 20 20" aria-hidden>
        <defs>
          <clipPath id={clipId}>
            <path
              fillRule="evenodd"
              d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
              clipRule="evenodd"
            />
          </clipPath>
          {/* blurred magenta band (horizontal) */}
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EC2CA8" stopOpacity="0" />
            <stop offset="42%" stopColor="#EC2CA8" stopOpacity="0.38" />
            <stop offset="58%" stopColor="#EC2CA8" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#EC2CA8" stopOpacity="0" />
          </linearGradient>
          <filter id={blurId} x="-80%" y="-80%" width="260%" height="260%">
            {/* more "glow" */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.8" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* base icon */}
        <path
          className="mic-base"
          fillRule="evenodd"
          d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
          clipRule="evenodd"
        />

        {/* shine sweep (masked to icon shape) */}
        <g clipPath={`url(#${clipId})`} opacity="0.92">
          {/* rotate group so the band moves diagonally */}
          <g transform="rotate(-22 10 10)">
          <rect
            className="mic-shine"
            x="-40"
            y="3"
            width="38"
            height="14"
            fill={`url(#${gradId})`}
            filter={`url(#${blurId})`}
          >
            {/* mostly idle, then a diagonal "whoosh" once per ~3.6s */}
            <animate
              attributeName="x"
              values="-40; -40; 44; 44"
              keyTimes="0; 0.46; 0.82; 1"
              dur="3.6s"
              repeatCount="indefinite"
            />
          </rect>
          </g>
        </g>
      </svg>

      <style jsx>{`
        .mic-btn {
          padding: 12px 16px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 0;
          cursor: default;
          -webkit-tap-highlight-color: transparent;
          isolation: isolate;
        }
        .mic-green-disc {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 56px;
          height: 56px;
          transform: translate(-50%, -50%) scale(1);
          border-radius: 999px;
          z-index: 0;
          pointer-events: none;
          /* Flat, blurred green disc (no "3D" highlight/shadow) */
          background: rgba(135, 254, 200, 0.72);
          filter: blur(8px);
          opacity: 0.95;
          animation: greenBlobBreath 2.6s ease-in-out infinite;
          will-change: transform, opacity, filter;
        }
        @keyframes greenBlobBreath {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(0.92);
            opacity: 0.72;
            filter: blur(8px);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.06);
            opacity: 0.92;
            filter: blur(9px);
          }
        }
        .mic-icon {
          position: relative;
          z-index: 1;
          /* low-sat purple-gray (keep similar brightness) */
          color: rgba(92, 80, 120, 0.92);
          filter: drop-shadow(0 2px 8px rgba(142, 118, 198, 0.12));
        }
        .mic-base {
          fill: rgba(92, 80, 120, 0.92);
        }
        .mic-shine {
          opacity: 1;
        }
      `}</style>
    </button>
  );
}


