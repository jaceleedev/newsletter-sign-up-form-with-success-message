import React, { InputHTMLAttributes, useMemo } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  isValid: boolean;
  errorMessage: string;
}

const BASE_STYLES = [
  'text-body',
  'w-full',
  'h-14',
  'pl-6',
  'py-4',
  'rounded-lg',
  'border',
  'border-solid',
  'outline-none',
  'text-dark-navy',
  'focus:border-dark-navy',
  'placeholder:opacity-50',
  'transition-all',
];

const INVALID_STYLES = [
  'text-vermellion',
  'border-vermellion',
  'bg-vermellion',
  'focus:text-vermellion',
  'focus:border-vermellion',
  'bg-opacity-15',
];

const VALID_STYLES = ['border-[rgba(25,24,43,0.25)]', 'bg-white'];

function generateInputStyles(isValid: boolean) {
  return [...BASE_STYLES, ...(isValid ? VALID_STYLES : INVALID_STYLES)].join(
    ' '
  );
}

function Input({
  id,
  label,
  errorMessage,
  isValid = true,
  ...props
}: InputProps) {
  const computedStyles = useMemo(() => generateInputStyles(isValid), [isValid]);

  return (
    <div className="grid grid-cols-1 gap-2 w-full">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="text-body-small text-dark-navy">
          {label}
        </label>
        {!isValid && (
          <span
            className="text-body-small text-vermellion"
            role="alert"
            aria-live="polite"
          >
            {errorMessage}
          </span>
        )}
      </div>
      <input
        id={id}
        type={props.type || 'text'}
        className={computedStyles}
        aria-invalid={!isValid}
        aria-required={props.required}
        {...props}
      />
    </div>
  );
}

export default React.memo(Input);
