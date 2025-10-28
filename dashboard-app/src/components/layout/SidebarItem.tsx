import clsx from 'clsx';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function SidebarItem({ icon, label, isActive, onClick }: SidebarItemProps) {
  return (
    <button
      title={label}
      onClick={onClick}
      className={clsx(
        'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
        isActive
          ? 'bg-primary-700 text-white'
          : 'text-primary-100 hover:bg-primary-700 hover:text-white'
      )}
    >
      {icon}
    </button>
  );
}
