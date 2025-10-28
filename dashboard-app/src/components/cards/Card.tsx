import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function Card({
  children,
  title,
  actions,
  padding = 'md',
  border = true,
  shadow = 'sm',
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg',
        {
          'border border-neutral-200': border,
          'shadow-sm': shadow === 'sm',
          'shadow-md': shadow === 'md',
          'shadow-lg': shadow === 'lg',
        },
        className
      )}
    >
      {(title || actions) && (
        <div
          className={clsx(
            'flex items-center justify-between border-b border-neutral-200',
            {
              'p-0': padding === 'none',
              'p-3': padding === 'sm',
              'p-4': padding === 'md',
              'p-6': padding === 'lg',
            }
          )}
        >
          {title && <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div
        className={clsx({
          'p-0': padding === 'none',
          'p-3': padding === 'sm',
          'p-4': padding === 'md',
          'p-6': padding === 'lg',
        })}
      >
        {children}
      </div>
    </div>
  );
}
