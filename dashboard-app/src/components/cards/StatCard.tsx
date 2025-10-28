import clsx from 'clsx';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  color?: 'primary' | 'success' | 'warning' | 'error';
}

const colorClasses = {
  primary: 'text-primary-600 dark:text-primary-400',
  success: 'text-success dark:text-success',
  warning: 'text-warning dark:text-warning',
  error: 'text-error dark:text-error',
};

export function StatCard({ label, value, icon, trend, color = 'primary' }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">{label}</p>
          <p className={clsx('text-3xl font-bold', colorClasses[color])}>{value}</p>
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={clsx('text-sm font-medium', {
                  'text-success': trend.direction === 'up',
                  'text-error': trend.direction === 'down',
                })}
              >
                {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={clsx('p-3 rounded-lg', {
              'bg-primary-50 text-primary-600': color === 'primary',
              'bg-green-50 text-success': color === 'success',
              'bg-yellow-50 text-warning': color === 'warning',
              'bg-red-50 text-error': color === 'error',
            })}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
