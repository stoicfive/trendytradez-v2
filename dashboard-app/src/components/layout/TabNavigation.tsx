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
    <nav className="bg-white border-b border-neutral-200 px-6">
      <div className="flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={clsx(
              'flex items-center gap-2 py-3 border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-primary-600 text-neutral-900 font-medium'
                : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
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
      </div>
    </nav>
  );
}
