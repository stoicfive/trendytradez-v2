import { memo } from 'react';
import { Badge } from '../ui/Badge';
import type { Package } from '../../types/dashboard';

interface PackageListProps {
  packages: Package[];
}

export const PackageList = memo(function PackageList({ packages }: PackageListProps) {
  const getStatusVariant = (status: Package['status']) => {
    switch (status) {
      case 'complete':
        return 'success';
      case 'in-progress':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: Package['status']) => {
    switch (status) {
      case 'complete':
        return 'Complete';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {packages.map((pkg) => (
        <div
          key={pkg.id || pkg.name}
          className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800/50"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">{pkg.name}</h4>
            <Badge variant={getStatusVariant(pkg.status)} size="sm">
              {getStatusLabel(pkg.status)}
            </Badge>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">{pkg.description}</p>
          <div className="flex items-center justify-between">
            <Badge variant={getStatusVariant(pkg.status)} size="sm">
              {getStatusLabel(pkg.status)}
            </Badge>
            {pkg.version && (
              <span className="text-xs text-neutral-500 dark:text-neutral-400">{pkg.version}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});
