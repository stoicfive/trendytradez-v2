import { memo } from 'react';

export interface FileItem {
  id?: string;
  icon?: React.ReactNode;
  name: string;
  description: string;
  meta?: string;
}

interface FileListProps {
  items: FileItem[];
  onItemClick?: (item: FileItem) => void;
}

export const FileList = memo(function FileList({ items, onItemClick }: FileListProps) {
  return (
    <div className="divide-y divide-neutral-200">
      {items.map((item, index) => (
        <div
          key={item.id || `${item.name}-${index}`}
          className="flex items-center gap-3 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
        >
          {item.icon && (
            <div className="flex-shrink-0 text-neutral-400 mt-0.5">{item.icon}</div>
          )}
          <div className="flex-1">
            <p className="text-sm font-medium text-primary">{item.name}</p>
            {item.description && (
              <p className="text-xs text-tertiary mt-0.5">{item.description}</p>
            )}
          </div>
          {item.meta && (
            <div className="flex-shrink-0 text-xs text-neutral-500">{item.meta}</div>
          )}
        </div>
      ))}
    </div>
  );
});
