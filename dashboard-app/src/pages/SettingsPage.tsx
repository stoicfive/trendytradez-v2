import { Card } from '../components/cards/Card';
import { Button } from '../components/ui/Button';
import { useTheme } from '../contexts/ThemeContext';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Settings</h1>
        <p className="text-neutral-600 dark:text-neutral-400">Configure your dashboard preferences</p>
      </div>

      <Card title="General Settings">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Dashboard Theme
            </label>
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'auto')}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Refresh Interval
            </label>
            <select className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100">
              <option>30 seconds</option>
              <option>1 minute</option>
              <option>5 minutes</option>
              <option>Manual only</option>
            </select>
          </div>
        </div>
      </Card>

      <Card title="GitHub Integration">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Repository
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
              placeholder="owner/repository"
              defaultValue="stoicfive/trendytradez-v2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Access Token
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
              placeholder="ghp_xxxxxxxxxxxx"
            />
          </div>

          <Button variant="primary">Save Settings</Button>
        </div>
      </Card>

      <Card title="Notifications">
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4" defaultChecked />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Email notifications for failed builds</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4" defaultChecked />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Desktop notifications for new issues</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Weekly summary emails</span>
          </label>
        </div>
      </Card>
    </div>
  );
}
