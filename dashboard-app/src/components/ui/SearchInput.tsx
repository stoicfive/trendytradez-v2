import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onSubmit'> {
  onSubmit?: (value: string) => void;
}

export function SearchInput({
  placeholder = 'Search...',
  value,
  onChange,
  onSubmit,
  className,
  ...props
}: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit && typeof value === 'string') {
      onSubmit(value);
    }
  };

  return (
    <div className={clsx('relative', className)}>
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={clsx(
          'w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md',
          'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100',
          'placeholder:text-neutral-500 dark:placeholder:text-neutral-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          className
        )}
        {...props}
      />
    </div>
  );
}
