'use client';

import { ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset';
  label: string;
}

function Button({ type, label, ...props }: Readonly<ButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <button
      type={type}
      className="text-body-bold text-white text-center w-full pt-[18px] pb-[14px] rounded-lg bg-dark-navy hover:bg-gradient-primary hover:shadow-primary transition-all"
      disabled={pending}
      aria-busy={pending}
      {...props}
    >
      {pending ? 'Processing...' : label}
    </button>
  );
}

export default Button;
