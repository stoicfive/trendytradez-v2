import { StatCard } from '../cards/StatCard';
import type { Stats, GitHubData } from '../../types/dashboard';

interface StatsGridProps {
  stats: Stats;
  github?: GitHubData;
  todosCount: number;
  plansCount: number;
}

export function StatsGrid({ stats, github, todosCount, plansCount }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard
        label={<p className="text-sm text-secondary mb-1">Packages Complete</p>}
        value={`${stats.completePackages}/${stats.totalPackages}`}
        color="primary"
      />
      <StatCard
        label={<p className="text-sm text-secondary mb-1">Test Coverage</p>}
        label="Test Coverage"
        value={`${stats.testCoverage}%`}
        color="success"
      />
      <StatCard label="TODOs" value={todosCount} color="warning" />
      <StatCard label="Plans" value={plansCount} color="primary" />
      {github && (
        <>
          <StatCard label="GitHub Projects" value={github.projects} color="primary" />
          <StatCard label="GitHub Issues" value={github.issues} color="primary" />
        </>
      )}
    </div>
  );
}
