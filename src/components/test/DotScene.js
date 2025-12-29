import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CanvasBackground } from '@/components/ui/BlobBackgroundV2Canvas';

const KEYWORDS = [
  '오늘 날씨',
  '코엑스 행사',
  '코엑스 전시장',
  '코엑스 방문',
  '인사말',
  '아트 프로젝트',
  '쇼핑',
  '카페',
];

export default function DotScene() {
  const keywords = useMemo(() => KEYWORDS.slice(0, 6), []);
  const [offsets, setOffsets] = useState([]);

  useEffect(() => {
    if (keywords.length === 0) return;
    let rafId = 0;
    const start = Date.now();

    const loop = () => {
      const elapsed = (Date.now() - start) / 1000;
      const next = keywords.map((_, i) => {
        const speed = 0.5 + i * 0.15;
        const phase = i * 0.5;
        const max = 4 + (i % 3) * 1.5;
        return Math.sin(elapsed * speed + phase) * max;
      });
      setOffsets(next);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [keywords.length]);

  const getZigZagPosition = (idx) => {
    const row = Math.floor(idx / 2);
    const col = idx % 2;
    const startTop = 15; // vh
    const leftA = 25; // %
    const leftB = 75; // %
    const vgap = 18; // vh
    const isEvenRow = row % 2 === 0;
    const isRightColumn = isEvenRow ? col === 1 : col === 0;
    const rightColumnOffset = isRightColumn ? 9 : 0;
    const leftPercent = isEvenRow ? (col === 0 ? leftA : leftB) : (col === 0 ? leftB : leftA);
    return {
      topPercent: startTop + row * vgap + rightColumnOffset,
      leftPercent,
    };
  };

  const widthScale =
    typeof window !== 'undefined' && window.innerWidth < 400
      ? Math.max(0.7, window.innerWidth / 400)
      : 1;

  const baseSize = 120;
  const ellipseSize = baseSize * 1.2 * widthScale;
  const padding = Math.max(8, ellipseSize * 0.25);

  return (
    <div className="fixed inset-0" style={{ background: 'radial-gradient(circle at 30% 25%, #fdf0f6 0%, #fce6ef 45%, #f7d7e4 100%)' }}>
      <CanvasBackground boosted={false} phase="completed" popActive={true} />
      <div className="absolute top-4 left-4 z-20 flex gap-3">
        <Link href="/test/text" className="px-3 py-2 rounded-xl bg-white/80 text-black" style={{ fontFamily: 'Pretendard Variable', fontSize: 13 }}>
          text
        </Link>
        <Link href="/test/end" className="px-3 py-2 rounded-xl bg-white/80 text-black" style={{ fontFamily: 'Pretendard Variable', fontSize: 13 }}>
          end
        </Link>
      </div>

      <div
        className="absolute inset-0"
        style={{
          paddingTop: '15vh',
          paddingBottom: '20vh',
          paddingLeft: '20px',
          paddingRight: '20px',
          overflow: 'hidden',
        }}
      >
        {keywords.map((keyword, index) => {
          const { topPercent, leftPercent } = getZigZagPosition(index);
          const dy = offsets[index] || 0;
          return (
            <div
              key={index}
              className="absolute"
              style={{
                top: `${topPercent}vh`,
                left: `${leftPercent}%`,
                width: `${ellipseSize}px`,
                height: `${ellipseSize}px`,
                borderRadius: '297px',
                opacity: 0.65,
                background:
                  'radial-gradient(50% 50% at 50% 50%, #DEE6FF 43.75%, #FFF 65.87%, rgba(255, 255, 255, 0.61) 100%)',
                boxShadow: '0 -14px 20px 0 #FFEFFC, 0 20px 20px 0 #CBD7F3, 0 4px 100px 0 #CFE9FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                transform: `translate(-50%, calc(-50% + ${dy}px))`,
                willChange: 'transform',
              }}
            >
              <span
                style={{
                  fontFamily: 'Pretendard Variable',
                  fontSize: '15px',
                  fontWeight: 500,
                  letterSpacing: '-0.36px',
                  color: '#000',
                  textAlign: 'center',
                  lineHeight: '1.4',
                  padding: `${padding}px`,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                {keyword}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


