import clsx from 'clsx';
import { Badge } from '../ui/Badge';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-6">
      <nav className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={clsx(
              'flex items-center gap-2 py-3 border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-primary-600 dark:border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-300 dark:hover:border-neutral-600'
            )}
          >
            <span className="text-sm">{tab.label}</span>
            {tab.count !== undefined && (
              <Badge variant="default" size="sm">
                {tab.count}
              </Badge>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
