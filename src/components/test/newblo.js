import React, { useEffect, useRef, useState } from 'react';
import BlobBackground9_3 from '@/components/test/BlobBackground9_3';

/**
 * newblo: Blob reference sandbox
 * - Put blob reference code here (WebGL/canvas/animation experiments).
 * - This component is mounted via /pages/test/newblo.js with ssr:false.
 */
export default function NewBlo() {
  const [phase] = useState('completed');
  const [centered, setCentered] = useState(false);
  const [waving, setWaving] = useState(false);
  const [waveLevel, setWaveLevel] = useState(0); // 0..0.7
  const [activity, setActivity] = useState(0); // 0/1 (scale kick)
  const waveLevelRef = useRef(0);
  const lastNowRef = useRef(0);

  useEffect(() => {
    // 요구사항:
    // - 3초간 "Active(물처럼 유기적으로 일렁임)" → 3초간 "Default(잔잔)" 를 계속 반복
    // - Active 구간에서 채도도 더 올라가게(쉐이더는 boost/waveLevel을 반영)
    let raf = 0;
    const start = performance.now();
    // Transition should be smooth: ~2s to connect active <-> inactive (no hard cuts)
    // Cycle design (total 8s):
    // - 2s ramp-up -> 2s active hold  (4s "active" window)
    // - 2s ramp-down -> 2s rest hold  (4s "inactive" window)
    const RAMP_MS = 2000;
    const ACTIVE_HOLD_MS = 2000;
    const REST_HOLD_MS = 2000;
    const CYCLE_MS = RAMP_MS + ACTIVE_HOLD_MS + RAMP_MS + REST_HOLD_MS;

    // Smooth easing helper (0..1)
    const ease01 = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t); // easeInOutSine

    const tick = (now) => {
      // If the tab lags or resumes after a pause, limit per-frame changes
      // so we don't get a sudden "spike" wobble at the top.
      const lastNow = lastNowRef.current || now;
      const dt = Math.min(0.05, Math.max(0.0, (now - lastNow) / 1000)); // clamp to 50ms
      lastNowRef.current = now;

      const t = (now - start) % CYCLE_MS;
      const tRampUpEnd = RAMP_MS;
      const tActiveEnd = RAMP_MS + ACTIVE_HOLD_MS;
      const tRampDownEnd = RAMP_MS + ACTIVE_HOLD_MS + RAMP_MS;

      // Envelope (0..1): smooth 2s up -> 1s hold -> smooth 2s down -> 1s rest
      let env = 0;
      if (t < tRampUpEnd) {
        env = ease01(t / RAMP_MS);
      } else if (t < tActiveEnd) {
        env = 1;
      } else if (t < tRampDownEnd) {
        const u = (t - tActiveEnd) / RAMP_MS;
        env = 1 - ease01(u);
      } else {
        env = 0;
      }

      // Keep smooth wave/brightness via waveLevel,
      // but make the SCALE change a crisp boundary between "active 4s" and "inactive 4s".
      const isActiveForScale = t < tActiveEnd;
      setWaving(env > 0.02);
      setActivity(isActiveForScale ? 1 : 0);

      const seconds = (now - start) / 1000;
      // multi-frequency wobble (keeps it "watery" instead of a single pulse)
      let wobble =
        0.68 +
        0.18 * Math.sin(seconds * 2.6) +
        0.12 * Math.sin(seconds * 4.3 + 1.1) +
        0.07 * Math.sin(seconds * 6.1 + 2.0);
      // Cap rare peaks so the top doesn't "over-wobble" when frames stutter.
      wobble = Math.max(0.54, Math.min(0.92, wobble));

      // Keep a tiny "idle" motion to avoid feeling like it hard-stops at 0.
      // Active adds on top of it.
      const BASE_LEVEL = 0.045;
      const ACTIVE_GAIN = 0.95;

      // Final waveLevel (drives both motion + saturation via boost in shader)
      const targetLevel = Math.max(0, Math.min(1.25, BASE_LEVEL + env * wobble * ACTIVE_GAIN));

      // Slew-limit: avoid sudden jumps (feels like "lag spike" wobble)
      const cur = waveLevelRef.current;
      const maxUpPerSec = 0.9;
      const maxDownPerSec = 1.2;
      const next =
        targetLevel > cur
          ? Math.min(targetLevel, cur + maxUpPerSec * dt)
          : Math.max(targetLevel, cur - maxDownPerSec * dt);
      waveLevelRef.current = next;
      setWaveLevel(next);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="container container--bright">
      <BlobBackground9_3 phase={phase} centered={centered} waving={waving} waveLevel={waveLevel} activity={activity} />
      <div className="status" role="status" aria-live="polite">
        생각 중이에요
      </div>
      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: radial-gradient(circle at 30% 20%, #fffdfc 0%, #fff6fa 38%, #fdeff3 100%);
          transition: background 2s ease;
          font-family: 'Pretendard Variable', 'Pretendard', system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans KR',
            'Helvetica Neue', 'Apple SD Gothic Neo', 'Malgun Gothic', Arial, 'Nanum Gothic', sans-serif;
          /* Responsive tokens to match v9/3 background exactly */
          --glass-radius: clamp(28px, 8vw, 36px);
          --glass-side: clamp(16px, 5.2vw, 24px);
          --glass-inner: clamp(20px, 5vw, 28px);
          --ui-gray: #e6ebef;
          --chip-offset: clamp(8px, 2vw, 14px);
          --chip-gap: 12px;
          --mb-h: clamp(44px, 7.2vh, 52px);
          --mb-bottom: clamp(36px, 6vh, 56px);
          --safe-l: env(safe-area-inset-left, 0px);
          --safe-r: env(safe-area-inset-right, 0px);
          --side-left: calc(var(--glass-side) + var(--safe-l));
          --side-right: calc(var(--glass-side) + var(--safe-r));
          --modal-shrink: clamp(14px, 3.6vw, 28px);
          --frame-width: calc(100% - var(--side-left) - var(--side-right) - (var(--modal-shrink) * 2));
          --center-fix: calc((var(--safe-l) - var(--safe-r)) / 2);
          --header-gap: clamp(5px, 1.6vh, 12px);
          --suggest-shift: clamp(6px, 1.6vw, 14px);
          --blob-tint: rgba(118, 212, 255, 0.12);
          --modal-extra-inset: 0px;
        }
        .container--bright {
          background: radial-gradient(circle at 30% 20%, #fffeff 0%, #fff7fb 38%, #fbeff5 100%);
        }
        .status {
          position: absolute;
          top: 24vh;
          left: 0;
          right: 0;
          text-align: center;
          color: #0f3a41;
          font-weight: 700;
          font-size: 18px;
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          z-index: 50;
        }
      `}</style>
    </div>
  );
}


