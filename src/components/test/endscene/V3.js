import React from 'react';
import { SplitWords } from '@/components/ui/SplitText';
import { CanvasBackground } from '@/components/ui/BlobBackgroundV2Canvas';

export default function EndSceneV3() {
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
            className="w-full touch-manipulation flex justify-center items-center"
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
            <span className="relative z-10">대화 요약 보러가기</span>
          </div>
        </div>
      </div>
    </div>
  );
}


