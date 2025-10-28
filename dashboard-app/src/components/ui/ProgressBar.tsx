import clsx from 'clsx';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  color = 'bg-success',
  height = 'md',
  showLabel = false,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">
      <div
        className={clsx(
          'w-full bg-neutral-200 rounded-full overflow-hidden',
          {
            'h-1': height === 'sm',
            'h-2': height === 'md',
            'h-3': height === 'lg',
          }
        )}
      >
        <div
          className={clsx('h-full transition-all duration-300', color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-neutral-600">
          {value} / {max}
        </div>
      )}
    </div>
  );
}
