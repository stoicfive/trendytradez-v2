import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { TabNavigation } from './components/layout/TabNavigation';
import { CodeTab } from './components/tabs/CodeTab';
import { IssuesTab } from './components/tabs/IssuesTab';
import { PullRequestsTab } from './components/tabs/PullRequestsTab';
import { ProjectsTab } from './components/tabs/ProjectsTab';
import { Card } from './components/cards/Card';
import { useDashboardData } from './hooks/useDashboardData';

const tabs = [
  { id: 'code', label: 'Code' },
  { id: 'issues', label: 'Issues', count: 103 },
  { id: 'pull-requests', label: 'Pull Requests', count: 7 },
  { id: 'projects', label: 'Projects' },
];

function App() {
  const [activeTab, setActiveTab] = useState('code');
  const { stats, packages, commits, plans, todos, github, isConnected, error } =
    useDashboardData();

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

  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar activeItem="home" />

      <div className="ml-16">
        <Header title="TrendyTradez v2" isConnected={isConnected} />
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="p-6 max-w-[1600px] mx-auto">
          {activeTab === 'code' && (
            <CodeTab
              stats={stats}
              packages={packages}
              commits={commits}
              plans={plans}
              todos={todos}
              github={github}
            />
          )}
          {activeTab === 'issues' && <IssuesTab issueCount={github?.issues} />}
          {activeTab === 'pull-requests' && <PullRequestsTab />}
          {activeTab === 'projects' && <ProjectsTab projectCount={github?.projects} />}
        </main>
      </div>
    </div>
  );
}

export default App;
