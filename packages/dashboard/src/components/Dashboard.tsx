/**
 * Main Dashboard Component
 * Brings together all dashboard components
 */

import { useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { DashboardCanvas } from './DashboardCanvas';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useWidgets } from '@trendytradez/widgets';
import { useDashboardStore } from '../store/dashboardStore';

export function Dashboard() {
  useKeyboardShortcuts();
  const { widgets } = useWidgets();
  const isSidebarOpen = useDashboardStore((state) => state.isSidebarOpen);

  useEffect(() => {
    // Sync widgets with dashboard layout
    console.log('Dashboard mounted with', widgets.length, 'widgets');
  }, [widgets]);

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {isSidebarOpen && <Sidebar />}
        
        <DashboardCanvas>
          {widgets.map((widget) => (
            <div key={widget.id} className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="text-sm font-medium mb-2">{widget.config.title || widget.type}</div>
              <div className="text-xs text-gray-400">Widget: {widget.id}</div>
            </div>
          ))}
        </DashboardCanvas>
      </div>

      <Toolbar />
    </div>
  );
}
