import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  variant?: 'default' | 'primary' | 'ghost';
}

export function IconButton({
  icon,
  label,
  variant = 'default',
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      title={label}
      className={clsx(
        'inline-flex items-center justify-center rounded-md p-2 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        {
          'hover:bg-neutral-100 text-neutral-700 focus-visible:ring-neutral-600':
            variant === 'default',
          'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-600':
            variant === 'primary',
          'hover:bg-neutral-100 text-neutral-600 focus-visible:ring-neutral-600':
            variant === 'ghost',
        },
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
