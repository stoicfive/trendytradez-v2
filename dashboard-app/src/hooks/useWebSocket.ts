import { useEffect, useRef, useState } from 'react';

interface GitHubData {
  projects: number;
  issues: number;
  milestones: number;
  lastSync?: string;
  syncStatus?: 'success' | 'failed';
}

interface DashboardState {
  packages: any[];
  commits: any[];
  todos: any[];
  plans: any[];
  meta: Record<string, string>;
  stats: {
    totalPackages: number;
    completePackages: number;
    testCoverage: number;
  };
  github?: GitHubData;
}

export function useWebSocket(url: string) {
  const [state, setState] = useState<DashboardState | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    function connect() {
      try {
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log('WebSocket connected');
          setIsConnected(true);
          setError(null);
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            
            if (message.type === 'initial' || message.type === 'update') {
              setState(message.data);
            }
          } catch (err) {
            console.error('Error parsing message:', err);
          }
        };

        ws.onerror = (event) => {
          console.error('WebSocket error:', event);
          setError('Connection error');
        };

        ws.onclose = () => {
          console.log('WebSocket disconnected');
          setIsConnected(false);
          
          // Attempt reconnect after 3 seconds
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('Attempting to reconnect...');
            connect();
          }, 3000);
        };
      } catch (err) {
        console.error('Error creating WebSocket:', err);
        setError('Failed to connect');
      }
    }

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url]);

  return { state, isConnected, error };
}
