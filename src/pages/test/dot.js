import React from 'react';
import dynamic from 'next/dynamic';

const DotScene = dynamic(() => import('@/components/test/DotScene'), { ssr: false });

export default function DotTestPage() {
  return (
    <div className="min-h-screen">
      <DotScene />
    </div>
  );
}


