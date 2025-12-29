import React from 'react';
import dynamic from 'next/dynamic';

const TextScene = dynamic(() => import('@/components/test/TextScene'), { ssr: false });

export default function TextTestPage() {
  return (
    <div className="min-h-screen">
      <TextScene />
    </div>
  );
}


