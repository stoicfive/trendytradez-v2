import { memo } from 'react';
import { ProgressBar } from '../ui/ProgressBar';
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
          className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h4 className="font-semibold text-neutral-900 mb-3">{plan.name}</h4>
          <ProgressBar
            value={plan.progress}
            max={100}
            height="md"
            color="bg-primary-600"
          />
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-neutral-600">
              {plan.completed} / {plan.total} tasks
            </span>
            <span className="font-medium text-neutral-900">{plan.progress}%</span>
          </div>
        </div>
      ))}
    </div>
  );
});
