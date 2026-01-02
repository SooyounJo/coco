import dynamic from 'next/dynamic';

// SSR off for blob experiments (WebGL/canvas/animation).
const NewBlo = dynamic(() => import('@/components/test/newblo'), { ssr: false });

export default function NewBloPage() {
  return <NewBlo />;
}


