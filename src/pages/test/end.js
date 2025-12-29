import React from 'react';
import dynamic from 'next/dynamic';

const EndScene = dynamic(() => import('@/components/test/EndScene'), { ssr: false });

export default function EndTestPage() {
  return (
    <div className="min-h-screen">
      <EndScene />
    </div>
  );
}


