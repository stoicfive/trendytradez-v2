import { Card } from '../components/cards/Card';
import { Button } from '../components/ui/Button';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Settings</h1>
        <p className="text-neutral-600">Configure your dashboard preferences</p>
      </div>

      <Card title="General Settings">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Dashboard Theme
            </label>
            <select className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Refresh Interval
            </label>
            <select className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
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
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Repository
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="owner/repository"
              defaultValue="stoicfive/trendytradez-v2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Access Token
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
            <span className="text-sm text-neutral-700">Email notifications for failed builds</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4" defaultChecked />
            <span className="text-sm text-neutral-700">Desktop notifications for new issues</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm text-neutral-700">Weekly summary emails</span>
          </label>
        </div>
      </Card>
    </div>
  );
}
