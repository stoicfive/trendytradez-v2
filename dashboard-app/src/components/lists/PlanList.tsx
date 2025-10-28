import { memo } from 'react';
import type { Plan } from '../../types/dashboard';

interface PlanListProps {
  plans: Plan[];
}

export const PlanList = memo(function PlanList({ plans }: PlanListProps) {
  const getGitHubProjectUrl = (planName: string) => {
    const projectNumber = planName.match(/^\d+/)?.[0];
    if (projectNumber) {
      return `https://github.com/stoicfive/trendytradez-v2/projects/${projectNumber}`;
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {plans.map((plan) => {
        const githubUrl = getGitHubProjectUrl(plan.name);
        const CardContent = (
          <>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-primary">{plan.name}</h4>
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">{plan.progress}%</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary">Progress</span>
                <span className="text-primary">
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
          </>
        );

        return githubUrl ? (
          <a
            key={plan.id || plan.name}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            {CardContent}
          </a>
        ) : (
          <div
            key={plan.id || plan.name}
            className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800/50"
          >
            {CardContent}
          </div>
        );
      })}
    </div>
  );
});
