/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Inline clone of the index first screen (no local imports).
 * - InlineAnimatedLogo: copy of src/components/ui/AnimatedLogo.tsx (JS-ified)
 * - InlineAssistantBubble: static assistant glass bubble markup
 * - Bottom fixed bar + chips: copied from MainPageV1 styles
 * - Background: identical radial gradient + bottom shade overlay
 */

function InlineAnimatedLogo({ className = '' }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = (containerRef.current);
    if (!container) return;
    const logoHeight = 12;
    const containerHeight = 12;
    const holdDuration = 3000;
    const moveDuration = 2000;
    const cycleHeight = logoHeight * 2;
    const verticalOffset = 0;
    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let startTime = null;
    let animationFrameId;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000;
      const totalCycleDuration = (holdDuration * 2 + moveDuration * 2) / 1000;
      const cycleProgress = (elapsed % totalCycleDuration) * 1000;
      let translateY;
      if (cycleProgress < holdDuration) {
        translateY = verticalOffset;
      } else if (cycleProgress >= holdDuration && cycleProgress <= holdDuration + moveDuration) {
        const mp = Math.min((cycleProgress - holdDuration) / moveDuration, 1);
        const ep = easeInOutCubic(mp);
        translateY = verticalOffset - ep * logoHeight;
      } else if (cycleProgress > holdDuration + moveDuration && cycleProgress < holdDuration * 2 + moveDuration) {
        translateY = verticalOffset - logoHeight;
      } else {
        const mp = (cycleProgress - (holdDuration * 2 + moveDuration)) / moveDuration;
        const ep = easeInOutCubic(mp);
        translateY = verticalOffset - logoHeight - ep * logoHeight;
      }
      if (container) container.style.transform = `translateY(${translateY}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };
    container.style.transform = `translateY(${0}px)`;
    animationFrameId = requestAnimationFrame(animate);
    return () => { if (animationFrameId) cancelAnimationFrame(animationFrameId); };
  }, []);
  return (
    <div
      className={className}
      style={{
        width: '402px',
        height: '12px',
        padding: '0 15px',
        background: 'rgba(0,0,0,0.00)',
        flexShrink: 0,
        overflow: 'hidden',
        position: 'fixed',
        top: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        boxSizing: 'border-box',
        clipPath: 'inset(0)',
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          transition: 'none',
          willChange: 'transform',
          gap: 0,
          position: 'absolute',
          top: 0,
          left: '15px',
          right: '15px',
          width: 'calc(100% - 30px)',
          margin: 0,
          padding: 0,
          lineHeight: 0,
        }}
      >
        <div style={{ width: '100%', height: 12, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <img src="/sori_logo_v2.svg" alt="SORI" style={{ height: '12px' }} />
        </div>
        <div style={{ width: '100%', height: 12, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <img src="/Coex CI_White 2.svg" alt="COEX" style={{ height: '12px' }} />
        </div>
        <div style={{ width: '100%', height: 12, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <img src="/sori_logo_v2.svg" alt="SORI" style={{ height: '12px' }} />
        </div>
        <div style={{ width: '100%', height: 12, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <img src="/Coex CI_White 2.svg" alt="COEX" style={{ height: '12px' }} />
        </div>
      </div>
    </div>
  );
}

function InlineAssistantBubble() {
  return (
    <div className="assistant-glass-wrapper" style={{ width: 'min(360px, 92vw)', margin: '0 auto', position: 'relative', zIndex: 10 }}>
      <div className="assistant-glass-content">
        <div className="assistant-headline">가볍고 트렌디한 분위기를 원한다면 ‘카페마마스’는 어떠신가요?</div>
        <div className="assistant-text">
          리코타 치즈 샐러드와 청포도 주스로 유명해<br />
          친구들과 브런치를 즐기기에 딱 좋습니다.
        </div>
      </div>
      <style jsx>{`
        .assistant-glass-content {
          display: grid;
          gap: 18px;
          padding: 24px 20px 24px;
          border-radius: 32px;
          background: linear-gradient(180deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.00) 16.666%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.38) 66%, rgba(255,255,255,0.70) 100%);
          border: 0.5px solid rgba(255,255,255,0.20);
          box-shadow: 0 28px 48px rgba(22, 42, 58, 0.10), inset 0 0.5px 0 rgba(255,255,255,0.18), inset 0 -12px 36px rgba(255,255,255,0.05);
          backdrop-filter: blur(40px) saturate(0.9) brightness(1.04) contrast(0.96);
          -webkit-backdrop-filter: blur(40px) saturate(0.9) brightness(1.04) contrast(0.96);
          text-align: center;
          color: #1f2640;
          position: relative;
          overflow: hidden;
        }
        .assistant-glass-content::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 55%, rgba(255,255,255,0) 100%);
          mix-blend-mode: screen;
          opacity: 0.06;
          pointer-events: none;
          z-index: 1;
        }
        .assistant-headline {
          color: #000;
          text-align: center;
          font-family: 'Pretendard Variable';
          font-size: 18px;
          font-weight: 400;
          line-height: 130%;
          letter-spacing: -0.72px;
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
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

export default function TextTestPage() {
  return (
    <div className="v10-main-page" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background gradient identical to index */}
      <div
        className="bg-base"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: 'radial-gradient(circle at 30% 25%, #fdf0f6 0%, #fce6ef 45%, #f7d7e4 100%)',
        }}
      />

      {/* Top brand */}
      <InlineAnimatedLogo />

      {/* Content area */}
      <main className="content" style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '80px', paddingBottom: '128px', minHeight: '100vh' }}>
        <div style={{ height: 24 }} />
        <InlineAssistantBubble />
      </main>

      {/* Bottom chips + input */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-white/90 to-transparent backdrop-blur-sm safe-bottom">
        <div className="px-6 pb-8 pt-4">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
              {['친구와 함께 먹기 좋은 식당을 추천해줘', '데이트하기 좋은 행사 추천해줘', '조용히 작업할 수 있는 카페를 찾고 있어'].map((text, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="touch-manipulation active:scale-95 rounded-3xl outline outline-1 outline-offset-[-1px] outline-white"
                  style={{
                    display: 'inline-flex',
                    padding: '8px 16px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: '0 0 auto',
                    cursor: 'default',
                    background: 'linear-gradient(180deg, rgba(251,255,254,1) 0%, #F4E9F0 63.94%, #FFF 100%)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Pretendard Variable',
                      fontSize: '14px',
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
          <div
            className="flex items-center"
            style={{
              borderRadius: '22px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.18) 100%)',
              border: '1px solid rgba(255,255,255,0.65)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.78), 0 16px 34px rgba(60,34,88,0.16)',
              backdropFilter: 'blur(28px) saturate(1.6)',
              WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
            }}
          >
            <input
              type="text"
              value=""
              onChange={() => {}}
              placeholder="메시지 보내기..."
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
              readOnly
            />
            <button type="button" className="px-4 py-3" title="음성 입력">
              <svg className="w-5 h-5 text-[#878181]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* bottom shade overlay identical to index */}
      <style jsx>{`
        .v10-main-page { background: transparent; }
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
      `}</style>
    </div>
  );
}

