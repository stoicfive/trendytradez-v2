import { Card } from '../cards/Card';

interface ProjectsTabProps {
  projectCount?: number;
}

export function ProjectsTab({ projectCount = 10 }: ProjectsTabProps) {
  return (
    <div className="space-y-6">
      <Card title="GitHub Projects" padding="none">
        <div className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              GitHub Projects
            </h3>
            <p className="text-neutral-600 mb-4">
              View all {projectCount} project boards
            </p>
            <a
              href="https://github.com/stoicfive/trendytradez-v2/projects"
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
