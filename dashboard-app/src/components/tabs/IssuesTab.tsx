import { Card } from '../cards/Card';

interface IssuesTabProps {
  issueCount?: number;
}

export function IssuesTab({ issueCount = 103 }: IssuesTabProps) {
  return (
    <div className="space-y-6">
      <Card title="GitHub Issues" padding="none">
        <div className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              GitHub Issues Integration
            </h3>
            <p className="text-neutral-600 mb-4">
              View and manage all {issueCount} GitHub issues
            </p>
            <a
              href="https://github.com/stoicfive/trendytradez-v2/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
