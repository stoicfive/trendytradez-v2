/**
 * @trendytradez/dashboard
 * Main dashboard package
 */

// Components
export { Dashboard } from './components/Dashboard';
export { DashboardProvider } from './components/DashboardProvider';
export { Header } from './components/Header';
export { Sidebar } from './components/Sidebar';
export { Toolbar } from './components/Toolbar';
export { DashboardCanvas } from './components/DashboardCanvas';

// Store
export { useDashboardStore } from './store/dashboardStore';

// Types
export type {
  DashboardState,
  DashboardLayout,
  DashboardConfig,
} from './types';

// Hooks
export { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
export { useFullscreen } from './hooks/useFullscreen';
