/**
 * Dashboard Toolbar
 * Floating toolbar for quick actions
 */

import { useDashboardStore } from '../store/dashboardStore';

export function Toolbar() {
  const isToolbarVisible = useDashboardStore((state) => state.isToolbarVisible);
  const reset = useDashboardStore((state) => state.reset);

  if (!isToolbarVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-2 flex gap-2">
      <button
        onClick={reset}
        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        title="Reset dashboard"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  );
}
