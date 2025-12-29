import dynamic from 'next/dynamic';

const TextIndexMirror = dynamic(() => import('@/components/test/TextIndexMirror'), { ssr: false });

export default function TextTestPage() {
  return <TextIndexMirror />;
}


