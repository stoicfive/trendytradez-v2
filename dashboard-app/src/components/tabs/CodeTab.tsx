import { useMemo } from 'react';
import { StatsGrid } from '../sections/StatsGrid';
import { Card } from '../cards/Card';
import { PackageList } from '../lists/PackageList';
import { FileList } from '../lists/FileList';
import { PlanList } from '../lists/PlanList';
import { UpNextCard } from '../cards/UpNextCard';
import { Button } from '../ui/Button';
import type { Package, Commit, Plan, Todo } from '../../types/dashboard';

interface CodeTabProps {
  stats: {
    totalPackages: number;
    completePackages: number;
    testCoverage: number;
  };
  packages: Package[];
  commits: Commit[];
  plans: Plan[];
  todos: Todo[];
  github?: {
    projects: number;
    issues: number;
    milestones: number;
    lastSync?: string;
    syncStatus?: 'success' | 'failed';
  };
}

export function CodeTab({ stats, packages, commits, plans, todos, github }: CodeTabProps) {
  const commitItems = useMemo(
    () =>
      commits.map((commit) => ({
        id: commit.id || commit.hash,
        name: commit.message,
        description: `${commit.hash.substring(0, 7)} • ${commit.date}`,
      })),
    [commits]
  );

  return (
    <>
      <div className="mb-6">
        <StatsGrid
          stats={stats}
          github={github}
          todosCount={todos.length}
          plansCount={plans.length}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Packages" padding="none">
            <div className="p-6">
              <PackageList packages={packages} />
            </div>
          </Card>

          <Card title="Recent Commits" padding="none">
            <FileList items={commitItems} />
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="About">
            <p className="text-sm text-secondary mb-4">
              This is a repository template created by TrendyTradez v2
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <a
                  href="https://github.com/stoicfive/trendytradez-v2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  github.com/stoicfive/trendytradez-v2
                </a>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <Button variant="primary" className="w-full">
                View on GitHub
              </Button>
            </div>
          </Card>

          {github && (
            <Card title="GitHub Integration">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary">Projects</span>
                  <span className="font-semibold text-primary">{github.projects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary">Issues</span>
                  <span className="font-semibold text-primary">{github.issues}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary">Milestones</span>
                  <span className="font-semibold text-primary">{github.milestones}</span>
                </div>
                {github.lastSync && (
                  <div className="pt-3 border-t border-neutral-200">
                    <p className="text-xs text-tertiary">
                      Last sync: {new Date(github.lastSync).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Implementation Plans" padding="none">
            <div className="p-6">
              <PlanList plans={plans} />
            </div>
          </Card>
        </div>

        <div>
          <UpNextCard plans={plans} />
        </div>
      </div>
    </>
  );
}
