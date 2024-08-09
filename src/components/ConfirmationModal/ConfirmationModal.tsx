'use client';

import Image from 'next/image';
import Button from '../Button';
import { useState } from 'react';

interface ConfirmationModalProps {
  email: string;
}

function ConfirmationModal({ email }: Readonly<ConfirmationModalProps>) {
  const [isVisible, setIsVisible] = useState(true);

  function handleClick() {
    setIsVisible((prev) => !prev);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="max-w-[375px] h-[812px] px-6 pt-[149px] pb-10 bg-white lg:max-w-[504px] lg:h-[520px] lg:px-16 lg:pt-12 lg:pb-16 lg:rounded-[36px] lg:shadow-[0_15px_60px_0_rgba(0,0,0,0.25)]">
      <div className="mb-[263px] lg:mb-10">
        <Image
          src="/images/icon-success.svg"
          alt=""
          width={64}
          height={64}
          priority
          className="mb-10"
        />
        <h1 className="text-heading mb-6">Thanks for subscribing!</h1>
        <p className="text-body">
          A confirmation email has been sent to{' '}
          <span className="text-body-bold">{email}</span>. Please open it and
          click the button inside to confirm your subscription
        </p>
      </div>
      <Button type="button" label="Dismiss message" onClick={handleClick} />
    </div>
  );
}

export default ConfirmationModal;
