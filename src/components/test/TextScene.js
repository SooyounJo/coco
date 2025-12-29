import React, { useMemo } from 'react';
import { SplitText } from '@/components/ui/SplitText';
import { CanvasBackground } from '@/components/ui/BlobBackgroundV2Canvas';

const RECOMMENDATIONS = [
  '친구와 함께 먹기 좋은 식당을 추천해줘',
  '컨퍼런스를 관람하며 쉬기 좋은 곳을 추천해줘',
  'KPOP 관련 구경거리를 추천해줘',
  '데이트하기 좋은 행사 추천해줘',
  '홀로 방문하기 좋은 곳 추천해줘',
  '쇼핑하기 좋은 곳을 찾고 있어',
  '조용히 작업할 수 있는 카페를 찾고 있어',
  '즐길 거리가 많은 핫플레이스를 알려줘',
  '문화적인 경험을 할 수 있는 곳을 추천해줘',
  '트렌디한 음식점을 찾고 있어',
];

export default function TextScene() {
  const chips = useMemo(() => {
    const shuffled = [...RECOMMENDATIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-6" style={{ background: 'transparent' }}>
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'radial-gradient(circle at 30% 25%, #fdf0f6 0%, #fce6ef 45%, #f7d7e4 100%)'
        }}
      />
      <CanvasBackground boosted={false} phase="completed" popActive={true} />
      <div className="text-center w-full">
        <div className="flex justify-center">
          <SplitText text="안녕하세요! 이솔이에요" delay={0} duration={1.2} stagger={0.05} />
        </div>
        <div className="flex justify-center mt-2">
          <SplitText text="코엑스 안내를 도와드릴게요" delay={0.6} duration={1.2} stagger={0.05} />
        </div>
      </div>

      <div className="w-full max-w-xl mt-10">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
          }}
        >
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
    </div>
  );
}


