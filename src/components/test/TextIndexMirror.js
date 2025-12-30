/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { TestBlobBackground } from '@/components/test/TestBlobBackground';
import AnimatedOutlineStroke from '@/components/ui/AnimatedOutlineStroke';
import MicV1 from '@/components/test/textscene/mic/V1';
import MicV2 from '@/components/test/textscene/mic/V2';
import MicV3 from '@/components/test/textscene/mic/V3';
import MicV4 from '@/components/test/textscene/mic/V4';
import MicV5 from '@/components/test/textscene/mic/V5';
import MicV6 from '@/components/test/textscene/mic/V6';
import MicV7 from '@/components/test/textscene/mic/V7';
import MicV8 from '@/components/test/textscene/mic/V8';
import MicV9 from '@/components/test/textscene/mic/V9';

export default function TextIndexMirror() {
  const [micVariant, setMicVariant] = useState('v1');
  const bottomAreaRef = useRef(null);
  const thirdChipRef = useRef(null);
  const micSideRef = useRef(null);
  const [micSideTop, setMicSideTop] = useState(null);
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

  // V3~V8: right-side mic aligned to the 3rd suggestion chip's Y.
  // V9: must live INSIDE the input container (user request).
  const isMicSideVariant = useMemo(() => ['v3', 'v4', 'v5', 'v6', 'v7', 'v8'].includes(micVariant), [micVariant]);

  const renderMicForVariant = useCallback(() => {
    switch (micVariant) {
      case 'v1':
        return <MicV1 />;
      case 'v2':
        return <MicV2 />;
      case 'v3':
        return <MicV3 />;
      case 'v4':
        return <MicV4 />;
      case 'v5':
        return <MicV5 />;
      case 'v6':
        return <MicV6 />;
      case 'v7':
        return <MicV7 />;
      case 'v8':
        return <MicV8 />;
      case 'v9':
        return <MicV9 />;
      default:
        return <MicV1 />;
    }
  }, [micVariant]);

  const recomputeMicSideTop = useCallback(() => {
    if (!isMicSideVariant) return;
    const bottomEl = bottomAreaRef.current;
    const chipEl = thirdChipRef.current;
    const micEl = micSideRef.current;
    if (!bottomEl || !chipEl || !micEl) return;

    const bottomRect = bottomEl.getBoundingClientRect();
    const chipRect = chipEl.getBoundingClientRect();
    const micRect = micEl.getBoundingClientRect();

    // Align mic button center Y to the 3rd chip center Y, within the bottom area coordinate space.
    const targetTop = chipRect.top - bottomRect.top + (chipRect.height - micRect.height) / 2;
    setMicSideTop(targetTop);
  }, [isMicSideVariant]);

  useLayoutEffect(() => {
    let raf = 0;
    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        recomputeMicSideTop();
      });
    };

    // Recompute after mount + variant change
    tick();

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(tick) : null;
    if (ro) {
      if (bottomAreaRef.current) ro.observe(bottomAreaRef.current);
      if (thirdChipRef.current) ro.observe(thirdChipRef.current);
      if (micSideRef.current) ro.observe(micSideRef.current);
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
  }, [recomputeMicSideTop, micVariant]);

  return (
    <div className="min-h-screen flex flex-col safe-area-inset overscroll-contain relative v10-main-page">
      {/* Test-only blob: copied renderer with stable framing */}
      <TestBlobBackground phase="completed" popActive={true} boosted={false} groupY={0.66} zIndex={0} />

      {/* (moved) Rectangle 91 placeholder is now inside the text modal */}

      {/* (removed) CanvasBackground: replaced by TestBlobBackground above */}

      {/* index top brand */}
      <AnimatedLogo />

      {/* mic variant toggle (test only) */}
      <div className="fixed z-40" style={{ top: 10, left: 10, right: 10 }}>
        <div
          style={{
            display: 'inline-flex',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            gap: 4,
            padding: 4,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(255,255,255,0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            width: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9'].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setMicVariant(v)}
              className="touch-manipulation"
              style={{
                padding: '3px 6px',
                borderRadius: 999,
                fontFamily: 'Pretendard Variable',
                fontSize: 10,
                fontWeight: 700,
                color: micVariant === v ? '#000' : '#6b7280',
                background: micVariant === v ? 'rgba(255,255,255,0.85)' : 'transparent',
                lineHeight: 1.1,
              }}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* index main layout */}
      <main className="relative flex-1 flex flex-col min-h-0 pb-32 pt-20" style={{ background: 'transparent' }}>
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-6 pb-4 space-y-4 overscroll-contain">
            <div className="relative">
              <div className="space-y-4" style={{ opacity: 1, transition: 'opacity 0.5s ease-in-out' }}>
                <div className="flex justify-center mb-4">
                  <div
                    className="assistant-glass-wrapper"
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

      {/* bottom area copied from MainPageV1 layout */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 safe-bottom">
        <div className="w-full" ref={bottomAreaRef} style={{ position: 'relative' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
              {chips.map((text, idx) => (
                <button
                  key={idx}
                  type="button"
                  ref={idx === 2 ? thirdChipRef : undefined}
                  className="touch-manipulation active:scale-95 rounded-3xl outline outline-1 outline-offset-[-1px] outline-white"
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
                    style={{
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

          {/* v3~v9: right-side mic aligned to 3rd chip's Y */}
          {isMicSideVariant ? (
            <div
              ref={micSideRef}
              className="mic-side"
              style={{
                position: 'absolute',
                right: 4,
                top: micSideTop ?? 0,
                zIndex: 60,
                pointerEvents: 'auto',
              }}
              aria-hidden
            >
              {renderMicForVariant()}
            </div>
          ) : null}

          <div className={micVariant === 'v4' ? 'input-wrap input-wrap--v4' : 'input-wrap'}>
            <div
              className="flex items-center input-bar"
              style={{
                borderRadius: micVariant === 'v9' ? '999px' : '22px',
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
              {isMicSideVariant ? null : renderMicForVariant()}
            </div>
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
          /* Avoid applying filter on the container (can make text look jagged/blurry on some GPUs) */
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
          gap: 14px; /* ensures visible paragraph spacing between headline and body */
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

        /* background is handled by TestBlobBackground */

        .input-wrap {
          position: relative;
        }

        /* Mic variants are now separate components (V1~V9) */
      `}</style>
    </div>
  );
}


