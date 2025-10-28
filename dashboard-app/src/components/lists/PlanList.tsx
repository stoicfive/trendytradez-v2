import { memo } from 'react';
import type { Plan } from '../../types/dashboard';

interface PlanListProps {
  plans: Plan[];
}

export const PlanList = memo(function PlanList({ plans }: PlanListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {plans.map((plan) => (
        <div
          key={plan.id || plan.name}
          className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800/50"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">{plan.name}</h4>
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">{plan.progress}%</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">Progress</span>
              <span className="text-neutral-900 dark:text-neutral-100">
                {plan.completed} / {plan.total} tasks
              </span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
              <div
                className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all"
                style={{ width: `${plan.progress}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
