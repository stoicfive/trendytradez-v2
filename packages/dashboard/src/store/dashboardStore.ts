/**
 * Dashboard state management with Zustand
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DashboardState, DashboardConfig } from '../types';

const defaultConfig: DashboardConfig = {
  cols: 12,
  rowHeight: 30,
  margin: [10, 10],
  containerPadding: [10, 10],
  isDraggable: true,
  isResizable: true,
  compactType: 'vertical',
};

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      // Initial state
      widgets: [],
      layout: [],
      isFullscreen: false,
      isSidebarOpen: true,
      isToolbarVisible: true,
      config: defaultConfig,

      // Actions
      addWidget: (widget, layout) =>
        set((state) => ({
          widgets: [...state.widgets, widget],
          layout: [...state.layout, layout],
        })),

      removeWidget: (widgetId) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== widgetId),
          layout: state.layout.filter((l) => l.i !== widgetId),
        })),

      updateLayout: (layout) =>
        set({ layout }),

      toggleFullscreen: () =>
        set((state) => ({ isFullscreen: !state.isFullscreen })),

      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      toggleToolbar: () =>
        set((state) => ({ isToolbarVisible: !state.isToolbarVisible })),

      setConfig: (config) =>
        set((state) => ({
          config: { ...state.config, ...config },
        })),

      reset: () =>
        set({
          widgets: [],
          layout: [],
          isFullscreen: false,
          isSidebarOpen: true,
          isToolbarVisible: true,
          config: defaultConfig,
        }),
    }),
    {
      name: 'trendytradez-dashboard',
      partialize: (state) => ({
        widgets: state.widgets,
        layout: state.layout,
        config: state.config,
      }),
    }
  )
);
