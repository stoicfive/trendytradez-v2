/**
 * Keyboard shortcuts hook
 */

import { useEffect } from 'react';
import { useDashboardStore } from '../store/dashboardStore';

export function useKeyboardShortcuts() {
  const toggleFullscreen = useDashboardStore((state) => state.toggleFullscreen);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // F11 - Toggle fullscreen
      if (event.key === 'F11') {
        event.preventDefault();
        toggleFullscreen();
      }

      // Ctrl/Cmd + S - Save layout (prevent default browser save)
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        // Layout is auto-saved via Zustand persist
        console.log('Layout saved');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleFullscreen]);
}
