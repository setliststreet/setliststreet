import React from 'react';
import { useRouter } from 'next/router';

export default function ResultsPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Results for Game #{id}</h1>
      <p>Scoring and payout info will go here.</p>
    </main>
  );
} 