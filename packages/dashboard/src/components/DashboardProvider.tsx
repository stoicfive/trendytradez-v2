/**
 * Dashboard Provider
 * Provides dashboard context and initializes widgets
 */

import { ReactNode } from 'react';
import { WidgetProvider } from '@trendytradez/widgets';
import { registerDefaultWidgets } from '@trendytradez/widgets';

interface DashboardProviderProps {
  children: ReactNode;
}

// Register default widgets on module load
registerDefaultWidgets();

export function DashboardProvider({ children }: DashboardProviderProps) {
  return (
    <WidgetProvider>
      {children}
    </WidgetProvider>
  );
}
