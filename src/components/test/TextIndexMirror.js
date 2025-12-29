/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useMemo } from 'react';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { TestBlobBackground } from '@/components/test/TestBlobBackground';
import AnimatedOutlineStroke from '@/components/ui/AnimatedOutlineStroke';

export default function TextIndexMirror() {
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
    const parts = raw.split(/\n\s*\n/);
    const h = (parts[0] ?? '').trim();
    const b = parts.slice(1).join('\n\n').trim();
    return { headline: h, body: b };
  }, [message]);

  return (
    <div className="min-h-screen flex flex-col safe-area-inset overscroll-contain relative v10-main-page">
      {/* Test-only blob: copied renderer with stable framing */}
      <TestBlobBackground phase="completed" popActive={true} boosted={false} groupY={0.66} zIndex={0} />

      {/* (moved) Rectangle 91 placeholder is now inside the text modal */}

      {/* (removed) CanvasBackground: replaced by TestBlobBackground above */}

      {/* index top brand */}
      <AnimatedLogo />

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
        <div className="w-full">
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
              {chips.map((text, idx) => (
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
              spellCheck="false"
              readOnly
            />
            <button type="button" className="px-4 py-3 touch-manipulation" title="음성 입력">
              <svg className="w-5 h-5 text-[#878181]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .v10-main-page {
          background: transparent;
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
          filter: saturate(0.92);
          text-align: center;
          color: #1f2640;
          position: relative;
          overflow: hidden;
          pointer-events: auto;
        }

        .assistant-glass-body {
          position: relative;
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
      `}</style>
    </div>
  );
}


