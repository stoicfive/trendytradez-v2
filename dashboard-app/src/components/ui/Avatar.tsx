import clsx from 'clsx';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

export function Avatar({ src, alt, size = 'md', fallback }: AvatarProps) {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  if (!src && !fallback) {
    return (
      <div
        className={clsx(
          'rounded-full bg-neutral-200 flex items-center justify-center',
          sizeClasses[size]
        )}
      >
        <span className="text-neutral-600 font-medium">
          {alt.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  if (!src && fallback) {
    return (
      <div
        className={clsx(
          'rounded-full bg-primary-100 flex items-center justify-center',
          sizeClasses[size]
        )}
      >
        <span className="text-primary-700 font-medium">{fallback}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={clsx('rounded-full object-cover', sizeClasses[size])}
    />
  );
}
