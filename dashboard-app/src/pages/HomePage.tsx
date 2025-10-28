import { Card } from '../components/cards/Card';
import { StatsGrid } from '../components/sections/StatsGrid';
import { UpNextCard } from '../components/cards/UpNextCard';
import type { DashboardData } from '../types/dashboard';

interface HomePageProps {
  data: DashboardData;
}

export function HomePage({ data }: HomePageProps) {
  const { stats, github, todos, plans } = data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Dashboard Overview</h1>
        <p className="text-neutral-600">Welcome to TrendyTradez v2 Project Dashboard</p>
      </div>

      <StatsGrid
        stats={stats}
        github={github}
        todosCount={todos.length}
        plansCount={plans.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Quick Stats">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary">Total Packages</span>
              <span className="text-lg font-semibold text-primary">
                {stats.totalPackages}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary">Test Coverage</span>
              <span className="text-lg font-semibold text-success">
                {stats.testCoverage}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary">Active Plans</span>
              <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                {plans.length}
              </span>
            </div>
          </div>
        </Card>

        <Card title="Project Health">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary">GitHub Issues</span>
              <span className="text-lg font-semibold text-primary">
                {github?.issues || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary">Projects</span>
              <span className="text-lg font-semibold text-primary">
                {github?.projects || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary">Completion</span>
              <span className="text-lg font-semibold text-success">
                {Math.round((stats.completePackages / stats.totalPackages) * 100)}%
              </span>
            </div>
          </div>
        </Card>
      </div>

      <UpNextCard plans={plans} />
    </div>
  );
}
