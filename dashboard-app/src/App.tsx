import { useState, useMemo } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { TabNavigation } from './components/layout/TabNavigation';
import { StatsGrid } from './components/sections/StatsGrid';
import { Card } from './components/cards/Card';
import { PackageList } from './components/lists/PackageList';
import { FileList } from './components/lists/FileList';
import { PlanList } from './components/lists/PlanList';
import { Button } from './components/ui/Button';
import { HomePage } from './pages/HomePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpPage } from './pages/HelpPage';
import { IssuesTab } from './components/tabs/IssuesTab';
import { PullRequestsTab } from './components/tabs/PullRequestsTab';
import { ProjectsTab } from './components/tabs/ProjectsTab';
import { useDashboardData } from './hooks/useDashboardData';

const tabs = [
  { id: 'code', label: 'Code' },
  { id: 'issues', label: 'Issues', count: 103 },
  { id: 'pull-requests', label: 'Pull Requests', count: 7 },
  { id: 'projects', label: 'Projects' },
];

function App() {
  const [activePage, setActivePage] = useState('home');
  const [activeTab, setActiveTab] = useState('code');
  const { stats, packages, commits, plans, todos, github, isConnected, error } =
    useDashboardData();

  const commitItems = useMemo(
    () =>
      commits.map((commit) => ({
        id: commit.id || commit.hash,
        name: commit.message,
        description: `${commit.hash.substring(0, 7)} • ${commit.date}`,
      })),
    [commits]
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Card className="max-w-md">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-error mb-2">Connection Error</h1>
            <p className="text-neutral-600 mb-4">{error}</p>
            <p className="text-sm text-neutral-500">
              Make sure the server is running: <code>pnpm dashboard:start</code>
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Card className="max-w-md">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h1 className="text-xl font-semibold text-neutral-900 mb-2">Connecting...</h1>
            <p className="text-neutral-600 mb-4">
              Connecting to dashboard server at ws://localhost:3002
            </p>
            <p className="text-xs text-neutral-500">
              Check browser console (F12) for connection errors
            </p>
          </div>
        </Card>
      </div>
    );
  }

  const dashboardData = { stats, packages, commits, plans, todos, github, isConnected };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <HomePage data={dashboardData} />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'help':
        return <HelpPage />;
      case 'code':
        return (
          <>
            <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="mt-6">
              {activeTab === 'code' && (
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
                <p className="text-sm text-neutral-600 mb-4">
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
                      <span className="text-sm text-neutral-600">Projects</span>
                      <span className="font-semibold text-neutral-900">{github.projects}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Issues</span>
                      <span className="font-semibold text-neutral-900">{github.issues}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Milestones</span>
                      <span className="font-semibold text-neutral-900">
                        {github.milestones}
                      </span>
                    </div>
                    {github.lastSync && (
                      <div className="pt-3 border-t border-neutral-200">
                        <p className="text-xs text-neutral-500">
                          Last sync: {new Date(github.lastSync).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </div>

          <Card title="Implementation Plans" padding="none">
            <div className="p-6">
              <PlanList plans={plans} />
            </div>
          </Card>
            </>
          )}
              {activeTab === 'issues' && <IssuesTab issueCount={github?.issues} />}
              {activeTab === 'pull-requests' && <PullRequestsTab />}
              {activeTab === 'projects' && <ProjectsTab projectCount={github?.projects} />}
            </div>
          </>
        );
      default:
        return <HomePage data={dashboardData} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar activeItem={activePage} onItemClick={setActivePage} />

      <div className="ml-16">
        <Header title="TrendyTradez v2" isConnected={isConnected} />
        
        <main className="p-6 max-w-[1600px] mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
