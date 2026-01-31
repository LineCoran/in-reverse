'use client';
import { useParams } from 'next/navigation';
import { UiFlex } from '@common/ui';
import { AudioRecorderView } from '@/src/features/audio-record';

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <UiFlex vertical gap={16}>
      <h1>{`Hello Room ${id}`}</h1>;
      <AudioRecorderView />
    </UiFlex>
  )
    
}