import React, { useCallback, useState } from 'react';
import { SplitWords } from '@/components/ui/SplitText';
import { CanvasBackground } from '@/components/ui/BlobBackgroundV2Canvas';

export default function EndSceneV4() {
  const [isPopping, setIsPopping] = useState(false);
  const triggerPop = useCallback((e) => {
    e?.preventDefault?.();
    setIsPopping(false);
    requestAnimationFrame(() => {
      setIsPopping(true);
      setTimeout(() => setIsPopping(false), 500);
    });
  }, []);
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'radial-gradient(circle at 30% 25%, #fdf0f6 0%, #fce6ef 45%, #f7d7e4 100%)'
        }}
      />
      <CanvasBackground boosted={false} phase="completed" popActive={true} />

      {/* Dot placed just above the bottom CTA text */}
      <div className="cta-dot-layer" aria-hidden>
        <div className={`cta-dot-wrapper ${isPopping ? 'is-popping' : ''}`}>
          <div className="ripple-core" />
          <div className="ripple-blur-dot" />
          <div className="ripple-wave" />
          <div className="ripple-wave ripple-wave--d1" />
          <div className="ripple-wave ripple-wave--d2" />
          <div className="ripple-wave ripple-wave--d3" />
          <div className="ripple-wave ripple-wave--d4" />
        </div>
      </div>
      <div className="bottom-touch-area" onClick={triggerPop} onTouchStart={triggerPop} />

      {/* Text block (stays around center) */}
      <div
        style={{
          fontFamily: 'Pretendard Variable',
          fontSize: '22px',
          fontWeight: 400,
          color: '#000',
          textAlign: 'center',
          lineHeight: '140%',
          letterSpacing: '-0.88px',
          marginBottom: '40px',
          padding: '0 24px',
          whiteSpace: 'pre-line',
          position: 'relative',
          zIndex: 20,
          marginTop: '0'
        }}
      >
        <div>
          <SplitWords
            text="오늘의 대화가 모두 끝났어요."
            delay={0}
            duration={1.2}
            stagger={0.05}
            animation="fadeIn"
          />
        </div>
        <div>
          <SplitWords
            text="제가 안내한 내용을 정리해드릴게요."
            delay={0}
            duration={1.2}
            stagger={0.05}
            animation="fadeIn"
          />
        </div>
      </div>

      {/* Bottom CTA text (plain text, not a button) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-white/90 to-transparent backdrop-blur-sm safe-bottom">
        <div className="px-6 pb-8 pt-4 text-center">
          <span
            style={{
              height: '56px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 24px',
              borderRadius: '68px',
              color: '#000',
              textAlign: 'center',
              fontFamily: 'Pretendard Variable',
              fontSize: '16px',
              fontWeight: 700,
              lineHeight: '110%',
              letterSpacing: '-0.64px',
            }}
          >
            대화 요약 보러가기
          </span>
        </div>
      </div>

      <style jsx>{`
        .bottom-touch-area {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          height: 25vh;
          z-index: 40;
          background: transparent;
        }
        .cta-dot-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 15;
        }
        .cta-dot-wrapper {
          position: absolute;
          left: 50%;
          bottom: 120px; /* place dot just above CTA text area */
          transform: translate(-50%, 50%);
        }
        .ripple-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          background: rgba(135, 254, 200, 1);
          transform: translate(-50%, -50%);
          z-index: 2;
          box-shadow: 0 0 14px rgba(135, 254, 200, 0.95), 0 0 36px rgba(135, 254, 200, 0.6);
        }
        .is-popping .ripple-core {
          animation: springPop 500ms cubic-bezier(0.2, 0.8, 0.2, 1.2);
        }
        .ripple-blur-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 120px;
          height: 120px;
          border-radius: 9999px;
          background: rgba(135, 254, 200, 0.18);
          filter: blur(24px);
          transform: translate(-50%, -50%);
          z-index: 0;
        }
        .ripple-wave {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          --bwEnd: 1.5px;
          border: var(--bw, 6px) solid rgba(135, 254, 200, 0.42);
          transform: translate(-50%, -50%) scale(1.1);
          animation: rippleExpand 5.5s ease-out infinite;
          z-index: 3;
          filter: blur(var(--blur, 1.2px)) drop-shadow(0 0 10px rgba(135, 254, 200, 0.55));
        }
        .ripple-wave--d1 {
          animation-delay: 1.83s;
          --bw: 5px;
          --blur: 1px;
          --bwEnd: 1.2px;
        }
        .ripple-wave--d2 {
          animation-delay: 3.66s;
          --bw: 9px;   /* thicker variant */
          --blur: 1.4px;
          --bwEnd: 1.3px;
        }
        .ripple-wave--d3 {
          animation-delay: 0.91s;
          --bw: 7px;
          --blur: 1.2px;
          --bwEnd: 1.2px;
        }
        .ripple-wave--d4 {
          animation-delay: 2.75s;
          --bw: 11px;  /* thickest variant */
          --blur: 1.5px;
          --bwEnd: 1.4px;
        }
        @keyframes rippleExpand {
          0% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.7;
            border-width: var(--bw, 3px);
          }
          100% {
            transform: translate(-50%, -50%) scale(12);
            opacity: 0;
            border-width: var(--bwEnd, 1px);
          }
        }
        @keyframes springPop {
          0% { transform: translate(-50%, -50%) scale(1); }
          40% { transform: translate(-50%, -50%) scale(1.12); }
          65% { transform: translate(-50%, -50%) scale(0.98); }
          85% { transform: translate(-50%, -50%) scale(1.04); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
}


