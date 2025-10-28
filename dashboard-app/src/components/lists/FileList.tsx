import { memo } from 'react';
import clsx from 'clsx';

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
          onClick={() => onItemClick?.(item)}
          className={clsx(
            'flex items-start gap-3 py-3 px-4',
            onItemClick && 'cursor-pointer hover:bg-neutral-50 transition-colors'
          )}
        >
          {item.icon && (
            <div className="flex-shrink-0 text-neutral-400 mt-0.5">{item.icon}</div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 truncate">{item.name}</p>
            <p className="text-sm text-neutral-600 truncate">{item.description}</p>
          </div>
          {item.meta && (
            <div className="flex-shrink-0 text-xs text-neutral-500">{item.meta}</div>
          )}
        </div>
      ))}
    </div>
  );
});
