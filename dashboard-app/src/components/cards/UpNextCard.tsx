import { Card } from './Card';
import type { Plan } from '../../types/dashboard';

interface UpNextCardProps {
  plans: Plan[];
}

export function UpNextCard({ plans }: UpNextCardProps) {
  // Get plans that are in progress (not 100% complete)
  const activePlans = plans
    .filter(plan => plan.progress < 100)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 5);

  if (activePlans.length === 0) {
    return (
      <Card title="Up Next">
        <div className="text-center py-8 text-secondary">
          <p>All plans completed!</p>
          <p className="text-sm mt-2">Great work on finishing everything.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Up Next">
      <div className="space-y-3">
        {activePlans.map((plan) => (
          <div
            key={plan.id || plan.name}
            className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <div className="flex-1">
              <h4 className="text-sm font-medium text-primary">
                {plan.name}
              </h4>
              <p className="text-xs text-secondary mt-1">
                {plan.completed} of {plan.total} tasks complete
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                  {plan.progress}%
                </p>
              </div>
              <div className="w-16 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 dark:bg-primary-500 transition-all"
                  style={{ width: `${plan.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
