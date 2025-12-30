/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { TestBlobBackground } from '@/components/test/TestBlobBackground';
import AnimatedOutlineStroke from '@/components/ui/AnimatedOutlineStroke';
import MicV2 from '@/components/test/textscene/mic/V2';

/**
 * TEST2: cloned from TextIndexMirror but locked to Mic V2.
 * Use this scene to tweak the modal without touching /test/text.
 */
export default function Test2Scene() {
  const modalRef = useRef(null);
  const chipsWrapRef = useRef(null);
  const inputBarRef = useRef(null);
  const [visibleChipCount, setVisibleChipCount] = useState(3);
  const [chipsBehind, setChipsBehind] = useState(false);
  const [chipsBottomPx, setChipsBottomPx] = useState(0);
  const [chipAIdx, setChipAIdx] = useState(0);
  const [chipBIdx, setChipBIdx] = useState(1);
  const chipAIdxRef = useRef(0);
  const chipBIdxRef = useRef(1);
  const nextChipIdxRef = useRef(2);
  const [swapNonce, setSwapNonce] = useState(0);

  const message = useMemo(
    () => ({
      role: 'assistant',
      content: `넓고 차분한 분위기의 ‘테라로사(TERAROSA)'를 추천합니다.

커피가 맛있기로 유명하고, 비교적 조용한 분위기여서 노트북 작업하기 좋을거에요.`,
    }),
    []
  );

  const chips = useMemo(
    () => [
      '친구와 함께 먹기 좋은 식당을 추천해줘',
      '데이트하기 좋은 행사 추천해줘',
      '조용히 작업할 수 있는 카페를 찾고 있어',
    ],
    []
  );

  useEffect(() => {
    chipAIdxRef.current = chipAIdx;
  }, [chipAIdx]);
  useEffect(() => {
    chipBIdxRef.current = chipBIdx;
  }, [chipBIdx]);

  // When we are in the "2 chips" state, rotate the texts every 2s and move the blur slot down.
  useEffect(() => {
    if (!(visibleChipCount === 2)) return;

    // Initialize from current indices (safe for hot reload).
    if (nextChipIdxRef.current == null) nextChipIdxRef.current = 2;

    const t = window.setInterval(() => {
      // Slot rotation only: content shifts down (top -> bottom), new item enters bottom.
      const newTop = chipBIdxRef.current;
      const next = nextChipIdxRef.current % chips.length;
      nextChipIdxRef.current = (nextChipIdxRef.current + 1) % chips.length;

      setChipAIdx(newTop);
      setChipBIdx(next);
      setSwapNonce((n) => n + 1);
    }, 3000);

    return () => window.clearInterval(t);
  }, [visibleChipCount, chips.length]);

  // Reset to default ordering when we go back to 3 chips.
  useEffect(() => {
    if (visibleChipCount !== 3) return;
    setChipAIdx(0);
    setChipBIdx(1);
    nextChipIdxRef.current = 2;
    setSwapNonce(0);
  }, [visibleChipCount]);

  const recomputeOverlap = useCallback(() => {
    const modalEl = modalRef.current;
    const chipsEl = chipsWrapRef.current;
    if (!modalEl || !chipsEl) return;

    const modalRect = modalEl.getBoundingClientRect();
    const chipsRect = chipsEl.getBoundingClientRect();

    // If modal bottom crosses into the chips stack area, treat as overlap.
    // Small buffer so we pre-emptively reduce chip count before it visually collides.
    const buffer = 12;
    const isOverlapping = modalRect.bottom > chipsRect.top - buffer;

    // Two-step behavior (as requested):
    // 1) if overlapping with 3 chips -> reduce to 2 (no blur/behind yet)
    // 2) if still overlapping with 2 chips -> chips go BEHIND modal + blur/dim
    if (visibleChipCount === 3) {
      if (isOverlapping) {
        setVisibleChipCount(2);
        setChipsBehind(false);
        return;
      }
      setChipsBehind(false);
      return;
    }

    // visibleChipCount === 2
    if (isOverlapping) {
      setChipsBehind(true);
    } else {
      setChipsBehind(false);
      setVisibleChipCount(3);
    }
  }, [visibleChipCount]);

  const { headline, body } = useMemo(() => {
    const raw = (message?.content ?? '').trim();
    const marker = '추천합니다.';
    const idx = raw.indexOf(marker);
    if (idx >= 0) {
      const h = raw.slice(0, idx + marker.length).trim();
      const b = raw.slice(idx + marker.length).trim().replace(/^\n+/, '');
      return { headline: h, body: b };
    }
    const parts = raw.split(/\n\s*\n/);
    const h = (parts[0] ?? '').trim();
    const b = parts.slice(1).join('\n\n').trim();
    return { headline: h, body: b };
  }, [message]);

  // Dev-only: move the Next.js dev indicator ("N 1 Issue") up so it doesn't overlap the bottom input bar.
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const moveNextIndicatorUp = () => {
      try {
        const els = Array.from(document.querySelectorAll('button, a, div, span'));
        const target = els.find((el) => {
          const txt = (el.textContent || '').trim();
          if (!txt) return false;
          if (!(txt.includes('Issue') && txt.includes('N'))) return false;
          const cs = window.getComputedStyle(el);
          if (cs.position !== 'fixed') return false;
          const left = parseFloat(cs.left || '9999');
          const bottom = parseFloat(cs.bottom || '9999');
          return left <= 40 && bottom <= 40;
        });
        if (target) {
          target.style.transform = 'translateY(-96px)';
          target.style.zIndex = '9999';
        }
      } catch {
        // ignore
      }
    };

    const t1 = window.setTimeout(moveNextIndicatorUp, 50);
    const t2 = window.setTimeout(moveNextIndicatorUp, 350);
    const t3 = window.setTimeout(moveNextIndicatorUp, 1200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  // Auto-manage chip count (3 -> 2) when the modal overlaps chips due to resize.
  useLayoutEffect(() => {
    let raf = 0;

    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Keep chips positioned above the input bar with the same gap as the original layout.
        try {
          const inputRect = inputBarRef.current?.getBoundingClientRect();
          if (inputRect) {
            // Place the chips layer so its BOTTOM sits just above the input bar (gap ~= 16px).
            // bottom = viewportHeight - (inputTop - gap)
            const gap = 16;
            setChipsBottomPx(Math.round(window.innerHeight - inputRect.top + gap));
          }
        } catch {
          // ignore
        }
        recomputeOverlap();
      });
    };

    tick();

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(tick) : null;
    if (ro) {
      if (modalRef.current) ro.observe(modalRef.current);
      if (chipsWrapRef.current) ro.observe(chipsWrapRef.current);
      if (inputBarRef.current) ro.observe(inputBarRef.current);
      ro.observe(document.documentElement);
    }

    window.addEventListener('resize', tick, { passive: true });
    window.addEventListener('orientationchange', tick, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', tick);
      window.removeEventListener('orientationchange', tick);
      if (ro) ro.disconnect();
    };
  }, [recomputeOverlap]);

  return (
    <div className="min-h-screen flex flex-col safe-area-inset overscroll-contain relative v10-main-page">
      <TestBlobBackground phase="completed" popActive={true} boosted={false} groupY={0.66} zIndex={0} />

      <AnimatedLogo />

      <main className="relative flex-1 flex flex-col min-h-0 pb-32 pt-20" style={{ background: 'transparent' }}>
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-6 pb-4 space-y-4 overscroll-contain">
            <div className="relative">
              <div className="space-y-4" style={{ opacity: 1, transition: 'opacity 0.5s ease-in-out' }}>
                <div className="flex justify-center mb-4">
                  <div
                    className="assistant-glass-wrapper"
                    ref={modalRef}
                    style={{
                      width: 'min(360px, 92vw)',
                      margin: '0 auto 32px auto',
                      pointerEvents: 'none',
                      position: 'relative',
                      zIndex: 10,
                      paddingBottom: '32px',
                    }}
                  >
                    <AnimatedOutlineStroke borderRadius="clamp(32px, 10vw, 48px)">
                      <div className="assistant-glass-content">
                        <div className="assistant-glass-body">
                          <div className="assistant-headline">{headline}</div>
                          {body ? <div className="assistant-text">{body}</div> : null}

                          {/* Rectangle 91 image INSIDE modal */}
                          <div
                            style={{
                              width: '301px',
                              height: '260px',
                              borderRadius: '25px',
                              overflow: 'hidden',
                              border: '1px solid rgba(255, 255, 255, 0.65)',
                              boxShadow: '0 18px 36px rgba(22, 42, 58, 0.12)',
                              margin: '18px auto 0',
                              background: 'rgba(255, 255, 255, 0.08)',
                            }}
                          >
                            <img
                              src="/ter3.png"
                              alt="TERAROSA"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </AnimatedOutlineStroke>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* chips layer: can go behind modal when still overlapping after reducing to 2 */}
      <div
        className="fixed left-0 right-0 px-4"
        style={{
          bottom: `${chipsBottomPx}px`,
          zIndex: chipsBehind ? 8 : 32,
          pointerEvents: chipsBehind ? 'none' : 'auto',
        }}
      >
        <div
          ref={chipsWrapRef}
          className={chipsBehind ? 'chips-wrap chips-wrap--behind' : 'chips-wrap'}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}
        >
          {(visibleChipCount === 2 ? [chips[chipAIdx], chips[chipBIdx]] : chips.slice(0, 3)).map((text, idx) => (
            <button
              key={idx}
              type="button"
              className={`touch-manipulation active:scale-95 rounded-3xl outline outline-1 outline-offset-[-1px] outline-white chip-btn ${
                chipsBehind && idx === 0 ? 'chip-btn--fade' : ''
              }`}
              style={{
                display: 'inline-flex',
                padding: '8px 16px',
                justifyContent: 'center',
                alignItems: 'center',
                flex: '0 0 auto',
                cursor: 'default',
                background: 'linear-gradient(180deg,rgb(251, 255, 254) 0%, #F4E9F0 63.94%, #FFF 100%)',
              }}
            >
              <span
                key={`${idx}-${text}-${swapNonce}`}
                className="chip-label"
                style={{
                  '--dy': idx === 0 ? '-6px' : '-10px',
                  fontFamily: 'Pretendard Variable',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '190%',
                  letterSpacing: '-0.48px',
                  color: '#757575',
                  whiteSpace: 'nowrap',
                }}
              >
                {text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* input layer: always on top */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 safe-bottom">
        <div className="w-full">
          <div
            ref={inputBarRef}
            className="flex items-center"
            style={{
              borderRadius: '22px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.18) 100%)',
              border: '1px solid rgba(255,255,255,0.65)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.78), 0 16px 34px rgba(60,34,88,0.16)',
              backdropFilter: 'blur(28px) saturate(1.6)',
              WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
              overflow: 'hidden',
            }}
          >
            <input
              type="text"
              value=""
              onChange={() => {}}
              placeholder="Sori에게 말해주세요!"
              style={{
                color: '#878181',
                fontFamily: 'Pretendard Variable',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '150%',
                caretColor: '#FFF',
              }}
              className="flex-1 px-4 py-3 bg-transparent focus:outline-none placeholder-[#878181]"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              readOnly
            />
            <MicV2 />
          </div>
        </div>
      </div>

      <style jsx>{`
        .v10-main-page {
          background: transparent;
          font-family: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI',
            'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: geometricPrecision;
        }
        .v10-main-page::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          background: linear-gradient(
            180deg,
            transparent 0%,
            transparent 60%,
            rgba(0, 0, 0, 0.02) 80%,
            rgba(0, 0, 0, 0.05) 100%
          );
        }
        .assistant-glass-content {
          display: grid;
          gap: clamp(18px, 3.8vw, 26px);
          padding: clamp(24px, 5.6vw, 34px) clamp(20px, 5vw, 28px) clamp(24px, 5.6vw, 34px);
          border-radius: clamp(32px, 10vw, 48px);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.00) 0%,
            rgba(255, 255, 255, 0.00) 16.666%,
            rgba(255, 255, 255, 0.12) 30%,
            rgba(255, 255, 255, 0.38) 66%,
            rgba(255, 255, 255, 0.70) 100%
          );
          border: 0.5px solid rgba(255, 255, 255, 0.20);
          box-shadow: 0 28px 48px rgba(22, 42, 58, 0.10), inset 0 0.5px 0 rgba(255, 255, 255, 0.18),
            inset 0 -12px 36px rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(40px) saturate(0.9) brightness(1.04) contrast(0.96);
          -webkit-backdrop-filter: blur(40px) saturate(0.9) brightness(1.04) contrast(0.96);
          text-align: center;
          color: #1f2640;
          position: relative;
          overflow: hidden;
          pointer-events: auto;
        }

        .assistant-glass-body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .assistant-headline {
          color: #000;
          text-align: center;
          font-family: 'Pretendard Variable';
          font-size: 18px;
          font-weight: 400;
          line-height: 130%;
          letter-spacing: -0.72px;
          white-space: pre-wrap;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .assistant-text {
          color: #215F74;
          text-align: center;
          font-family: 'Pretendard Variable';
          font-size: 16px;
          font-weight: 400;
          line-height: 140%;
          letter-spacing: -0.64px;
          width: 86%;
          margin-left: auto;
          margin-right: auto;
          white-space: pre-wrap;
          word-break: keep-all;
          overflow-wrap: break-word;
        }

        .chips-wrap--behind {
          /* Chips are behind the modal (z-index handles it). Keep them readable; only the TOP chip fades. */
        }
        .chip-label {
          display: inline-block;
          will-change: transform, opacity;
          animation: chipSwapIn 520ms cubic-bezier(0.16, 1.0, 0.3, 1) both;
        }
        @keyframes chipSwapIn {
          0% {
            transform: translateY(var(--dy, -8px)) scale(0.985);
            opacity: 0.0;
          }
          60% {
            transform: translateY(1px) scale(1.035);
            opacity: 1;
          }
          100% {
            transform: translateY(0px) scale(1);
            opacity: 1;
          }
        }
        .chip-btn--fade {
          /* Only the top chip softens: lighter opacity + a touch of blur (no darkening) */
          opacity: 0.48;
          filter: blur(0.5px);
        }
      `}</style>
    </div>
  );
}


