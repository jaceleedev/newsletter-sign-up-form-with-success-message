'use client';

import Image from 'next/image';
import ListItem from './ListItem';
import Button from '../Button';
import Input from './Input';
import { useFormState } from 'react-dom';

interface NewsLetterFormProps {
  onAction: (
    prevState: { success: boolean; error: boolean; message: string },
    formData: FormData
  ) => Promise<{ success: boolean; error: boolean; message: string }>;
}

function NewsLetterForm({ onAction }: Readonly<NewsLetterFormProps>) {
  const [state, formAction] = useFormState(onAction, {
    success: false,
    error: false,
    message: '',
  });

  return (
    <div className="grid grid-cols-1 grid-rows-[284px_auto] gap-10 max-w-[375px] h-[842px] bg-white lg:grid-cols-[auto_424px] lg:grid-rows-1 lg:gap-0 lg:max-w-[928px] lg:h-[641px] lg:rounded-[36px]">
      <Image
        src="/images/illustration-sign-up-mobile.svg"
        alt=""
        width={375}
        height={284}
        priority
        aria-hidden={true}
        className="rounded-br-2xl rounded-bl-2xl h-[284px] object-cover lg:hidden"
      />
      <div className="px-6 pb-10 lg:px-16 lg:pt-[97px] lg:pb-[98px]">
        <h1 className="text-heading mb-6">Stay updated!</h1>
        <p className="text-body mb-6">
          Join 60,000+ product managers receiving monthly updates on:
        </p>
        <ul
          className="flex flex-col gap-[10px] mb-10"
          aria-label="Benefits of subscription"
        >
          <ListItem content="Product discovery and building what matters" />
          <ListItem content="Measuring to ensure updates are a success" />
          <ListItem content="And much more!" />
        </ul>
        <form
          action={formAction}
          className="flex flex-col gap-6"
          aria-label="Newsletter subscription form"
        >
          <Input
            type="email"
            id="email"
            name="email"
            label="Email address"
            isValid={!state.error}
            errorMessage="Valid email required"
            placeholder="email@company.com"
            required={true}
          />
          <Button type="submit" label="Subscribe to monthly newsletter" />
        </form>
      </div>
      <div className="pr-6 py-6 hidden lg:block">
        <Image
          src="/images/illustration-sign-up-desktop.svg"
          alt=""
          width={400}
          height={593}
          priority
          aria-hidden={true}
          className="rounded-2xl"
        />
      </div>
    </div>
  );
}

export default NewsLetterForm;
