import UniversalPaymentOptions from '@/components/UniversalPaymentOptions';
import React from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../../components/MainLayout';

export default function ResultsPage() {
  const router = useRouter();
  const { id } = router.query;
  
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-8">
        <h1 className="text-3xl font-bold mb-4">Results for Game #{id}</h1>
        <p className="text-gray-600">Scoring and payout info will go here.</p>
      </div>
    </MainLayout>
  );
} 

<UniversalPaymentOptions />
