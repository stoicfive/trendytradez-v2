import { Card } from '../components/cards/Card';

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Analytics</h1>
        <p className="text-neutral-600">Project metrics and insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Code Activity">
          <div className="text-center py-8">
            <p className="text-4xl font-bold text-primary-600 mb-2">156</p>
            <p className="text-sm text-neutral-600">Commits this month</p>
          </div>
        </Card>

        <Card title="Contributors">
          <div className="text-center py-8">
            <p className="text-4xl font-bold text-success mb-2">8</p>
            <p className="text-sm text-neutral-600">Active contributors</p>
          </div>
        </Card>

        <Card title="Code Quality">
          <div className="text-center py-8">
            <p className="text-4xl font-bold text-warning mb-2">A</p>
            <p className="text-sm text-neutral-600">Overall grade</p>
          </div>
        </Card>
      </div>

      <Card title="Performance Metrics">
        <div className="p-6">
          <div className="text-center py-12 text-neutral-500">
            <p>Analytics dashboard coming soon</p>
            <p className="text-sm mt-2">Charts and detailed metrics will be displayed here</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
