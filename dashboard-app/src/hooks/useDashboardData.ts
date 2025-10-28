import { useWebSocket } from './useWebSocket';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3002';

export function useDashboardData() {
  const { state, isConnected, error } = useWebSocket(WS_URL);

  return {
    stats: state?.stats || { totalPackages: 0, completePackages: 0, testCoverage: 0 },
    packages: state?.packages || [],
    commits: state?.commits || [],
    plans: state?.plans || [],
    todos: state?.todos || [],
    github: state?.github,
    isConnected,
    error,
  };
}
