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
          className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h4 className="font-semibold text-neutral-900 mb-1">{pkg.name}</h4>
          <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{pkg.description}</p>
          <div className="flex items-center justify-between">
            <Badge variant={getStatusVariant(pkg.status)} size="sm">
              {getStatusLabel(pkg.status)}
            </Badge>
            {pkg.version && (
              <span className="text-xs text-neutral-500">{pkg.version}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});
