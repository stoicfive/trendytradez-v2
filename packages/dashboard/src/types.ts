/**
 * Dashboard types
 */

import type { Widget } from '@trendytradez/types';

export interface DashboardLayout {
  i: string; // widget id
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

export interface DashboardConfig {
  cols: number;
  rowHeight: number;
  margin: [number, number];
  containerPadding: [number, number];
  isDraggable: boolean;
  isResizable: boolean;
  compactType: 'vertical' | 'horizontal' | null;
}

export interface DashboardState {
  // Widgets
  widgets: Widget[];
  layout: DashboardLayout[];
  
  // UI State
  isFullscreen: boolean;
  isSidebarOpen: boolean;
  isToolbarVisible: boolean;
  
  // Config
  config: DashboardConfig;
  
  // Actions
  addWidget: (widget: Widget, layout: DashboardLayout) => void;
  removeWidget: (widgetId: string) => void;
  updateLayout: (layout: DashboardLayout[]) => void;
  toggleFullscreen: () => void;
  toggleSidebar: () => void;
  toggleToolbar: () => void;
  setConfig: (config: Partial<DashboardConfig>) => void;
  reset: () => void;
}
