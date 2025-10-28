import { Card } from '../components/cards/Card';
import type { DashboardData } from '../types/dashboard';

interface AnalyticsPageProps {
  data: DashboardData;
}

export function AnalyticsPage({ data }: AnalyticsPageProps) {
  const { commits, stats, plans } = data;
  
  // Calculate metrics
  const totalCommits = commits.length;
  const completionRate = stats.totalPackages > 0 
    ? Math.round((stats.completePackages / stats.totalPackages) * 100) 
    : 0;
  
  // Calculate grade based on test coverage and completion
  const getQualityGrade = () => {
    const avgScore = (stats.testCoverage + completionRate) / 2;
    if (avgScore >= 90) return 'A';
    if (avgScore >= 80) return 'B';
    if (avgScore >= 70) return 'C';
    if (avgScore >= 60) return 'D';
    return 'F';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Analytics</h1>
        <p className="text-neutral-600">Project metrics and insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Code Activity">
          <div className="text-center py-8">
            <p className="text-4xl font-bold text-primary-600 mb-2">{totalCommits}</p>
            <p className="text-sm text-neutral-600">Total commits tracked</p>
          </div>
        </Card>

        <Card title="Completion Rate">
          <div className="text-center py-8">
            <p className="text-4xl font-bold text-success mb-2">{completionRate}%</p>
            <p className="text-sm text-neutral-600">Packages complete</p>
          </div>
        </Card>

        <Card title="Code Quality">
          <div className="text-center py-8">
            <p className="text-4xl font-bold text-warning mb-2">{getQualityGrade()}</p>
            <p className="text-sm text-neutral-600">Overall grade</p>
          </div>
        </Card>
      </div>

      <Card title="Project Progress">
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Active Plans</span>
              <span className="text-lg font-semibold text-neutral-900">{plans.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Test Coverage</span>
              <span className="text-lg font-semibold text-success">{stats.testCoverage}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Packages</span>
              <span className="text-lg font-semibold text-neutral-900">
                {stats.completePackages}/{stats.totalPackages}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Recent Activity">
        <div className="p-6">
          <div className="space-y-3">
            {commits.slice(0, 5).map((commit, index) => (
              <div key={commit.id || index} className="flex items-start gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-700 last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{commit.message}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {commit.hash.substring(0, 7)} • {commit.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
