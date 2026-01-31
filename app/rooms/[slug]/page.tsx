'use client';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const slug = params?.slug as string;

  if (!slug) {
    return <div>Loading...</div>;
  }

  return <h1>{`Hello Room ${slug}`}</h1>;
}