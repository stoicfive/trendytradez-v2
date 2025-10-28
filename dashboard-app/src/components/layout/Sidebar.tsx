import { SidebarLogo } from './SidebarLogo';
import { SidebarItem } from './SidebarItem';
import { HomeIcon, CodeIcon, AnalyticsIcon, SettingsIcon, HelpIcon } from './SidebarIcons';

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'code', label: 'Code', icon: <CodeIcon /> },
  { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

const bottomItems: NavItem[] = [
  { id: 'help', label: 'Help', icon: <HelpIcon /> },
];

export function Sidebar({ activeItem = 'home', onItemClick }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-primary-600 dark:bg-neutral-900 border-r border-primary-700 dark:border-neutral-800 flex flex-col items-center py-4 z-50">
      <SidebarLogo />

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            onClick={() => onItemClick?.(item.id)}
          />
        ))}
      </nav>

      <div className="flex flex-col gap-2">
        {bottomItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            onClick={() => onItemClick?.(item.id)}
          />
        ))}
      </div>
    </aside>
  );
}
