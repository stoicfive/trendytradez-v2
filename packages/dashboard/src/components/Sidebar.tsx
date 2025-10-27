/**
 * Dashboard Sidebar
 * Side navigation panel with widget library
 */

import { useDashboardStore } from '../store/dashboardStore';
import { useWidgets, widgetRegistry } from '@trendytradez/widgets';

export function Sidebar() {
  const isSidebarOpen = useDashboardStore((state) => state.isSidebarOpen);
  const { addWidget } = useWidgets();

  const availableWidgets = widgetRegistry.getAll();

  const handleAddWidget = (type: string) => {
    addWidget(type as any);
  };

  if (!isSidebarOpen) return null;

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-white mb-4">Widgets</h2>
      
      <div className="space-y-2">
        {availableWidgets.map((widget) => (
          <button
            key={widget.type}
            onClick={() => handleAddWidget(widget.type)}
            className="w-full p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition-colors"
          >
            <div className="font-medium text-white">{widget.label}</div>
            {widget.description && (
              <div className="text-sm text-gray-400 mt-1">{widget.description}</div>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}
