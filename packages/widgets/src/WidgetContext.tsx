import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Widget, WidgetType } from '@trendytradez/types';
import { widgetRegistry } from './WidgetRegistry';

interface WidgetContextValue {
  widgets: Widget[];
  addWidget: (type: WidgetType) => void;
  removeWidget: (id: string) => void;
  updateWidget: (id: string, updates: Partial<Widget>) => void;
  getWidget: (id: string) => Widget | undefined;
}

const WidgetContext = createContext<WidgetContextValue | undefined>(undefined);

interface WidgetProviderProps {
  children: React.ReactNode;
  initialWidgets?: Widget[];
}

/**
 * Widget Provider
 * Manages widget state and provides widget operations
 */
export function WidgetProvider({ children, initialWidgets = [] }: WidgetProviderProps) {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);

  const addWidget = useCallback((type: WidgetType) => {
    const definition = widgetRegistry.get(type);
    if (!definition) {
      console.error(`Widget type "${type}" is not registered`);
      return;
    }

    const newWidget: Widget = {
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      position: { x: 0, y: 0 },
      size: { ...definition.defaultSize },
      config: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setWidgets((prev) => [...prev, newWidget]);
  }, []);

  const removeWidget = useCallback((id: string) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== id));
  }, []);

  const updateWidget = useCallback((id: string, updates: Partial<Widget>) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id
          ? { ...widget, ...updates, updatedAt: new Date() }
          : widget
      )
    );
  }, []);

  const getWidget = useCallback(
    (id: string) => {
      return widgets.find((widget) => widget.id === id);
    },
    [widgets]
  );

  const value = useMemo(
    () => ({
      widgets,
      addWidget,
      removeWidget,
      updateWidget,
      getWidget,
    }),
    [widgets, addWidget, removeWidget, updateWidget, getWidget]
  );

  return <WidgetContext.Provider value={value}>{children}</WidgetContext.Provider>;
}

/**
 * Hook to access widget context
 */
export function useWidgets(): WidgetContextValue {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error('useWidgets must be used within WidgetProvider');
  }
  return context;
}
