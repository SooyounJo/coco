import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const EndSceneV1 = dynamic(() => import('@/components/test/endscene/V1'), { ssr: false });
const EndSceneV2 = dynamic(() => import('@/components/test/endscene/V2'), { ssr: false });
const EndSceneV3 = dynamic(() => import('@/components/test/endscene/V3'), { ssr: false });

export default function EndScene() {
  const [variant, setVariant] = useState('v1');

  return (
    <div className="fixed inset-0">
      <div className="fixed top-3 left-0 right-0 z-[40] flex justify-center gap-2">
        <button
          className={`px-3 py-1 rounded-full text-sm ${variant === 'v1' ? 'bg-black/70 text-white' : 'bg-white/80 text-black'} `}
          onClick={() => setVariant('v1')}
        >
          v1
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm ${variant === 'v2' ? 'bg-black/70 text-white' : 'bg-white/80 text-black'} `}
          onClick={() => setVariant('v2')}
        >
          v2
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm ${variant === 'v3' ? 'bg-black/70 text-white' : 'bg-white/80 text-black'} `}
          onClick={() => setVariant('v3')}
        >
          v3
        </button>
      </div>
      {variant === 'v1' && <EndSceneV1 />}
      {variant === 'v2' && <EndSceneV2 />}
      {variant === 'v3' && <EndSceneV3 />}
    </div>
  );
}


