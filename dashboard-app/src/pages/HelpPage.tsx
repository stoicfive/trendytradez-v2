import { Card } from '../components/cards/Card';

export function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Help & Documentation</h1>
        <p className="text-neutral-600">Get help with using the dashboard</p>
      </div>

      <Card title="Quick Start Guide">
        <div className="prose prose-sm max-w-none">
          <h3 className="text-lg font-semibold text-neutral-900 mb-3">Getting Started</h3>
          <ol className="space-y-2 text-neutral-700">
            <li>Connect your GitHub repository in Settings</li>
            <li>Configure your project structure and plans</li>
            <li>Monitor real-time updates on the Code tab</li>
            <li>Track progress with GitHub Projects integration</li>
          </ol>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Common Tasks">
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-primary-600 hover:underline text-sm">
                How to sync with GitHub
              </a>
            </li>
            <li>
              <a href="#" className="text-primary-600 hover:underline text-sm">
                Managing implementation plans
              </a>
            </li>
            <li>
              <a href="#" className="text-primary-600 hover:underline text-sm">
                Understanding dashboard metrics
              </a>
            </li>
            <li>
              <a href="#" className="text-primary-600 hover:underline text-sm">
                Configuring notifications
              </a>
            </li>
          </ul>
        </Card>

        <Card title="Resources">
          <ul className="space-y-3">
            <li>
              <a
                href="https://github.com/stoicfive/trendytradez-v2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline text-sm"
              >
                GitHub Repository
              </a>
            </li>
            <li>
              <a href="#" className="text-primary-600 hover:underline text-sm">
                API Documentation
              </a>
            </li>
            <li>
              <a href="#" className="text-primary-600 hover:underline text-sm">
                Troubleshooting Guide
              </a>
            </li>
            <li>
              <a href="#" className="text-primary-600 hover:underline text-sm">
                Report an Issue
              </a>
            </li>
          </ul>
        </Card>
      </div>

      <Card title="Support">
        <div className="text-center py-8">
          <p className="text-neutral-700 mb-4">Need additional help?</p>
          <a
            href="https://github.com/stoicfive/trendytradez-v2/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </Card>
    </div>
  );
}
