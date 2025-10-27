import { Card as TremorCard } from '@tremor/react';
import { cn } from '../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  decoration?: 'top' | 'left' | 'bottom' | 'right';
  decorationColor?: string;
}

/**
 * Card Component
 * Wrapper around Tremor Card with TrendyTradez styling
 */
export function Card({ children, className, decoration, decorationColor }: CardProps) {
  return (
    <TremorCard
      className={cn('bg-gray-900 border-gray-800', className)}
      decoration={decoration}
      decorationColor={decorationColor}
    >
      {children}
    </TremorCard>
  );
}
