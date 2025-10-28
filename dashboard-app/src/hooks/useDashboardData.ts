import { useWebSocket } from './useWebSocket';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3002';

export function useDashboardData() {
  const { state, isConnected, error } = useWebSocket(WS_URL);

  // Map backend data structure to frontend expectations
  const stats = state?.meta ? {
    totalPackages: parseInt(state.meta.total_packages) || 0,
    completePackages: parseInt(state.meta.complete_packages) || 0,
    testCoverage: parseInt(state.meta.test_coverage) || 0,
  } : { totalPackages: 0, completePackages: 0, testCoverage: 0 };

  return {
    stats,
    packages: state?.packages || [],
    commits: state?.commits || [],
    plans: state?.plans || [],
    todos: state?.todos || [],
    github: state?.github,
    isConnected,
    error,
  };
}
