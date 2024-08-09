import ConfirmationModal from '@/components/ConfirmationModal';
import { Suspense } from 'react';

interface ConfirmationPageProps {
  searchParams: { email: string };
}

export default function ConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const email = decodeURIComponent(searchParams.email);

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <ConfirmationModal email={email} />
      </Suspense>
    </main>
  );
}
