import { Card, Metric, Text, Flex, BadgeDelta } from '@tremor/react';
import { cn } from '../utils/cn';

interface KPICardProps {
  title: string;
  value: string | number;
  delta?: string;
  deltaType?: 'increase' | 'decrease' | 'unchanged';
  className?: string;
}

/**
 * KPI Card Component
 * Display key performance indicators with Tremor
 */
export function KPICard({ title, value, delta, deltaType, className }: KPICardProps) {
  return (
    <Card className={cn('bg-gray-900 border-gray-800', className)}>
      <Text className="text-gray-400">{title}</Text>
      <Flex className="mt-2" alignItems="baseline" justifyContent="start">
        <Metric className="text-gray-100">{value}</Metric>
        {delta && deltaType && (
          <BadgeDelta className="ml-2" deltaType={deltaType}>
            {delta}
          </BadgeDelta>
        )}
      </Flex>
    </Card>
  );
}
