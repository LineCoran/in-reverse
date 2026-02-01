'use client';
import { useParams } from 'next/navigation';
import { PlayersWaitingView } from '@widgets/players-waiting';

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) {
    return <div>Loading...</div>;
  }

  return <PlayersWaitingView id={id} />;
}
