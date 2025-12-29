import React, { useMemo } from 'react';
import { SplitText } from '@/components/ui/SplitText';
import { CanvasBackground } from '@/components/ui/BlobBackgroundV2Canvas';
import { ChatBubble } from '@/components/ChatBubble';
import AnimatedLogo from '@/components/ui/AnimatedLogo';

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
    <div className="min-h-screen flex flex-col items-center justify-start relative px-6" style={{ background: 'transparent' }}>
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'radial-gradient(circle at 30% 25%, #fdf0f6 0%, #fce6ef 45%, #f7d7e4 100%)'
        }}
      />
      <CanvasBackground boosted={false} phase="completed" popActive={true} />
      {/* Top animated brand just like index */}
      <AnimatedLogo />

      {/* assistant bubble identical to index (using ChatBubble component) */}
      <div className="w-full" style={{ maxWidth: '360px', position: 'relative', zIndex: 10, marginTop: '64px' }}>
        {(() => {
          const message = {
            role: 'assistant',
            content:
              '가볍고 트렌디한 분위기를 원한다면 \'카페마마스\'는 어떠신가요?\n\n리코타 치즈 샐러드와 청포도 주스로 유명해 친구들과 브런치를 즐기기에 딱 좋습니다.',
          };
          return <ChatBubble message={message} typewriterVariant="v1" glassStyleVariant="v2" />;
        })()}
      </div>

      {/* bottom area: recommendation chips + input, same structure as index */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-white/90 to-transparent backdrop-blur-sm safe-bottom">
        <div className="px-6 pb-8 pt-4">
          <div style={{ marginBottom: '16px' }}>
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
                    background:
                      'linear-gradient(180deg,rgb(251, 255, 254) 0%, #F4E9F0 63.94%, #FFF 100%)',
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
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.18) 100%)',
              border: '1px solid rgba(255,255,255,0.65)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.78), 0 16px 34px rgba(60,34,88,0.16)',
              backdropFilter: 'blur(28px) saturate(1.6)',
              WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
            }}
          >
            <input
              type="text"
              value=""
              onChange={() => {}}
              placeholder="메시지 보내기..."
              disabled={false}
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
            <button
              type="button"
              className="px-4 py-3 touch-manipulation"
              title="음성 입력"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
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
    </div>
  );
}


