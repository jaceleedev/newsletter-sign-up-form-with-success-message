import subscriptionAction from '@/actions/subscriptionAction';
import NewsLetterForm from '@/components/NewsLetterForm';

export default function Home() {
  return (
    <main>
      <NewsLetterForm onAction={subscriptionAction} />
    </main>
  );
}
