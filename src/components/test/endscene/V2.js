import React, { useState, useCallback } from 'react';
import { SplitWords } from '@/components/ui/SplitText';
import { CanvasBackground } from '@/components/ui/BlobBackgroundV2Canvas';

export default function EndSceneV2() {
  const [isPopping, setIsPopping] = useState(false);

  const triggerPop = useCallback((e) => {
    e?.preventDefault?.();
    // restartable animation: toggle off then on in next frame
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

      <div className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-white/90 to-transparent backdrop-blur-sm safe-bottom">
        <div className="px-6 pb-8 pt-4">
          <div
            className={`w-full touch-manipulation flex justify-center items-center ripple-wrapper ${isPopping ? 'is-popping' : ''}`}
            style={{
              height: '56px',
              borderRadius: '68px',
              color: '#000',
              textAlign: 'center',
              fontFamily: 'Pretendard Variable',
              fontSize: '16px',
              fontWeight: 700,
              lineHeight: '110%',
              letterSpacing: '-0.64px',
              position: 'relative',
              overflow: 'visible',
            }}
            onClick={triggerPop}
            onTouchStart={triggerPop}
          >
            {/* subtle, small blur behind the solid dot */}
            <div className="dot-soft-blur" />
            {/* Solid dot without blur */}
            <div className="solid-dot" />
            {/* Waves (keep same behavior) */}
            <div className="ripple-wave" />
            <div className="ripple-wave ripple-wave--d1" />
            <div className="ripple-wave ripple-wave--d2" />
            <div className="ripple-wave ripple-wave--d3" />
            <div className="ripple-wave ripple-wave--d4" />
            <span className="relative z-10">대화 요약 보러가기</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .ripple-wrapper {
          background: transparent;
          pointer-events: auto;
        }
        .dot-soft-blur {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 170px;
          height: 170px;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          z-index: 1;
          pointer-events: none;
          background: rgba(135, 254, 200, 0.42);
          filter: blur(20px);
        }
        .is-popping .solid-dot {
          animation: springPop 500ms cubic-bezier(0.2, 0.8, 0.2, 1.2);
        }
        .solid-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 130px;
          height: 130px;
          border-radius: 9999px;
          background: rgba(135, 254, 200, 0.8); /* lightened solid color */
          transform: translate(-50%, -50%);
          z-index: 2;
          box-shadow: none;
          filter: blur(0.6px);
        }
        .ripple-wave {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 130px;
          height: 130px;
          border-radius: 9999px;
          --bwEnd: 2px;
          border: var(--bw, 7px) solid rgba(135, 254, 200, 0.35);
          transform: translate(-50%, -50%) scale(1);
          animation: rippleExpand var(--dur, 10s) ease-out infinite;
          z-index: 3;
          pointer-events: none;
          filter: blur(var(--blur, 2px)) drop-shadow(0 0 10px rgba(135, 254, 200, 0.45));
        }
        .ripple-wave--d1 {
          animation-delay: 1.8s;
          --dur: 9.5s;
          --bw: 6px;
          --blur: 1.8px;
          --bwEnd: 2px;
        }
        .ripple-wave--d2 {
          animation-delay: 3.4s;
          --dur: 10.0s;
          --bw: 8px;
          --blur: 2.0px;
          --bwEnd: 2px;
        }
        .ripple-wave--d3 {
          animation-delay: 5.0s;
          --dur: 9.0s;
          --bw: 7px;
          --blur: 1.9px;
          --bwEnd: 2px;
        }
        .ripple-wave--d4 {
          animation-delay: 6.6s;
          --dur: 10.5s;
          --bw: 8px;
          --blur: 2.2px;
          --bwEnd: 2px;
        }
        @keyframes rippleExpand {
          0% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.7;
            border-width: var(--bw, 9px);
          }
          100% {
            transform: translate(-50%, -50%) scale(14);
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


