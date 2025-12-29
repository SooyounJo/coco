import React from 'react';
import { SplitWords } from '@/components/ui/SplitText';
import { CanvasBackground } from '@/components/ui/BlobBackgroundV2Canvas';

export default function EndSceneV1() {
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
            className="w-full touch-manipulation flex justify-center items-center ripple-wrapper"
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
          >
            <div className="ripple-core" />
            <div className="ripple-blur-dot" />
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
          pointer-events: none;
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
        .ripple-blur-dot {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 120px;
          height: 120px;
          border-radius: 9999px;
          background: rgba(135, 254, 200, 0.9);
          filter: blur(24px);
          z-index: 0;
          pointer-events: none;
        }
        .ripple-wave {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          --bwEnd: 1px;
          border: var(--bw, 3px) solid rgba(135, 254, 200, 0.45);
          transform: translate(-50%, -50%) scale(1.1);
          animation: rippleExpand 5.5s ease-out infinite;
          z-index: 3;
          pointer-events: none;
          filter: blur(var(--blur, 0.8px)) drop-shadow(0 0 10px rgba(135, 254, 200, 0.6));
        }
        .ripple-wave--d1 {
          animation-delay: 1.83s;
          --bw: 2px;
          --blur: 0.5px;
          --bwEnd: 0.8px;
        }
        .ripple-wave--d2 {
          animation-delay: 3.66s;
          --bw: 4px;
          --blur: 0.9px;
          --bwEnd: 1px;
        }
        .ripple-wave--d3 {
          animation-delay: 0.91s;
          --bw: 2.5px;
          --blur: 0.7px;
          --bwEnd: 0.8px;
        }
        .ripple-wave--d4 {
          animation-delay: 2.75s;
          --bw: 3.5px;
          --blur: 0.8px;
          --bwEnd: 0.9px;
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
      `}</style>
    </div>
  );
}


