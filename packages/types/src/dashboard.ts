/**
 * Dashboard type definitions
 */

import type { Widget } from './widget';

export interface Dashboard {
  id: string;
  name: string;
  widgets: Widget[];
  layout: DashboardLayout;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardLayout {
  gridSize?: number;
  snapToGrid?: boolean;
  showGrid?: boolean;
  canvasSize?: {
    width: number;
    height: number;
  };
}

export interface DashboardSettings {
  theme: 'dark' | 'light';
  fullscreen: boolean;
  sidebarCollapsed: boolean;
  showHeader: boolean;
}
